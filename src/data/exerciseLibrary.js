/**
 * Exercise Library - Bass Trainer
 * Collection of arpeggio patterns, scales, and artist-specific techniques
 */

// All notes in chromatic order
export const NOTES = ['E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb'];

// Note to semitone mapping (from E = 0)
const NOTE_TO_SEMITONE = {
  'E': 0, 'F': 1, 'F#': 2, 'Gb': 2, 'G': 3, 'G#': 4, 'Ab': 4,
  'A': 5, 'A#': 6, 'Bb': 6, 'B': 7, 'C': 8, 'C#': 9, 'Db': 9,
  'D': 10, 'D#': 11, 'Eb': 11
};

// String open note semitones
const STRING_SEMITONES = {
  'E': 0, 'A': 5, 'D': 10, 'G': 15
};

export const PATTERNS = {
  // === Patitucci Linear 11ths ===
  linear11thsMaj: {
    id: 'linear11thsMaj',
    name: 'Linear 11ths (Major)',
    description: 'Arpegio Maj11 en tresillos - Estilo Patitucci',
    category: 'Patitucci',
    difficulty: 4,
    beatsPerMeasure: 4,
    notesPerBeat: 3,
    notes: [
      { interval: 0, string: 'E' }, { interval: 4, string: 'E' }, 
      { interval: 7, string: 'A' }, { interval: 11, string: 'D' }, 
      { interval: 16, string: 'D' }, { interval: 17, string: 'G' },
      { interval: 17, string: 'G' }, { interval: 16, string: 'D' }, 
      { interval: 11, string: 'D' }, { interval: 7, string: 'A' }, 
      { interval: 4, string: 'E' }, { interval: 0, string: 'E' },
    ]
  },
  linear11thsMin: {
    id: 'linear11thsMin',
    name: 'Linear 11ths (Minor)',
    description: 'Arpegio m11 en tresillos - Estilo Patitucci',
    category: 'Patitucci',
    difficulty: 4,
    beatsPerMeasure: 4,
    notesPerBeat: 3,
    notes: [
      { interval: 0, string: 'E' }, { interval: 3, string: 'E' }, 
      { interval: 7, string: 'A' }, { interval: 10, string: 'D' }, 
      { interval: 14, string: 'D' }, { interval: 17, string: 'G' },
      { interval: 17, string: 'G' }, { interval: 14, string: 'D' }, 
      { interval: 10, string: 'D' }, { interval: 7, string: 'A' }, 
      { interval: 3, string: 'E' }, { interval: 0, string: 'E' },
    ]
  },

  // === Victor Wooten (Slap & Tap) ===
  doubleThumbMaj7: {
    id: 'doubleThumbMaj7',
    name: 'Double Thumb Maj7',
    description: 'Técnica clásica de Wooten (Down/Up Thumb)',
    category: 'Wooten',
    difficulty: 5,
    beatsPerMeasure: 4,
    notesPerBeat: 4,
    notes: [
      { interval: 0, string: 'E' }, { interval: 0, string: 'E' }, // Thumb Down/Up
      { interval: 7, string: 'A' }, { interval: 11, string: 'D' }, // Pluck
      { interval: 12, string: 'D' }, { interval: 12, string: 'D' }, // Thumb Down/Up
      { interval: 16, string: 'G' }, { interval: 19, string: 'G' }  // Pluck
    ]
  },
  openHammerDom7: {
    id: 'openHammerDom7',
    name: 'Open-Hammer Pluck',
    description: 'Tresillos percusivos con cuerda al aire',
    category: 'Wooten',
    difficulty: 4,
    beatsPerMeasure: 4,
    notesPerBeat: 3,
    notes: [
      { interval: 0, string: 'E' }, { interval: 4, string: 'E' }, { interval: 10, string: 'D' }, // Thumb, Hammer, Pluck
      { interval: 0, string: 'E' }, { interval: 7, string: 'A' }, { interval: 10, string: 'D' },
      { interval: 0, string: 'E' }, { interval: 4, string: 'E' }, { interval: 10, string: 'D' },
      { interval: 0, string: 'E' }, { interval: 7, string: 'A' }, { interval: 10, string: 'D' }
    ]
  },

  // === Flea (Funk Power) ===
  slapOctavesMaj: {
    id: 'slapOctavesMaj',
    name: 'Higher Ground Octaves',
    description: 'Octavas agresivas estilo Flea',
    category: 'Flea',
    difficulty: 3,
    beatsPerMeasure: 4,
    notesPerBeat: 4,
    notes: [
      { interval: 0, string: 'E' }, { interval: 0, string: 'E' }, 
      { interval: 12, string: 'D' }, { interval: 0, string: 'E' },
      { interval: 0, string: 'E' }, { interval: 12, string: 'D' }, 
      { interval: 12, string: 'D' }, { interval: 0, string: 'E' }
    ]
  },
  ghostNotesFunk: {
    id: 'ghostNotesFunk',
    name: 'Give It Away Groove',
    description: 'Groove con ghost notes y slides',
    category: 'Flea',
    difficulty: 3,
    beatsPerMeasure: 4,
    notesPerBeat: 4,
    notes: [
      { interval: 0, string: 'E' }, { interval: 0, string: 'E' }, // Ghosts simulated
      { interval: 3, string: 'E' }, { interval: 5, string: 'E' }, // Slide feel
      { interval: 0, string: 'E' }, { interval: 0, string: 'E' }, 
      { interval: 10, string: 'D' }, { interval: 12, string: 'D' } // Pop
    ]
  },

  // === Jaco Pastorius (Fingerstyle) ===
  sixteenthFunkBb: {
    id: 'sixteenthFunkBb',
    name: 'The Chicken (16ths)',
    description: 'Semicorcheas staccato estilo Jaco',
    category: 'Jaco',
    difficulty: 4,
    beatsPerMeasure: 4,
    notesPerBeat: 4,
    notes: [
      { interval: 0, string: 'E' }, { interval: 0, string: 'E' }, 
      { interval: 10, string: 'D' }, { interval: 9, string: 'D' }, 
      { interval: 0, string: 'E' }, { interval: 0, string: 'E' }, 
      { interval: 3, string: 'E' }, { interval: 4, string: 'E' }
    ]
  },
  chromaticWalking: {
    id: 'chromaticWalking',
    name: 'Chromatic Approach',
    description: 'Cromatismos estilo Teen Town',
    category: 'Jaco',
    difficulty: 5,
    beatsPerMeasure: 4,
    notesPerBeat: 4,
    notes: [
      { interval: 0, string: 'E' }, { interval: 1, string: 'E' }, 
      { interval: 2, string: 'E' }, { interval: 3, string: 'E' }, 
      { interval: 4, string: 'E' }, { interval: 5, string: 'A' }, 
      { interval: 6, string: 'A' }, { interval: 7, string: 'A' }
    ]
  },

  // === Standard Patterns (Basic & Advanced) ===
  maj7: {
    id: 'maj7', name: 'Major 7th', description: 'Arpegio Maj7 básico', category: 'Basic 7ths', difficulty: 2, beatsPerMeasure: 4, notesPerBeat: 3,
    notes: [{ interval: 0, string: 'E' }, { interval: 4, string: 'E' }, { interval: 7, string: 'A' }, { interval: 11, string: 'D' }, { interval: 12, string: 'D' }, { interval: 16, string: 'G' }, { interval: 16, string: 'G' }, { interval: 12, string: 'D' }, { interval: 11, string: 'D' }, { interval: 7, string: 'A' }, { interval: 4, string: 'E' }, { interval: 0, string: 'E' }]
  },
  min7: {
    id: 'min7', name: 'Minor 7th', description: 'Arpegio m7 básico', category: 'Basic 7ths', difficulty: 2, beatsPerMeasure: 4, notesPerBeat: 3,
    notes: [{ interval: 0, string: 'E' }, { interval: 3, string: 'E' }, { interval: 7, string: 'A' }, { interval: 10, string: 'D' }, { interval: 12, string: 'D' }, { interval: 15, string: 'G' }, { interval: 15, string: 'G' }, { interval: 12, string: 'D' }, { interval: 10, string: 'D' }, { interval: 7, string: 'A' }, { interval: 3, string: 'E' }, { interval: 0, string: 'E' }]
  },
  dom7: {
    id: 'dom7', name: 'Dominant 7th', description: 'Arpegio 7 básico', category: 'Basic 7ths', difficulty: 2, beatsPerMeasure: 4, notesPerBeat: 3,
    notes: [{ interval: 0, string: 'E' }, { interval: 4, string: 'E' }, { interval: 7, string: 'A' }, { interval: 10, string: 'D' }, { interval: 12, string: 'D' }, { interval: 16, string: 'G' }, { interval: 16, string: 'G' }, { interval: 12, string: 'D' }, { interval: 10, string: 'D' }, { interval: 7, string: 'A' }, { interval: 4, string: 'E' }, { interval: 0, string: 'E' }]
  },
  halfDim7: {
    id: 'halfDim7', name: 'Half Diminished', description: 'Arpegio m7b5', category: 'Basic 7ths', difficulty: 3, beatsPerMeasure: 4, notesPerBeat: 3,
    notes: [{ interval: 0, string: 'E' }, { interval: 3, string: 'E' }, { interval: 6, string: 'A' }, { interval: 10, string: 'D' }, { interval: 12, string: 'D' }, { interval: 15, string: 'G' }, { interval: 15, string: 'G' }, { interval: 12, string: 'D' }, { interval: 10, string: 'D' }, { interval: 6, string: 'A' }, { interval: 3, string: 'E' }, { interval: 0, string: 'E' }]
  },
  dim7: {
    id: 'dim7', name: 'Diminished 7th', description: 'Arpegio dim7', category: 'Basic 7ths', difficulty: 3, beatsPerMeasure: 4, notesPerBeat: 3,
    notes: [{ interval: 0, string: 'E' }, { interval: 3, string: 'E' }, { interval: 6, string: 'A' }, { interval: 9, string: 'D' }, { interval: 12, string: 'D' }, { interval: 15, string: 'G' }, { interval: 15, string: 'G' }, { interval: 12, string: 'D' }, { interval: 9, string: 'D' }, { interval: 6, string: 'A' }, { interval: 3, string: 'E' }, { interval: 0, string: 'E' }]
  },
};

export const CATEGORIES = [
  { 
    id: 'Patitucci', 
    name: 'John Patitucci', 
    icon: '🎸',
    type: 'artist',
    artist: 'John Patitucci',
    subtitle: 'Modern Jazz Technique'
  },
  { 
    id: 'Wooten', 
    name: 'Victor Wooten', 
    icon: '🔥',
    type: 'artist',
    artist: 'Victor Wooten',
    subtitle: 'Slap & Double Thumb'
  },
  { 
    id: 'Flea', 
    name: 'Flea (RHCP)', 
    icon: '🌶️',
    type: 'artist',
    artist: 'Flea',
    subtitle: 'Funk Rock Power'
  },
  { 
    id: 'Jaco', 
    name: 'Jaco Pastorius', 
    icon: '🎹',
    type: 'artist',
    artist: 'Jaco Pastorius',
    subtitle: 'The World’s Greatest'
  },
  { 
    id: 'Basic 7ths', 
    name: 'Basic 7th Arpeggios', 
    icon: '🎵',
    type: 'difficulty',
    artist: null,
    subtitle: 'Fundamental Training'
  },
  { 
    id: 'Advanced 7ths', 
    name: 'Advanced 7th Arpeggios', 
    icon: '⭐',
    type: 'difficulty',
    artist: null,
    subtitle: 'Extended Harmony'
  },
];

export function generateTabData(patternId, rootNote) {
  const pattern = PATTERNS[patternId];
  if (!pattern) {
    console.error(`Pattern ${patternId} not found`);
    return [];
  }

  const rootSemitone = NOTE_TO_SEMITONE[rootNote] || 0;

  return pattern.notes.map((note, index) => {
    const targetSemitone = rootSemitone + note.interval;
    const stringSemitone = STRING_SEMITONES[note.string];
    const fret = targetSemitone - stringSemitone;
    const adjustedFret = Math.max(0, Math.min(24, fret));

    return {
      string: note.string,
      fret: adjustedFret,
      id: index
    };
  });
}

export function getPatternInfo(patternId) {
  return PATTERNS[patternId] || null;
}

export function getPatternsByCategory() {
  const grouped = {};
  Object.values(PATTERNS).forEach(pattern => {
    if (!grouped[pattern.category]) {
      grouped[pattern.category] = [];
    }
    grouped[pattern.category].push(pattern);
  });
  return grouped;
}

export function formatNoteName(note) {
  if (!note) return '';
  return note.replace('#', '♯').replace('b', '♭');
}

export function getCategoryInfo(patternId) {
  const pattern = PATTERNS[patternId];
  if (!pattern) return null;
  return CATEGORIES.find(cat => cat.id === pattern.category) || null;
}

export function getHeaderInfo(pattern1Id, pattern2Id) {
  const cat1 = getCategoryInfo(pattern1Id);
  const cat2 = getCategoryInfo(pattern2Id);
  
  if (cat1 && cat2 && cat1.type === 'artist' && cat1.id === cat2.id) {
    return {
      displayName: cat1.artist,
      subtitle: cat1.subtitle,
      type: 'artist'
    };
  }
  
  if (cat1?.type === 'artist') return { displayName: cat1.artist, subtitle: cat1.subtitle, type: 'artist' };
  if (cat2?.type === 'artist') return { displayName: cat2.artist, subtitle: cat2.subtitle, type: 'artist' };
  
  const pattern1 = PATTERNS[pattern1Id];
  const avgDifficulty = pattern1 ? pattern1.difficulty : 3;
  const difficultyLabel = avgDifficulty <= 2 ? 'Beginner' : avgDifficulty <= 3 ? 'Intermediate' : 'Advanced';
  
  return {
    displayName: `${difficultyLabel} Practice`,
    subtitle: cat1?.subtitle || 'Arpeggio Training',
    type: 'difficulty',
    difficulty: avgDifficulty
  };
}

export const DEFAULT_EXERCISE = {
  patternId: 'linear11thsMaj',
  rootNote: 'E',
  secondPatternId: 'linear11thsMin', 
  secondRootNote: 'F'
};