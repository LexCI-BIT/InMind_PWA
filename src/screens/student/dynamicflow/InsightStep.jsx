import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * ═══════════════════════════════════════════════════════════════════
 *  InsightStep — Dynamic Flow Step 5
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Pattern recognition: "Has something like this happened before?"
 *  Options: Many times / Once or twice / Not really
 * ═══════════════════════════════════════════════════════════════════
 */

export function InsightStep({ onNext, data }) {
  const insightText = data?.insight || "Has something like this\nhappened before?";
  const options = data?.insightOptions || [
    "Many times",
    "Once or twice",
    "Not really"
  ];
  const colors = ["#8b5cf6", "#ef4444", "#eab308"];
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex-1 flex flex-col px-6 pb-12 pt-4 h-full">
      <div className="flex flex-col items-center mt-2 flex-1">
        
        <div className="mb-4 text-[#8b5cf6]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>

        <h2 className="text-[24px] font-medium leading-tight text-white text-center mb-10 px-4">
          {insightText}
        </h2>

        <div className="w-full flex flex-col gap-3 mt-auto mb-20">
          {options.map((opt, idx) => (
            <OptionCard 
              key={idx}
              icon={<ChatBubbleIcon />}
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

function ChatBubbleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16v12a2 2 0 0 1-2 2H8l-4 4V8a2 2 0 0 1 2-2z" />
      <line x1="9" y1="13" x2="15" y2="13" />
    </svg>
  );
}
