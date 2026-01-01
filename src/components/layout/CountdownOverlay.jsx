/**
 * Countdown Overlay Component - Bass Trainer
 * Fullscreen 3-2-1 countdown modal
 */

import React from 'react';
import { Pause } from 'lucide-react';

function CountdownOverlay({ countdown, onCancel }) {
  return (
    <div className="fixed inset-0 bg-[var(--color-primary-deep)]/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeInUp">
      <div className="text-center">
        <p className="text-[var(--color-gold)] text-lg sm:text-2xl uppercase tracking-widest mb-4 font-medium">
          Prepárate
        </p>
        <div 
          className="text-8xl sm:text-9xl font-bold text-[var(--color-gold)] animate-pulse"
          style={{
            textShadow: "0 0 40px var(--color-gold), 0 0 80px var(--color-gold)"
          }}
        >
          {countdown}
        </div>
        
        {/* Cancel Button */}
        <button
          onClick={onCancel}
          className="mt-8 group relative bg-gradient-to-r from-[var(--color-error)] to-red-400 
                   text-white px-8 sm:px-10 py-3 sm:py-4 rounded-2xl font-bold 
                   flex items-center gap-3 transition-all duration-300 
                   hover:shadow-[0_0_30px_var(--color-error)/40] hover:scale-105
                   active:scale-95 text-base sm:text-lg mx-auto"
        >
          <Pause className="w-5 h-5 sm:w-6 sm:h-6" />
          <span>CANCELAR</span>
        </button>
      </div>
    </div>
  );
}

export default CountdownOverlay;
