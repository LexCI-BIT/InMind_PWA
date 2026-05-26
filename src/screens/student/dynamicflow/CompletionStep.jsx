import React from 'react';
import { motion } from 'framer-motion';

export function CompletionStep({ onHome }) {
  return (
    <div className="flex-1 flex flex-col justify-between px-6 pb-8 pt-4 h-full">
      <div className="flex flex-col items-center mt-2 flex-1">
        
        <div className="mb-4 text-[#8b5cf6]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>

        <h2 className="text-[26px] font-medium leading-tight text-white text-center mb-2">
          Day completed
        </h2>

        <p className="text-white/90 text-[16px] text-center px-4 mb-auto leading-snug">
          Small reflections slowly build<br />awareness.
        </p>

        {/* The stats block should be closer to the bottom, above the button */}
        <div className="w-full flex flex-col gap-6 mt-auto mb-10 pl-4">
          
          <div className="flex items-center gap-4">
            <div className="text-[#ef4444]">
              <FlameIcon />
            </div>
            <div className="flex flex-col">
              <span className="text-white/90 text-[15px] font-medium">Current Streak</span>
              <span className="text-[#ef4444] text-[13px]">2 days</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-[#eab308]">
              <TrophyIcon />
            </div>
            <div className="flex flex-col">
              <span className="text-white/90 text-[15px] font-medium">Weeks Completed</span>
              <span className="text-[#eab308] text-[13px]">2/32</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-[#10b981]">
              <ProgressIcon />
            </div>
            <div className="flex flex-col">
              <span className="text-white/90 text-[15px] font-medium">Progress</span>
              <span className="text-[#eab308] text-[13px]">6%</span>
            </div>
          </div>

        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onHome}
        className="w-full mt-auto py-4 rounded-xl flex items-center justify-center gap-2 text-white/90 font-medium text-[16px] transition-opacity"
        style={{ background: '#191512', border: '1px solid rgba(255,255,255,0.05)' }}
      >
        Next <span>→</span>
      </motion.button>
    </div>
  );
}

function FlameIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function ProgressIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" strokeDasharray="3 3" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}
