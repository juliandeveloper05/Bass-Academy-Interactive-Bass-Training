/**
 * MeasureGuide Component - Bass Trainer
 * Shows measure labels with chord names
 */

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { PATTERNS, formatNoteName } from '../../data/exerciseLibrary.js';

function MeasureGuide({ 
  selectedRoot = 'E', 
  selectedPattern = 'linear11thsMaj', 
  secondRoot = 'A', 
  secondPattern = 'linear11thsMin', 
  variant = 'desktop' 
}) {
  // Defensive: Ensure we have valid values
  const root1 = selectedRoot || 'E';
  const root2 = secondRoot || 'A';
  const pattern1Name = PATTERNS[selectedPattern]?.name || '';
  const pattern2Name = PATTERNS[secondPattern]?.name || '';
  if (variant === 'desktop') {
    return (
      <div className="flex pl-14 mt-6 gap-4">
        <div className="flex-1 glass rounded-xl p-3 text-center border-l-4 border-[var(--color-gold)]">
          <p className="text-xs uppercase tracking-wider text-[var(--color-primary-light)] mb-1">Measure 1</p>
          <p className="font-mono font-bold text-[var(--color-gold)]">
            {formatNoteName(root1)}{pattern1Name}
          </p>
        </div>
        <div className="w-8 flex items-center justify-center">
          <ChevronRight className="w-6 h-6 text-[var(--color-primary-medium)]" />
        </div>
        <div className="flex-1 glass rounded-xl p-3 text-center border-l-4 border-[var(--color-info)]">
          <p className="text-xs uppercase tracking-wider text-[var(--color-primary-light)] mb-1">Measure 2</p>
          <p className="font-mono font-bold text-[var(--color-info)]">
            {formatNoteName(root2)}{pattern2Name}
          </p>
        </div>
      </div>
    );
  }
  
  // Mobile header variant
  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-1.5">
        <div className={`w-1.5 h-6 rounded-full ${variant === 'measure1' ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-info)]'}`} />
        <span className={`font-mono font-bold text-base sm:text-lg ${variant === 'measure1' ? 'text-[var(--color-gold)]' : 'text-[var(--color-info)]'}`}>
          {variant === 'measure1' 
            ? `${formatNoteName(root1)}${pattern1Name}`
            : `${formatNoteName(root2)}${pattern2Name}`
          }
        </span>
      </div>
      <span className="text-[10px] sm:text-xs text-[var(--color-primary-light)] uppercase tracking-wider">
        {variant === 'measure1' ? 'Compás 1' : 'Compás 2'}
      </span>
    </div>
  );
}

export default MeasureGuide;
