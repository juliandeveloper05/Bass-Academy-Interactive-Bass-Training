/**
 * BeatIndicator Component - Bass Trainer
 * Shows 4 beat circles with triplet subdivision dots
 */

import React from 'react';
import { RHYTHM_CONFIG } from '../../config/uiConfig.js';

function BeatIndicator({ currentBeat, currentTriplet }) {
  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3">
      <span className="text-[var(--color-primary-light)] text-xs sm:text-sm uppercase tracking-wider font-medium">
        Beat
      </span>
      <div className="flex gap-3 sm:gap-4">
        {Array.from({ length: RHYTHM_CONFIG.beatsPerMeasure }, (_, beat) => (
          <div key={beat} className="flex flex-col items-center gap-1 sm:gap-2">
            {/* Beat Number Circle */}
            <div
              className={`
                w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center
                font-mono font-bold text-base sm:text-lg transition-all duration-150
                ${
                  currentBeat === beat
                    ? "bg-[var(--color-gold)] text-[var(--color-primary-deep)] scale-110"
                    : "bg-[var(--color-primary-dark)] text-[var(--color-primary-light)] border border-[var(--color-primary-medium)]"
                }
              `}
              style={{
                boxShadow: currentBeat === beat 
                  ? "0 0 20px var(--color-gold), 0 0 40px rgba(201, 165, 84, 0.3)" 
                  : "none"
              }}
            >
              {beat + 1}
            </div>
            
            {/* Triplet Subdivision Dots */}
            <div className="flex gap-1">
              {Array.from({ length: RHYTHM_CONFIG.tripletsPerBeat }, (_, triplet) => (
                <div
                  key={triplet}
                  className={`
                    w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-100
                    ${
                      currentBeat === beat && currentTriplet === triplet
                        ? "bg-[var(--color-active)] scale-125"
                        : currentBeat === beat
                          ? "bg-[var(--color-gold)]/40"
                          : "bg-[var(--color-primary-medium)]/50"
                    }
                  `}
                  style={{
                    boxShadow: currentBeat === beat && currentTriplet === triplet
                      ? "0 0 8px var(--color-active-glow)"
                      : "none"
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Triplet Count Label */}
      <div className="font-mono text-xs text-[var(--color-primary-light)]">
        {currentTriplet >= 0 && currentBeat >= 0 ? (
          <span>
            <span className="text-[var(--color-gold)]">{currentBeat + 1}</span>
            <span className="text-[var(--color-active)]">
              {currentTriplet === 0 ? "" : currentTriplet === 1 ? " & " : " a "}
            </span>
          </span>
        ) : (
          <span className="opacity-50">triplets</span>
        )}
      </div>
    </div>
  );
}

export default BeatIndicator;
