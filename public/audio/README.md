# Audio Samples para Bass Academy

Esta carpeta contiene los samples de audio para el bajo y metrónomo.

## Estructura Requerida

```
audio/
├── bass/
│   └── bass-note.wav      ← Sample de bajo (nota A2 recomendada)
└── metronome/
    └── click.wav          ← Sample de click de metrónomo
```

## Dónde descargar samples GRATUITOS

### Bass Sample
- **[Freesound - Bass Notes](https://freesound.org/search/?q=bass+guitar+note+one+shot)** - Busca "bass guitar A2" o "bass note"
- Recomendado: Una nota limpia de bajo eléctrico (A2 = 110Hz)

### Metronome Click
- **[Freesound - Metronome Click CC0](https://freesound.org/people/Sadiquecat/sounds/706655/)** - Licencia CC0
- **[Creazilla - Metronome Click](https://creazilla.com)** - Public Domain

## Formato recomendado

- **Formato**: WAV o MP3
- **Sample Rate**: 44100 Hz o 48000 Hz
- **Duración**: 
  - Bass: 0.5 - 1 segundo
  - Metronome: 0.1 - 0.2 segundos (click corto)

## Configuración

Si tu sample de bajo NO es una nota A2, edita `src/config/audioConfig.js`:

```javascript
export const SAMPLE_CONFIG = {
  bass: {
    baseFrequency: 110, // Cambia esto según tu sample
    // A2 = 110Hz, E2 = 82.4Hz, G2 = 98Hz, etc.
  },
  // ...
};
```
