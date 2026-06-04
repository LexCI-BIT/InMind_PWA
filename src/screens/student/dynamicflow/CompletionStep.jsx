import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export function CompletionStep({ onHome }) {
  const [showRing, setShowRing] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowRing(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-between px-6 pt-10 pb-12 relative z-10 h-full">

      {/* Center Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        
        {/* Golden Circle Ring */}
        <div className="relative flex items-center justify-center mb-10">
          {/* Animated SVG ring */}
          <motion.svg
            width="230" height="230"
            viewBox="0 0 230 230"
            className="absolute"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
          >
            <motion.circle
              cx="115" cy="115" r="108"
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="679"
              initial={{ strokeDashoffset: 679 }}
              animate={{ strokeDashoffset: showRing ? 0 : 679 }}
              transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
            />
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c8a84b" />
                <stop offset="50%" stopColor="#f0d080" />
                <stop offset="100%" stopColor="#a87828" />
              </linearGradient>
            </defs>
          </motion.svg>

          {/* Inner content */}
          <div className="w-[230px] h-[230px] flex flex-col items-center justify-center">
            {/* Checkmark */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
              className="mb-4"
            >
              <div className="w-10 h-10 rounded-full border border-[#c8a84b]/60 flex items-center justify-center">
                <Check className="w-5 h-5 text-[#c8a84b]" strokeWidth={2} />
              </div>
            </motion.div>

            {/* "Day completed." */}
            <motion.h2
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-[26px] font-medium text-white text-center leading-[1.2] tracking-tight"
            >
              Day<br />completed.
            </motion.h2>

            {/* Ornament dot */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex items-center gap-1.5 mt-4"
            >
              <div className="w-[30px] h-[1px] bg-[#c8a84b]/50 rounded-full" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#c8a84b]/70" />
              <div className="w-[30px] h-[1px] bg-[#c8a84b]/50 rounded-full" />
            </motion.div>
          </div>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="text-gray-300 text-[15px] text-center leading-relaxed px-6"
        >
          Small moments of awareness<br />built over time.
        </motion.p>
      </div>

      {/* Continue Tomorrow Button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        onClick={onHome}
        className="w-full py-[18px] bg-[#d4a017] hover:bg-[#c49010] rounded-2xl font-semibold text-white text-[16px] transition-colors active:scale-95 shadow-lg"
      >
        Continue Tomorrow
      </motion.button>
    </div>
  );
}
