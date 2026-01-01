/**
 * Audio Service - Bass Trainer
 * Pure JavaScript class for audio synthesis (no React dependency)
 * Testable and reusable outside of React components
 */

import { STRING_FREQUENCIES, SOUND_CONFIG } from '../config/audioConfig.js';

class AudioService {
  constructor() {
    this.context = null;
    this.isReady = false;
  }

  /**
   * Initialize or get the AudioContext
   */
  init() {
    if (!this.context) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.context = new AudioContext();
    }
    return this.context;
  }

  /**
   * Resume audio context (required for browsers that suspend on load)
   */
  async resume() {
    if (this.context && this.context.state === 'suspended') {
      await this.context.resume();
    }
    this.isReady = true;
    return this.isReady;
  }

  /**
   * Close and cleanup the AudioContext
   */
  close() {
    if (this.context) {
      this.context.close();
      this.context = null;
      this.isReady = false;
    }
  }

  /**
   * Get current time from AudioContext
   */
  get currentTime() {
    return this.context ? this.context.currentTime : 0;
  }

  /**
   * Play a bass note
   * @param {string} string - String name ('E', 'A', 'D', 'G')
   * @param {number} fret - Fret number
   * @param {number} time - Scheduled time
   * @param {boolean} muted - If true, skip playing
   */
  playSound(string, fret, time, muted = false) {
    if (!this.context || muted) return;

    const { note } = SOUND_CONFIG;
    const baseFreq = STRING_FREQUENCIES[string];
    const frequency = baseFreq * Math.pow(2, fret / 12);

    const osc = this.context.createOscillator();
    const gainNode = this.context.createGain();
    const filter = this.context.createBiquadFilter();

    // Oscillator setup
    osc.type = note.type;
    osc.frequency.setValueAtTime(frequency, time);

    // Low-pass filter for bass tone
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(note.filterFreq, time);

    // Envelope
    gainNode.gain.setValueAtTime(0, time);
    gainNode.gain.linearRampToValueAtTime(note.volume, time + note.attack);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + note.release);

    // Connect nodes
    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.context.destination);

    // Play
    osc.start(time);
    osc.stop(time + note.release + 0.1);
  }

  /**
   * Play metronome click
   * @param {number} time - Scheduled time
   * @param {boolean} isDownbeat - First beat of measure
   * @param {boolean} isFirstOfBeat - First triplet of beat
   * @param {boolean} enabled - If false, skip playing
   */
  playMetronomeClick(time, isDownbeat, isFirstOfBeat, enabled = true) {
    if (!this.context || !enabled) return;

    const { metronome } = SOUND_CONFIG;

    const osc = this.context.createOscillator();
    const gainNode = this.context.createGain();

    // Different pitches: downbeat > beat > triplet subdivisions
    osc.type = metronome.type;
    const frequency = isDownbeat && isFirstOfBeat 
      ? metronome.frequencies.downbeat 
      : isFirstOfBeat 
        ? metronome.frequencies.beat 
        : metronome.frequencies.triplet;
    osc.frequency.setValueAtTime(frequency, time);

    // Softer volume for triplet subdivisions
    const volume = isDownbeat && isFirstOfBeat 
      ? metronome.volumes.downbeat 
      : isFirstOfBeat 
        ? metronome.volumes.beat 
        : metronome.volumes.triplet;
    
    gainNode.gain.setValueAtTime(0, time);
    gainNode.gain.linearRampToValueAtTime(volume, time + metronome.attack);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + metronome.release);

    // Connect and play
    osc.connect(gainNode);
    gainNode.connect(this.context.destination);

    osc.start(time);
    osc.stop(time + metronome.duration);
  }

  /**
   * Play countdown beep
   * @param {boolean} isStart - Higher pitch for "GO!" beep
   */
  playCountdownBeep(isStart = false) {
    if (!this.context) return;

    const { countdown } = SOUND_CONFIG;
    const currentTime = this.context.currentTime;

    const osc = this.context.createOscillator();
    const gainNode = this.context.createGain();

    osc.type = countdown.type;
    osc.frequency.setValueAtTime(
      isStart ? countdown.startFrequency : countdown.frequency, 
      currentTime
    );

    gainNode.gain.setValueAtTime(0, currentTime);
    gainNode.gain.linearRampToValueAtTime(countdown.volume, currentTime + countdown.attack);
    gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + countdown.release);

    osc.connect(gainNode);
    gainNode.connect(this.context.destination);

    osc.start(currentTime);
    osc.stop(currentTime + countdown.duration);
  }
}

// Singleton instance
export const audioService = new AudioService();

export default AudioService;
