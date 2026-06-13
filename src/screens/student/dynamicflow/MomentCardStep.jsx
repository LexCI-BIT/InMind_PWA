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
    },
    {
      id: 'family',
      title: 'Family',
      desc: 'Things related to family',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-rose-300">
          <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 21C17 18.2386 14.7614 16 12 16C9.23858 16 7 18.2386 7 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5.5 14C6.32843 14 7 13.3284 7 12.5C7 11.6716 6.32843 11 5.5 11C4.67157 11 4 11.6716 4 12.5C4 13.3284 4.67157 14 5.5 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2.5 21C2.5 19.3431 3.84315 18 5.5 18C6.32843 18 7.07843 18.3358 7.62132 18.8787" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18.5 14C19.3284 14 20 13.3284 20 12.5C20 11.6716 19.3284 11 18.5 11C17.6716 11 17 11.6716 17 12.5C17 13.3284 17.6716 14 18.5 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21.5 21C21.5 19.3431 20.1569 18 18.5 18C17.6716 18 16.9216 18.3358 16.3787 18.8787" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 7C12 7 10 5 10 3.5C10 2.67157 10.6716 2 11.5 2C12 2 12 2.5 12 2.5C12 2.5 12 2 12.5 2C13.3284 2 14 2.67157 14 3.5C14 5 12 7 12 7Z" fill="#f43f5e" stroke="#f43f5e" strokeWidth="1"/>
        </svg>
      ),
      bg: 'bg-rose-500/10',
    },
    {
      id: 'future',
      title: 'Future',
      desc: 'Thoughts, feelings about your future',
      icon: <User className="w-6 h-6 text-teal-200" />,
      bg: 'bg-teal-500/10',
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
      <div className="flex flex-col gap-4 mt-4 pb-12">
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
              <h3 className="text-white font-semibold text-[17px]">{opt.title}</h3>
              <p className="text-white/60 text-[13px] leading-snug mt-0.5">{opt.desc}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-white/50 shrink-0 ml-2" />
          </motion.button>
        ))}
      </div>

    </div>
  );
}
