/**
 * Player State Machine - Bass Trainer
 * Finite state machine for predictable player state transitions
 */

// Player states
export const PlayerStates = {
  IDLE: 'idle',
  COUNTDOWN: 'countdown',
  PLAYING: 'playing',
  PAUSED: 'paused',
};

// Events that trigger transitions
export const PlayerEvents = {
  PLAY: 'PLAY',
  PLAY_IMMEDIATE: 'PLAY_IMMEDIATE',
  PAUSE: 'PAUSE',
  RESUME: 'RESUME',
  STOP: 'STOP',
  COUNTDOWN_TICK: 'COUNTDOWN_TICK',
  COUNTDOWN_COMPLETE: 'COUNTDOWN_COMPLETE',
};

// State transition table
const transitions = {
  [PlayerStates.IDLE]: {
    [PlayerEvents.PLAY]: PlayerStates.COUNTDOWN,
    [PlayerEvents.PLAY_IMMEDIATE]: PlayerStates.PLAYING,
  },
  [PlayerStates.COUNTDOWN]: {
    [PlayerEvents.STOP]: PlayerStates.IDLE,
    [PlayerEvents.COUNTDOWN_TICK]: PlayerStates.COUNTDOWN, // Stay in countdown
    [PlayerEvents.COUNTDOWN_COMPLETE]: PlayerStates.PLAYING,
  },
  [PlayerStates.PLAYING]: {
    [PlayerEvents.STOP]: PlayerStates.IDLE,
    [PlayerEvents.PAUSE]: PlayerStates.PAUSED,
  },
  [PlayerStates.PAUSED]: {
    [PlayerEvents.RESUME]: PlayerStates.PLAYING,
    [PlayerEvents.STOP]: PlayerStates.IDLE,
  },
};

/**
 * Get next state based on current state and event
 * @param {string} currentState - Current player state
 * @param {string} event - Event to process
 * @returns {string|null} - Next state or null if transition not allowed
 */
export function getNextState(currentState, event) {
  const stateTransitions = transitions[currentState];
  if (!stateTransitions) {
    console.warn(`Unknown state: ${currentState}`);
    return null;
  }
  
  const nextState = stateTransitions[event];
  if (!nextState) {
    // Transition not allowed from this state
    return null;
  }
  
  return nextState;
}

/**
 * Check if a transition is valid
 * @param {string} currentState 
 * @param {string} event 
 * @returns {boolean}
 */
export function canTransition(currentState, event) {
  return getNextState(currentState, event) !== null;
}

/**
 * Get available events for current state
 * @param {string} currentState 
 * @returns {string[]}
 */
export function getAvailableEvents(currentState) {
  const stateTransitions = transitions[currentState];
  if (!stateTransitions) return [];
  return Object.keys(stateTransitions);
}

/**
 * Create a state machine instance
 */
export function createPlayerStateMachine(initialState = PlayerStates.IDLE) {
  let currentState = initialState;
  const listeners = new Set();
  
  return {
    getState: () => currentState,
    
    send: (event) => {
      const nextState = getNextState(currentState, event);
      if (nextState) {
        const prevState = currentState;
        currentState = nextState;
        // Notify listeners
        listeners.forEach(fn => fn({ prevState, event, nextState }));
        return true;
      }
      return false;
    },
    
    canSend: (event) => canTransition(currentState, event),
    
    subscribe: (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    
    reset: () => {
      currentState = initialState;
    },
  };
}

export default {
  PlayerStates,
  PlayerEvents,
  getNextState,
  canTransition,
  getAvailableEvents,
  createPlayerStateMachine,
};
