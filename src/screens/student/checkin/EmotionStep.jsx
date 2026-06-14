import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

export const PRIMARY_EMOTIONS = [
  { id: 'happy', label: 'Happy', img: '/moodcheckin/happy.png' },
  { id: 'sad', label: 'Sad', img: '/moodcheckin/sad.png' },
  { id: 'anxious', label: 'Anxious', img: '/moodcheckin/anxious.png' },
  { id: 'angry', label: 'Angry', img: '/moodcheckin/angry.png' },
  { id: 'calm', label: 'Calm', img: '/moodcheckin/calm.png' },
];

const SECONDARY_EMOTIONS = {
  happy: [
    { id: 'content', label: 'Content', img: '/moodcheckin/happy/content.png' },
    { id: 'excited', label: 'Excited', img: '/moodcheckin/happy/excited.png' },
    { id: 'grateful', label: 'Grateful', img: '/moodcheckin/happy/grateful.png' },
    { id: 'proud', label: 'Proud', img: '/moodcheckin/happy/proud.png' }
  ],
  sad: [
    { id: 'disappointed', label: 'Disappointed', img: '/moodcheckin/sad/disappointed.png' },
    { id: 'hurt', label: 'Hurt', img: '/moodcheckin/sad/hurt.png' },
    { id: 'lonely', label: 'Lonely', img: '/moodcheckin/sad/lonely.png' },
    { id: 'missingsomeone', label: 'Missing Someone', img: '/moodcheckin/sad/missingsomeone.png' }
  ],
  anxious: [
    { id: 'restless', label: 'Restless', img: '/moodcheckin/anxious/restless.png' },
    { id: 'overwhelmed', label: 'Overwhelmed', img: '/moodcheckin/anxious/overwhelmed.png' },
    { id: 'pressured', label: 'Pressured', img: '/moodcheckin/anxious/pressured.png' },
    { id: 'nervous', label: 'Nervous', img: '/moodcheckin/anxious/nervous.png' }
  ],
  angry: [
    { id: 'frustrated', label: 'Frustrated', img: '/moodcheckin/angry/frustrated.png' },
    { id: 'irritated', label: 'Irritated', img: '/moodcheckin/angry/irritated.png' },
    { id: 'resentful', label: 'Resentful', img: '/moodcheckin/angry/resentful.png' },
    { id: 'betrayed', label: 'Betrayed', img: '/moodcheckin/angry/betrayed.png' }
  ],
  calm: [
    { id: 'peaceful', label: 'Peaceful', img: '/moodcheckin/calm/peaceful.png' },
    { id: 'relaxed', label: 'Relaxed', img: '/moodcheckin/calm/relaxed.png' },
    { id: 'hopeful', label: 'Hopeful', img: '/moodcheckin/calm/hopeful.png' },
    { id: 'grounded', label: 'Grounded', img: '/moodcheckin/calm/grounded.png' }
  ]
};

export function EmotionStep({ primaryEmotion, setPrimaryEmotion, secondaryReasons = [], setSecondaryReasons }) {
  
  const handlePrimarySelect = (id) => {
    setPrimaryEmotion(id);
    if (setSecondaryReasons) {
      setSecondaryReasons([]); // Clear secondary selections when primary changes
    }
  };

  const toggleSecondary = (secId) => {
    if (!setSecondaryReasons) return;
    setSecondaryReasons(prev => {
      // In this new UI, we usually select just one sub-emotion, but we can allow toggle
      // The screenshot shows a selected state (yellow border). Let's support multi-select or single.
      // We will do single-select for now to match the "Tell us more" prompt if it's "Choose the emotion..."
      // But DailyCheckinFlow uses an array for secondaryReasons. Let's toggle.
      if (prev.includes(secId)) {
        return prev.filter(id => id !== secId);
      } else {
        return [secId]; // Or [...prev, secId] for multi-select. Single select feels better here.
      }
    });
  };

  const selectedPrimaryData = PRIMARY_EMOTIONS.find(e => e.id === primaryEmotion);

  return (
    <div className="flex-1 flex flex-col w-full h-full pb-24 overflow-y-auto no-scrollbar">
      {/* Title */}
      <div className="mt-6 mb-8 text-center px-4">
        <h1 className="text-2xl font-semibold text-white mb-2">How are you feeling right now?</h1>
        <p className="text-white/60 text-[15px]">Choose the emotion that best describes you</p>
      </div>

      {/* 1. Primary Emotion */}
      <div className="mb-8 w-full">
        <h2 className="text-white font-semibold text-[17px] mb-4">1. Choose your primary emotion</h2>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 pt-1" style={{ scrollSnapType: 'x mandatory' }}>
          {PRIMARY_EMOTIONS.map((emotion) => {
            const isSelected = primaryEmotion === emotion.id;
            return (
              <motion.button
                key={emotion.id}
                onClick={() => handlePrimarySelect(emotion.id)}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center flex-shrink-0"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div 
                  className={`w-16 h-16 rounded-xl overflow-hidden mb-2 transition-all ${
                    isSelected ? 'ring-2 ring-[#eab308] ring-offset-2 ring-offset-[#0d0d12] scale-105' : 'opacity-80 grayscale-[20%]'
                  }`}
                >
                  <img 
                    src={emotion.img} 
                    alt={emotion.label} 
                    className="w-full h-full object-cover" 
                    onError={(e) => { e.target.onerror = null; e.target.src = '/avatar-student.png' }}
                  />
                </div>
                <span className={`text-[13px] font-medium transition-colors ${isSelected ? 'text-white' : 'text-white/60'}`}>
                  {emotion.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 2. Secondary Emotion (Tell us more) */}
      <AnimatePresence mode="wait">
        {primaryEmotion && SECONDARY_EMOTIONS[primaryEmotion] && (
          <motion.div 
            key={primaryEmotion}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-8 w-full"
          >
            <h2 className="text-white font-semibold text-[17px] mb-4">
              2. Tell us more({selectedPrimaryData?.label})
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {SECONDARY_EMOTIONS[primaryEmotion].map((sec) => {
                const isSelected = secondaryReasons.includes(sec.id);
                return (
                  <motion.button
                    key={sec.id}
                    onClick={() => toggleSecondary(sec.id)}
                    whileTap={{ scale: 0.97 }}
                    className={`relative rounded-2xl overflow-hidden aspect-square border-2 transition-all ${
                      isSelected ? 'border-[#eab308]' : 'border-transparent opacity-80'
                    }`}
                  >
                    <img 
                      src={sec.img} 
                      alt={sec.label} 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.onerror = null; e.target.src = '/avatar-student.png' }}
                    />
                    {/* Dark gradient at bottom for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                    
                    {/* Label */}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none">
                      <div className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded-md">
                        <span className={`text-[13px] font-semibold tracking-wide ${isSelected ? 'text-[#eab308]' : 'text-[#eab308]'}`}>
                          {sec.label}
                        </span>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Note */}
      <div className="mt-auto pt-6 w-full">
        <div className="flex gap-3 items-start px-2">
          <Star className="w-5 h-5 text-[#eab308] flex-shrink-0 mt-0.5" fill="currentColor" />
          <div>
            <h3 className="text-white text-[15px] font-medium mb-1">Its okay to not feel okay</h3>
            <p className="text-white/50 text-[13px] leading-tight">
              Naming your emotions is the first step of understanding yourself
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
