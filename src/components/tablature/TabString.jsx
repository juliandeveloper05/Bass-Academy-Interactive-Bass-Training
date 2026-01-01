/**
 * TabString Component - Bass Trainer
 * Single bass string with notes
 */

import React from 'react';
import TabNote from './TabNote.jsx';

function TabString({ 
  stringName, 
  notes, 
  currentNoteIndex, 
  variant = 'desktop',
  colorClass = 'text-[var(--color-gold)]',
  lineColorClass = 'bg-[var(--color-gold)]'
}) {
  // Desktop variant
  if (variant === 'desktop') {
    return (
      <div className="flex items-center mb-4 relative h-12 select-none group">
        {/* String Label */}
        <div 
          className="w-14 font-mono text-lg font-bold text-[var(--color-gold)] 
                     flex items-center justify-center"
        >
          <span className="bg-[var(--color-primary-dark)] px-3 py-1 rounded-lg border border-[var(--color-gold)]/30">
            {stringName}
          </span>
        </div>
        
        {/* String Container */}
        <div className="flex-1 relative flex items-center">
          {/* String Line with Gradient */}
          <div 
            className="absolute w-full h-[3px] rounded-full"
            style={{
              background: `linear-gradient(90deg, 
                var(--color-primary-medium) 0%, 
                var(--color-gold) 20%, 
                var(--color-gold-light) 50%, 
                var(--color-gold) 80%, 
                var(--color-primary-medium) 100%)`
            }}
          />

          {/* Notes */}
          <div className="flex w-full justify-between relative z-10 px-3">
            {notes.map((note, idx) => {
              if (note.string !== stringName) {
                return <div key={idx} className="w-10 h-10" />;
              }
              
              return (
                <TabNote 
                  key={idx}
                  fret={note.fret}
                  isActive={currentNoteIndex === note.id}
                  size="default"
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  
  // Mobile compact variant
  return (
    <div className="flex items-center mb-1.5 last:mb-0 h-6 sm:h-7">
      <div className={`w-5 sm:w-7 font-mono text-xs sm:text-sm font-bold ${colorClass} flex-shrink-0`}>
        {stringName}
      </div>
      <div className="flex-1 relative flex items-center">
        {/* String Line */}
        <div className={`absolute w-full h-[1.5px] sm:h-[2px] ${lineColorClass}/40`} />
        {/* Notes */}
        <div className="flex w-full justify-between relative z-10 gap-0.5">
          {notes.map((note, idx) => {
            if (note.string !== stringName) {
              return <div key={idx} className="w-5 h-5 sm:w-6 sm:h-6" />;
            }
            
            return (
              <TabNote 
                key={idx}
                fret={note.fret}
                isActive={currentNoteIndex === note.id}
                size="compact"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TabString;
