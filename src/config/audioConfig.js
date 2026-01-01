/**
 * Audio Configuration - Bass Trainer
 * Centralized audio constants
 */

// Bass string frequencies (Hz)
export const STRING_FREQUENCIES = {
  G: 98.0,
  D: 73.42,
  A: 55.0,
  E: 41.2,
};

// String order for rendering
export const STRING_ORDER = ['G', 'D', 'A', 'E'];

// Scheduler settings
export const LOOK_AHEAD = 0.1; // 100ms lookahead for scheduling

// Tempo settings
export const TEMPO_CONFIG = {
  default: 100,
  min: 40,
  max: 160,
  step: 5,
};

// Sound synthesis settings
export const SOUND_CONFIG = {
  // Bass note settings
  note: {
    type: 'sawtooth',
    filterFreq: 600,
    attack: 0.05,
    release: 0.5,
    volume: 0.5,
  },
  // Metronome click settings
  metronome: {
    type: 'sine',
    frequencies: {
      downbeat: 1000,
      beat: 800,
      triplet: 600,
    },
    volumes: {
      downbeat: 0.4,
      beat: 0.25,
      triplet: 0.15,
    },
    attack: 0.01,
    release: 0.06,
    duration: 0.08,
  },
  // Countdown beep settings
  countdown: {
    type: 'sine',
    frequency: 440,
    startFrequency: 880,
    attack: 0.02,
    release: 0.15,
    volume: 0.3,
    duration: 0.2,
  },
};
