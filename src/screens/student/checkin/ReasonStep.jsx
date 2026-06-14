import React from 'react';
import { motion } from 'framer-motion';
import { PRIMARY_EMOTIONS } from './EmotionStep';

const REASONS = [
  { id: 'family', label: 'Family', icon: <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/> },
  { id: 'relationship', label: 'Relationship', icon: <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/> },
  { id: 'friends', label: 'Friends', icon: <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/> },
  { id: 'school', label: 'School', icon: <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/> },
  { id: 'health', label: 'Health', icon: <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-5.4 12l-2.6-2.6 1.4-1.4 1.2 1.2 3.8-3.8 1.4 1.4-5.2 5.2z"/> },
  { id: 'exercise', label: 'Exercise', icon: <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43 1.43-1.43z"/> },
  { id: 'work', label: 'Work', icon: <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/> },
  { id: 'food', label: 'Food', icon: <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/> },
  { id: 'sleep', label: 'Sleep', icon: <path d="M9 2c-1.05 0-2.05.16-3 .46 4.06 1.27 7 5.06 7 9.54 0 4.48-2.94 8.27-7 9.54.95.3 1.95.46 3 .46 5.52 0 10-4.48 10-10S14.52 2 9 2z"/> },
];

export function ReasonStep({ primaryEmotion, reason, setReason }) {
  const emotionData = PRIMARY_EMOTIONS.find(m => m.id === primaryEmotion);

  return (
    <div className="flex-1 flex flex-col pt-2 pb-24 overflow-y-auto w-full h-full no-scrollbar px-4">
      <div className="flex flex-col items-center">
        
        {/* Title & Emotion Image */}
        <div className="text-center mb-8">
          {emotionData && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden shadow-lg border border-white/10"
            >
              <img 
                src={emotionData.img} 
                alt={emotionData.label} 
                className="w-full h-full object-cover" 
                onError={(e) => { e.target.onerror = null; e.target.src = '/avatar-student.png' }}
              />
            </motion.div>
          )}
          <h2 className="text-2xl font-bold text-white mb-2 leading-tight">
            What made you feel<br/>{emotionData ? emotionData.label.toLowerCase() : 'this way'} today?
          </h2>
          <p className="text-white/50 text-[14px]">Select the main reason</p>
        </div>

        {/* Primary Reasons Grid */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-[400px]">
          {REASONS.map(r => {
            const active = reason === r.id;
            return (
              <motion.button 
                whileTap={{ scale: 0.95 }}
                key={r.id} 
                onClick={() => setReason(r.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all border ${
                  active 
                    ? 'bg-[#eab308] border-[#eab308] text-[#111111]' 
                    : 'bg-[#1c1c21] border-white/5 text-white/70 hover:bg-[#25252b]'
                }`}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mb-2">
                  {r.icon}
                </svg>
                <span className="text-[12px] font-semibold tracking-wide">
                  {r.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
