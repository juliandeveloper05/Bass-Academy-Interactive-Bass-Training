/**
 * Header Component - Bass Trainer
 * Academic header section with institution badge, title, status, and theme toggle
 */

import React from 'react';
import { GraduationCap, Music, Sun, Moon } from 'lucide-react';

function Header({ headerInfo, isPlaying, isCountingDown, theme, toggleTheme }) {
  return (
    <header className="mb-4 sm:mb-8 animate-fadeInUp">
      {/* Institution Badge */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl gradient-gold flex items-center justify-center shadow-lg">
          <GraduationCap className="w-6 h-6 sm:w-9 sm:h-9 text-[var(--color-primary-deep)]" />
        </div>
        <div>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[var(--color-gold)] font-medium">
            Bass Academy · 2026
          </p>
          <h1 className="font-[var(--font-display)] text-xl sm:text-3xl md:text-4xl font-bold text-[var(--color-cream)]">
            {headerInfo.type === 'artist' ? headerInfo.displayName : (
              <span className="flex items-center gap-2">
                {headerInfo.displayName}
                <span className="text-sm sm:text-lg text-[var(--color-gold)]">
                  {'★'.repeat(headerInfo.difficulty || 3)}
                </span>
              </span>
            )}
          </h1>
        </div>
      </div>

      {/* Main Title */}
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="font-[var(--font-display)] text-lg sm:text-2xl md:text-3xl font-semibold text-gradient-gold mb-1 sm:mb-2">
          {headerInfo.subtitle}
        </h2>
        <p className="text-[var(--color-primary-light)] text-xs sm:text-base md:text-lg">
          Interactive Arpeggio Study
        </p>
      </div>

      {/* Status Indicator & Theme Toggle */}
      <div className="flex justify-center items-center gap-3 sm:gap-4">
        <div 
          className={`
            glass px-3 sm:px-5 py-1.5 sm:py-2 rounded-full flex items-center gap-2 sm:gap-3
            ${isCountingDown ? "border-[var(--color-warning)]" : isPlaying ? "border-[var(--color-success)]" : "border-[var(--color-primary-medium)]"}
          `}
        >
          <span
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
              isCountingDown ? "bg-[var(--color-warning)] animate-pulse" : isPlaying ? "bg-[var(--color-success)] animate-pulse" : "bg-[var(--color-error)]"
            }`}
          />
          <span className="text-xs sm:text-sm uppercase tracking-wider font-medium text-[var(--color-cream)]">
            {isCountingDown ? "Get Ready" : isPlaying ? "Playing" : "Ready"}
          </span>
          <Music className={`w-3 h-3 sm:w-4 sm:h-4 ${isCountingDown ? "text-[var(--color-warning)]" : isPlaying ? "text-[var(--color-success)]" : "text-[var(--color-primary-light)]"}`} />
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="glass px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-2 
                   border border-[var(--color-primary-medium)] hover:border-[var(--color-gold)]
                   transition-all duration-300 hover:scale-105 active:scale-95 group"
          aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-gold)] group-hover:rotate-45 transition-transform duration-300" />
          ) : (
            <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-gold)] group-hover:-rotate-12 transition-transform duration-300" />
          )}
          <span className="text-xs sm:text-sm font-medium text-[var(--color-cream)] hidden sm:inline">
            {theme === 'dark' ? 'Claro' : 'Oscuro'}
          </span>
        </button>
      </div>
    </header>
  );
}

export default Header;
