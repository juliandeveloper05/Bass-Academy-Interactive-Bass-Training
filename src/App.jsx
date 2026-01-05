import React, { useState, Component } from 'react';
import HomeScreen from './components/HomeScreen';
import BassTrainer from './BassTrainer';
import './App.css';

// Error Boundary para capturar errores en BassTrainer
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
          <h1 style={{ color: '#EF4444' }}>❌ Error en BassTrainer</h1>
          <p style={{ color: '#C9A554' }}>Algo salió mal al cargar el entrenador.</p>
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
  // Estado para controlar qué pantalla vemos
  // 'home' = Pantalla de artistas
  // 'trainer' = Pantalla de práctica
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedArtist, setSelectedArtist] = useState(null);

  // Función para ir al entrenador con un artista específico
  const handleArtistSelect = (artistId) => {
    console.log("Artista seleccionado:", artistId); 
    setSelectedArtist(artistId);
    setCurrentScreen('trainer');
  };

  // Función para volver al inicio
  const handleBack = () => {
    setCurrentScreen('home');
    setSelectedArtist(null);
  };

  return (
    <div className="app-container">
      {currentScreen === 'home' ? (
        <HomeScreen onSelectArtist={handleArtistSelect} />
      ) : (
        <ErrorBoundary>
          <BassTrainer 
            selectedCategory={selectedArtist} 
            onBack={handleBack} 
          />
        </ErrorBoundary>
      )}
    </div>
  );
};

export default App;