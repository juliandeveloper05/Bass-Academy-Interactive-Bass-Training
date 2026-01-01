/**
 * useAudioEngine Hook - Bass Trainer
 * Hook to consume audio engine context
 */

import { useContext } from 'react';
import AudioEngineContext from '../contexts/AudioEngineContext.jsx';

export function useAudioEngine() {
  const context = useContext(AudioEngineContext);
  if (!context) {
    throw new Error('useAudioEngine must be used within an AudioEngineProvider');
  }
  return context;
}

export default useAudioEngine;
