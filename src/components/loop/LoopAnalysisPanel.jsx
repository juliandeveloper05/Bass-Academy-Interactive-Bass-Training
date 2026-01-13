/**
 * LoopAnalysisPanel Component - Loop Mode
 * Displays timing deviation histogram for practice analysis
 * Shows distribution of early/on-time/late note hits
 */

import React, { useMemo } from 'react';

// Timing deviation thresholds (in milliseconds)
const TIMING_THRESHOLDS = {
  PERFECT: 15,    // ±15ms = perfect
  GOOD: 30,       // ±30ms = good
  ACCEPTABLE: 50, // ±50ms = acceptable
};

// Histogram bar colors
const BAR_COLORS = {
  perfect: 'var(--color-success)',      // Green
  good: 'var(--color-gold)',            // Gold
  acceptable: 'var(--color-warning)',   // Yellow
  missed: 'var(--color-error)',         // Red
};

/**
 * @param {Object} props
 * @param {Array<number>} props.timingDeviations - Array of timing deviations in ms (negative = early, positive = late)
 * @param {boolean} props.isPlaying - Whether loop is currently playing
 * @param {boolean} props.compact - Compact mode for smaller display
 */
export default function LoopAnalysisPanel({
  timingDeviations = [],
  isPlaying = false,
  compact = false,
}) {
  // Calculate statistics
  const stats = useMemo(() => {
    if (timingDeviations.length === 0) {
      return {
        early: 0,
        onTime: 0,
        late: 0,
        avgDeviation: 0,
        histogram: Array(11).fill(0), // -50 to +50 in 10ms buckets
      };
    }

    let early = 0;
    let onTime = 0;
    let late = 0;
    let totalDeviation = 0;
    const histogram = Array(11).fill(0); // Index 0-10 = -50 to +50ms

    timingDeviations.forEach((deviation) => {
      totalDeviation += deviation;
      
      if (deviation < -TIMING_THRESHOLDS.PERFECT) {
        early++;
      } else if (deviation > TIMING_THRESHOLDS.PERFECT) {
        late++;
      } else {
        onTime++;
      }

      // Histogram bucket (clamped to -50 to +50)
      const clamped = Math.max(-50, Math.min(50, deviation));
      const bucketIndex = Math.floor((clamped + 50) / 10);
      histogram[Math.min(10, bucketIndex)]++;
    });

    const count = timingDeviations.length;
    return {
      early: Math.round((early / count) * 100),
      onTime: Math.round((onTime / count) * 100),
      late: Math.round((late / count) * 100),
      avgDeviation: Math.round(totalDeviation / count),
      histogram,
    };
  }, [timingDeviations]);

  // Get bar color based on deviation
  const getBarColor = (bucketIndex) => {
    const deviation = Math.abs((bucketIndex * 10) - 50); // Convert bucket to deviation
    if (deviation <= TIMING_THRESHOLDS.PERFECT) return BAR_COLORS.perfect;
    if (deviation <= TIMING_THRESHOLDS.GOOD) return BAR_COLORS.good;
    if (deviation <= TIMING_THRESHOLDS.ACCEPTABLE) return BAR_COLORS.acceptable;
    return BAR_COLORS.missed;
  };

  // Max histogram value for scaling
  const maxHistogramValue = Math.max(...stats.histogram, 1);

  if (compact) {
    // Compact mode: just show percentages
    return (
      <div className="flex items-center gap-4 text-xs font-mono">
        <span className="text-[var(--color-warning)]">⏪ {stats.early}%</span>
        <span className="text-[var(--color-success)]">🎯 {stats.onTime}%</span>
        <span className="text-[var(--color-info)]">⏩ {stats.late}%</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-[var(--color-primary-dark)]/50 rounded-xl border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-[var(--color-primary-light)]">
          📊 Análisis de Tiempo
        </h3>
        {isPlaying && (
          <span className="text-xs text-[var(--color-gold)] animate-pulse">
            ● En vivo
          </span>
        )}
      </div>

      {/* Statistics Row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="text-center p-2 bg-white/5 rounded-lg">
          <div className="text-lg font-bold text-[var(--color-warning)]">{stats.early}%</div>
          <div className="text-xs text-[var(--color-primary-light)]">Temprano</div>
        </div>
        <div className="text-center p-2 bg-white/5 rounded-lg">
          <div className="text-lg font-bold text-[var(--color-success)]">{stats.onTime}%</div>
          <div className="text-xs text-[var(--color-primary-light)]">A tiempo</div>
        </div>
        <div className="text-center p-2 bg-white/5 rounded-lg">
          <div className="text-lg font-bold text-[var(--color-info)]">{stats.late}%</div>
          <div className="text-xs text-[var(--color-primary-light)]">Tarde</div>
        </div>
      </div>

      {/* Histogram */}
      <div className="relative">
        {/* Histogram Bars */}
        <div className="flex items-end justify-between h-16 gap-0.5">
          {stats.histogram.map((count, index) => {
            const height = maxHistogramValue > 0 ? (count / maxHistogramValue) * 100 : 0;
            return (
              <div
                key={index}
                className="flex-1 rounded-t transition-all duration-200"
                style={{
                  height: `${Math.max(2, height)}%`,
                  backgroundColor: getBarColor(index),
                  opacity: count > 0 ? 1 : 0.2,
                }}
                title={`${(index * 10) - 50}ms: ${count} notas`}
              />
            );
          })}
        </div>

        {/* Center marker (0ms) */}
        <div 
          className="absolute top-0 bottom-0 w-px bg-white/40"
          style={{ left: '50%' }}
        />

        {/* Labels */}
        <div className="flex justify-between mt-1 text-xs text-[var(--color-primary-light)]">
          <span>-50ms</span>
          <span className="text-[var(--color-gold)]">0</span>
          <span>+50ms</span>
        </div>
      </div>

      {/* Average Deviation */}
      {timingDeviations.length > 0 && (
        <div className="mt-3 text-center text-xs text-[var(--color-primary-light)]">
          Desviación promedio: 
          <span className={`ml-1 font-bold ${
            Math.abs(stats.avgDeviation) <= TIMING_THRESHOLDS.PERFECT 
              ? 'text-[var(--color-success)]' 
              : 'text-[var(--color-warning)]'
          }`}>
            {stats.avgDeviation > 0 ? '+' : ''}{stats.avgDeviation}ms
          </span>
        </div>
      )}

      {/* Empty state */}
      {timingDeviations.length === 0 && (
        <div className="text-center text-sm text-[var(--color-primary-light)] py-4">
          🎵 Comienza a tocar para ver tu análisis de timing
        </div>
      )}
    </div>
  );
}
