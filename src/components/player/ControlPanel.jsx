/**
 * ControlPanel Component - Bass Trainer
 * Wrapper component composing BeatIndicator, PlaybackControls, and TempoControl
 */

import React from 'react';
import BeatIndicator from './BeatIndicator.jsx';
import PlaybackControls from './PlaybackControls.jsx';
import TempoControl from './TempoControl.jsx';

function ControlPanel({
  // Beat state
  currentBeat,
  currentTriplet,
  // Playback
  isPlaying,
  handlePlay,
  handleStop,
  // Settings
  isLooping,
  toggleLoop,
  isNotesMuted,
  toggleNotesMuted,
  isMetronomeEnabled,
  toggleMetronome,
  isCountdownEnabled,
  toggleCountdown,
  tempo,
  setTempo,
}) {
  return (
    <div 
      className="glass-strong rounded-xl sm:rounded-2xl p-3 sm:p-6 animate-fadeInUp" 
      style={{animationDelay: "0.3s"}}
    >
      <div className="flex flex-col gap-4 sm:gap-6">
        {/* Beat Indicator */}
        <BeatIndicator 
          currentBeat={currentBeat} 
          currentTriplet={currentTriplet} 
        />

        {/* Playback Controls */}
        <PlaybackControls
          isPlaying={isPlaying}
          handlePlay={handlePlay}
          handleStop={handleStop}
          isLooping={isLooping}
          toggleLoop={toggleLoop}
          isNotesMuted={isNotesMuted}
          toggleNotesMuted={toggleNotesMuted}
          isMetronomeEnabled={isMetronomeEnabled}
          toggleMetronome={toggleMetronome}
          isCountdownEnabled={isCountdownEnabled}
          toggleCountdown={toggleCountdown}
        />

        {/* Tempo Control */}
        <TempoControl 
          tempo={tempo} 
          setTempo={setTempo} 
        />
      </div>
    </div>
  );
}

export default ControlPanel;
