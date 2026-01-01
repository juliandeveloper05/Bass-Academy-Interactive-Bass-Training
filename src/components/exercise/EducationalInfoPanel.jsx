/**
 * Educational Info Panel Component - Bass Trainer
 * Shows technique, chord, and objective information
 */

import React from 'react';
import { BookOpen, Zap, Target } from 'lucide-react';
import { PATTERNS, formatNoteName } from '../../data/exerciseLibrary.js';

function EducationalInfoPanel({ selectedRoot, selectedPattern, secondRoot, secondPattern }) {
  return (
    <div className="hidden sm:block glass-strong rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 animate-fadeInUp" style={{animationDelay: "0.1s"}}>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Technique Info */}
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[var(--color-gold)]/20 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-gold)]" />
          </div>
          <div>
            <h3 className="font-semibold text-[var(--color-cream)] mb-1 text-sm sm:text-base">Technique</h3>
            <p className="text-xs sm:text-sm text-[var(--color-primary-light)]">
              Triplet arpeggios across all strings
            </p>
          </div>
        </div>

        {/* Chord Study */}
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[var(--color-info)]/20 flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-info)]" />
          </div>
          <div>
            <h3 className="font-semibold text-[var(--color-cream)] mb-1 text-sm sm:text-base">Chords</h3>
            <p className="text-xs sm:text-sm text-[var(--color-primary-light)]">
              <span className="font-mono text-[var(--color-gold)]">{formatNoteName(selectedRoot)}{PATTERNS[selectedPattern]?.name}</span> → <span className="font-mono text-[var(--color-gold)]">{formatNoteName(secondRoot)}{PATTERNS[secondPattern]?.name}</span>
            </p>
          </div>
        </div>

        {/* Goal */}
        <div className="flex items-start gap-3 sm:gap-4 sm:col-span-2 md:col-span-1">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[var(--color-success)]/20 flex items-center justify-center flex-shrink-0">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-success)]" />
          </div>
          <div>
            <h3 className="font-semibold text-[var(--color-cream)] mb-1 text-sm sm:text-base">Objective</h3>
            <p className="text-xs sm:text-sm text-[var(--color-primary-light)]">
              Fluid arpeggio with even triplet timing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EducationalInfoPanel;
