import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * ═══════════════════════════════════════════════════════════════════
 *  ReflectionStep — Dynamic Flow Step 4
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Asks how much the topic stayed on student's mind today.
 *  Options + optional free-text reflection input.
 * ═══════════════════════════════════════════════════════════════════
 */

export function ReflectionStep({ onNext, onTextChange, data }) {
  const [reflectionText, setReflectionText] = useState('');
  const reflectionPrompt = data?.reflection;

  const handleTextChange = (e) => {
    const text = e.target.value;
    setReflectionText(text);
    if (onTextChange) onTextChange(text);
  };

  return (
    <div className="flex-1 flex flex-col px-6 pb-8 pt-4 h-full">
      <div className="flex flex-col items-center mt-2 flex-1">
        
        <div className="mb-4 text-[#8b5cf6]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>

        <h2 className="text-[24px] font-medium leading-tight text-white text-center mb-10">
          How much did this stay in<br />your mind today?
        </h2>

        <div className="w-full flex flex-col gap-3">
          <OptionCard 
            icon={<ChatBubbleIcon />}
            text="Barely thought about it"
            color="#8b5cf6"
            onClick={() => onNext('barely')}
          />
          <OptionCard 
            icon={<ChatBubbleIcon />}
            text="Thought about it a few times"
            color="#ef4444"
            onClick={() => onNext('few_times')}
          />
          <OptionCard 
            icon={<ChatBubbleIcon />}
            text="Still thinking about it now"
            color="#eab308"
            onClick={() => onNext('still_thinking')}
          />
        </div>

        <p className="text-white/80 my-6 text-[15px] font-light tracking-wide">or</p>

        {reflectionPrompt && (
          <p className="text-white/90 text-center text-[15px] mb-3 leading-snug px-2">
            {reflectionPrompt}
          </p>
        )}

        <div className="w-full flex-1 min-h-[140px] border border-white/20 rounded-[20px] p-5 relative">
          <textarea
            value={reflectionText}
            onChange={handleTextChange}
            placeholder="Type Your Answer Here..."
            className="w-full h-full bg-transparent text-white placeholder-white/50 resize-none outline-none text-[15px] font-light leading-relaxed"
          />
        </div>

        {reflectionText.trim() && (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => onNext(reflectionText)}
            className="w-full mt-4 py-4 rounded-xl flex items-center justify-center gap-2 text-white/90 font-medium text-[16px] transition-opacity"
            style={{ background: '#191512', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            Submit Reflection <span>→</span>
          </motion.button>
        )}
      </div>
    </div>
  );
}

function OptionCard({ icon, text, color, onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="w-full flex items-center gap-4 bg-[#181a25]/90 border border-white/5 rounded-2xl p-5 text-left"
    >
      <div style={{ color: color }}>
        {icon}
      </div>
      <span className="text-white/90 text-[14px] font-normal">{text}</span>
    </motion.button>
  );
}

function ChatBubbleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16v12a2 2 0 0 1-2 2H8l-4 4V8a2 2 0 0 1 2-2z" />
      <line x1="9" y1="13" x2="15" y2="13" />
    </svg>
  );
}
