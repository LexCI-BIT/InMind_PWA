import React from 'react';
import { motion } from 'framer-motion';

export function ContextStep({ context, setContext }) {
  const options = [
    { id: 'school', label: 'At School', image: '/illustrations/context_school.png', color: '#d946ef' },
    { id: 'home', label: 'At Home', image: '/illustrations/context_home.png', color: '#a855f7' },
    { id: 'friends', label: 'With Friends', image: '/illustrations/context_friends.png', color: '#3b82f6' },
    { id: 'alone', label: 'Alone', image: '/illustrations/context_alone.png', color: '#eab308' },
    { id: 'travel', label: 'Travelling', image: '/illustrations/context_travel.png', color: '#14b8a6' },
  ];

  return (
    <div className="flex-1 flex flex-col pt-2 overflow-y-auto no-scrollbar">
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-white mb-1">Where are you right now?</h1>
        <p className="text-[13px] text-white/60">Help us understand your current environment</p>
      </div>

      <div className="flex flex-col gap-3">
        {options.map(opt => {
          const isSelected = context === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setContext(opt.id)}
              className={`relative overflow-hidden flex items-center p-2 rounded-2xl border transition-all ${
                isSelected ? 'border-[#d946ef] bg-[#d946ef]/10' : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="w-[100px] h-[55px] rounded-xl overflow-hidden mr-4">
                <img src={opt.image} alt={opt.label} className="w-full h-full object-cover" />
              </div>
              <span className="text-[17px] font-bold text-white tracking-wide">{opt.label}</span>
              {isSelected && (
                <motion.div layoutId="context-glow" className="absolute inset-0 bg-gradient-to-r from-[#d946ef]/10 to-transparent pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-8 mb-4 flex items-start text-white/50">
        <span className="text-[#d946ef] mr-2 text-xl leading-none">★</span>
        <div className="text-sm">
          <p className="font-bold text-white/80">Your response is private</p>
          <p className="text-[12px] mt-0.5">It helps us personalize your experience</p>
        </div>
      </div>
    </div>
  );
}
