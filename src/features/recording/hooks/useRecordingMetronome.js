/**
 * useRecordingMetronome Hook - Bass Academy
 * Metronome for recording with hi-hat sound synthesis
 * 
 * @module useRecordingMetronome
 */

import { useState, useRef, useCallback, useEffect } from 'react';

// ============================================
// DEFAULT CONFIG
// ============================================

const DEFAULT_CONFIG = {
  tempo: 100,
  timeSignature: 4, // beats per bar
  preRollBars: 1,   // bars before recording starts
};

// ============================================
// HOOK: useRecordingMetronome
// ============================================

export function useRecordingMetronome({
  initialTempo = DEFAULT_CONFIG.tempo,
  onPreRollComplete = null,
} = {}) {
  // ============================================
  // STATE
  // ============================================
  
  const [tempo, setTempo] = useState(initialTempo);
  const [timeSignature, setTimeSignature] = useState(DEFAULT_CONFIG.timeSignature);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPreRoll, setIsPreRoll] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [preRollBeat, setPreRollBeat] = useState(0);
  
  // Refs for timing (these are the source of truth during scheduling)
  const audioContextRef = useRef(null);
  const timerIdRef = useRef(null);
  const isPlayingRef = useRef(false);
  const isPreRollRef = useRef(false);
  const beatCountRef = useRef(0);
  const preRollCountRef = useRef(0);
  const tempoRef = useRef(tempo);
  const timeSignatureRef = useRef(timeSignature);
  const onPreRollCompleteRef = useRef(onPreRollComplete);
  
  // Keep refs in sync with state
  useEffect(() => { tempoRef.current = tempo; }, [tempo]);
  useEffect(() => { timeSignatureRef.current = timeSignature; }, [timeSignature]);
  useEffect(() => { onPreRollCompleteRef.current = onPreRollComplete; }, [onPreRollComplete]);
  
  // ============================================
  // AUDIO CONTEXT INIT
  // ============================================
  
  const getAudioContext = useCallback(async () => {
    if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    // Resume if suspended (requires user gesture on some browsers)
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }
    
    return audioContextRef.current;
  }, []);
  
  // ============================================
  // HI-HAT SOUND SYNTHESIS
  // ============================================
  
  const playHiHat = useCallback((ctx, isAccent = false, isPreRollSound = false) => {
    if (!ctx) return;
    
    const time = ctx.currentTime;
    
    // Create noise source
    const bufferSize = ctx.sampleRate * 0.1;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    // High-pass filter
    const highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.value = isPreRollSound ? 8000 : 6000;
    highpass.Q.value = 1;
    
    // Bandpass for metallic sound
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = isPreRollSound ? 12000 : 10000;
    bandpass.Q.value = 2;
    
    // Envelope
    const envelope = ctx.createGain();
    const volume = isAccent ? 0.5 : 0.3;
    const finalVolume = isPreRollSound ? volume * 0.8 : volume;
    
    envelope.gain.setValueAtTime(finalVolume, time);
    envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.08);
    
    // Connect
    noise.connect(highpass);
    highpass.connect(bandpass);
    bandpass.connect(envelope);
    envelope.connect(ctx.destination);
    
    noise.start(time);
    noise.stop(time + 0.1);
  }, []);
  
  // ============================================
  // SCHEDULER (using refs for real-time accuracy)
  // ============================================
  
  const scheduleNextBeat = useCallback((ctx) => {
    if (!isPlayingRef.current || !ctx) return;
    
    const currentTempo = tempoRef.current;
    const currentTimeSignature = timeSignatureRef.current;
    const secondsPerBeat = 60.0 / currentTempo;
    const preRollTotal = currentTimeSignature * DEFAULT_CONFIG.preRollBars;
    
    // Get current time
    const now = ctx.currentTime;
    
    // Play current beat
    if (isPreRollRef.current) {
      // Pre-roll mode
      const isAccent = (preRollCountRef.current % currentTimeSignature) === 0;
      playHiHat(ctx, isAccent, true);
      
      preRollCountRef.current++;
      const remaining = preRollTotal - preRollCountRef.current;
      setPreRollBeat(remaining);
      
      // Check if pre-roll complete
      if (preRollCountRef.current >= preRollTotal) {
        isPreRollRef.current = false;
        setIsPreRoll(false);
        beatCountRef.current = 0;
        
        // Call callback after a small delay to let UI update
        setTimeout(() => {
          onPreRollCompleteRef.current?.();
        }, 50);
      }
    } else {
      // Normal metronome
      const beatInBar = beatCountRef.current % currentTimeSignature;
      const isAccent = beatInBar === 0;
      playHiHat(ctx, isAccent, false);
      setCurrentBeat(beatInBar + 1);
      beatCountRef.current++;
    }
    
    // Schedule next beat
    if (isPlayingRef.current) {
      timerIdRef.current = setTimeout(() => {
        scheduleNextBeat(ctx);
      }, secondsPerBeat * 1000);
    }
  }, [playHiHat]);
  
  // ============================================
  // CONTROLS
  // ============================================
  
  const start = useCallback(async (withPreRoll = true) => {
    // Stop any existing playback first
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }
    
    const ctx = await getAudioContext();
    
    // Reset state
    beatCountRef.current = 0;
    preRollCountRef.current = 0;
    
    if (withPreRoll) {
      isPreRollRef.current = true;
      setIsPreRoll(true);
      setPreRollBeat(timeSignatureRef.current);
    } else {
      isPreRollRef.current = false;
      setIsPreRoll(false);
    }
    
    isPlayingRef.current = true;
    setIsPlaying(true);
    setCurrentBeat(0);
    
    // Start scheduling
    scheduleNextBeat(ctx);
  }, [getAudioContext, scheduleNextBeat]);
  
  const stop = useCallback(() => {
    // Clear timer
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }
    
    // Reset all state
    isPlayingRef.current = false;
    isPreRollRef.current = false;
    setIsPlaying(false);
    setIsPreRoll(false);
    setCurrentBeat(0);
    setPreRollBeat(0);
    beatCountRef.current = 0;
    preRollCountRef.current = 0;
  }, []);
  
  const startForPlayback = useCallback(async (startTime = 0) => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }
    
    const ctx = await getAudioContext();
    
    const secondsPerBeat = 60.0 / tempoRef.current;
    beatCountRef.current = Math.floor(startTime / secondsPerBeat);
    
    isPlayingRef.current = true;
    isPreRollRef.current = false;
    setIsPlaying(true);
    setIsPreRoll(false);
    setCurrentBeat((beatCountRef.current % timeSignatureRef.current) + 1);
    
    // Calculate delay to next beat
    const beatOffset = startTime % secondsPerBeat;
    const delayToNextBeat = (secondsPerBeat - beatOffset) * 1000;
    
    timerIdRef.current = setTimeout(() => {
      scheduleNextBeat(ctx);
    }, delayToNextBeat);
  }, [getAudioContext, scheduleNextBeat]);
  
  // ============================================
  // CLEANUP
  // ============================================
  
  useEffect(() => {
    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);
  
  // Sync initial tempo
  useEffect(() => {
    setTempo(initialTempo);
  }, [initialTempo]);
  
  // ============================================
  // RETURN API
  // ============================================
  
  return {
    // State
    tempo,
    timeSignature,
    isPlaying,
    isPreRoll,
    currentBeat,
    preRollBeat,
    preRollTotal: timeSignature * DEFAULT_CONFIG.preRollBars,
    
    // Setters
    setTempo,
    setTimeSignature,
    
    // Controls
    start,
    stop,
    startForPlayback,
  };
}

export default useRecordingMetronome;
