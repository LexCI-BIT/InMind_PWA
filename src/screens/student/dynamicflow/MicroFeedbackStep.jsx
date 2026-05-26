import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * ═══════════════════════════════════════════════════════════════════
 *  MicroFeedbackStep — Dynamic Flow Step 3
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Quick text input screen where the student describes what happened
 *  related to their selected context (Friends/School/Myself).
 *
 *  Behavioral tracking:
 *    - Text length tracked for depth scoring
 *    - Typing speed inferred from text changes
 *    - Empty submissions are blocked
 * ═══════════════════════════════════════════════════════════════════
 */

const CONFIG = {
  friends: {
    title: 'What happened with your',
    highlight: 'friends',
    color: '#eab308',
    Icon: UsersIcon,
  },
  school: {
    title: 'What happened at',
    highlight: 'school',
    color: '#10b981',
    Icon: BookIcon,
  },
  myself: {
    title: "What's been on your",
    highlight: 'mind',
    color: '#3b82f6',
    Icon: UserIcon,
  }
};

export function MicroFeedbackStep({ selection, onNext, onTextChange }) {
  const [text, setText] = useState('');
  const config = CONFIG[selection] || CONFIG.friends;
  const { title, highlight, color, Icon } = config;

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    if (onTextChange) onTextChange(newText);
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-6 pb-8 pt-4 h-full">
      
      <div className="flex flex-col items-center flex-1">
        
        <h1 className="text-[24px] font-medium leading-tight text-white text-center mt-4">
          {title} <span style={{ color }}>{highlight}</span> {selection === 'myself' ? 'lately?' : 'today?'}
        </h1>

        <div 
          className="w-[54px] h-[54px] rounded-[18px] flex items-center justify-center mt-12 mb-4 backdrop-blur-md"
          style={{ backgroundColor: `${color}30`, border: `1px solid ${color}40` }}
        >
          <div style={{ color: color }}>
            <Icon />
          </div>
        </div>
        <p className="text-[11px] text-white/60 mb-6 capitalize">{selection}</p>

        <div className="w-full flex-1 min-h-[200px] border border-white/20 rounded-[20px] p-5 relative">
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Type Your Answer Here..."
            className="w-full h-full bg-transparent text-white placeholder-white/50 resize-none outline-none text-[15px] font-light leading-relaxed"
          />
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => onNext(text)}
        disabled={text.trim() === ''}
        className="w-full mt-6 py-4 rounded-xl flex items-center justify-center gap-2 text-white/90 font-medium text-[16px] disabled:opacity-50 transition-opacity"
        style={{ background: '#191512', border: '1px solid rgba(255,255,255,0.05)' }}
      >
        Next <span>→</span>
      </motion.button>
    </div>
  );
}

function UsersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      <path d="M8 7h6" />
      <path d="M8 11h8" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
