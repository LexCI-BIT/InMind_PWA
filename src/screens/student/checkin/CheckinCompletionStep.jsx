import React from 'react';
import { motion } from 'framer-motion';

export function CheckinCompletionStep({ onComplete }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center z-50">
      {/* Full Background Image */}
      <img 
        src="/completation.png" 
        alt="Completion Background" 
        className="absolute inset-0 w-full h-full object-cover z-0" 
      />
      
      {/* Dark overlay to make text readable */}
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between px-6 pb-10 pt-20">
        
        {/* Top: Hands Symbol */}
        <div className="flex justify-center mt-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-24 h-24 rounded-full bg-[#1c1813]/80 border border-[#4a4030] flex items-center justify-center backdrop-blur-sm shadow-xl"
          >
            <img 
              src="/handsymbol.png" 
              alt="Hands Symbol" 
              className="w-14 h-14 object-contain opacity-90"
            />
          </motion.div>
        </div>

        {/* Middle/Bottom text and card */}
        <div className="flex flex-col items-center mt-auto mb-8">
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[28px] font-bold text-center text-[#fde68a] leading-tight mb-4"
          >
            Thank you for taking<br/>time to check-in
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-white/90 text-center text-[15px] leading-relaxed max-w-[300px] mb-8 font-medium"
          >
            Understanding your emotions is a powerful step towards growth and well-being.
          </motion.p>

          {/* Credits Card */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-full bg-gradient-to-br from-[#fef3c7] to-[#e6cda3] rounded-2xl p-5 flex items-center shadow-[0_0_20px_rgba(253,230,138,0.3)] relative overflow-hidden"
          >
            {/* Sparkles decoration (CSS background or just subtle radial gradient) */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent pointer-events-none" />

            <div className="w-14 h-14 rounded-full bg-white/40 flex items-center justify-center border border-white/50 shrink-0 shadow-inner">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#d97706]">
                <path d="M12 2L15 8L21 9L16 14L18 20L12 17L6 20L8 14L3 9L9 8L12 2Z" fill="currentColor"/>
              </svg>
            </div>
            
            <div className="ml-4 flex flex-col">
              <span className="text-[#78350f] text-[11px] font-bold tracking-wide uppercase mb-0.5 opacity-80">
                Reflection Credits Earned
              </span>
              <span className="text-[#451a03] text-3xl font-extrabold leading-none mb-1">
                +20
              </span>
              <span className="text-[#78350f] text-[12px] font-medium opacity-70">
                Credits added to your account
              </span>
            </div>
          </motion.div>

        </div>

        {/* Bottom Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <button
            onClick={onComplete}
            className="w-full py-4 rounded-xl font-bold text-[18px] text-white shadow-lg transition-transform active:scale-95 bg-[#064e3b] border border-[#047857]/50"
          >
            Continue
          </button>
        </motion.div>
        
      </div>
    </div>
  );
}
