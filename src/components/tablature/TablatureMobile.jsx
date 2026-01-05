/**
 * TablatureMobile Component - Bass Trainer
 * Mobile compact grid tablature view
 */

import React from 'react';
import { ChevronRight } from 'lucide-react';
import TabString from './TabString.jsx';
import MeasureGuide from './MeasureGuide.jsx';
import { STRING_ORDER } from '../../config/audioConfig.js';

function TablatureMobile({ 
  tabData = [], 
  currentNoteIndex = -1, 
  selectedRoot = 'E', 
  selectedPattern = 'linear11thsMaj', 
  secondRoot = 'A', 
  secondPattern = 'linear11thsMin' 
}) {
  // Split notes into two measures (0-11 and 12-23)
  const measure1Notes = tabData.slice(0, 12);
  const measure2Notes = tabData.slice(12, 24);
  
  return (
    <div className="md:hidden p-2 sm:p-4">
      {/* Measure 1 Section */}
      <div className="mb-4">
        <MeasureGuide
          selectedRoot={selectedRoot}
          selectedPattern={selectedPattern}
          secondRoot={secondRoot}
          secondPattern={secondPattern}
          variant="measure1"
        />
        
        {/* 4 Strings - Compact Tab */}
        <div className="glass rounded-lg sm:rounded-xl p-2 sm:p-3">
          {STRING_ORDER.map(stringName => (
            <TabString
              key={stringName}
              stringName={stringName}
              notes={measure1Notes}
              currentNoteIndex={currentNoteIndex}
              variant="mobile"
              colorClass="text-[var(--color-gold)]"
              lineColorClass="bg-[var(--color-gold)]"
            />
          ))}
        </div>
      </div>

      {/* Arrow Divider */}
      <div className="flex justify-center my-2">
        <ChevronRight className="w-5 h-5 text-[var(--color-primary-medium)] rotate-90" />
      </div>

      {/* Measure 2 Section */}
      <div>
        <MeasureGuide
          selectedRoot={selectedRoot}
          selectedPattern={selectedPattern}
          secondRoot={secondRoot}
          secondPattern={secondPattern}
          variant="measure2"
        />
        
        {/* 4 Strings - Compact Tab */}
        <div className="glass rounded-lg sm:rounded-xl p-2 sm:p-3">
          {STRING_ORDER.map(stringName => (
            <TabString
              key={stringName}
              stringName={stringName}
              notes={measure2Notes.map((note, idx) => ({ ...note, id: idx + 12 }))}
              currentNoteIndex={currentNoteIndex}
              variant="mobile"
              colorClass="text-[var(--color-info)]"
              lineColorClass="bg-[var(--color-info)]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TablatureMobile;
