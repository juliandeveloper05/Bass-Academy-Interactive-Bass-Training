/**
 * Player Reducer - Bass Trainer
 * Centralized state management for player with FSM integration
 */

import { RHYTHM_CONFIG, COUNTDOWN_CONFIG } from '../config/uiConfig.js';
import { PlayerStates, PlayerEvents, getNextState } from '../machines/playerStateMachine.js';

// Initial state
export const initialPlayerState = {
  // Player state machine state
  playerStatus: PlayerStates.IDLE,
  
  // Countdown
  countdown: 0,
  
  // Note tracking
  currentNoteIndex: -1,
  currentBeat: -1,
  currentTriplet: -1,
  currentMeasure: 0,
  
  // Settings
  tempo: 100,
  isLooping: true,
  isMetronomeEnabled: false,
  isNotesMuted: false,
  isCountdownEnabled: true,
  
  // Volume controls (0.0 - 1.0)
  bassVolume: 0.7,
  metronomeVolume: 0.5,
  
  // Audio state
  isAudioReady: false,
};

// Action types
export const PLAYER_ACTIONS = {
  // State machine transitions
  TRANSITION: 'TRANSITION',
  
  // Countdown
  SET_COUNTDOWN: 'SET_COUNTDOWN',
  
  // Note updates
  UPDATE_NOTE: 'UPDATE_NOTE',
  RESET_NOTE: 'RESET_NOTE',
  
  // Settings
  SET_TEMPO: 'SET_TEMPO',
  TOGGLE_LOOP: 'TOGGLE_LOOP',
  TOGGLE_METRONOME: 'TOGGLE_METRONOME',
  TOGGLE_NOTES_MUTED: 'TOGGLE_NOTES_MUTED',
  TOGGLE_COUNTDOWN: 'TOGGLE_COUNTDOWN',
  
  // Volume
  SET_BASS_VOLUME: 'SET_BASS_VOLUME',
  SET_METRONOME_VOLUME: 'SET_METRONOME_VOLUME',
  
  // Audio
  SET_AUDIO_READY: 'SET_AUDIO_READY',
};

/**
 * Player reducer function
 */
export function playerReducer(state, action) {
  switch (action.type) {
    // State machine transition
    case PLAYER_ACTIONS.TRANSITION: {
      const { event } = action.payload;
      const nextStatus = getNextState(state.playerStatus, event);
      
      if (!nextStatus) {
        // Invalid transition, ignore
        console.warn(`Invalid transition: ${state.playerStatus} + ${event}`);
        return state;
      }
      
      // Handle side effects based on new state
      let updates = { playerStatus: nextStatus };
      
      if (nextStatus === PlayerStates.COUNTDOWN) {
        updates.countdown = COUNTDOWN_CONFIG.duration;
      } else if (nextStatus === PlayerStates.PLAYING && state.playerStatus === PlayerStates.COUNTDOWN) {
        updates.countdown = 0;
      } else if (nextStatus === PlayerStates.IDLE) {
        updates = {
          ...updates,
          countdown: 0,
          currentNoteIndex: -1,
          currentBeat: -1,
          currentTriplet: -1,
          currentMeasure: 0,
        };
      }
      
      return { ...state, ...updates };
    }
    
    // Countdown
    case PLAYER_ACTIONS.SET_COUNTDOWN:
      return { ...state, countdown: action.payload };
    
    // Note updates
    case PLAYER_ACTIONS.UPDATE_NOTE: {
      const { index } = action.payload;
      const tripletInBeat = index % RHYTHM_CONFIG.tripletsPerBeat;
      const beat = Math.floor(index / RHYTHM_CONFIG.tripletsPerBeat) % RHYTHM_CONFIG.beatsPerMeasure;
      const measure = Math.floor(index / RHYTHM_CONFIG.notesPerMeasure) + 1;
      const isFirstNoteOfBeat = tripletInBeat === 0;
      
      return {
        ...state,
        currentNoteIndex: index,
        currentTriplet: tripletInBeat,
        currentMeasure: measure,
        currentBeat: isFirstNoteOfBeat ? beat : state.currentBeat,
      };
    }
    
    case PLAYER_ACTIONS.RESET_NOTE:
      return {
        ...state,
        currentNoteIndex: -1,
        currentBeat: -1,
        currentTriplet: -1,
        currentMeasure: 0,
      };
    
    // Settings
    case PLAYER_ACTIONS.SET_TEMPO:
      return { ...state, tempo: action.payload };
      
    case PLAYER_ACTIONS.TOGGLE_LOOP:
      return { ...state, isLooping: !state.isLooping };
      
    case PLAYER_ACTIONS.TOGGLE_METRONOME:
      return { ...state, isMetronomeEnabled: !state.isMetronomeEnabled };
      
    case PLAYER_ACTIONS.TOGGLE_NOTES_MUTED:
      return { ...state, isNotesMuted: !state.isNotesMuted };
      
    case PLAYER_ACTIONS.TOGGLE_COUNTDOWN:
      return { ...state, isCountdownEnabled: !state.isCountdownEnabled };
    
    // Audio
    case PLAYER_ACTIONS.SET_AUDIO_READY:
      return { ...state, isAudioReady: action.payload };
    
    // Volume
    case PLAYER_ACTIONS.SET_BASS_VOLUME:
      return { ...state, bassVolume: action.payload };
      
    case PLAYER_ACTIONS.SET_METRONOME_VOLUME:
      return { ...state, metronomeVolume: action.payload };
      
    default:
      return state;
  }
}

// Derived state helpers
export function isPlaying(state) {
  return state.playerStatus === PlayerStates.PLAYING;
}

export function isCountingDown(state) {
  return state.playerStatus === PlayerStates.COUNTDOWN;
}

export function isPaused(state) {
  return state.playerStatus === PlayerStates.PAUSED;
}

export function isIdle(state) {
  return state.playerStatus === PlayerStates.IDLE;
}

export { PlayerStates, PlayerEvents };
