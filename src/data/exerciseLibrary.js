/**
 * Exercise Library - Bass Trainer
 * Collection of arpeggio patterns and scales for bass practice
 */

// All notes in chromatic order (using bass-friendly positions)
export const NOTES = ['E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb'];

// Note to semitone mapping (from E = 0)
const NOTE_TO_SEMITONE = {
  'E': 0, 'F': 1, 'F#': 2, 'Gb': 2, 'G': 3, 'G#': 4, 'Ab': 4,
  'A': 5, 'A#': 6, 'Bb': 6, 'B': 7, 'C': 8, 'C#': 9, 'Db': 9,
  'D': 10, 'D#': 11, 'Eb': 11
};

// String open note semitones (from E = 0)
const STRING_SEMITONES = {
  'E': 0,
  'A': 5,
  'D': 10,
  'G': 15
};

/**
 * Exercise patterns library
 * Each pattern defines:
 * - name: Display name
 * - description: Short explanation
 * - category: Grouping category
 * - difficulty: 1-5 stars
 * - notes: Array of { interval, string } where interval is semitones from root
 * 
 * The pattern is defined for ascending then descending (like Patitucci Linear 11ths)
 */
export const PATTERNS = {
  // === Patitucci Linear 11ths Style ===
  linear11thsMaj: {
    id: 'linear11thsMaj',
    name: 'Linear 11ths (Major)',
    description: 'Arpegio Maj11 en tresillos - Estilo Patitucci',
    category: 'Patitucci',
    difficulty: 4,
    beatsPerMeasure: 4,
    notesPerBeat: 3,
    // Pattern: Root, 3rd, 5th, 7th, 9th, 11th (ascending) then descending
    // For E: E(0), G#(4), B(7), D#(11), F#(14), A(17) 
    notes: [
      // Ascending
      { interval: 0, string: 'E' },   // Root
      { interval: 4, string: 'E' },   // Major 3rd
      { interval: 7, string: 'A' },   // Perfect 5th (on A string)
      { interval: 11, string: 'D' },  // Major 7th (on D string)
      { interval: 16, string: 'D' },  // Major 9th (octave + 2)
      { interval: 17, string: 'G' },  // 11th (on G string)
      // Descending
      { interval: 17, string: 'G' },  // 11th
      { interval: 16, string: 'D' },  // 9th
      { interval: 11, string: 'D' },  // 7th
      { interval: 7, string: 'A' },   // 5th
      { interval: 4, string: 'E' },   // 3rd
      { interval: 0, string: 'E' },   // Root
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
      // Ascending - Minor intervals
      { interval: 0, string: 'E' },   // Root
      { interval: 3, string: 'E' },   // Minor 3rd
      { interval: 7, string: 'A' },   // Perfect 5th
      { interval: 10, string: 'D' },  // Minor 7th
      { interval: 14, string: 'D' },  // Minor 9th (octave + b2)? Actually 9th is same
      { interval: 17, string: 'G' },  // 11th
      // Descending
      { interval: 17, string: 'G' },
      { interval: 14, string: 'D' },
      { interval: 10, string: 'D' },
      { interval: 7, string: 'A' },
      { interval: 3, string: 'E' },
      { interval: 0, string: 'E' },
    ]
  },

  // === Basic 7th Arpeggios ===
  maj7: {
    id: 'maj7',
    name: 'Major 7th',
    description: 'Arpegio Maj7 básico - 1, 3, 5, 7',
    category: 'Basic 7ths',
    difficulty: 2,
    beatsPerMeasure: 4,
    notesPerBeat: 3,
    notes: [
      // Ascending through octaves
      { interval: 0, string: 'E' },   // Root
      { interval: 4, string: 'E' },   // Major 3rd
      { interval: 7, string: 'A' },   // 5th
      { interval: 11, string: 'D' },  // Major 7th
      { interval: 12, string: 'D' },  // Octave
      { interval: 16, string: 'G' },  // 3rd (octave up)
      // Descending
      { interval: 16, string: 'G' },
      { interval: 12, string: 'D' },
      { interval: 11, string: 'D' },
      { interval: 7, string: 'A' },
      { interval: 4, string: 'E' },
      { interval: 0, string: 'E' },
    ]
  },

  min7: {
    id: 'min7',
    name: 'Minor 7th',
    description: 'Arpegio m7 básico - 1, b3, 5, b7',
    category: 'Basic 7ths',
    difficulty: 2,
    beatsPerMeasure: 4,
    notesPerBeat: 3,
    notes: [
      { interval: 0, string: 'E' },
      { interval: 3, string: 'E' },   // Minor 3rd
      { interval: 7, string: 'A' },
      { interval: 10, string: 'D' },  // Minor 7th
      { interval: 12, string: 'D' },
      { interval: 15, string: 'G' },  // b3 octave up
      { interval: 15, string: 'G' },
      { interval: 12, string: 'D' },
      { interval: 10, string: 'D' },
      { interval: 7, string: 'A' },
      { interval: 3, string: 'E' },
      { interval: 0, string: 'E' },
    ]
  },

  dom7: {
    id: 'dom7',
    name: 'Dominant 7th',
    description: 'Arpegio 7 - 1, 3, 5, b7',
    category: 'Basic 7ths',
    difficulty: 2,
    beatsPerMeasure: 4,
    notesPerBeat: 3,
    notes: [
      { interval: 0, string: 'E' },
      { interval: 4, string: 'E' },   // Major 3rd
      { interval: 7, string: 'A' },
      { interval: 10, string: 'D' },  // Dominant 7th (b7)
      { interval: 12, string: 'D' },
      { interval: 16, string: 'G' },
      { interval: 16, string: 'G' },
      { interval: 12, string: 'D' },
      { interval: 10, string: 'D' },
      { interval: 7, string: 'A' },
      { interval: 4, string: 'E' },
      { interval: 0, string: 'E' },
    ]
  },

  halfDim7: {
    id: 'halfDim7',
    name: 'Half Diminished',
    description: 'Arpegio m7b5 - 1, b3, b5, b7',
    category: 'Basic 7ths',
    difficulty: 3,
    beatsPerMeasure: 4,
    notesPerBeat: 3,
    notes: [
      { interval: 0, string: 'E' },
      { interval: 3, string: 'E' },   // Minor 3rd
      { interval: 6, string: 'A' },   // Diminished 5th
      { interval: 10, string: 'D' },  // Minor 7th
      { interval: 12, string: 'D' },
      { interval: 15, string: 'G' },
      { interval: 15, string: 'G' },
      { interval: 12, string: 'D' },
      { interval: 10, string: 'D' },
      { interval: 6, string: 'A' },
      { interval: 3, string: 'E' },
      { interval: 0, string: 'E' },
    ]
  },

  dim7: {
    id: 'dim7',
    name: 'Diminished 7th',
    description: 'Arpegio dim7 - 1, b3, b5, bb7',
    category: 'Basic 7ths',
    difficulty: 3,
    beatsPerMeasure: 4,
    notesPerBeat: 3,
    notes: [
      { interval: 0, string: 'E' },
      { interval: 3, string: 'E' },
      { interval: 6, string: 'A' },
      { interval: 9, string: 'D' },   // Diminished 7th (bb7)
      { interval: 12, string: 'D' },
      { interval: 15, string: 'G' },
      { interval: 15, string: 'G' },
      { interval: 12, string: 'D' },
      { interval: 9, string: 'D' },
      { interval: 6, string: 'A' },
      { interval: 3, string: 'E' },
      { interval: 0, string: 'E' },
    ]
  },

  minMaj7: {
    id: 'minMaj7',
    name: 'Minor Major 7th',
    description: 'Arpegio m(Maj7) - 1, b3, 5, 7',
    category: 'Advanced 7ths',
    difficulty: 4,
    beatsPerMeasure: 4,
    notesPerBeat: 3,
    notes: [
      { interval: 0, string: 'E' },
      { interval: 3, string: 'E' },   // Minor 3rd
      { interval: 7, string: 'A' },
      { interval: 11, string: 'D' },  // Major 7th
      { interval: 12, string: 'D' },
      { interval: 15, string: 'G' },
      { interval: 15, string: 'G' },
      { interval: 12, string: 'D' },
      { interval: 11, string: 'D' },
      { interval: 7, string: 'A' },
      { interval: 3, string: 'E' },
      { interval: 0, string: 'E' },
    ]
  },

  aug7: {
    id: 'aug7',
    name: 'Augmented 7th',
    description: 'Arpegio Maj7#5 - 1, 3, #5, 7',
    category: 'Advanced 7ths',
    difficulty: 4,
    beatsPerMeasure: 4,
    notesPerBeat: 3,
    notes: [
      { interval: 0, string: 'E' },
      { interval: 4, string: 'E' },
      { interval: 8, string: 'A' },   // Augmented 5th
      { interval: 11, string: 'D' },
      { interval: 12, string: 'D' },
      { interval: 16, string: 'G' },
      { interval: 16, string: 'G' },
      { interval: 12, string: 'D' },
      { interval: 11, string: 'D' },
      { interval: 8, string: 'A' },
      { interval: 4, string: 'E' },
      { interval: 0, string: 'E' },
    ]
  },

  // === VICTOR WOOTEN - Advanced Slap ===
  doubleThumbMaj7: {
    id: 'doubleThumbMaj7',
    name: 'Double Thumbing Maj7',
    description: 'Classical Thump style - Down/Up thumb en Maj7',
    category: 'VictorWooten',
    difficulty: 5,
    beatsPerMeasure: 4,
    notesPerBeat: 4, // 16th notes for slap
    notes: [
      // Pattern: Thumb down-up through arpeggio
      { interval: 0, string: 'E' },   // Root (thumb down)
      { interval: 0, string: 'E' },   // Root (thumb up)
      { interval: 4, string: 'E' },   // 3rd (thumb down)
      { interval: 4, string: 'E' },   // 3rd (thumb up)
      { interval: 7, string: 'A' },   // 5th (thumb down)
      { interval: 7, string: 'A' },   // 5th (thumb up)
      { interval: 11, string: 'D' },  // 7th (thumb down)
      { interval: 11, string: 'D' },  // 7th (thumb up)
      // Descending
      { interval: 11, string: 'D' },
      { interval: 11, string: 'D' },
      { interval: 7, string: 'A' },
      { interval: 7, string: 'A' },
      { interval: 4, string: 'E' },
      { interval: 4, string: 'E' },
      { interval: 0, string: 'E' },
      { interval: 0, string: 'E' },
    ]
  },

  doubleThumbMin7: {
    id: 'doubleThumbMin7',
    name: 'Double Thumbing m7',
    description: 'Classical Thump style - Down/Up thumb en m7',
    category: 'VictorWooten',
    difficulty: 5,
    beatsPerMeasure: 4,
    notesPerBeat: 4,
    notes: [
      { interval: 0, string: 'E' },
      { interval: 0, string: 'E' },
      { interval: 3, string: 'E' },   // Minor 3rd
      { interval: 3, string: 'E' },
      { interval: 7, string: 'A' },
      { interval: 7, string: 'A' },
      { interval: 10, string: 'D' },  // Minor 7th
      { interval: 10, string: 'D' },
      { interval: 10, string: 'D' },
      { interval: 10, string: 'D' },
      { interval: 7, string: 'A' },
      { interval: 7, string: 'A' },
      { interval: 3, string: 'E' },
      { interval: 3, string: 'E' },
      { interval: 0, string: 'E' },
      { interval: 0, string: 'E' },
    ]
  },

  openHammerDom7: {
    id: 'openHammerDom7',
    name: 'Open Hammer Pluck Dom7',
    description: 'Triplet pattern: Thumb → Hammer → Pluck',
    category: 'VictorWooten',
    difficulty: 4,
    beatsPerMeasure: 4,
    notesPerBeat: 3, // Triplets
    notes: [
      // Open hammer pluck triplets on Dom7
      { interval: 0, string: 'E' },   // Thumb (open/low)
      { interval: 4, string: 'E' },   // Hammer-on 3rd
      { interval: 7, string: 'A' },   // Pluck 5th
      { interval: 0, string: 'E' },
      { interval: 10, string: 'D' },  // Hammer b7
      { interval: 12, string: 'D' },  // Pluck octave
      // Descend
      { interval: 12, string: 'D' },
      { interval: 10, string: 'D' },
      { interval: 7, string: 'A' },
      { interval: 7, string: 'A' },
      { interval: 4, string: 'E' },
      { interval: 0, string: 'E' },
    ]
  },

  openHammerDim7: {
    id: 'openHammerDim7',
    name: 'Open Hammer Pluck Dim7',
    description: 'Triplet pattern en arpegio disminuido',
    category: 'VictorWooten',
    difficulty: 4,
    beatsPerMeasure: 4,
    notesPerBeat: 3,
    notes: [
      { interval: 0, string: 'E' },
      { interval: 3, string: 'E' },   // b3
      { interval: 6, string: 'A' },   // b5
      { interval: 0, string: 'E' },
      { interval: 9, string: 'D' },   // bb7
      { interval: 12, string: 'D' },
      { interval: 12, string: 'D' },
      { interval: 9, string: 'D' },
      { interval: 6, string: 'A' },
      { interval: 6, string: 'A' },
      { interval: 3, string: 'E' },
      { interval: 0, string: 'E' },
    ]
  },

  // === FLEA - Funk-Punk Slap ===
  slapOctavesMaj: {
    id: 'slapOctavesMaj',
    name: 'Slap Octaves Major',
    description: 'Higher Ground style - Slap/Pop octavas',
    category: 'Flea',
    difficulty: 3,
    beatsPerMeasure: 4,
    notesPerBeat: 4,
    notes: [
      // Slap-pop octave pattern (16ths with ghost notes implied)
      { interval: 0, string: 'E' },   // Slap root
      { interval: 0, string: 'E' },   // Ghost
      { interval: 12, string: 'D' },  // Pop octave
      { interval: 0, string: 'E' },   // Ghost
      { interval: 4, string: 'E' },   // Slap 3rd
      { interval: 4, string: 'E' },
      { interval: 16, string: 'G' },  // Pop octave+3rd
      { interval: 4, string: 'E' },
      { interval: 7, string: 'A' },   // Slap 5th
      { interval: 7, string: 'A' },
      { interval: 19, string: 'G' },  // Pop octave+5th
      { interval: 7, string: 'A' },
      { interval: 0, string: 'E' },
      { interval: 0, string: 'E' },
      { interval: 12, string: 'D' },
      { interval: 0, string: 'E' },
    ]
  },

  slapOctavesMin: {
    id: 'slapOctavesMin',
    name: 'Slap Octaves Minor',
    description: 'Funk octavas en tonalidad menor',
    category: 'Flea',
    difficulty: 3,
    beatsPerMeasure: 4,
    notesPerBeat: 4,
    notes: [
      { interval: 0, string: 'E' },
      { interval: 0, string: 'E' },
      { interval: 12, string: 'D' },
      { interval: 0, string: 'E' },
      { interval: 3, string: 'E' },   // Minor 3rd
      { interval: 3, string: 'E' },
      { interval: 15, string: 'G' },
      { interval: 3, string: 'E' },
      { interval: 7, string: 'A' },
      { interval: 7, string: 'A' },
      { interval: 19, string: 'G' },
      { interval: 7, string: 'A' },
      { interval: 0, string: 'E' },
      { interval: 0, string: 'E' },
      { interval: 12, string: 'D' },
      { interval: 0, string: 'E' },
    ]
  },

  ghostNotesFunk: {
    id: 'ghostNotesFunk',
    name: 'Ghost Notes Funk',
    description: 'Give It Away style - Notas fantasma percusivas',
    category: 'Flea',
    difficulty: 4,
    beatsPerMeasure: 4,
    notesPerBeat: 4,
    notes: [
      // Funk pattern with emphasis on pocket (ghost = same note, softer)
      { interval: 0, string: 'E' },   // Hit
      { interval: 0, string: 'E' },   // Ghost
      { interval: 0, string: 'E' },   // Ghost
      { interval: 3, string: 'E' },   // b3 (accent)
      { interval: 0, string: 'E' },
      { interval: 5, string: 'A' },   // 4th
      { interval: 0, string: 'E' },
      { interval: 0, string: 'E' },
      { interval: 7, string: 'A' },   // 5th (accent)
      { interval: 0, string: 'E' },
      { interval: 0, string: 'E' },
      { interval: 5, string: 'A' },
      { interval: 3, string: 'E' },
      { interval: 0, string: 'E' },
      { interval: 0, string: 'E' },
      { interval: 0, string: 'E' },
    ]
  },

  ghostNotesFusion: {
    id: 'ghostNotesFusion',
    name: 'Ghost Notes Fusion',
    description: 'Groove fusion con ghost notes melódicas',
    category: 'Flea',
    difficulty: 4,
    beatsPerMeasure: 4,
    notesPerBeat: 4,
    notes: [
      { interval: 0, string: 'E' },
      { interval: 0, string: 'E' },
      { interval: 4, string: 'E' },   // Major 3rd
      { interval: 0, string: 'E' },
      { interval: 7, string: 'A' },
      { interval: 0, string: 'E' },
      { interval: 0, string: 'E' },
      { interval: 11, string: 'D' },  // Maj7
      { interval: 12, string: 'D' },  // Octave
      { interval: 0, string: 'E' },
      { interval: 0, string: 'E' },
      { interval: 11, string: 'D' },
      { interval: 7, string: 'A' },
      { interval: 0, string: 'E' },
      { interval: 4, string: 'E' },
      { interval: 0, string: 'E' },
    ]
  },

  // === JACO PASTORIUS - Fingerstyle ===
  naturalHarmonicsMaj: {
    id: 'naturalHarmonicsMaj',
    name: 'Natural Harmonics Maj',
    description: 'Portrait of Tracy style - Armónicos naturales',
    category: 'JacoPastorius',
    difficulty: 3,
    beatsPerMeasure: 4,
    notesPerBeat: 2, // Slower, melodic
    notes: [
      // Harmonics at 12th, 7th, 5th positions (intervals approximate pitches)
      { interval: 12, string: 'E' },  // 12th fret harmonic = octave
      { interval: 19, string: 'E' },  // 7th fret harmonic
      { interval: 24, string: 'E' },  // 5th fret harmonic (2 octaves)
      { interval: 12, string: 'A' },
      { interval: 19, string: 'A' },
      { interval: 24, string: 'A' },
      { interval: 12, string: 'D' },
      { interval: 19, string: 'D' },
    ]
  },

  naturalHarmonicsMin: {
    id: 'naturalHarmonicsMin',
    name: 'Natural Harmonics Min',
    description: 'Melodía en armónicos - Tonalidad menor',
    category: 'JacoPastorius',
    difficulty: 3,
    beatsPerMeasure: 4,
    notesPerBeat: 2,
    notes: [
      { interval: 12, string: 'E' },
      { interval: 15, string: 'E' },  // Minor flavored
      { interval: 19, string: 'E' },
      { interval: 12, string: 'A' },
      { interval: 15, string: 'A' },
      { interval: 19, string: 'A' },
      { interval: 12, string: 'D' },
      { interval: 15, string: 'D' },
    ]
  },

  sixteenthFunkBb: {
    id: 'sixteenthFunkBb',
    name: '16th Note Funk Bb',
    description: 'The Chicken style - Línea funk en Bb',
    category: 'JacoPastorius',
    difficulty: 4,
    beatsPerMeasure: 4,
    notesPerBeat: 4,
    notes: [
      // The Chicken inspired 16th note funk
      { interval: 0, string: 'A' },   // Bb root (fret 1 on A)
      { interval: 0, string: 'A' },   // Ghost
      { interval: 3, string: 'A' },   // Db
      { interval: 0, string: 'A' },
      { interval: 5, string: 'A' },   // Eb
      { interval: 3, string: 'A' },
      { interval: 0, string: 'A' },
      { interval: 0, string: 'A' },
      { interval: 0, string: 'A' },
      { interval: 0, string: 'A' },
      { interval: 3, string: 'A' },
      { interval: 5, string: 'A' },
      { interval: 6, string: 'A' },   // E (tritone)
      { interval: 5, string: 'A' },
      { interval: 3, string: 'A' },
      { interval: 0, string: 'A' },
    ]
  },

  sixteenthFunkEb: {
    id: 'sixteenthFunkEb',
    name: '16th Note Funk Eb',
    description: 'Variación The Chicken en Eb',
    category: 'JacoPastorius',
    difficulty: 4,
    beatsPerMeasure: 4,
    notesPerBeat: 4,
    notes: [
      { interval: 0, string: 'D' },   // Eb root
      { interval: 0, string: 'D' },
      { interval: 3, string: 'D' },   // Gb
      { interval: 0, string: 'D' },
      { interval: 5, string: 'D' },   // Ab
      { interval: 3, string: 'D' },
      { interval: 0, string: 'D' },
      { interval: 0, string: 'D' },
      { interval: 0, string: 'D' },
      { interval: 0, string: 'D' },
      { interval: 3, string: 'D' },
      { interval: 5, string: 'D' },
      { interval: 7, string: 'D' },   // Bb
      { interval: 5, string: 'D' },
      { interval: 3, string: 'D' },
      { interval: 0, string: 'D' },
    ]
  },

  melodicLinesMaj7: {
    id: 'melodicLinesMaj7',
    name: 'Melodic Lines Maj7',
    description: 'Donna Lee style - Arpegio melódico Maj7',
    category: 'JacoPastorius',
    difficulty: 4,
    beatsPerMeasure: 4,
    notesPerBeat: 4,
    notes: [
      // Bebop-style melodic line on Maj7
      { interval: 0, string: 'E' },
      { interval: 2, string: 'E' },   // 9th
      { interval: 4, string: 'E' },   // 3rd
      { interval: 5, string: 'A' },   // 11th
      { interval: 7, string: 'A' },   // 5th
      { interval: 9, string: 'A' },   // 13th
      { interval: 11, string: 'D' },  // 7th
      { interval: 12, string: 'D' },  // Octave
      { interval: 14, string: 'D' },  // 9th up
      { interval: 12, string: 'D' },
      { interval: 11, string: 'D' },
      { interval: 9, string: 'A' },
      { interval: 7, string: 'A' },
      { interval: 5, string: 'A' },
      { interval: 4, string: 'E' },
      { interval: 0, string: 'E' },
    ]
  },

  melodicLinesMin7: {
    id: 'melodicLinesMin7',
    name: 'Melodic Lines m7',
    description: 'Línea melódica estilo bebop en m7',
    category: 'JacoPastorius',
    difficulty: 4,
    beatsPerMeasure: 4,
    notesPerBeat: 4,
    notes: [
      { interval: 0, string: 'E' },
      { interval: 2, string: 'E' },   // 9th
      { interval: 3, string: 'E' },   // b3
      { interval: 5, string: 'A' },   // 11th
      { interval: 7, string: 'A' },   // 5th
      { interval: 8, string: 'A' },   // b13
      { interval: 10, string: 'D' },  // b7
      { interval: 12, string: 'D' },
      { interval: 14, string: 'D' },
      { interval: 12, string: 'D' },
      { interval: 10, string: 'D' },
      { interval: 8, string: 'A' },
      { interval: 7, string: 'A' },
      { interval: 5, string: 'A' },
      { interval: 3, string: 'E' },
      { interval: 0, string: 'E' },
    ]
  },
};

// Categories for grouping in UI
// type: 'artist' shows artist name in header, 'difficulty' shows difficulty level
export const CATEGORIES = [
  { 
    id: 'Patitucci', 
    name: 'Patitucci Linear 11ths', 
    icon: '🎸',
    type: 'artist',
    artist: 'John Patitucci',
    subtitle: 'Modern Jazz Bass Technique'
  },
  { 
    id: 'VictorWooten', 
    name: 'Victor Wooten Slap', 
    icon: '🔥',
    type: 'artist',
    artist: 'Victor Wooten',
    subtitle: 'Advanced Slap Techniques'
  },
  { 
    id: 'Flea', 
    name: 'Flea Funk-Punk', 
    icon: '🌶️',
    type: 'artist',
    artist: 'Flea',
    subtitle: 'Funk-Punk Slap Bass'
  },
  { 
    id: 'JacoPastorius', 
    name: 'Jaco Pastorius Fingerstyle', 
    icon: '🎹',
    type: 'artist',
    artist: 'Jaco Pastorius',
    subtitle: 'Fretless Fingerstyle Mastery'
  },
  { 
    id: 'Basic 7ths', 
    name: 'Basic 7th Arpeggios', 
    icon: '🎵',
    type: 'difficulty',
    artist: null,
    subtitle: 'Fundamental Arpeggio Training'
  },
  { 
    id: 'Advanced 7ths', 
    name: 'Advanced 7th Arpeggios', 
    icon: '⭐',
    type: 'difficulty',
    artist: null,
    subtitle: 'Extended Harmony Studies'
  },
];

/**
 * Generate tab data from a pattern and root note
 * @param {string} patternId - The pattern ID from PATTERNS
 * @param {string} rootNote - The root note (e.g., 'E', 'F#', 'Bb')
 * @returns {Array} - Array of { string, fret, id } for tablature display
 */
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

    // If fret is negative, we need to use a different string
    // For now, just clamp to valid fret range
    const adjustedFret = Math.max(0, Math.min(24, fret));

    return {
      string: note.string,
      fret: adjustedFret,
      id: index
    };
  });
}

/**
 * Get pattern info for display
 * @param {string} patternId 
 * @returns {Object} Pattern metadata
 */
export function getPatternInfo(patternId) {
  return PATTERNS[patternId] || null;
}

/**
 * Get all patterns grouped by category
 * @returns {Object} Patterns grouped by category
 */
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

/**
 * Get the display name for a root note with proper accidentals
 * @param {string} note 
 * @returns {string}
 */
export function formatNoteName(note) {
  return note.replace('#', '♯').replace('b', '♭');
}

/**
 * Get category info from a pattern ID
 * @param {string} patternId 
 * @returns {Object} Category metadata including artist info
 */
export function getCategoryInfo(patternId) {
  const pattern = PATTERNS[patternId];
  if (!pattern) return null;
  
  return CATEGORIES.find(cat => cat.id === pattern.category) || null;
}

/**
 * Get header info based on selected patterns
 * Returns artist name if both patterns are from same artist, otherwise difficulty info
 * @param {string} pattern1Id 
 * @param {string} pattern2Id 
 * @returns {Object} { displayName, subtitle, type }
 */
export function getHeaderInfo(pattern1Id, pattern2Id) {
  const cat1 = getCategoryInfo(pattern1Id);
  const cat2 = getCategoryInfo(pattern2Id);
  
  // If both patterns are from the same artist category
  if (cat1 && cat2 && cat1.type === 'artist' && cat1.id === cat2.id) {
    return {
      displayName: cat1.artist,
      subtitle: cat1.subtitle,
      type: 'artist'
    };
  }
  
  // If at least one is artist-based, show that artist
  if (cat1?.type === 'artist') {
    return {
      displayName: cat1.artist,
      subtitle: cat1.subtitle,
      type: 'artist'
    };
  }
  
  if (cat2?.type === 'artist') {
    return {
      displayName: cat2.artist,
      subtitle: cat2.subtitle,
      type: 'artist'
    };
  }
  
  // Otherwise show difficulty-based header
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

/**
 * Default exercise configuration
 */
export const DEFAULT_EXERCISE = {
  patternId: 'linear11thsMaj',
  rootNote: 'E',
  secondPatternId: 'linear11thsMin', 
  secondRootNote: 'F'
};
