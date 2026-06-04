import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function ChallengeStep({ onNext }) {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    setTimeout(() => {
      onNext({ challengeAccepted: true });
    }, 600);
  };

  return (
    <div className="flex-1 flex flex-col px-6 pt-20 pb-14 relative z-10 h-full">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-[30px] font-semibold text-white leading-[1.2] tracking-tight">
          <span className="text-[#eab308]">Try</span> this once<br />
          today.
        </h2>
        <div className="mt-5 w-24 h-[1.5px] bg-white/20 rounded-full" />
      </motion.div>

      {/* Challenge Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="flex items-start gap-4 bg-[#2a2a2c]/80 backdrop-blur-md border border-white/5 rounded-2xl p-5 mt-4"
      >
        <div className="w-9 h-9 rounded-full bg-[#1a1a1c] flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4 text-gray-300" strokeWidth={1.5} />
        </div>
        <p className="text-gray-200 text-[15px] leading-[1.5] flex-1">
          Before reacting to something emotional today, pause for 5 seconds first.
        </p>
      </motion.div>

      {/* Accept Button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        onClick={handleAccept}
        className={`mt-auto w-full py-[18px] rounded-2xl font-semibold text-[16px] transition-all active:scale-95 ${
          accepted
            ? 'bg-green-500 text-white'
            : 'bg-[#d4a017] hover:bg-[#c49010] text-white'
        }`}
      >
        {accepted ? '✓ Challenge Accepted!' : 'I Accept the challenge'}
      </motion.button>
    </div>
  );
}
