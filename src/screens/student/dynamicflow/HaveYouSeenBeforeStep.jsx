import React from 'react';
import { motion } from 'framer-motion';

export function HaveYouSeenBeforeStep({ onSelect }) {
  const options = [
    {
      id: 'many_times',
      title: 'Many times',
      subtitle: 'It has happened several\ntimes.',
      top: '15%',
    },
    {
      id: 'once_or_twice',
      title: 'Once or twice',
      subtitle: 'It has happened once or\ntwice.',
      top: '44.5%',
    },
    {
      id: 'not_really',
      title: 'Not really',
      subtitle: "It hasn't really happened\nbefore.",
      top: '74%',
    }
  ];

  return (
    <div className="flex-1 flex flex-col relative z-10 h-full w-full">
      
      {/* Cards Area - Absolute positioned to exactly match the background lines */}
      <div className="absolute inset-0 pointer-events-none">
        {options.map((opt, i) => (
          <div 
            key={opt.id}
            className="absolute w-full pl-[105px] pr-6 pointer-events-auto"
            style={{ top: opt.top, transform: 'translateY(-50%)' }}
          >
            <motion.button
              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }}
              onClick={() => onSelect(opt.id)}
              className="w-full bg-[#2e2e30]/80 backdrop-blur-md rounded-[18px] p-4 py-[14px] flex items-center justify-between border border-[#b87034]/30 active:scale-95 transition-transform text-left shadow-lg"
            >
              <div>
                <h3 className="text-[#f3f4f6] text-[15px] font-medium mb-1">{opt.title}</h3>
                <p className="text-[#9ca3af] text-[13px] leading-[1.25] whitespace-pre-line">{opt.subtitle}</p>
              </div>
              <div className="text-[#9ca3af] font-light text-lg mr-1">{'>'}</div>
            </motion.button>
          </div>
        ))}
      </div>

      {/* Bottom Text Area */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="absolute bottom-10 left-8 right-6 pointer-events-none"
      >
        <h2 className="text-[28px] font-semibold text-white leading-[1.2] tracking-tight">
          Has something like this<br/>
          happened <span className="text-[#eab308]">before</span>?
        </h2>
      </motion.div>
    </div>
  );
}
