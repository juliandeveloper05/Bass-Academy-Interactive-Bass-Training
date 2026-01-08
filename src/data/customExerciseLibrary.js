/**
 * Custom Exercise Library Helpers
 * Bass Academy - 2026
 * 
 * Helper functions to convert custom exercises to BassTrainer format
 */

/**
 * Convert custom exercise to tabData format for BassTrainer
 * @param {Object} customExercise - Custom exercise object
 * @returns {Array} - Array of tab data notes
 */
export function generateCustomTabData(customExercise) {
  if (!customExercise || !customExercise.pattern || !customExercise.pattern.notes) {
    console.warn('Invalid custom exercise data');
    return [];
  }

  const { notes } = customExercise.pattern;

  // Convert custom note format to tab data format
  return notes.map((note, index) => ({
    string: note.string,
    fret: note.fret,
    id: index,
    technique: note.technique || 'normal',
    duration: note.duration || 1,
  }));
}

/**
 * Validate custom exercise structure
 * @param {Object} exercise - Custom exercise to validate
 * @returns {Object} - { isValid: boolean, errors: string[] }
 */
export function validateCustomExercise(exercise) {
  const errors = [];

  // Check required fields
  if (!exercise.name || exercise.name.trim() === '') {
    errors.push('Exercise name is required');
  }

  if (!exercise.pattern) {
    errors.push('Pattern data is missing');
    return { isValid: false, errors };
  }

  if (!Array.isArray(exercise.pattern.notes)) {
    errors.push('Notes array is missing or invalid');
    return { isValid: false, errors };
  }

  if (exercise.pattern.notes.length === 0) {
    errors.push('Exercise must have at least one note');
  }

  // Validate each note
  exercise.pattern.notes.forEach((note, index) => {
    if (!note.string || !['E', 'A', 'D', 'G'].includes(note.string)) {
      errors.push(`Note ${index + 1}: Invalid string "${note.string}"`);
    }

    if (typeof note.fret !== 'number' || note.fret < 0 || note.fret > 24) {
      errors.push(`Note ${index + 1}: Invalid fret ${note.fret}`);
    }
  });

  // Validate tempo
  if (exercise.tempo && (exercise.tempo < 40 || exercise.tempo > 200)) {
    errors.push('Tempo must be between 40 and 200 BPM');
  }

  // Validate difficulty
  if (exercise.difficulty && (exercise.difficulty < 1 || exercise.difficulty > 5)) {
    errors.push('Difficulty must be between 1 and 5');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Calculate exercise duration in seconds
 * @param {Object} exercise - Custom exercise
 * @returns {number} - Duration in seconds
 */
export function calculateExerciseDuration(exercise) {
  if (!exercise || !exercise.pattern || !exercise.pattern.notes) {
    return 0;
  }

  const { notes, notesPerBeat } = exercise.pattern;
  const tempo = exercise.tempo || 100;

  // Calculate total beats
  const totalBeats = notes.length / (notesPerBeat || 3);

  // Convert to seconds: (beats / BPM) * 60
  const durationSeconds = (totalBeats / tempo) * 60;

  return Math.round(durationSeconds);
}

/**
 * Get exercise statistics
 * @param {Object} exercise - Custom exercise
 * @returns {Object} - Statistics object
 */
export function getExerciseStats(exercise) {
  if (!exercise || !exercise.pattern || !exercise.pattern.notes) {
    return {
      totalNotes: 0,
      uniqueFrets: 0,
      stringsUsed: 0,
      techniques: [],
      estimatedDuration: 0,
    };
  }

  const { notes } = exercise.pattern;

  // Count unique frets
  const uniqueFrets = new Set(notes.map(n => n.fret)).size;

  // Count strings used
  const stringsUsed = new Set(notes.map(n => n.string)).size;

  // Get unique techniques
  const techniques = [...new Set(notes.map(n => n.technique || 'normal'))];

  return {
    totalNotes: notes.length,
    uniqueFrets,
    stringsUsed,
    techniques,
    estimatedDuration: calculateExerciseDuration(exercise),
  };
}

export default {
  generateCustomTabData,
  validateCustomExercise,
  calculateExerciseDuration,
  getExerciseStats,
};
