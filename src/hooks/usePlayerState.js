/**
 * usePlayerState Hook - Bass Trainer
 * Wraps playerReducer with FSM-aware actions
 */

import { useReducer, useCallback } from 'react';
import { 
  playerReducer, 
  initialPlayerState, 
  PLAYER_ACTIONS,
  PlayerStates,
  PlayerEvents,
  isPlaying as checkIsPlaying,
  isCountingDown as checkIsCountingDown,
  isPaused as checkIsPaused,
  isIdle as checkIsIdle,
} from '../reducers/playerReducer.js';

export function usePlayerState() {
  const [state, dispatch] = useReducer(playerReducer, initialPlayerState);
  
  // FSM transition helper
  const transition = useCallback((event) => {
    dispatch({ type: PLAYER_ACTIONS.TRANSITION, payload: { event } });
  }, []);
  
  // Action dispatchers
  const actions = {
    // FSM-based actions
    play: useCallback(() => {
      transition(PlayerEvents.PLAY);
    }, [transition]),
    
    playImmediate: useCallback(() => {
      transition(PlayerEvents.PLAY_IMMEDIATE);
    }, [transition]),
    
    stop: useCallback(() => {
      transition(PlayerEvents.STOP);
    }, [transition]),
    
    pause: useCallback(() => {
      transition(PlayerEvents.PAUSE);
    }, [transition]),
    
    resume: useCallback(() => {
      transition(PlayerEvents.RESUME);
    }, [transition]),
    
    countdownTick: useCallback(() => {
      dispatch({ 
        type: PLAYER_ACTIONS.SET_COUNTDOWN, 
        payload: state.countdown - 1 
      });
    }, [state.countdown]),
    
    countdownComplete: useCallback(() => {
      transition(PlayerEvents.COUNTDOWN_COMPLETE);
    }, [transition]),
    
    // Note updates
    updateNote: useCallback((index) => {
      dispatch({ type: PLAYER_ACTIONS.UPDATE_NOTE, payload: { index } });
    }, []),
    
    resetNote: useCallback(() => {
      dispatch({ type: PLAYER_ACTIONS.RESET_NOTE });
    }, []),
    
    // Settings
    setTempo: useCallback((tempo) => {
      dispatch({ type: PLAYER_ACTIONS.SET_TEMPO, payload: tempo });
    }, []),
    
    toggleLoop: useCallback(() => {
      dispatch({ type: PLAYER_ACTIONS.TOGGLE_LOOP });
    }, []),
    
    toggleMetronome: useCallback(() => {
      dispatch({ type: PLAYER_ACTIONS.TOGGLE_METRONOME });
    }, []),
    
    toggleNotesMuted: useCallback(() => {
      dispatch({ type: PLAYER_ACTIONS.TOGGLE_NOTES_MUTED });
    }, []),
    
    toggleCountdown: useCallback(() => {
      dispatch({ type: PLAYER_ACTIONS.TOGGLE_COUNTDOWN });
    }, []),
    
    // Audio
    setAudioReady: useCallback((ready) => {
      dispatch({ type: PLAYER_ACTIONS.SET_AUDIO_READY, payload: ready });
    }, []),
    
    // Volume
    setBassVolume: useCallback((volume) => {
      dispatch({ type: PLAYER_ACTIONS.SET_BASS_VOLUME, payload: volume });
    }, []),
    
    setMetronomeVolume: useCallback((volume) => {
      dispatch({ type: PLAYER_ACTIONS.SET_METRONOME_VOLUME, payload: volume });
    }, []),
  };
  
  // Derived state (computed from FSM state)
  const derived = {
    isPlaying: checkIsPlaying(state),
    isCountingDown: checkIsCountingDown(state),
    isPaused: checkIsPaused(state),
    isIdle: checkIsIdle(state),
  };
  
  return { 
    state: { ...state, ...derived }, 
    actions, 
    dispatch,
    PlayerStates,
    PlayerEvents,
  };
}

export default usePlayerState;
