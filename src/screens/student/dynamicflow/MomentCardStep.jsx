import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, User, ChevronRight, Backpack } from 'lucide-react';

export function MomentCardStep({ onSelect }) {
  const options = [
    {
      id: 'friends',
      title: 'Friends',
      desc: 'Moments with people who matter.',
      icon: <Users className="w-6 h-6 text-orange-200" />,
      bg: 'bg-orange-500/10',
    },
    {
      id: 'school',
      title: 'School',
      desc: 'Things related to studies and learning.',
      icon: <Backpack className="w-6 h-6 text-blue-200" />,
      bg: 'bg-blue-500/10',
    },
    {
      id: 'myself',
      title: 'Myself',
      desc: 'Thoughts, feelings or personal moments.',
      icon: <User className="w-6 h-6 text-green-200" />,
      bg: 'bg-green-500/10',
    }
  ];

  return (
    <div className="flex-1 flex flex-col px-6 pt-10 pb-6 relative z-10">
      
      {/* Top Icon */}
      <div className="w-full flex justify-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-yellow-500">
            <path d="M12 2L15 8L21 9L16 14L18 20L12 17L6 20L8 14L3 9L9 8L12 2Z" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* Headings */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl font-semibold text-white leading-snug mb-4">
          Something <span className="text-yellow-400 font-bold">stayed</span> with<br />you today.
        </h1>
        <p className="text-white/80 text-lg">Which one feels closest?</p>
      </motion.div>

      {/* Options */}
      <div className="flex flex-col gap-4 mt-4">
        {options.map((opt, i) => (
          <motion.button
            key={opt.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + (i * 0.1) }}
            onClick={() => onSelect(opt.id)}
            className="flex items-center w-full p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 active:scale-95 transition-transform text-left"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${opt.bg}`}>
              {opt.icon}
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-white font-semibold text-lg">{opt.title}</h3>
              <p className="text-white/60 text-xs leading-relaxed mt-0.5">{opt.desc}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-white/50 shrink-0 ml-2" />
          </motion.button>
        ))}
      </div>

    </div>
  );
}
