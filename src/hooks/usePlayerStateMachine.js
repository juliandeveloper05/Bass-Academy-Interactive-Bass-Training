/**
 * usePlayerStateMachine Hook - Bass Trainer
 * React hook for using the player state machine
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { 
  PlayerStates, 
  PlayerEvents, 
  createPlayerStateMachine,
  canTransition 
} from '../machines/playerStateMachine.js';

export function usePlayerStateMachine(initialState = PlayerStates.IDLE) {
  const machineRef = useRef(null);
  const [state, setState] = useState(initialState);
  
  // Initialize machine once
  if (!machineRef.current) {
    machineRef.current = createPlayerStateMachine(initialState);
  }
  
  // Subscribe to state changes
  useEffect(() => {
    const machine = machineRef.current;
    const unsubscribe = machine.subscribe(({ nextState }) => {
      setState(nextState);
    });
    return unsubscribe;
  }, []);
  
  // Send event to machine
  const send = useCallback((event) => {
    return machineRef.current.send(event);
  }, []);
  
  // Check if event can be sent
  const canSend = useCallback((event) => {
    return machineRef.current.canSend(event);
  }, []);
  
  // Reset machine
  const reset = useCallback(() => {
    machineRef.current.reset();
    setState(initialState);
  }, [initialState]);
  
  // Convenience state checks
  const isIdle = state === PlayerStates.IDLE;
  const isCountingDown = state === PlayerStates.COUNTDOWN;
  const isPlaying = state === PlayerStates.PLAYING;
  const isPaused = state === PlayerStates.PAUSED;
  
  // Convenience actions
  const actions = {
    play: useCallback(() => send(PlayerEvents.PLAY), [send]),
    playImmediate: useCallback(() => send(PlayerEvents.PLAY_IMMEDIATE), [send]),
    pause: useCallback(() => send(PlayerEvents.PAUSE), [send]),
    resume: useCallback(() => send(PlayerEvents.RESUME), [send]),
    stop: useCallback(() => send(PlayerEvents.STOP), [send]),
    countdownTick: useCallback(() => send(PlayerEvents.COUNTDOWN_TICK), [send]),
    countdownComplete: useCallback(() => send(PlayerEvents.COUNTDOWN_COMPLETE), [send]),
  };
  
  return {
    state,
    send,
    canSend,
    reset,
    isIdle,
    isCountingDown,
    isPlaying,
    isPaused,
    actions,
    PlayerStates,
    PlayerEvents,
  };
}

export { PlayerStates, PlayerEvents };
export default usePlayerStateMachine;
