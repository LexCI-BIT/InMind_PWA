import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function PictureStoryIntro() {
  const navigate = useNavigate();

  return (
    <section className="relative mx-auto flex h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#11211c] font-sans">
      
      {/* Scrollable Content */}
      <div className="relative z-10 flex-1 overflow-y-auto px-6 pb-[100px] pt-safe-top">
        
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-6 grid size-10 place-items-center text-white transition hover:opacity-70"
          aria-label="Go Back"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 flex flex-col items-center text-center"
        >
          {/* Icon Badge */}
          <div className="relative mb-6">
            {/* Glowing background */}
            <div className="absolute inset-0 rounded-full bg-[#dfa86a]/10 blur-[20px] scale-[2]"></div>
            
            {/* Circle Container */}
            <div className="relative w-[75px] h-[75px] rounded-full bg-[#183a31] flex items-center justify-center shadow-lg">
              {/* Document Icon */}
              <svg viewBox="0 0 24 24" className="w-[42px] h-[42px] text-[#dfa86a] fill-current">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
              </svg>
            </div>
            
            {/* Pencil Badge */}
            <div className="absolute -bottom-1 -right-2 w-8 h-8 rounded-full bg-[#2c4e40] border-[2.5px] border-[#11211c] flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#8b9e95] fill-current">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
              </svg>
            </div>
          </div>

          <h1 className="text-[22px] font-semibold text-white leading-snug mb-4 tracking-wide">
            Picture Story<br/>Challenge
          </h1>
          
          <p className="text-[12px] text-white/70 leading-relaxed max-w-[280px] font-medium px-4 mb-10">
            In this test, you will be shown a picture. Observe it carefully and write a simple, meaningful and well-structured story.
          </p>
        </motion.div>

        {/* Instruction Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex flex-col gap-3.5"
        >
          {/* Card 1 */}
          <div className="flex items-center gap-4 bg-[#0e1c18] border border-[#1a382e] rounded-[12px] p-4 shadow-sm">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#dfa86a] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="13" r="8" />
              <polyline points="12 9 12 13 14 15" />
              <line x1="3" y1="5" x2="7" y2="2" />
              <line x1="21" y1="5" x2="17" y2="2" />
            </svg>
            <p className="text-[11px] text-white/90 leading-snug font-medium pr-2">
              The test starts immediately when you click on Start Test.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex items-center gap-4 bg-[#0e1c18] border border-[#1a382e] rounded-[12px] p-4 shadow-sm">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#dfa86a] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
            <p className="text-[11px] text-white/90 leading-snug font-medium pr-2">
              Use full screen mode on desktop for best experience.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex items-center gap-4 bg-[#0e1c18] border border-[#1a382e] rounded-[12px] p-4 shadow-sm">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#dfa86a] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            <p className="text-[11px] text-white/90 leading-snug font-medium pr-2">
              Write a simple and easy story. Avoid unnecessary or forced expressions.
            </p>
          </div>
        </motion.div>

      </div>

      {/* Fixed Bottom Action */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-4 bg-gradient-to-t from-[#11211c] via-[#11211c] to-transparent z-20">
        <button
          className="w-full h-[52px] rounded-xl bg-[#dfa86a] text-[#2c1c0a] font-bold text-[16px] shadow-lg transition-transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
          onClick={() => navigate('/student/mindlab/pictureperception/game')}
        >
          Start Test
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>

    </section>
  );
}
