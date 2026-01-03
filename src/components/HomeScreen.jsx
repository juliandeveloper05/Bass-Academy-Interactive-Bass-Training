import React from 'react';
import { Music, Zap, Waves, Disc } from 'lucide-react';

/**
 * Artist data for HomeScreen
 */
const ARTISTS = [
  {
    id: 'patitucci',
    name: 'John Patitucci',
    icon: '🎸',
    subtitle: 'Modern Jazz Bass',
    color: 'gold',
    techniques: ['Linear 11ths (Maj)', 'Linear 11ths (Min)'],
    description: 'Arpegios extendidos en tresillos',
    gradient: 'linear-gradient(135deg, #C9A554 0%, #E0C285 100%)'
  },
  {
    id: 'wooten',
    name: 'Victor Wooten',
    icon: '🔥',
    subtitle: 'Advanced Slap Techniques',
    color: 'red',
    techniques: ['Double Thumbing', 'Open Hammer Pluck'],
    description: 'Técnicas de slap avanzadas',
    gradient: 'linear-gradient(135deg, #EF4444 0%, #F97316 100%)'
  },
  {
    id: 'flea',
    name: 'Flea',
    icon: '🌶️',
    subtitle: 'Funk-Punk Slap Bass',
    color: 'orange',
    techniques: ['Slap & Pop Octaves', 'Ghost Notes Groove'],
    description: 'Higher Ground • Give It Away',
    gradient: 'linear-gradient(135deg, #F97316 0%, #FACC15 100%)'
  },
  {
    id: 'jaco',
    name: 'Jaco Pastorius',
    icon: '🎹',
    subtitle: 'Fretless Fingerstyle Mastery',
    color: 'blue',
    techniques: ['Natural Harmonics', 'Artificial Harmonics', '16th Note Funk', 'Melodic Lines'],
    description: 'Portrait of Tracy • The Chicken',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)'
  }
];

/**
 * ArtistCard Component
 */
function ArtistCard({ artist, onClick, index }) {
  return (
    <button
      className="artist-card"
      onClick={() => onClick(artist.id)}
      style={{
        '--card-gradient': artist.gradient,
        '--delay': `${index * 0.1}s`
      }}
      aria-label={`Select ${artist.name} exercises`}
    >
      <div className="artist-card-glow" />
      
      <div className="artist-card-content">
        <div className="artist-icon">
          <span className="artist-emoji">{artist.icon}</span>
        </div>
        
        <div className="artist-info">
          <h3 className="artist-name">{artist.name}</h3>
          <p className="artist-subtitle">{artist.subtitle}</p>
          <p className="artist-description">{artist.description}</p>
        </div>
        
        <div className="artist-techniques">
          {artist.techniques.slice(0, 3).map((tech, i) => (
            <span key={i} className="technique-tag">
              {tech}
            </span>
          ))}
          {artist.techniques.length > 3 && (
            <span className="technique-more">+{artist.techniques.length - 3}</span>
          )}
        </div>
        
        <div className="artist-card-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </button>
  );
}

/**
 * HomeScreen Component - Main entry point with artist selection
 */
function HomeScreen({ onSelectArtist }) {
  return (
    <div className="home-screen">
      {/* Background decorations */}
      <div className="home-bg-decoration home-bg-1" />
      <div className="home-bg-decoration home-bg-2" />
      
      {/* Header */}
      <header className="home-header">
        <div className="home-logo">
          <Music className="home-logo-icon" size={40} />
        </div>
        <h1 className="home-title">
          <span className="title-bass">Bass</span>
          <span className="title-academy">Academy</span>
          <span className="title-year">2026</span>
        </h1>
        <p className="home-subtitle">Master the Legends</p>
      </header>
      
      {/* Artist Grid */}
      <section className="artist-grid">
        {ARTISTS.map((artist, index) => (
          <ArtistCard
            key={artist.id}
            artist={artist}
            onClick={onSelectArtist}
            index={index}
          />
        ))}
      </section>
      
      {/* Footer hint */}
      <footer className="home-footer">
        <p>Select an artist to begin training</p>
      </footer>
    </div>
  );
}

export default HomeScreen;
export { ARTISTS };
