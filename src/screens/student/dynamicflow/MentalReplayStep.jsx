import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, RotateCw, Radio, Sparkles, ChevronRight } from 'lucide-react';

export function MentalReplayStep({ onNext }) {
  const options = [
    {
      id: 'barely',
      title: 'Barely thought about it',
      desc: 'It crossed your mind faintly.',
      icon: <Cloud className="w-6 h-6 text-blue-300" />,
      bg: 'bg-blue-500/10'
    },
    {
      id: 'few_times',
      title: 'Came back a few times',
      desc: 'It returned occasionally throughout the day.',
      icon: <RotateCw className="w-6 h-6 text-purple-300" />,
      bg: 'bg-purple-500/10'
    },
    {
      id: 'repeating',
      title: 'Kept repeating it',
      desc: 'It replayed in your mind several times.',
      icon: <Radio className="w-6 h-6 text-orange-300" />,
      bg: 'bg-orange-500/10'
    },
    {
      id: 'still_thinking',
      title: 'Still thinking about it',
      desc: "It's still on your mind right now.",
      icon: <Sparkles className="w-6 h-6 text-yellow-300" />,
      bg: 'bg-yellow-500/10'
    }
  ];

  return (
    <div className="flex-1 flex flex-col px-6 pt-10 pb-6 relative z-10">
      
      {/* Headings */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="mb-10 mt-6"
      >
        <h1 className="text-3xl font-semibold text-white leading-snug mb-3">
          How much did this<br />stay in <span className="text-yellow-400 font-bold">your mind</span>?
        </h1>
        <p className="text-white/80 text-[15px]">Choose what feels closest?</p>
      </motion.div>

      {/* Options */}
      <div className="flex flex-col gap-4 mt-auto mb-10">
        {options.map((opt, i) => (
          <motion.button
            key={opt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + (i * 0.1) }}
            onClick={() => onNext({ replayIntensity: opt.id })}
            className="flex items-center w-full p-4 rounded-2xl bg-[#2a2626]/80 backdrop-blur-md border border-white/10 active:scale-95 transition-transform text-left"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${opt.bg}`}>
              {opt.icon}
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-white font-semibold text-[15px]">{opt.title}</h3>
              <p className="text-white/60 text-[13px] leading-snug mt-1 pr-2">{opt.desc}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-white/50 shrink-0 ml-1" />
          </motion.button>
        ))}
      </div>

    </div>
  );
}
