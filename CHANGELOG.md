# Changelog

All notable changes to Bass Academy will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.3.1] - 2026-01-08

### Added
- **Custom Exercise Builder** — Create exercises note-by-note with visual fretboard editor
- **Visual Fretboard Editor** — Interactive 4-string × 13-fret grid for composing exercises
- **Technique Selection** — Choose from Normal, Slap, Pop, Hammer-On, Mute per note
- **Exercise Management** — Save, edit, duplicate, and delete custom exercises
- **Import/Export JSON** — Share exercises via `.bass.json` files
- **Search & Filter** — Find exercises by name or difficulty level
- **Auto-Save Drafts** — Work-in-progress saved every 30 seconds
- **CustomExerciseManager.js** — Service class for CRUD and localStorage
- **CustomBuilderHub.jsx** — Exercise list with management UI
- **VisualFretboardEditor.jsx** — Interactive fretboard component
- **CustomBuilderRouter.jsx** — Navigation between builder views
- **customExerciseLibrary.js** — Format conversion helpers

### Changed
- Updated App.jsx with custom builder routing
- Updated HomeScreen.jsx with Custom Builder card
- Updated BassTrainer.jsx to support custom exercise playback
- Updated README.md with Executive Summary and PWA install guide

## [2.3.0] - 2026-01-07

### Added
- **Fullscreen Practice Mode** — Immersive tablature view with integrated controls
- **In-Fullscreen Controls** — Play/Stop, Tempo, Volume sliders
- **Keyboard Shortcuts** — Space for Play/Pause, ESC to exit fullscreen
- **Mobile Landscape Optimization** — Better layout for horizontal practice
- **Cross-Browser Fullscreen API** — Chrome, Firefox, Safari, Edge support
- **Practice Session Statistics** — Track practice time and sessions
- **Root Note Selection in Fullscreen** — Change keys while practicing

## [2.2.0] - 2026-01-06

### Added
- **Artist Selection Home Screen** — Choose from Patitucci, Wooten, Flea, Jaco
- **Multi-Artist Exercise Library** — 16+ patterns from legendary bassists
- **Improved Responsive Design** — Better mobile experience
- **Interactive Dots Background** — Dynamic canvas animation

## [2.1.0] - 2026-01-05

### Added
- **PWA Support** — Offline-first with service worker
- **Install Banner** — Prompts users to install the app
- **Update Notification** — Alerts when new version available
- **Offline Indicator** — Shows connection status

## [2.0.0] - 2026-01-04

### Added
- Complete rewrite with React 19 + Vite 6
- Tailwind CSS 4.1 styling
- Web Audio API synthesis
- Fretboard visualization mode
- Metronome with triplet subdivisions
- Light/Dark/Practice themes
- LocalStorage state persistence

---

**Full Changelog:** [GitHub Releases](https://github.com/juliandeveloper05/Bass-Academy-Interactive-Bass-Training/releases)
