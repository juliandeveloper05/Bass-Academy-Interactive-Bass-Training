/**
 * Audio Service - Bass Trainer
 * Sample-based audio playback using Web Audio API
 * Loads and plays real audio samples instead of oscillators
 */

import { STRING_FREQUENCIES, SAMPLE_PATHS, SAMPLE_CONFIG } from '../config/audioConfig.js';

class AudioService {
  constructor() {
    this.context = null;
    this.isReady = false;
    
    // Audio buffers cache
    this.buffers = {
      bass: null,
      metronome: {
        click: null,
      },
    };
    
    this.samplesLoaded = false;
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
    
    // Load samples if not already loaded
    if (!this.samplesLoaded) {
      await this.loadSamples();
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
      this.samplesLoaded = false;
      this.buffers = { bass: null, metronome: { click: null } };
    }
  }

  /**
   * Get current time from AudioContext
   */
  get currentTime() {
    return this.context ? this.context.currentTime : 0;
  }

  /**
   * Load a single audio sample
   * @param {string} url - Path to the audio file
   * @returns {Promise<AudioBuffer|null>}
   */
  async loadSample(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.warn(`Failed to load sample: ${url}`);
        return null;
      }
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.context.decodeAudioData(arrayBuffer);
      return audioBuffer;
    } catch (error) {
      console.warn(`Error loading sample ${url}:`, error);
      return null;
    }
  }

  /**
   * Load all audio samples
   */
  async loadSamples() {
    if (!this.context) {
      console.warn('AudioContext not initialized');
      return;
    }

    console.log('🎵 Loading samples from:', SAMPLE_PATHS);

    try {
      // Load bass sample
      console.log('Loading bass sample:', SAMPLE_PATHS.bass);
      this.buffers.bass = await this.loadSample(SAMPLE_PATHS.bass);
      console.log('Bass sample loaded:', this.buffers.bass ? '✅ OK' : '❌ FAILED');
      
      // Load metronome click sample
      console.log('Loading metronome sample:', SAMPLE_PATHS.metronome.click);
      this.buffers.metronome.click = await this.loadSample(SAMPLE_PATHS.metronome.click);
      console.log('Metronome sample loaded:', this.buffers.metronome.click ? '✅ OK' : '❌ FAILED');
      
      this.samplesLoaded = true;
      console.log('🎵 All audio samples loaded successfully!');
    } catch (error) {
      console.error('❌ Error loading samples:', error);
    }
  }

  /**
   * Play a bass note using the loaded sample
   * @param {string} string - String name ('E', 'A', 'D', 'G')
   * @param {number} fret - Fret number
   * @param {number} time - Scheduled time
   * @param {boolean} muted - If true, skip playing
   * @param {number} volume - Volume level (0.0 - 1.0)
   */
  playSound(string, fret, time, muted = false, volume = 0.7) {
    if (!this.context || muted) return;

    // If sample is loaded, use it
    if (this.buffers.bass) {
      this.playSampleNote(string, fret, time, volume);
    } else {
      console.warn('⚠️ Bass sample not loaded, no sound will play');
    }
    // No fallback - samples are required
  }

  /**
   * Play bass sample with pitch adjustment
   * @param {string} string - String name
   * @param {number} fret - Fret number
   * @param {number} time - Scheduled time
   * @param {number} volume - Volume level (0.0 - 1.0)
   */
  playSampleNote(string, fret, time, volume = 0.7) {
    if (!this.buffers.bass) return;

    const { bass: bassConfig } = SAMPLE_CONFIG;
    
    // Calculate target frequency
    const baseFreq = STRING_FREQUENCIES[string];
    const targetFreq = baseFreq * Math.pow(2, fret / 12);
    
    // Calculate playback rate based on sample's base frequency
    // This shifts the pitch of the sample
    const playbackRate = targetFreq / bassConfig.baseFrequency;

    // Create buffer source
    const source = this.context.createBufferSource();
    source.buffer = this.buffers.bass;
    source.playbackRate.setValueAtTime(playbackRate, time);

    // Create gain node for volume - use provided volume parameter
    const gainNode = this.context.createGain();
    gainNode.gain.setValueAtTime(volume, time);
    
    // Envelope for natural decay
    gainNode.gain.linearRampToValueAtTime(volume, time + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.5);

    // Connect nodes
    source.connect(gainNode);
    gainNode.connect(this.context.destination);

    // Play
    source.start(time);
    source.stop(time + 0.6);
  }

  /**
   * Play metronome click
   * @param {number} time - Scheduled time
   * @param {boolean} isDownbeat - First beat of measure
   * @param {boolean} isFirstOfBeat - First triplet of beat
   * @param {boolean} enabled - If false, skip playing
   * @param {number} masterVolume - Master volume level (0.0 - 1.0)
   */
  playMetronomeClick(time, isDownbeat, isFirstOfBeat, enabled = true, masterVolume = 0.5) {
    if (!this.context || !enabled) return;

    // If sample is loaded, use it
    if (this.buffers.metronome.click) {
      this.playSampleMetronome(time, isDownbeat, isFirstOfBeat, masterVolume);
    }
    // No fallback - samples are required
  }

  /**
   * Play metronome sample with volume adjustment
   * @param {number} time - Scheduled time
   * @param {boolean} isDownbeat - Is downbeat
   * @param {boolean} isFirstOfBeat - First triplet of beat
   * @param {number} masterVolume - Master volume level (0.0 - 1.0)
   */
  playSampleMetronome(time, isDownbeat, isFirstOfBeat, masterVolume = 0.5) {
    if (!this.buffers.metronome.click) return;

    const { metronome: metroConfig } = SAMPLE_CONFIG;

    // Create buffer source
    const source = this.context.createBufferSource();
    source.buffer = this.buffers.metronome.click;

    // Adjust volume based on beat type and master volume
    const beatMultiplier = isDownbeat && isFirstOfBeat 
      ? 1.4  // Downbeat louder
      : isFirstOfBeat 
        ? 1.0  // Normal beat
        : 0.5; // Triplet softer
    
    const volume = masterVolume * beatMultiplier;

    // Create gain node
    const gainNode = this.context.createGain();
    gainNode.gain.setValueAtTime(volume, time);

    // Connect and play
    source.connect(gainNode);
    gainNode.connect(this.context.destination);

    source.start(time);
  }

  /**
   * Play countdown beep (still uses oscillator for simplicity)
   * @param {boolean} isStart - Higher pitch for "GO!" beep
   */
  playCountdownBeep(isStart = false) {
    if (!this.context) return;

    const currentTime = this.context.currentTime;

    const osc = this.context.createOscillator();
    const gainNode = this.context.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(isStart ? 880 : 440, currentTime);

    gainNode.gain.setValueAtTime(0, currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.15);

    osc.connect(gainNode);
    gainNode.connect(this.context.destination);

    osc.start(currentTime);
    osc.stop(currentTime + 0.2);
  }
}

// Singleton instance
export const audioService = new AudioService();

export default AudioService;
