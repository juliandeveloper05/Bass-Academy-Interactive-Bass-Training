import React, { useState, useEffect } from 'react';
import { 
  Save, Play, Settings, Trash2, Plus, 
  X, Check, Info, ArrowLeft 
} from 'lucide-react';
import CustomExerciseManager from '../../services/CustomExerciseManager';

/**
 * Visual Fretboard Editor
 * Interactive note-by-note exercise builder
 * Mobile-first - 2026 Design
 */
const VisualFretboardEditor = ({ exercise, onSave, onBack, onPreview }) => {
  const [editedExercise, setEditedExercise] = useState(
    exercise || CustomExerciseManager.create('New Exercise')
  );
  const [isMetadataOpen, setIsMetadataOpen] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);

  const strings = ['G', 'D', 'A', 'E'];
  const frets = Array.from({ length: 13 }, (_, i) => i); // 0-12

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      saveDraft();
    }, 30000);
    return () => clearInterval(interval);
  }, [editedExercise]);

  const saveDraft = () => {
    localStorage.setItem('bass-builder-draft', JSON.stringify(editedExercise));
  };

  const handleAddNote = (string, fret) => {
    const newNote = {
      id: editedExercise.pattern.notes.length,
      string,
      fret,
      technique: 'normal',
      duration: 1,
    };

    setEditedExercise(prev => ({
      ...prev,
      pattern: {
        ...prev.pattern,
        notes: [...prev.pattern.notes, newNote],
      },
    }));
  };

  const handleRemoveNote = (noteId) => {
    setEditedExercise(prev => ({
      ...prev,
      pattern: {
        ...prev.pattern,
        notes: prev.pattern.notes
          .filter(n => n.id !== noteId)
          .map((n, i) => ({ ...n, id: i })),
      },
    }));
  };

  const handleUpdateNote = (noteId, updates) => {
    setEditedExercise(prev => ({
      ...prev,
      pattern: {
        ...prev.pattern,
        notes: prev.pattern.notes.map(n =>
          n.id === noteId ? { ...n, ...updates } : n
        ),
      },
    }));
  };

  const handleSave = async () => {
    await onSave(editedExercise);
    setShowSaveConfirm(true);
    setTimeout(() => setShowSaveConfirm(false), 2000);
    localStorage.removeItem('bass-builder-draft');
  };

  const clearAll = () => {
    if (confirm('¿Borrar todas las notas?')) {
      setEditedExercise(prev => ({
        ...prev,
        pattern: { ...prev.pattern, notes: [] },
      }));
    }
  };

  const getNotesAtPosition = (string, fret) => {
    return editedExercise.pattern.notes.filter(n => n.string === string && n.fret === fret);
  };

  const hasNotesAtPosition = (string, fret) => {
    return getNotesAtPosition(string, fret).length > 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1B2A] via-[#1B263B] to-[#0a1628] pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-[#0D1B2A]/95 backdrop-blur-lg border-b border-white/10 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={onBack}
              className="p-2 text-[#778DA9] hover:text-white transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMetadataOpen(true)}
                className="p-2 text-[#778DA9] hover:text-white transition-colors"
              >
                <Settings size={20} />
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-gradient-to-r from-[#C9A554] to-[#E0C285] 
                         text-[#0D1B2A] rounded-xl font-semibold flex items-center gap-2
                         hover:shadow-lg transition-all active:scale-95"
              >
                <Save size={18} />
                <span>Save</span>
              </button>
            </div>
          </div>

          <input
            type="text"
            value={editedExercise.name}
            onChange={(e) => setEditedExercise(prev => ({ ...prev, name: e.target.value }))}
            className="w-full text-xl font-bold text-white bg-transparent border-none 
                     focus:outline-none placeholder-[#778DA9] font-['Playfair_Display']"
            placeholder="Exercise Name"
          />
        </div>

        {/* Stats Bar */}
        <div className="px-4 py-2 bg-white/5 flex items-center justify-between text-xs text-[#778DA9]">
          <span>{editedExercise.pattern.notes.length} notes</span>
          <span>•</span>
          <span>{editedExercise.pattern.beatsPerMeasure}/4 time</span>
          <span>•</span>
          <span>{editedExercise.tempo} BPM</span>
        </div>
      </div>

      {/* Interactive Fretboard */}
      <div className="px-4 py-6">
        <div className="bg-gradient-to-b from-[#4a3728] via-[#3d2d22] to-[#2d1f17] 
                      rounded-2xl p-4 overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Fret Numbers */}
            <div className="flex mb-2">
              <div className="w-12" /> {/* String label space */}
              {frets.map(fret => (
                <div key={fret} className="flex-1 text-center text-xs text-[#C9A554]/70 font-mono">
                  {fret}
                </div>
              ))}
            </div>

            {/* Strings */}
            {strings.map((string, stringIndex) => (
              <div key={string} className="flex items-center mb-3 relative">
                {/* String Label */}
                <div className="w-12 text-center">
                  <div className="inline-block px-2 py-1 bg-[#C9A554] text-[#0D1B2A] 
                                rounded-lg text-sm font-bold font-mono">
                    {string}
                  </div>
                </div>

                {/* String Line */}
                <div 
                  className="absolute left-12 right-0 pointer-events-none"
                  style={{
                    height: stringIndex === 0 ? '1px' : stringIndex === 3 ? '3px' : '2px',
                    background: 'linear-gradient(to right, transparent, rgba(201, 165, 84, 0.5), transparent)',
                  }}
                />

                {/* Frets */}
                <div className="flex-1 flex">
                  {frets.map(fret => {
                    const hasNote = hasNotesAtPosition(string, fret);
                    const notes = getNotesAtPosition(string, fret);
                    
                    return (
                      <div
                        key={fret}
                        className="flex-1 flex items-center justify-center relative"
                      >
                        <button
                          onClick={() => handleAddNote(string, fret)}
                          className={`
                            w-10 h-10 rounded-full flex items-center justify-center
                            font-mono font-bold text-sm transition-all duration-200
                            ${hasNote
                              ? 'bg-[#C9A554] text-[#0D1B2A] scale-110 shadow-lg shadow-[#C9A554]/50'
                              : 'bg-white/10 text-[#778DA9] hover:bg-white/20 hover:scale-105'
                            }
                          `}
                        >
                          {hasNote ? notes.length : fret}
                        </button>

                        {/* Fret marker dots */}
                        {[3, 5, 7, 9, 12].includes(fret) && stringIndex === 1 && (
                          <div className="absolute -bottom-4 w-2 h-2 rounded-full bg-[#f5f5dc]/30" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Help Hint */}
        <div className="mt-4 flex items-start gap-2 text-xs text-[#778DA9] bg-white/5 
                      rounded-xl p-3 border border-[#C9A554]/20">
          <Info size={16} className="flex-shrink-0 mt-0.5" />
          <p>
            <strong className="text-[#C9A554]">Tip:</strong> Toca los círculos para agregar notas. 
            Las notas se reproducirán en el orden que las agregues.
          </p>
        </div>
      </div>

      {/* Note Sequence List */}
      {editedExercise.pattern.notes.length > 0 && (
        <div className="px-4 pb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-white">Note Sequence</h3>
            <button
              onClick={clearAll}
              className="text-red-400 text-sm flex items-center gap-1 hover:text-red-300"
            >
              <Trash2 size={14} />
              Clear All
            </button>
          </div>

          <div className="space-y-2">
            {editedExercise.pattern.notes.map((note, index) => (
              <NoteItem
                key={note.id}
                note={note}
                index={index}
                onUpdate={(updates) => handleUpdateNote(note.id, updates)}
                onDelete={() => handleRemoveNote(note.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Metadata Modal */}
      {isMetadataOpen && (
        <MetadataModal
          exercise={editedExercise}
          onUpdate={setEditedExercise}
          onClose={() => setIsMetadataOpen(false)}
        />
      )}

      {/* Save Confirmation */}
      {showSaveConfirm && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-green-500 text-white
                      px-6 py-3 rounded-full flex items-center gap-2 shadow-xl z-50">
          <Check size={20} />
          <span className="font-semibold">Saved!</span>
        </div>
      )}

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0D1B2A]/95 backdrop-blur-lg 
                    border-t border-white/10 p-4 z-40">
        <button
          onClick={() => onPreview(editedExercise)}
          disabled={editedExercise.pattern.notes.length === 0}
          className="w-full bg-gradient-to-r from-[#C9A554] to-[#E0C285] text-[#0D1B2A]
                   py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3
                   hover:shadow-lg transition-all active:scale-95
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play size={24} fill="currentColor" />
          <span>Preview Exercise</span>
        </button>
      </div>
    </div>
  );
};

/**
 * Note Item Component
 */
const NoteItem = ({ note, index, onUpdate, onDelete }) => {
  const techniques = [
    { id: 'normal', label: '👆', name: 'Normal' },
    { id: 'slap', label: '👊', name: 'Slap' },
    { id: 'pop', label: '💥', name: 'Pop' },
    { id: 'hammer', label: 'H', name: 'Hammer' },
    { id: 'mute', label: 'X', name: 'Mute' },
  ];

  return (
    <div className="flex items-center gap-2 bg-white/5 rounded-xl p-3 border border-white/10">
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#C9A554] text-[#0D1B2A] 
                    flex items-center justify-center font-bold text-sm">
        {index + 1}
      </div>

      <div className="flex-1 flex items-center gap-2">
        <span className="font-mono font-bold text-white">
          {note.string}:{note.fret}
        </span>

        <select
          value={note.technique}
          onChange={(e) => onUpdate({ technique: e.target.value })}
          className="px-2 py-1 bg-white/10 text-white rounded text-xs border border-white/20
                   focus:border-[#C9A554] focus:outline-none"
        >
          {techniques.map(t => (
            <option key={t.id} value={t.id}>{t.label} {t.name}</option>
          ))}
        </select>
      </div>

      <button
        onClick={onDelete}
        className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
};

/**
 * Metadata Modal
 */
const MetadataModal = ({ exercise, onUpdate, onClose }) => {
  const [localData, setLocalData] = useState(exercise);

  const handleSave = () => {
    onUpdate(localData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-[#1B263B] rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] 
                    overflow-y-auto border border-white/10">
        <div className="sticky top-0 bg-[#1B263B] border-b border-white/10 p-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Exercise Settings</h3>
          <button onClick={onClose} className="p-2 text-[#778DA9] hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm text-[#778DA9] mb-2">Name</label>
            <input
              type="text"
              value={localData.name}
              onChange={(e) => setLocalData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                       text-white focus:border-[#C9A554] focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-[#778DA9] mb-2">Description</label>
            <textarea
              value={localData.description}
              onChange={(e) => setLocalData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                       text-white focus:border-[#C9A554] focus:outline-none resize-none"
              rows={3}
            />
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm text-[#778DA9] mb-2">
              Difficulty: {'★'.repeat(localData.difficulty)}{'☆'.repeat(5 - localData.difficulty)}
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={localData.difficulty}
              onChange={(e) => setLocalData(prev => ({ ...prev, difficulty: parseInt(e.target.value) }))}
              className="w-full accent-[#C9A554]"
            />
          </div>

          {/* Tempo */}
          <div>
            <label className="block text-sm text-[#778DA9] mb-2">
              Suggested Tempo: {localData.tempo} BPM
            </label>
            <input
              type="range"
              min="40"
              max="160"
              step="5"
              value={localData.tempo}
              onChange={(e) => setLocalData(prev => ({ ...prev, tempo: parseInt(e.target.value) }))}
              className="w-full accent-[#C9A554]"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full py-3 bg-gradient-to-r from-[#C9A554] to-[#E0C285] 
                     text-[#0D1B2A] rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisualFretboardEditor;
