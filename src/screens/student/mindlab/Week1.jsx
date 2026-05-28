import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export function Week1() {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  return (
    <section
      className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#0c120c] font-sans"
    >
      {/* Background Image */}
      <img
        src="/gamification/forestbg.png"
        alt="Forest Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate('/student/mindlab/progress')}
        className="absolute top-6 left-5 z-30 flex items-center justify-center w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md border border-white/10 transition-all shadow-lg"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 pr-1" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Top Text */}
      <div className="absolute top-[15%] w-full z-10 pointer-events-none">
        <p className="text-center text-[#d4af37] text-[20px] drop-shadow-md tracking-wide" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
          Tap the clue
        </p>
      </div>

      {/* Center Text */}
      <div className="absolute top-[46%] w-full z-10 px-4 pointer-events-none flex flex-col items-center">
        <h1
          className="text-center text-white text-[52px] leading-[1.02] drop-shadow-[0_4px_16px_rgba(0,0,0,1)] tracking-tight w-full"
          style={{ fontFamily: '"Baskerville", "Playfair Display", "Times New Roman", serif' }}
        >
          Unlock this<br />
          week's <span className="text-[#e2c172]">journey</span> by<br />
          finding the<br />
          <span className="text-[#e2c172]">hidden</span> symbol.
        </h1>
      </div>

      {/* Hidden Symbol (Clickable) */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowContent(true)}
        className="absolute bottom-0 right-0 z-10 outline-none group"
      >
        <div className="relative flex items-center justify-center">
          {/* The glowing yellow box perfectly matching the image size */}
          <div className="absolute inset-0 bg-[#dfbd69]/35 rounded-[12px] blur-[1px] transition-all group-hover:bg-[#dfbd69]/50" />

          <img
            src="/gamification/hiddensymbol.png"
            alt="Hidden Symbol"
            className="relative z-10 w-[65px] h-auto object-contain opacity-95"
          />
        </div>
      </motion.button>

      {/* Overlay for week1.png when hidden symbol is clicked */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="absolute inset-0 z-50 bg-black/70 flex flex-col items-center pt-[12vh] px-6"
          >
            {/* Header Area Container (relative for X button positioning) */}
            <div className="relative w-full flex flex-col items-center mb-8">
              {/* Close button aligned with the title */}
              <button
                onClick={() => setShowContent(false)}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div className="flex flex-col items-center drop-shadow-xl">
                <h3
                  className="text-[#e2c172] text-[22px] tracking-wide"
                  style={{ fontFamily: '"Baskerville", "Playfair Display", "Times New Roman", serif' }}
                >
                  Week 1
                </h3>
                <h2
                  className="text-white text-[34px] tracking-wide mt-[-2px]"
                  style={{ fontFamily: '"Baskerville", "Playfair Display", "Times New Roman", serif' }}
                >
                  The Forest
                </h2>
                <div className="w-[80px] h-[2px] bg-[#e2c172] mt-4" />
              </div>
            </div>

            {/* Main Parchment Image (with unfolding animation) */}
            <div style={{ perspective: 1200 }} className="w-full flex justify-center">
              <motion.img
                src="/gamification/week1.png"
                alt="Week 1 Content"
                initial={{ rotateX: -80, scaleY: 0.3, scaleX: 0.8, opacity: 0, y: -40 }}
                animate={{ rotateX: 0, scaleY: 1, scaleX: 1, opacity: 1, y: 0 }}
                exit={{ rotateX: 80, scaleY: 0.3, scaleX: 0.8, opacity: 0, y: 40 }}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
                style={{ transformOrigin: 'top center' }}
                className="w-[90%] max-w-[320px] h-auto object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)] rounded-md"
              />
            </div>

            {/* Bottom text and symbol */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8 flex flex-col items-center text-center"
            >
              <p className="text-white/90 text-[14px] leading-snug font-medium tracking-wide drop-shadow-md">
                Great your journey<br />
                for this week is...
              </p>

              <img
                src="/gamification/forest_symbol.png"
                alt="Forest Symbol"
                className="w-[60px] h-[60px] mt-4 object-contain drop-shadow-lg"
              />

              <p className="text-white text-[22px] tracking-wide mt-3 drop-shadow-md font-sans">
                The Forest
              </p>
            </motion.div>

            {/* Start Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              whileTap={{ scale: 0.96 }}
              className="absolute bottom-8 w-[80%] max-w-[320px] bg-[#dfbd69] text-black text-[22px] py-3.5 rounded-xl shadow-[0_5px_15px_rgba(223,189,105,0.4)] transition hover:bg-[#e6ca83]"
              style={{ fontFamily: '"Baskerville", "Playfair Display", "Times New Roman", serif' }}
              onClick={() => {
                navigate('/student/mindlab/weekly/1');
              }}
            >
              Start Week 1
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
