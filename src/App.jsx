import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  Square,
  RefreshCw,
  Volume2,
  Music,
  AlertCircle,
} from "lucide-react";

const BassTrainer = () => {
  // Estados para la UI
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(100);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(-1);
  const [isLooping, setIsLooping] = useState(true);
  const [isAudioReady, setIsAudioReady] = useState(false);

  // Referencias para el motor de audio (evitan stale closures)
  const audioContextRef = useRef(null);
  const nextNoteTimeRef = useRef(0);
  const timerIDRef = useRef(null);
  const notesRef = useRef([]); // Almacena la data de las notas
  const playIndexRef = useRef(0); // Índice actual en el motor de audio
  const schedulerRef = useRef(null); // Ref para la función scheduler

  // Refs para valores mutables accedidos por el scheduler
  const tempoRef = useRef(tempo);
  const isLoopingRef = useRef(isLooping);
  const isPlayingRef = useRef(isPlaying);

  // Sincronizar refs con estado
  useEffect(() => {
    tempoRef.current = tempo;
  }, [tempo]);
  useEffect(() => {
    isLoopingRef.current = isLooping;
  }, [isLooping]);
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Frecuencias base
  const STRING_FREQUENCIES = {
    G: 98.0,
    D: 73.42,
    A: 55.0,
    E: 41.2,
  };

  // Datos de la tablatura (Arpegios Emaj11 y Fm11 en tresillos)
  const tabData = [
    // Emaj11
    { string: "E", fret: 0, id: 0 },
    { string: "E", fret: 4, id: 1 },
    { string: "A", fret: 2, id: 2 },
    { string: "D", fret: 1, id: 3 },
    { string: "D", fret: 4, id: 4 },
    { string: "G", fret: 2, id: 5 },
    { string: "G", fret: 2, id: 6 },
    { string: "D", fret: 4, id: 7 },
    { string: "D", fret: 1, id: 8 },
    { string: "A", fret: 2, id: 9 },
    { string: "E", fret: 4, id: 10 },
    { string: "E", fret: 0, id: 11 },
    // Fm11
    { string: "E", fret: 1, id: 12 },
    { string: "E", fret: 4, id: 13 },
    { string: "A", fret: 3, id: 14 },
    { string: "D", fret: 1, id: 15 },
    { string: "D", fret: 5, id: 16 },
    { string: "G", fret: 3, id: 17 },
    { string: "G", fret: 3, id: 18 },
    { string: "D", fret: 5, id: 19 },
    { string: "D", fret: 1, id: 20 },
    { string: "A", fret: 3, id: 21 },
    { string: "E", fret: 4, id: 22 },
    { string: "E", fret: 1, id: 23 },
  ];

  // Inicialización del AudioContext (solo una vez)
  useEffect(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContextRef.current = new AudioContext();
    notesRef.current = tabData;
    return () => {
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  const playSound = (string, fret, time) => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    // Frecuencia
    const baseFreq = STRING_FREQUENCIES[string];
    const frequency = baseFreq * Math.pow(2, fret / 12);

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // Configuración de sonido (Sawtooth filtrada para sonar como bajo)
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(frequency, time);

    // Filtro para quitar agudos excesivos
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(600, time);

    // Envolvente (Envelope)
    gainNode.gain.setValueAtTime(0, time);
    gainNode.gain.linearRampToValueAtTime(0.5, time + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.5);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + 0.6);
  };

  const scheduleNote = (index, time) => {
    // 1. Programar audio
    const note = notesRef.current[index];
    playSound(note.string, note.fret, time);

    // 2. Programar actualización visual
    // Usamos setTimeout para que la UI se actualice justo cuando suena la nota
    // Calculamos el delay entre el tiempo de audio programado y el tiempo actual
    const ctx = audioContextRef.current;
    const delay = Math.max(0, (time - ctx.currentTime) * 1000);

    setTimeout(() => {
      // Verificamos si seguimos tocando para evitar actualizaciones fantasma
      if (isPlayingRef.current) {
        setCurrentNoteIndex(index);
      }
    }, delay);
  };

  const nextNote = () => {
    const secondsPerBeat = 60.0 / tempoRef.current;
    const noteTime = secondsPerBeat / 3; // Tresillos (3 notas por beat)
    nextNoteTimeRef.current += noteTime;

    playIndexRef.current++;

    if (playIndexRef.current >= notesRef.current.length) {
      if (isLoopingRef.current) {
        playIndexRef.current = 0;
      } else {
        // Stop lógico
        return false; // Indica fin
      }
    }
    return true; // Continua
  };

  const scheduler = useCallback(() => {
    const ctx = audioContextRef.current;
    // Lookahead de 100ms
    while (nextNoteTimeRef.current < ctx.currentTime + 0.1) {
      // Si el índice es válido, programar nota
      if (playIndexRef.current < notesRef.current.length) {
        scheduleNote(playIndexRef.current, nextNoteTimeRef.current);
      }

      // Avanzar al siguiente slot de tiempo
      const shouldContinue = nextNote();

      if (!shouldContinue) {
        setIsPlaying(false);
        setCurrentNoteIndex(-1);
        return; // Salir del scheduler
      }
    }
    timerIDRef.current = requestAnimationFrame(schedulerRef.current);
  }, []); // Dependencias vacías, usa Refs

  // Guardar scheduler en ref después de su declaración
  useEffect(() => {
    schedulerRef.current = scheduler;
  }, [scheduler]);

  const handlePlay = async () => {
    const ctx = audioContextRef.current;

    // Siempre intentar reanudar el contexto de audio por si el navegador lo suspendió
    if (ctx.state === "suspended") {
      await ctx.resume();
    }
    setIsAudioReady(true);

    if (isPlaying) return;

    setIsPlaying(true);
    setCurrentNoteIndex(-1);
    playIndexRef.current = 0;

    // Importante: Dar un pequeño margen (0.1s) para empezar
    nextNoteTimeRef.current = ctx.currentTime + 0.1;

    scheduler();
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentNoteIndex(-1);
    if (timerIDRef.current) cancelAnimationFrame(timerIDRef.current);
  };

  const renderString = (stringName) => (
    <div className="flex items-center mb-6 relative h-10 select-none">
      <div className="w-12 text-gray-500 font-bold text-xl">{stringName}</div>
      <div className="flex-1 relative flex items-center">
        {/* Cuerda */}
        <div className="absolute w-full h-[2px] bg-gray-600"></div>

        {/* Trastes / Notas */}
        <div className="flex w-full justify-between relative z-10 px-2">
          {tabData.map((note, idx) => {
            if (note.string !== stringName)
              return <div key={idx} className="w-8 h-8"></div>;

            const isActive = currentNoteIndex === idx;
            return (
              <div
                key={idx}
                className={`
                  w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold 
                  transition-all duration-75 border
                  ${
                    isActive
                      ? "bg-yellow-400 text-black border-yellow-400 scale-125 shadow-[0_0_15px_rgba(250,204,21,0.8)]"
                      : "bg-gray-800 text-gray-300 border-gray-600"
                  }
                `}
              >
                {note.fret}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="max-w-5xl w-full bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
        {/* Header */}
        <div className="bg-gray-800 p-6 border-b border-gray-700 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2 text-white">
              <Music className="text-blue-500" />
              Bass Practice
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Emaj11 & Fm11 (Tresillos)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${
                isPlaying ? "bg-green-500 animate-pulse" : "bg-red-500"
              }`}
            ></span>
            <span className="text-xs text-gray-500 uppercase font-semibold">
              {isPlaying ? "Tocando" : "Pausado"}
            </span>
          </div>
        </div>

        {/* Tablatura */}
        <div className="p-8 overflow-x-auto bg-black/20">
          <div className="min-w-[700px]">
            {renderString("G")}
            {renderString("D")}
            {renderString("A")}
            {renderString("E")}
          </div>

          {/* Guía de compases */}
          <div className="flex pl-14 mt-4 text-xs tracking-widest text-gray-600 uppercase">
            <div className="w-1/2 text-center border-t border-gray-700 pt-2">
              Compás 1: Emaj11
            </div>
            <div className="w-1/2 text-center border-t border-gray-700 pt-2">
              Compás 2: Fm11
            </div>
          </div>
        </div>

        {/* Panel de Control */}
        <div className="p-6 bg-gray-800 border-t border-gray-700">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Botones */}
            <div className="flex gap-4">
              {!isPlaying ? (
                <button
                  onClick={handlePlay}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-900/20"
                >
                  <Play className="fill-current w-5 h-5" /> REPRODUCIR
                </button>
              ) : (
                <button
                  onClick={handleStop}
                  className="bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-red-900/20"
                >
                  <Square className="fill-current w-5 h-5" /> DETENER
                </button>
              )}

              <button
                onClick={() => setIsLooping(!isLooping)}
                className={`px-4 py-3 rounded-xl border font-medium flex items-center gap-2 transition-colors ${
                  isLooping
                    ? "bg-green-600/20 border-green-500 text-green-400"
                    : "bg-gray-700/50 border-gray-600 text-gray-400 hover:bg-gray-700"
                }`}
              >
                <RefreshCw
                  className={`w-5 h-5 ${isLooping ? "animate-spin-slow" : ""}`}
                />
                {isLooping ? "Loop Activado" : "Loop Desactivado"}
              </button>
            </div>

            {/* Fader de Tempo */}
            <div className="flex-1 w-full max-w-md bg-gray-900/50 p-4 rounded-xl border border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm font-medium flex items-center gap-2">
                  <Volume2 className="w-4 h-4" /> Velocidad (BPM)
                </span>
                <span className="text-xl font-mono font-bold text-yellow-500">
                  {tempo}
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="160"
                step="5"
                value={tempo}
                onChange={(e) => setTempo(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between mt-2 text-xs text-gray-600">
                <span>Lento (40)</span>
                <span>Normal (100)</span>
                <span>Rápido (160)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Instrucciones */}
        {!isAudioReady && (
          <div className="bg-yellow-900/30 text-yellow-200 text-sm p-3 text-center border-t border-yellow-900/50 flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Pulsa "Reproducir" para activar el motor de audio.
          </div>
        )}
      </div>
    </div>
  );
};

export default BassTrainer;
