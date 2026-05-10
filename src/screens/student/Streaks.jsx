import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Streaks() {
  const navigate = useNavigate();

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#222222] font-sans">
      {/* Background blobs */}
      <div className="absolute -left-12 top-24 size-48 rounded-full bg-[#2d2c3e] blur-3xl opacity-60" />
      <div className="absolute -right-20 top-72 size-64 rounded-full bg-[#402424] blur-3xl opacity-70" />
      <div className="absolute -left-12 bottom-32 size-40 rounded-full bg-[#2f2f2f] blur-2xl opacity-50" />

      {/* Header */}
      <div className="relative z-10 flex items-center px-6 pt-safe pt-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-white p-2 -ml-2 transition hover:opacity-70"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center pb-32">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
          className="text-center flex flex-col items-center"
        >
          <h1 className="text-[130px] font-black leading-[0.8] tracking-tighter text-[#fca11a]">
            67
          </h1>
          <p className="text-[18px] font-bold text-[#fca11a] mt-4">
            day streak
          </p>
        </motion.div>

        {/* Days Row */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-14 flex w-full max-w-[320px] justify-between px-2"
        >
          {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day, i) => (
            <div key={day} className="flex flex-col items-center gap-2.5">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05, type: 'spring', bounce: 0.5 }}
                className="size-[22px] rounded-full bg-[#fca11a]" 
              />
              <span className="text-[9px] font-bold tracking-widest text-white/90">
                {day}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Footer text */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 text-[15px] font-bold text-white tracking-wide"
        >
          Reached a <span className="text-[#fca11a]">perfect</span> Streak!
        </motion.p>
      </div>
    </section>
  );
}
