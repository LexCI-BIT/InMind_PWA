import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FocusTimer — Pomodoro-style focus timer with premium animations:
 *   • Gradient progress ring with glow
 *   • Orbiting dot tracking progress
 *   • Floating blob with breathing animation
 *   • Ambient background glow synced to state
 *
 * Modes: Pomodoro (25 min), Short Break (5 min), Long Break (15 min)
 */

const MODES = [
  { id: 'pomodoro', label: 'Pomodoro', seconds: 25 * 60 },
  { id: 'short',    label: 'Short Break', seconds: 5 * 60 },
  { id: 'long',     label: 'Long Break', seconds: 15 * 60 },
];

function pad(n) { return String(n).padStart(2, '0'); }
function formatTime(totalSec) {
  return `${pad(Math.floor(totalSec / 60))}:${pad(totalSec % 60)}`;
}

export function FocusTimer({ onBack }) {
  const [modeId, setModeId] = useState('pomodoro');
  const [timeLeft, setTimeLeft] = useState(MODES[0].seconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const mode = MODES.find(m => m.id === modeId);
  const progress = timeLeft / mode.seconds;

  // Ring constants
  const SIZE = 260;
  const CENTER = SIZE / 2;
  const RADIUS = 110;
  const CIRC = 2 * Math.PI * RADIUS;
  const offset = CIRC * (1 - progress);

  // Orbiting dot
  // Orbiting dot (clockwise from top)
  const dotX = CENTER + RADIUS * Math.sin(progress * 2 * Math.PI);
  const dotY = CENTER - RADIUS * Math.cos(progress * 2 * Math.PI);

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { clearInterval(intervalRef.current); setRunning(false); return 0; }
          return t - 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, timeLeft]);

  const handleModeSwitch = useCallback((id) => {
    setModeId(id);
    const m = MODES.find(x => x.id === id);
    setTimeLeft(m.seconds);
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const handlePlayPause = () => {
    if (timeLeft === 0) { setTimeLeft(mode.seconds); setRunning(true); }
    else setRunning(r => !r);
  };

  const handleReset = () => {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeLeft(mode.seconds);
  };

  const handleSkip = () => {
    const idx = MODES.findIndex(m => m.id === modeId);
    const next = MODES[(idx + 1) % MODES.length];
    handleModeSwitch(next.id);
  };

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#1a1a1a] font-sans">

      {/* Ambient glow */}
      <motion.div
        animate={{
          opacity: running ? [0.12, 0.25, 0.12] : 0.08,
          scale: running ? [1, 1.1, 1] : 1,
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[25%] left-1/2 -translate-x-1/2 size-[300px] rounded-full bg-cyan-500 blur-[120px] pointer-events-none"
      />

      {/* Header */}
      <div className="relative z-10 px-6 pt-safe pt-4">
        <p className="text-[11px] font-bold text-[#f59e0b] uppercase tracking-wider mb-1">Focus Activity</p>
        <button type="button" onClick={onBack} className="text-white p-2 -ml-2 transition hover:opacity-70">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>

      <h1 className="relative z-10 text-center text-[32px] font-bold text-white mt-2">Focus</h1>

      {/* Mode Tabs */}
      <div className="relative z-10 flex items-center justify-center gap-6 mt-5">
        {MODES.map(m => {
          const isActive = modeId === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => handleModeSwitch(m.id)}
              className={[
                'text-[13px] font-semibold transition pb-1',
                isActive ? 'text-white border-b-2 border-white' : 'text-white/40 hover:text-white/60',
              ].join(' ')}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      {/* Timer Circle */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
        <div className="relative" style={{ width: SIZE, height: SIZE }}>

          <svg className="absolute inset-0" viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ transform: 'rotate(-90deg)' }}>
            <defs>
              <linearGradient id="focusRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#67e8f9" />
                <stop offset="50%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <filter id="focusRingGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="#2a2a2a" strokeWidth="3" />
            <motion.circle
              cx={CENTER} cy={CENTER} r={RADIUS}
              fill="none" stroke="url(#focusRingGrad)" strokeWidth="3.5"
              strokeLinecap="round" strokeDasharray={CIRC}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              filter="url(#focusRingGlow)"
            />
          </svg>

          {/* Orbiting dot */}
          <motion.div
            animate={{ left: dotX - 5, top: dotY - 5 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute size-[10px] rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]"
          />
          <div className="absolute size-[8px] rounded-full bg-white/30" style={{ left: CENTER + RADIUS - 4, top: CENTER - 4 }} />

          {/* Inner content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">

            {/* Animated blob */}
            <motion.div
              animate={{
                y: running ? [0, -8, 0, -4, 0] : [0, -3, 0],
                scale: running ? [1, 1.12, 1, 1.06, 1] : [1, 1.03, 1],
                rotate: running ? [0, -3, 3, -1, 0] : 0,
              }}
              transition={{ duration: running ? 4 : 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative mb-2"
            >
              <svg width="56" height="52" viewBox="0 0 60 56">
                <defs>
                  <radialGradient id="focusBlob" cx="45%" cy="35%" r="60%">
                    <stop offset="0%" stopColor="#e0ffff" />
                    <stop offset="45%" stopColor="#67e8f9" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </radialGradient>
                  <filter id="focusBlobGlow">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                <ellipse cx="30" cy="30" rx="26" ry="24" fill="url(#focusBlob)" filter="url(#focusBlobGlow)" />
                <ellipse cx="22" cy="29" rx="3.2" ry="3.8" fill="#1a1a1a" />
                <ellipse cx="38" cy="29" rx="3.2" ry="3.8" fill="#1a1a1a" />
                <ellipse cx="23.5" cy="27.5" rx="1" ry="1.2" fill="white" opacity="0.7" />
                <ellipse cx="39.5" cy="27.5" rx="1" ry="1.2" fill="white" opacity="0.7" />
                <line x1="25" y1="36" x2="35" y2="36" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <motion.div
                animate={{ opacity: running ? [0.2, 0.5, 0.2] : 0.15, scale: running ? [0.9, 1.3, 0.9] : 1 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-5 rounded-full bg-cyan-400/30 blur-xl -z-10"
              />
            </motion.div>

            {/* Timer */}
            <AnimatePresence mode="wait">
              <motion.p
                key={timeLeft}
                initial={{ opacity: 0.6, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.15 }}
                className="text-[52px] font-extrabold text-white tracking-tight tabular-nums leading-none"
              >
                {formatTime(timeLeft)}
              </motion.p>
            </AnimatePresence>

            <p className="text-[14px] font-medium text-white/50 mt-2">
              {running ? 'Focus Time' : timeLeft === 0 ? 'Done!' : 'Focus Time'}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="relative z-10 flex items-center justify-center gap-10 pb-safe pb-12">
        <motion.button type="button" onClick={handleReset} whileTap={{ scale: 0.85 }}
          className="grid size-12 place-items-center rounded-full text-white/50 hover:text-white hover:bg-white/5 transition">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 4v6h6" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
        </motion.button>

        <motion.button type="button" onClick={handlePlayPause} whileTap={{ scale: 0.9 }}
          className="grid size-16 place-items-center rounded-full bg-white text-[#1a1a1a] shadow-lg shadow-white/10 transition hover:bg-white/90">
          {running ? (
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-7 w-7 ml-1" fill="currentColor">
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
          )}
        </motion.button>

        <motion.button type="button" onClick={handleSkip} whileTap={{ scale: 0.85 }}
          className="grid size-12 place-items-center rounded-full text-white/50 hover:text-white hover:bg-white/5 transition">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
            <path d="M5 4l10 8-10 8V4z" /><path d="M13 4l10 8-10 8V4z" />
          </svg>
        </motion.button>
      </div>
    </section>
  );
}
