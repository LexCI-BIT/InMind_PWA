import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function WordQuest() {
  const navigate = useNavigate();

  return (
    <section
      className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden font-sans"
      style={{
        backgroundImage: 'url(/mindlab/wordquest/characterbg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50 z-0" />

      {/* ── Back button ── */}
      <motion.button
        type="button"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => navigate(-1)}
        className="absolute top-8 left-5 z-20 grid size-10 place-items-center rounded-full bg-black/30 backdrop-blur-sm text-white transition hover:bg-black/50"
        aria-label="Go Back"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </motion.button>

      {/* ── WORD QUEST title ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="relative z-10 mt-16 flex flex-col items-center"
      >
        <h1
          className="text-center leading-[0.95] tracking-wide"
          style={{
            fontFamily: "'Titan One', 'Impact', 'Arial Black', sans-serif",
            fontSize: 'clamp(52px, 14vw, 72px)',
            color: '#ffffff',
            textShadow: '3px 4px 0px rgba(0,0,0,0.35), 0 0 30px rgba(0,0,0,0.2)',
            WebkitTextStroke: '1.5px rgba(0,0,0,0.15)',
          }}
        >
          WORD<br />QUEST
        </h1>
      </motion.div>

      {/* ── Speech bubble ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.4, type: 'spring', stiffness: 200 }}
        className="relative z-10 mx-auto mt-8"
      >
        <div
          className="relative rounded-[20px] bg-white/95 backdrop-blur-sm px-6 py-4 shadow-lg max-w-[220px]"
          style={{
            borderRadius: '20px',
          }}
        >
          <p className="text-center text-[13px] leading-relaxed text-[#333] font-medium">
            Ready for wordquest press the start button
          </p>

          {/* Speech bubble tail — points down-left toward the character */}
          <div
            className="absolute -bottom-3 left-8"
            style={{
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '14px solid rgba(255,255,255,0.95)',
            }}
          />
        </div>
      </motion.div>

      {/* ── Spacer to push button to bottom ── */}
      <div className="flex-1" />

      {/* ── START QUEST button ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="relative z-10 flex justify-center pb-12"
      >
        <button
          type="button"
          onClick={() => navigate('/student/mindlab/wordquest/play')}
          className="relative overflow-hidden rounded-full px-10 py-4 text-[16px] font-extrabold uppercase tracking-[0.15em] text-[#3a2200] shadow-xl transition-transform active:scale-95"
          style={{
            background: 'linear-gradient(180deg, #ffd54f 0%, #f9a825 50%, #e65100 100%)',
            boxShadow: '0 6px 20px rgba(249, 168, 37, 0.45), inset 0 1px 0 rgba(255,255,255,0.3)',
            border: '2px solid rgba(255,255,255,0.2)',
          }}
        >
          START QUEST
        </button>
      </motion.div>
    </section>
  );
}
