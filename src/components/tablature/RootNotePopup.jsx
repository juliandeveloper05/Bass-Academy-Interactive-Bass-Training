/**
 * RootNotePopup Component - Bass Academy
 * Popup selector for choosing root note in fullscreen tablature
 */

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { NOTES, formatNoteName } from '../../data/exerciseLibrary.js';

const RootNotePopup = ({
  isOpen,
  onClose,
  onSelect,
  currentRoot,
  measureNumber = 1,
  position = { x: 0, y: 0 }
}) => {
  const popupRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNoteSelect = (note) => {
    onSelect(note);
    onClose();
  };

  const isMeasure1 = measureNumber === 1;
  const accentColor = isMeasure1 ? 'var(--color-gold)' : 'var(--color-info)';

  return (
    <div className="root-note-popup-overlay">
      <div 
        ref={popupRef}
        className="root-note-popup"
        style={{
          '--accent-color': accentColor
        }}
      >
        {/* Header */}
        <div className="root-note-popup-header">
          <span className="root-note-popup-title">
            Measure {measureNumber} - Select Root
          </span>
          <button 
            onClick={onClose}
            className="root-note-popup-close"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Note Grid */}
        <div className="root-note-grid">
          {NOTES.map(note => (
            <button
              key={note}
              onClick={() => handleNoteSelect(note)}
              className={`root-note-button ${currentRoot === note ? 'selected' : ''}`}
              aria-label={formatNoteName(note)}
            >
              {formatNoteName(note)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RootNotePopup;
