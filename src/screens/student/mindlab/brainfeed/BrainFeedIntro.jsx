import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Clock, Lock, Brain } from 'lucide-react';

export default function BrainFeedIntro({ onStart }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex h-full w-full flex-col items-center justify-between bg-[#0a0a0f]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/mindlab/brainfeed/brainfeedbg.png"
          alt="Space background"
          className="h-full w-full object-cover"
        />
        {/* Subtle gradient overlays to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90"></div>
      </div>

      {/* Top Header */}
      <div className="relative z-10 flex w-full items-center justify-between px-6 pt-safe mt-6">
        <button
          onClick={() => navigate(-1)}
          className="text-white hover:opacity-70"
        >
          <ChevronLeft className="h-6 w-6" strokeWidth={2.5} />
        </button>

        <div className="flex items-center gap-2 rounded-full border border-purple-500/30 bg-[#0f0b1a]/80 px-3 py-1.5 backdrop-blur-md">
          <Clock className="h-3.5 w-3.5 text-purple-500" strokeWidth={2.5} />
          <span className="text-xs font-medium text-gray-300">5:00 left today</span>
        </div>
      </div>

      {/* Main Center Content */}
      <div className="relative z-10 flex flex-col items-center text-center -mt-20">
        <div className="mb-4 text-purple-600">
          <Brain className="h-16 w-16" strokeWidth={2} />
        </div>
        
        <h1 className="mb-3 text-[32px] font-bold tracking-wide text-white">
          BRAIN<span className="text-[#8c6bf7]">FEED</span>
        </h1>
        
        <p className="max-w-[240px] text-sm font-medium leading-relaxed text-gray-300">
          Learn something new in just 5 minutes.
        </p>
      </div>

      {/* Bottom Actions */}
      <div className="relative z-10 mb-12 flex w-full flex-col items-center px-6">
        <button
          onClick={onStart}
          className="relative flex w-full items-center justify-center gap-2 rounded-xl bg-[#7c5ff0] py-4 shadow-[0_0_20px_rgba(124,95,240,0.4)] transition-all hover:bg-[#6c4fe0] active:scale-[0.98]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white rotate-180">
            <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
          </svg>
          <span className="text-[17px] font-bold text-white">Start BrainFeed</span>
        </button>
        
        <div className="mt-5 flex items-center gap-2 text-gray-400">
          <Lock className="h-3.5 w-3.5" strokeWidth={2.5} />
          <span className="text-[13px] font-medium">Only 5 minutes daily</span>
        </div>
      </div>
    </motion.div>
  );
}
