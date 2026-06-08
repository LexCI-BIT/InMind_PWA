import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function MindLab() {
  const navigate = useNavigate();

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#0c0c0c] font-sans">
      
      {/* ─── Golden Header ─── */}
      <div className="relative z-20 w-full rounded-b-[24px] bg-[#dca331] pt-safe shadow-md">
        <div className="relative flex h-[70px] items-center justify-center px-5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="absolute left-5 grid size-10 place-items-center text-[#2a200a] transition hover:opacity-70"
            aria-label="Go Back"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 pr-1" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <h1 className="text-[22px] font-medium text-[#110d04] tracking-wide">
            MindLab
          </h1>
        </div>
      </div>

      {/* ─── Main Content Area ─── */}
      <div className="flex-1 px-6 pt-8 pb-10 overflow-y-auto">
        
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-[22px] font-medium text-white tracking-wide">
            Good Morning, Aarav
          </h2>
          <p className="mt-1.5 text-[12px] text-white/50 tracking-wide">
            Ready to train your mind today?
          </p>
        </motion.div>

        {/* Word Quest Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="relative mt-8 w-full overflow-hidden rounded-[14px] bg-[#1a1b1f] border-l-[3px] border-[#dca331] shadow-lg"
        >
          <div className="flex justify-between items-center px-6 py-8">
            
            {/* Left Content */}
            <div className="relative z-10 flex-1 max-w-[180px]">
              <p className="text-[9px] font-bold tracking-[0.15em] text-white/40 uppercase mb-2">
                Word Quest
              </p>
              <h3 className="text-[20px] font-normal leading-tight text-white mb-2">
                Learn 3 New Words
              </h3>
              <p className="text-[10px] leading-relaxed text-white/50 mb-5 max-w-[140px]">
                Solve the puzzles and strengthen your vocabulary.
              </p>
              
              <button
                type="button"
                onClick={() => navigate('/student/mindlab/wordquest')}
                className="flex items-center gap-1.5 rounded-full bg-[#9e7427] px-4 py-1.5 text-[11px] font-medium text-[#fcedc7] transition hover:bg-[#b2842e]"
              >
                Start Quest
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 10h12" />
                  <path d="M12 6l4 4-4 4" />
                </svg>
              </button>
            </div>

            {/* Right Image (Word Quest Puzzle Piece) */}
            <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-[160px] pointer-events-none mix-blend-lighten">
              <img 
                src="/mindlab/wordquest.png" 
                alt="Puzzle Piece" 
                className="w-full h-auto object-contain drop-shadow-2xl opacity-90"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
