import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Meditation — guided meditation timer with premium animations:
 *   • Smooth progress ring with gradient stroke
 *   • Orbiting dot along the ring
 *   • Floating blob with breathing glow pulse
 *   • Selectable duration (5/10/15/20 min)
 */

const DURATIONS = [
  { id: 5,  label: '5',  unit: 'Mins' },
  { id: 10, label: '10', unit: 'Mins' },
  { id: 15, label: '15', unit: 'Mins' },
  { id: 20, label: '20', unit: 'Mins' },
];

function pad(n) { return String(n).padStart(2, '0'); }
function formatTime(sec) {
  return `${pad(Math.floor(sec / 60))}:${pad(sec % 60)}`;
}

export function Meditation({ onBack }) {
  const [duration, setDuration] = useState(10);
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const totalSec = duration * 60;
  const progress = timeLeft / totalSec;

  // SVG ring constants
  const SIZE = 260;
  const CENTER = SIZE / 2;
  const RADIUS = 110;
  const CIRC = 2 * Math.PI * RADIUS;
  const offset = CIRC * (1 - progress);

  // Orbiting dot position (clockwise from top)
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

  const handleDuration = (mins) => {
    setDuration(mins);
    setTimeLeft(mins * 60);
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleStart = () => {
    if (timeLeft === 0) { setTimeLeft(totalSec); setRunning(true); }
    else setRunning(r => !r);
  };

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#1a1a1a] font-sans">

      {/* Ambient background glow — synced to running */}
      <motion.div
        animate={{
          opacity: running ? [0.15, 0.3, 0.15] : 0.1,
          scale: running ? [1, 1.08, 1] : 1,
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[25%] left-1/2 -translate-x-1/2 size-[320px] rounded-full bg-cyan-500 blur-[120px] pointer-events-none"
      />

      {/* Header */}
      <div className="relative z-10 px-6 pt-safe pt-8">
        <button type="button" onClick={onBack} className="text-white p-2 -ml-2 transition hover:opacity-70">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>

      {/* Title */}
      <h1 className="relative z-10 text-center text-[30px] font-bold text-white mt-2">Meditate</h1>

      {/* Timer Circle */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center -mt-4">
        <div className="relative" style={{ width: SIZE, height: SIZE }}>

          {/* SVG Ring */}
          <svg className="absolute inset-0" viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ transform: 'rotate(-90deg)' }}>
            <defs>
              {/* Gradient for progress ring */}
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#67e8f9" />
                <stop offset="50%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              {/* Glow filter */}
              <filter id="ringGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background ring */}
            <circle
              cx={CENTER} cy={CENTER} r={RADIUS}
              fill="none" stroke="#2a2a2a" strokeWidth="3"
            />

            {/* Animated progress ring */}
            <motion.circle
              cx={CENTER} cy={CENTER} r={RADIUS}
              fill="none"
              stroke="url(#ringGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              filter="url(#ringGlow)"
            />
          </svg>

          {/* Orbiting dot */}
          <motion.div
            animate={{ left: dotX - 5, top: dotY - 5 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute size-[10px] rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]"
          />

          {/* Static reference dot (bottom of ring) */}
          <div
            className="absolute size-[8px] rounded-full bg-white/30"
            style={{ left: CENTER + RADIUS - 4, top: CENTER - 4 }}
          />

          {/* Inner content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">

            {/* Animated blob */}
            <motion.div
              animate={{
                y: running ? [0, -8, 0, -4, 0] : [0, -3, 0],
                scale: running ? [1, 1.12, 1, 1.06, 1] : [1, 1.03, 1],
                rotate: running ? [0, -3, 3, -1, 0] : 0,
              }}
              transition={{
                duration: running ? 4 : 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative mb-3"
            >
              <svg width="56" height="52" viewBox="0 0 60 56">
                <defs>
                  <radialGradient id="blobMed" cx="45%" cy="35%" r="60%">
                    <stop offset="0%" stopColor="#e0ffff" />
                    <stop offset="45%" stopColor="#67e8f9" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </radialGradient>
                  <filter id="blobGlow">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <ellipse cx="30" cy="30" rx="26" ry="24" fill="url(#blobMed)" filter="url(#blobGlow)" />
                {/* Eyes */}
                <ellipse cx="22" cy="29" rx="3.2" ry="3.8" fill="#1a1a1a" />
                <ellipse cx="38" cy="29" rx="3.2" ry="3.8" fill="#1a1a1a" />
                {/* Eye highlights */}
                <ellipse cx="23.5" cy="27.5" rx="1" ry="1.2" fill="white" opacity="0.7" />
                <ellipse cx="39.5" cy="27.5" rx="1" ry="1.2" fill="white" opacity="0.7" />
                {/* Mouth */}
                <line x1="25" y1="36" x2="35" y2="36" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" />
              </svg>

              {/* Breathing glow pulse */}
              <motion.div
                animate={{
                  opacity: running ? [0.2, 0.5, 0.2] : 0.15,
                  scale: running ? [0.9, 1.3, 0.9] : 1,
                }}
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
                className="text-[48px] font-extrabold text-white tracking-tight tabular-nums leading-none"
              >
                {formatTime(timeLeft)}
              </motion.p>
            </AnimatePresence>

            {/* Start / Pause button */}
            <motion.button
              type="button"
              onClick={handleStart}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.04 }}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#2a2a2a] border border-[#444] px-6 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-black/30 transition"
            >
              {running ? (
                <>
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                  Pause
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" className="h-4 w-4 ml-0.5" fill="#f59e0b">
                    <path d="M5 3l14 9-14 9V3z" />
                  </svg>
                  {timeLeft === 0 ? 'Restart' : 'Start'}
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Duration Selector */}
      <div className="relative z-10 px-6 pb-safe pb-10">
        <p className="text-[16px] font-bold text-white mb-4">Choose Duration</p>
        <div className="flex items-center gap-3">
          {DURATIONS.map(d => {
            const isActive = duration === d.id;
            return (
              <motion.button
                key={d.id}
                type="button"
                onClick={() => handleDuration(d.id)}
                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.05 }}
                className={[
                  'flex flex-col items-center justify-center rounded-2xl px-4 py-3 min-w-[60px] border-2 transition-all font-bold',
                  isActive
                    ? 'bg-[#f59e0b]/15 border-[#f59e0b] text-[#f59e0b] shadow-md shadow-[#f59e0b]/10'
                    : 'bg-[#2a2a2a] border-[#333] text-white/50 hover:border-white/30',
                ].join(' ')}
              >
                <span className="text-[18px] leading-none">{d.label}</span>
                <span className="text-[10px] mt-0.5">{d.unit}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
