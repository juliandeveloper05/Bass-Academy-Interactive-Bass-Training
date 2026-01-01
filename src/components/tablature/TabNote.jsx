/**
 * TabNote Component - Bass Trainer
 * Single fret note indicator
 */

import React from 'react';

function TabNote({ fret, isActive, size = 'default' }) {
  const sizeClasses = size === 'compact' 
    ? 'w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg text-[10px] sm:text-xs'
    : 'w-10 h-10 rounded-xl text-sm';
  
  const activeScale = size === 'compact' ? 'scale-110 sm:scale-125' : 'scale-125';
  
  return (
    <div
      className={`
        flex items-center justify-center 
        font-mono font-bold transition-all duration-100
        ${sizeClasses}
        ${
          isActive
            ? `bg-[var(--color-active)] text-[var(--color-primary-deep)] ${activeScale} animate-pulse-glow border-2 border-[var(--color-active)]`
            : "bg-[var(--color-primary-dark)] text-[var(--color-cream)] border border-[var(--color-primary-medium)] hover:border-[var(--color-gold)]/50 hover:bg-[var(--color-primary-medium)]/50"
        }
      `}
      style={{
        boxShadow: isActive 
          ? size === 'compact'
            ? "0 0 8px var(--color-active-glow)"
            : "0 0 20px var(--color-active-glow), 0 0 40px var(--color-active-glow)" 
          : "0 4px 12px rgba(0,0,0,0.3)"
      }}
    >
      {fret}
    </div>
  );
}

export default TabNote;
