/**
 * Audio Engine Context - Bass Trainer
 * Provides audio engine and scheduler globally via Context API
 */

import React, { createContext, useMemo } from 'react';
import { useBassAudio } from '../hooks/useBassAudio.js';
import { useAudioScheduler } from '../hooks/useAudioScheduler.js';

const AudioEngineContext = createContext(null);

/**
 * Audio Engine Provider
 * Wraps the app and provides audio functionality to all children
 */
export function AudioEngineProvider({ children, notes, playerState, actions }) {
  const audio = useBassAudio();
  
  const scheduler = useAudioScheduler({
    audio,
    notes,
    playerState,
    actions,
  });
  
  const value = useMemo(() => ({
    audio,
    scheduler,
  }), [audio, scheduler]);
  
  return (
    <AudioEngineContext.Provider value={value}>
      {children}
    </AudioEngineContext.Provider>
  );
}

export default AudioEngineContext;
