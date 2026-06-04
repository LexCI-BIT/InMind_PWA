import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function OptionalReflectionStep({ onNext }) {
  const [text, setText] = useState('');

  return (
    <div className="flex-1 flex flex-col px-6 pt-20 pb-10 relative z-10 h-full bg-black">
      
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-[30px] font-semibold text-white leading-[1.2] tracking-tight">
          Want to <span className="text-[#eab308]">add</span><br />
          anything?
        </h2>
        {/* Divider */}
        <div className="mt-5 w-28 h-[1.5px] bg-white/20 rounded-full" />
      </motion.div>

      {/* Optional Textarea */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="mt-6"
      >
        <p className="text-gray-400 text-[15px] mb-3">(Optional)</p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Only if you'd like to..."
          rows={5}
          className="w-full bg-[#1c1c1e] text-white text-[15px] placeholder:text-gray-500 rounded-2xl p-4 resize-none focus:outline-none border border-white/5 leading-relaxed"
        />
      </motion.div>

      {/* Arrow Button bottom-right */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
        onClick={() => onNext({ optionalReflection: text })}
        className="absolute bottom-10 right-6 w-14 h-14 bg-[#eab308] hover:bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg transition-colors active:scale-95"
      >
        <ArrowRight className="w-6 h-6 text-black" />
      </motion.button>
    </div>
  );
}
