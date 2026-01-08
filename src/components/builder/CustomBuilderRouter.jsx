import React, { useState } from 'react';

// Import custom builder components
import CustomBuilderHub from './CustomBuilderHub';
import VisualFretboardEditor from './VisualFretboardEditor';
import CustomExerciseManager from '../../services/CustomExerciseManager';

/**
 * Custom Builder Router
 * Manages navigation between Hub, Editor, and Trainer
 */
const CustomBuilderRouter = ({ onBack, onPlayExercise }) => {
  const [currentView, setCurrentView] = useState('hub'); // 'hub' | 'editor'
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  /**
   * Handle create new exercise
   */
  const handleCreateNew = () => {
    const newExercise = CustomExerciseManager.create();
    setSelectedExercise(newExercise);
    setIsEditMode(true);
    setCurrentView('editor');
  };

  /**
   * Handle select exercise from hub
   */
  const handleSelectExercise = (exercise, editMode = false) => {
    setSelectedExercise(exercise);
    setIsEditMode(editMode);
    
    if (editMode) {
      setCurrentView('editor');
    } else {
      // Convert custom exercise to trainer format and play
      onPlayExercise(convertToTrainerFormat(exercise));
    }
  };

  /**
   * Handle save from editor
   */
  const handleSaveExercise = async (exercise) => {
    CustomExerciseManager.save(exercise);
    setSelectedExercise(exercise);
    // Stay in editor after save
  };

  /**
   * Handle preview from editor
   */
  const handlePreview = (exercise) => {
    // Save draft first
    CustomExerciseManager.save(exercise);
    // Play it
    onPlayExercise(convertToTrainerFormat(exercise));
  };

  /**
   * Handle back from editor
   */
  const handleBackFromEditor = () => {
    setCurrentView('hub');
    setSelectedExercise(null);
    setIsEditMode(false);
  };

  /**
   * Convert custom exercise to BassTrainer format
   */
  const convertToTrainerFormat = (customExercise) => {
    return {
      patternId: `custom_${customExercise.id}`,
      rootNote: customExercise.pattern.rootNote || 'E',
      secondPatternId: `custom_${customExercise.id}`,
      secondRootNote: customExercise.pattern.rootNote || 'E',
      tempo: customExercise.tempo,
      isCustom: true,
      customData: customExercise,
    };
  };

  // Render current view
  switch (currentView) {
    case 'editor':
      return (
        <VisualFretboardEditor
          exercise={selectedExercise}
          onSave={handleSaveExercise}
          onBack={handleBackFromEditor}
          onPreview={handlePreview}
        />
      );

    case 'hub':
    default:
      return (
        <CustomBuilderHub
          onSelectExercise={handleSelectExercise}
          onCreateNew={handleCreateNew}
          onBack={onBack}
        />
      );
  }
};

export default CustomBuilderRouter;
