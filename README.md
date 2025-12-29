# 🎸 John Patitucci Jazz Bass Academy

<div align="center">

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

**Interactive bass practice tool for mastering linear arpeggios**

[Demo](#-demo) • [Features](#-features) • [Installation](#-installation) • [Roadmap](#-roadmap)

</div>

---

## 📖 About

A specialized practice tool for bassists looking to master **linear arpeggios**, a technique popularized by jazz fusion legend **John Patitucci**. 

Unlike traditional "box shape" playing, this exercise focuses on extending arpeggios horizontally and vertically across the fretboard using **11th chord voicings** (Emaj11 → Fm11).

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎯 **Interactive Tablature** | Real-time visual feedback highlighting notes as they play |
| 🔊 **Web Audio Engine** | Custom synthesizer built with Web Audio API (no external samples) |
| ⏱️ **Tempo Control** | Adjustable BPM from 40-160 for practice at any speed |
| 🔄 **Loop Mode** | Continuous practice without interruption |
| 📱 **Responsive Design** | Optimized layouts for desktop and mobile |
| 🎨 **Premium UI** | Modern glassmorphism design with smooth animations |

## 🎵 Music Theory

- **Chords:** Emaj11 → Fm11 (chromatic movement)
- **Rhythm:** Triplet phrasing (3 notes per beat)
- **Technique:** Linear arpeggio across all 4 strings
- **Extensions:** Focus on 9ths and 11ths

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/bass-trainer.git

# Navigate to project
cd bass-trainer

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 🛠️ Tech Stack

- **Framework:** React 19.2 with React Compiler
- **Build Tool:** Vite 7.2
- **Styling:** Tailwind CSS 4.1
- **Icons:** Lucide React
- **Audio:** Web Audio API

## 📁 Project Structure

```
bass-trainer/
├── src/
│   ├── components/
│   │   └── Footer.jsx
│   ├── assets/
│   ├── App.jsx          # Main component
│   ├── App.css
│   ├── index.css        # Design system
│   └── main.jsx
├── public/
├── index.html
├── vite.config.js
└── package.json
```

## 🗺️ Roadmap

### Phase 1: Foundation
- [ ] Refactor into smaller components
- [ ] Create `useBassAudio` custom hook
- [ ] Extract tab data to separate file

### Phase 2: Features
- [ ] Exercise library (Maj7, m7, dom7, etc.)
- [ ] Metronome with visual beat indicator
- [ ] Save preferences to LocalStorage
- [ ] Fretboard visualization mode

### Phase 3: Polish
- [ ] Light/Dark theme toggle
- [ ] PWA support for offline use
- [ ] Accessibility improvements (ARIA, keyboard nav)
- [ ] Real bass samples (Web Audio)

## 🎓 Resources

- [John Patitucci Official](https://johnpatitucci.com/)
- [Linear Arpeggios Explained (YouTube)](https://www.youtube.com/results?search_query=john+patitucci+linear+arpeggios)
- [Web Audio API Docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

## 📄 License

MIT © 2025

---

<div align="center">

**Made with ❤️ for bass players**

</div>