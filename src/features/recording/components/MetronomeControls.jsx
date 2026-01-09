/**
 * MetronomeControls - UI controls for recording metronome
 * Compact control panel for tempo, time signature, and visual feedback
 * 
 * @module MetronomeControls
 */

import React from 'react';

// ============================================
// ICONS
// ============================================

const MetronomeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1.75l-5.85 17.1h11.7L12 1.75zm0 5.5l2.85 8.35h-5.7L12 7.25zM5 21.75h14v1.5H5v-1.5z"/>
  </svg>
);

// ============================================
// COMPONENT: MetronomeControls
// ============================================

/**
 * Metronome control panel for recording
 * 
 * @param {Object} props
 * @param {boolean} props.isEnabled - Metronome enabled state
 * @param {Function} props.onToggle - Toggle enable handler
 * @param {number} props.tempo - Current tempo
 * @param {Function} props.onTempoChange - Tempo change handler
 * @param {number} props.timeSignature - Beats per bar
 * @param {Function} props.onTimeSignatureChange - Time signature change handler
 * @param {boolean} props.isPlaying - Metronome is playing
 * @param {boolean} props.isPreRoll - In pre-roll countdown
 * @param {number} props.currentBeat - Current beat number (1-based)
 * @param {number} props.preRollBeat - Pre-roll beat count
 * @param {number} props.preRollTotal - Total pre-roll beats
 * @param {boolean} props.disabled - Disable all controls
 * @param {string} props.variant - 'compact' | 'full'
 */
const MetronomeControls = ({
  isEnabled = true,
  onToggle = () => {},
  tempo = 100,
  onTempoChange = () => {},
  timeSignature = 4,
  onTimeSignatureChange = () => {},
  isPlaying = false,
  isPreRoll = false,
  currentBeat = 0,
  preRollBeat = 0,
  preRollTotal = 4,
  disabled = false,
  variant = 'full',
}) => {
  // Time signature options
  const timeSignatures = [2, 3, 4, 5, 6, 7, 8];
  
  // ============================================
  // RENDER: COMPACT VARIANT
  // ============================================
  
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-3">
        {/* Toggle */}
        <button
          onClick={onToggle}
          disabled={disabled}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
            isEnabled
              ? 'bg-[#C9A554]/20 text-[#C9A554] border border-[#C9A554]/50'
              : 'bg-white/5 text-white/50 border border-white/10'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'}`}
        >
          <MetronomeIcon className="w-4 h-4" />
          <span className="text-sm font-medium">{tempo}</span>
        </button>
        
        {/* Beat Indicator */}
        {isPlaying && (
          <div className="flex items-center gap-1">
            {[...Array(timeSignature)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-75 ${
                  currentBeat === i + 1
                    ? 'bg-[#C9A554] scale-125'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
  
  // ============================================
  // RENDER: FULL VARIANT
  // ============================================
  
  return (
    <div className={`p-4 rounded-xl border transition-all ${
      isEnabled 
        ? 'bg-[#C9A554]/10 border-[#C9A554]/30' 
        : 'bg-white/5 border-white/10'
    } ${disabled ? 'opacity-50' : ''}`}>
      {/* Header with Toggle */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <MetronomeIcon className={`w-5 h-5 ${isEnabled ? 'text-[#C9A554]' : 'text-white/50'}`} />
          <span className={`text-sm font-medium ${isEnabled ? 'text-white' : 'text-white/50'}`}>
            Metronome
          </span>
        </div>
        
        {/* Toggle Switch */}
        <button
          onClick={onToggle}
          disabled={disabled}
          className={`relative w-12 h-6 rounded-full transition-all ${
            isEnabled ? 'bg-[#C9A554]' : 'bg-white/20'
          } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
            isEnabled ? 'left-7' : 'left-1'
          }`} />
        </button>
      </div>
      
      {isEnabled && (
        <>
          {/* Tempo Control */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-white/50">BPM</label>
              <input
                type="number"
                value={tempo}
                onChange={(e) => onTempoChange(parseInt(e.target.value) || 60)}
                min="40"
                max="300"
                disabled={disabled || isPlaying}
                className="w-16 px-2 py-1 bg-white/10 border border-white/20 rounded text-center text-sm text-white font-mono focus:outline-none focus:border-[#C9A554] disabled:opacity-50"
              />
            </div>
            <input
              type="range"
              value={tempo}
              onChange={(e) => onTempoChange(parseInt(e.target.value))}
              min="40"
              max="240"
              disabled={disabled || isPlaying}
              className="w-full h-2 appearance-none bg-white/10 rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#C9A554] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#C9A554] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
            />
            <div className="flex justify-between text-xs text-white/30 mt-1">
              <span>40</span>
              <span>240</span>
            </div>
          </div>
          
          {/* Time Signature */}
          <div className="flex items-center justify-between mb-4">
            <label className="text-xs text-white/50">Time Signature</label>
            <div className="flex items-center gap-1">
              {timeSignatures.slice(0, 4).map((ts) => (
                <button
                  key={ts}
                  onClick={() => onTimeSignatureChange(ts)}
                  disabled={disabled || isPlaying}
                  className={`w-8 h-8 text-xs rounded transition-all ${
                    timeSignature === ts
                      ? 'bg-[#C9A554] text-[#0D1B2A] font-bold'
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {ts}/4
                </button>
              ))}
            </div>
          </div>
          
          {/* Beat Indicator */}
          <div className="flex items-center justify-center gap-2 py-3 bg-white/5 rounded-lg">
            {isPreRoll ? (
              // Pre-roll countdown
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-[#C9A554] animate-pulse">
                  {preRollBeat || timeSignature}
                </span>
                <span className="text-sm text-white/50">Get ready...</span>
              </div>
            ) : isPlaying ? (
              // Beat visualization
              <>
                {[...Array(timeSignature)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-full transition-all duration-75 ${
                      currentBeat === i + 1
                        ? i === 0 
                          ? 'bg-[#C9A554] scale-125 shadow-lg shadow-[#C9A554]/50' 
                          : 'bg-green-500 scale-110'
                        : 'bg-white/20'
                    }`}
                  />
                ))}
              </>
            ) : (
              // Idle state
              <span className="text-sm text-white/40">
                Ready • {tempo} BPM
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MetronomeControls;
