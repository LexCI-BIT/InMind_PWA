import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Screen } from '../components/Screen';

/**
 * SplashLogo — first thing the user sees when the PWA opens.
 *
 * A pulsing yellow brain mark with radiating sparkle lines, on a black field.
 * Auto-advances to the wordmark splash after ~1.6s.
 */
export function SplashLogo() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate('/wordmark', { replace: true }), 1600);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <Screen>
      <div className="flex flex-1 items-center justify-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-44 w-44"
        >
          {/* radiating sparkle lines */}
          <Sparkles />
          {/* brain glyph */}
          <motion.svg
            viewBox="0 0 200 160"
            className="absolute inset-0 h-full w-full"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity }}
          >
            <defs>
              <filter id="brain-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g filter="url(#brain-glow)" fill="#f0b31e" stroke="#1f1f1f" strokeWidth="3">
              <path
                d="M50 76c0-16 13-29 29-29 6 0 12 2 16 6 4-4 10-6 16-6 16 0 29 13 29 29 0 5-1 9-3 13 5 5 8 12 8 19 0 13-10 23-23 23-3 7-10 12-18 12-6 0-11-2-15-6-4 4-9 6-15 6-8 0-15-5-18-12-13 0-23-10-23-23 0-7 3-14 8-19-2-4-3-8-3-13z"
              />
              {/* inner curls */}
              <path
                d="M76 64c4 4 4 12 0 16M88 56c4 4 4 12 0 16M104 56c-4 4-4 12 0 16M116 64c-4 4-4 12 0 16M76 96c4 4 4 12 0 16M88 104c4 4 4 12 0 16M104 104c-4 4-4 12 0 16M116 96c-4 4-4 12 0 16"
                fill="none"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path d="M96 50v60" fill="none" strokeWidth="3" />
            </g>
          </motion.svg>
        </motion.div>
      </div>
    </Screen>
  );
}

function Sparkles() {
  // 8 short white lines arranged like sun rays
  const lines = Array.from({ length: 8 }, (_, i) => ({
    angle: (360 / 8) * i,
    delay: i * 0.06,
  }));
  return (
    <svg viewBox="-100 -100 200 200" className="absolute inset-0 h-full w-full">
      {lines.map(({ angle, delay }) => (
        <motion.line
          key={angle}
          x1="0"
          y1="-78"
          x2="0"
          y2="-92"
          stroke="#ffffff"
          strokeWidth="2.4"
          strokeLinecap="round"
          transform={`rotate(${angle})`}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: [0, 1, 0.4, 1], scale: [0.4, 1, 0.85, 1] }}
          transition={{ duration: 1.4, delay, repeat: Infinity, repeatDelay: 0.4 }}
        />
      ))}
    </svg>
  );
}
