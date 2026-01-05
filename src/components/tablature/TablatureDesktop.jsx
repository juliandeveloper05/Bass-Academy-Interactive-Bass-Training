/**
 * TablatureDesktop Component - Bass Trainer
 * Desktop horizontal tablature view
 */

import React from 'react';
import TabString from './TabString.jsx';
import MeasureGuide from './MeasureGuide.jsx';
import { STRING_ORDER } from '../../config/audioConfig.js';

function TablatureDesktop({ 
  tabData = [], 
  currentNoteIndex = -1, 
  selectedRoot = 'E', 
  selectedPattern = 'linear11thsMaj', 
  secondRoot = 'A', 
  secondPattern = 'linear11thsMin' 
}) {
  return (
    <div className="hidden md:block p-8 overflow-x-auto">
      <div className="min-w-[800px]">
        {STRING_ORDER.map(stringName => (
          <TabString
            key={stringName}
            stringName={stringName}
            notes={tabData}
            currentNoteIndex={currentNoteIndex}
            variant="desktop"
          />
        ))}
      </div>

      {/* Measure Guide */}
      <MeasureGuide
        selectedRoot={selectedRoot}
        selectedPattern={selectedPattern}
        secondRoot={secondRoot}
        secondPattern={secondPattern}
        variant="desktop"
      />
    </div>
  );
}

export default TablatureDesktop;
