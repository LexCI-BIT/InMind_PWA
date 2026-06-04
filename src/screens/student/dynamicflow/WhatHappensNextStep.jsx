import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Clock, Aperture, DoorOpen } from 'lucide-react';

export function WhatHappensNextStep({ onSelect }) {
  const options = [
    {
      id: 'understand',
      title: "They'll understand",
      subtitle: "Maybe things become clear after\nthe conversation.",
      icon: <MessageCircle className="w-[22px] h-[22px] text-gray-300" strokeWidth={1.5} />
    },
    {
      id: 'awkward',
      title: "Things stay awkward",
      subtitle: "The situation may remain\nuncomfortable for a while.",
      icon: <Clock className="w-[22px] h-[22px] text-gray-300" strokeWidth={1.5} />
    },
    {
      id: 'thinking',
      title: "I'll keep thinking about it",
      subtitle: "The uncertainty may stay in my\nmind longer.",
      icon: <Aperture className="w-[22px] h-[22px] text-gray-300" strokeWidth={1.5} />
    },
    {
      id: 'forget',
      title: "I'd rather forget about it",
      subtitle: "Move on and avoid thinking\nabout it further.",
      icon: <DoorOpen className="w-[22px] h-[22px] text-gray-300" strokeWidth={1.5} />
    }
  ];

  return (
    <div className="flex-1 flex flex-col px-5 pt-20 pb-8 relative z-10 h-full">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="mb-10 pl-1"
      >
        <h2 className="text-[30px] font-semibold text-white leading-[1.1] tracking-tight mb-2">
          What would you <br/>
          probably do <span className="text-yellow-500">first?</span>
        </h2>
        <p className="text-gray-300 text-[16px]">
          Choose what feels closest?
        </p>
      </motion.div>

      <div className="flex flex-col gap-[14px]">
        {options.map((opt, i) => (
          <motion.button
            key={opt.id}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
            onClick={() => onSelect(opt.id)}
            className="flex items-center w-full py-[14px] px-4 bg-[#3a3a3c]/80 backdrop-blur-md border border-white/5 rounded-2xl active:scale-95 transition-transform text-left gap-4 shadow-lg"
          >
            <div className="w-[46px] h-[46px] rounded-full bg-[#1c1c1e] flex items-center justify-center shrink-0">
              {opt.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-white text-[15px] font-medium mb-0.5">{opt.title}</h3>
              <p className="text-[#9ca3af] text-[13px] leading-[1.25] whitespace-pre-line">{opt.subtitle}</p>
            </div>
            <div className="text-[#9ca3af] font-light text-xl mr-1">{'>'}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
