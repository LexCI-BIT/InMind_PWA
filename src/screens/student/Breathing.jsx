import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Breathing() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('Inhale'); // 'Inhale' | 'Exhale'

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(p => p === 'Inhale' ? 'Exhale' : 'Inhale');
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const isBreatheIn = phase === 'Inhale';

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#222222] font-sans">
      
      {/* Header */}
      <div className="relative z-10 px-6 pt-safe pt-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-white p-2 -ml-2 transition hover:opacity-70"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-20">
        
        {/* Breathing Animation Wrapper */}
        <div className="relative w-[300px] h-[300px] flex items-center justify-center">
          
          {/* Orbital Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-white/80"
          >
            {/* Top Dot */}
            <div className="absolute inset-0 rotate-0">
               <div className="absolute top-[-5px] left-1/2 -translate-x-1/2 size-2.5 bg-white rounded-full shadow-[0_0_8px_white]" />
            </div>
            {/* Right Dot (approx 60 deg offset) */}
            <div className="absolute inset-0 rotate-[60deg]">
               <div className="absolute top-[-6px] left-1/2 -translate-x-1/2 size-3 bg-white rounded-full shadow-[0_0_10px_white]" />
            </div>
          </motion.div>

          {/* The Blob */}
          <motion.div
            animate={{
              scale: isBreatheIn ? 1.5 : 0.85,
              borderRadius: isBreatheIn 
                ? "45% 55% 40% 60% / 55% 45% 60% 40%" 
                : "50% 50% 50% 50% / 50% 50% 50% 50%"
            }}
            transition={{
              duration: 4,
              ease: "easeInOut"
            }}
            className="relative w-[130px] h-[120px] bg-gradient-to-b from-[#e0ffff] to-[#22d3ee] flex items-center justify-center"
            style={{
              boxShadow: '0 0 60px 15px rgba(34, 211, 238, 0.4)'
            }}
          >
            {/* Face */}
            <div className="flex flex-col items-center gap-1.5 mt-2">
              <div className="flex gap-5">
                {/* Left Eye */}
                <div className="size-[5px] bg-[#1f1f1f] rounded-full" />
                {/* Right Eye */}
                <div className="size-[5px] bg-[#1f1f1f] rounded-full" />
              </div>
              {/* Mouth */}
              <div className="w-6 h-[2.5px] bg-[#1f1f1f] rounded-full opacity-80" />
            </div>
          </motion.div>

        </div>

        {/* Phase Text */}
        <div className="mt-20 h-16 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h2 
              key={phase}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.4 }}
              className="text-[36px] font-medium text-white tracking-wide"
            >
              {phase}
            </motion.h2>
          </AnimatePresence>
        </div>

      </div>

    </section>
  );
}
