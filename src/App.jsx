import React, { useState, Component } from 'react';
import HomeScreen from './components/HomeScreen';
import BassTrainer from './BassTrainer';
import CustomBuilderRouter from './components/builder/CustomBuilderRouter';
import './App.css';

// Error Boundary para capturar errores
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '40px', 
          backgroundColor: '#1B263B', 
          color: '#F8F5F0', 
          minHeight: '100vh',
          fontFamily: 'Inter, sans-serif'
        }}>
          <h1 style={{ color: '#EF4444' }}>❌ Error en la aplicación</h1>
          <p style={{ color: '#C9A554' }}>Algo salió mal.</p>
          <pre style={{ 
            background: '#0D1B2A', 
            padding: '20px', 
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '12px',
            color: '#F97316'
          }}>
            {this.state.error?.toString()}
            {'\n\n'}
            {this.state.errorInfo?.componentStack}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '12px 24px',
              background: '#C9A554',
              color: '#0D1B2A',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            🔄 Recargar Aplicación
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const App = () => {
  // Navigation states
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [customExerciseConfig, setCustomExerciseConfig] = useState(null);

  /**
   * Navigate to trainer with specific artist
   */
  const handleArtistSelect = (artistId) => {
    console.log("Artista seleccionado:", artistId);
    setSelectedArtist(artistId);
    setCustomExerciseConfig(null);
    setCurrentScreen('trainer');
  };

  /**
   * Navigate to Custom Builder
   */
  const handleCustomBuilderSelect = () => {
    console.log("Navegando a Custom Builder");
    setCurrentScreen('customBuilder');
  };

  /**
   * Navigate to trainer with custom exercise
   */
  const handlePlayCustomExercise = (exerciseConfig) => {
    console.log("Playing custom exercise:", exerciseConfig);
    setCustomExerciseConfig(exerciseConfig);
    setSelectedArtist(null);
    setCurrentScreen('trainer');
  };

  /**
   * Go back to home
   */
  const handleBack = () => {
    setCurrentScreen('home');
    setSelectedArtist(null);
    setCustomExerciseConfig(null);
  };

  // Render current screen
  return (
    <div className="app-container">
      {currentScreen === 'home' ? (
        <HomeScreen 
          onSelectArtist={handleArtistSelect}
          onSelectCustomBuilder={handleCustomBuilderSelect}
        />
      ) : currentScreen === 'customBuilder' ? (
        <ErrorBoundary>
          <CustomBuilderRouter
            onBack={handleBack}
            onPlayExercise={handlePlayCustomExercise}
          />
        </ErrorBoundary>
      ) : (
        <ErrorBoundary>
          <BassTrainer 
            selectedCategory={selectedArtist}
            customExerciseConfig={customExerciseConfig}
            onBack={handleBack}
          />
        </ErrorBoundary>
      )}
    </div>
  );
};

export default App;