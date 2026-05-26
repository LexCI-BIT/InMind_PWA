import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * ═══════════════════════════════════════════════════════════════════
 *  ScenarioStep — Dynamic Flow Step 2
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Presents a scenario and asks "What will you do?"
 *  Student selects one of 4 options. No right/wrong answers.
 * ═══════════════════════════════════════════════════════════════════
 */

export function ScenarioStep({ onNext, data }) {
  const scenarioText = data?.scenario || "Your Bestfriend is upset\nbecause you couldn't attend\nhis birthday";
  const options = data?.scenarioOptions || [
    "I'd explain what happened",
    "I'd say sorry properly",
    "I'd avoid the conversation",
    "Not sure honestly"
  ];
  const colors = ["#8b5cf6", "#ef4444", "#eab308", "#9ca3af"];
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex-1 flex flex-col justify-between px-6 pb-12 pt-4 h-full">
      <div className="flex flex-col items-center mt-2">
        <div className="mb-4 text-[#eab308]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>

        <h2 className="text-[22px] font-medium leading-tight text-white text-center mb-4 px-2">
          {scenarioText}
        </h2>
        
        <p className="text-[#eab308] font-bold text-[18px] text-center mb-8">
          What will you do?
        </p>

        <div className="w-full flex flex-col gap-4">
          {options.map((opt, idx) => (
            <OptionCard 
              key={idx}
              icon={<ChatIcon />}
              text={opt}
              color={colors[idx % colors.length]}
              isSelected={selected === idx}
              onClick={() => {
                setSelected(idx);
                onNext(opt);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function OptionCard({ icon, text, color, isSelected, onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`w-full flex items-center gap-4 bg-[#181a25]/90 border rounded-2xl p-5 text-left transition-all ${
        isSelected ? 'border-white/30' : 'border-white/5'
      }`}
    >
      <div style={{ color: color }}>
        {icon}
      </div>
      <span className="text-white/90 text-[14px] font-normal">{text}</span>
    </motion.button>
  );
}

function ChatIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16v12a2 2 0 0 1-2 2H8l-4 4V8a2 2 0 0 1 2-2z" />
      <line x1="9" y1="13" x2="15" y2="13" />
    </svg>
  );
}
