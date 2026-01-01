/**
 * useBassAudio Hook - Bass Trainer
 * React hook wrapping the AudioService with lifecycle management
 */

import { useRef, useEffect, useCallback } from 'react';
import { audioService } from '../services/AudioService.js';

export function useBassAudio() {
  const serviceRef = useRef(audioService);
  
  // Initialize AudioContext on mount
  useEffect(() => {
    const service = serviceRef.current;
    service.init();
    
    // Cleanup on unmount - use captured reference
    return () => {
      service.close();
    };
  }, []);
  
  /**
   * Resume audio context (call on user interaction)
   */
  const resume = useCallback(async () => {
    return await serviceRef.current.resume();
  }, []);
  
  /**
   * Get current audio time
   */
  const getCurrentTime = useCallback(() => {
    return serviceRef.current.currentTime;
  }, []);
  
  /**
   * Play a bass note
   */
  const playSound = useCallback((string, fret, time, muted = false) => {
    serviceRef.current.playSound(string, fret, time, muted);
  }, []);
  
  /**
   * Play metronome click
   */
  const playMetronomeClick = useCallback((time, isDownbeat, isFirstOfBeat, enabled = true) => {
    serviceRef.current.playMetronomeClick(time, isDownbeat, isFirstOfBeat, enabled);
  }, []);
  
  /**
   * Play countdown beep
   */
  const playCountdownBeep = useCallback((isStart = false) => {
    serviceRef.current.playCountdownBeep(isStart);
  }, []);
  
  /**
   * Check if audio is ready
   */
  const isReady = useCallback(() => {
    return serviceRef.current.isReady;
  }, []);
  
  return {
    resume,
    getCurrentTime,
    playSound,
    playMetronomeClick,
    playCountdownBeep,
    isReady,
    serviceRef,
  };
}

export default useBassAudio;
