/**
 * LoopNote Component - Loop Mode
 * Individual note with micro-animations for attack, sustain, fade
 * Three-phase lifecycle: attack → sustain → fade
 */

import React, { useState, useEffect, useRef } from 'react';
import { LOOP_MODE_CONFIG } from '../../config/uiConfig.js';

/**
 * Animation phases for note lifecycle
 */
const ANIMATION_PHASES = {
  IDLE: 'idle',
  ATTACK: 'attack',
  SUSTAIN: 'sustain',
  FADE: 'fade',
};

// Timing constants (ms)
const ATTACK_DURATION = 150;
const SUSTAIN_MIN_DURATION = 200;

/**
 * @param {Object} props
 * @param {Object} props.note - Note data { beat, pitch, technique, velocity }
 * @param {boolean} props.isActive - Whether this note is currently being played
 * @param {boolean} props.isPast - Whether playhead has passed this note
 * @param {number} props.positionX - X position as percentage (0-100)
 * @param {number} props.positionY - Y position (staff line index)
 * @param {boolean} props.swingEnabled - Whether swing is enabled (for visual offset)
 * @param {number} props.noteIndex - Index of note for swing alternation
 */
export default function LoopNote({ 
  note, 
  isActive = false, 
  isPast = false,
  positionX = 0,
  positionY = 2,
  swingEnabled = false,
  noteIndex = 0,
}) {
  const [phase, setPhase] = useState(ANIMATION_PHASES.IDLE);
  const wasActiveRef = useRef(false);
  const phaseTimeoutRef = useRef(null);

  const isGhost = note?.technique === 'ghost';
  const isAccent = note?.velocity > 0.8;
  
  // Handle animation phase transitions
  useEffect(() => {
    // Clear any pending transitions
    if (phaseTimeoutRef.current) {
      clearTimeout(phaseTimeoutRef.current);
      phaseTimeoutRef.current = null;
    }

    if (isActive && !wasActiveRef.current) {
      // Note just became active → Attack phase
      setPhase(ANIMATION_PHASES.ATTACK);
      
      // Transition to Sustain after attack completes
      phaseTimeoutRef.current = setTimeout(() => {
        setPhase(ANIMATION_PHASES.SUSTAIN);
      }, ATTACK_DURATION);
      
    } else if (!isActive && wasActiveRef.current) {
      // Note was active, now it's not → Fade phase
      setPhase(ANIMATION_PHASES.FADE);
      
    } else if (!isActive && isPast) {
      // Already past, stay in fade if not already
      if (phase !== ANIMATION_PHASES.FADE) {
        setPhase(ANIMATION_PHASES.FADE);
      }
    } else if (!isActive && !isPast) {
      // Reset to idle when loop restarts
      setPhase(ANIMATION_PHASES.IDLE);
    }

    wasActiveRef.current = isActive;

    return () => {
      if (phaseTimeoutRef.current) {
        clearTimeout(phaseTimeoutRef.current);
      }
    };
  }, [isActive, isPast, phase]);
  
  // Base size and styles
  const baseSize = 'w-4 h-4';
  const ghostOpacity = isGhost ? LOOP_MODE_CONFIG.ghostNoteOpacity : 1;
  
  // Animation classes based on phase
  const getPhaseClasses = () => {
    switch (phase) {
      case ANIMATION_PHASES.ATTACK:
        return 'animate-loop-attack bg-[var(--color-gold)]';
      case ANIMATION_PHASES.SUSTAIN:
        return 'animate-loop-sustain bg-[var(--color-gold)]';
      case ANIMATION_PHASES.FADE:
        return 'animate-loop-fade bg-[var(--color-primary-light)]';
      case ANIMATION_PHASES.IDLE:
      default:
        return 'bg-[var(--color-cream)]';
    }
  };
  
  const accentScale = isAccent && !isGhost ? 'scale-105' : '';
  const swingClass = swingEnabled && noteIndex % 2 === 1 ? 'loop-note-swing' : '';

  return (
    <div
      className={`
        absolute ${baseSize} rounded-full 
        transition-colors duration-100 ease-out
        ${getPhaseClasses()} ${accentScale} ${swingClass}
      `}
      style={{
        left: `${positionX}%`,
        top: `${positionY * 20}%`,
        opacity: phase === ANIMATION_PHASES.IDLE ? ghostOpacity : undefined,
        transform: isAccent && phase === ANIMATION_PHASES.SUSTAIN 
          ? `scale(${LOOP_MODE_CONFIG.accentScale})` 
          : undefined,
      }}
      aria-label={`Note ${note?.pitch || ''} ${isActive ? 'playing' : ''}`}
    >
      {/* Inner dot for visual depth */}
      <div 
        className={`
          absolute inset-1 rounded-full 
          ${phase === ANIMATION_PHASES.ATTACK || phase === ANIMATION_PHASES.SUSTAIN 
            ? 'bg-[var(--color-gold-light)]' 
            : 'bg-[var(--color-primary-medium)]'
          }
        `}
        style={{ opacity: isGhost ? 0.5 : 0.3 }}
      />
    </div>
  );
}
