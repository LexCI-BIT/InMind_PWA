import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * MindLabProgress — shows overall learning progress with
 * current module, completed modules, and upcoming modules.
 */

const CURRENT_MODULE = {
  month: 'SEPTEMBER',
  monthNum: '02',
  title: 'Understanding my feelings',
  description: 'master the core pillars of visual design, including typography, color theory, and layout grids.',
  bullets: ['Clarity and confidence', 'Lorem ipsum', 'Lorem ipsum'],
};

const COMPLETED = [
  {
    id: 1,
    month: 'AUGUST',
    monthNum: '01',
    title: 'Calm Body, Clam Mind',
    description: 'introduction to human centered design empathy mapping and problem definition',
  },
];

const UPCOMING = [
  {
    id: 2,
    month: 'OCTOBER',
    monthNum: '01',
    title: 'Listening & Attention',
    description: 'introduction to human centered design empathy mapping and problem definition',
  },
];

export function MindLabProgress() {
  const navigate = useNavigate();
  const progressPct = 65;
  const completed = 8;
  const total = 12;

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#141414] font-sans pb-10">
      {/* Background blobs */}
      <div className="absolute top-20 -right-16 size-48 rounded-full bg-[#3d2c2c] blur-[70px] opacity-40 pointer-events-none" />
      <div className="absolute top-[60%] -left-16 size-40 rounded-full bg-[#2c2d3e] blur-[60px] opacity-30 pointer-events-none" />

      {/* ───── Header ───── */}
      <div className="relative z-10 px-6 pt-safe pt-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-white hover:opacity-80 transition"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>

      {/* ───── Progress Bar ───── */}
      <div className="relative z-10 px-6 mt-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[12px] font-bold text-white/80 tracking-wider uppercase">Your Progress</p>
          <p className="text-[14px] font-extrabold text-[#f59e0b]">{progressPct}%</p>
        </div>
        <div className="w-full h-[8px] rounded-full bg-[#2a2a2a] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #ef4444 0%, #f59e0b 50%, #22c55e 100%)',
            }}
          />
        </div>
        <p className="text-[12px] text-white/50 mt-2 font-medium">{completed} of {total} modules completed</p>
      </div>

      {/* ───── Current Module ───── */}
      <div className="relative z-10 px-6 mt-8">
        <p className="text-[11px] font-extrabold text-[#f59e0b] tracking-wider uppercase mb-4">
          Current Module
        </p>

        <div className="flex items-start gap-4">
          {/* Play icon */}
          <div className="shrink-0 mt-1">
            <div className="size-10 rounded-full bg-[#f59e0b] grid place-items-center shadow-md shadow-[#f59e0b]/30">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-white ml-0.5" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Module Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1 rounded-[20px] bg-[#f59e0b] p-5 shadow-lg shadow-[#f59e0b]/15"
          >
            <p className="text-[10px] font-bold text-[#1a1a1a]/70 tracking-wider uppercase">
              {CURRENT_MODULE.month} – MONTH {CURRENT_MODULE.monthNum}
            </p>
            <h2 className="text-[18px] font-extrabold text-[#1a1a1a] leading-tight mt-1.5">
              {CURRENT_MODULE.title}
            </h2>
            <p className="text-[11px] text-[#1a1a1a]/70 leading-relaxed mt-2 font-medium">
              {CURRENT_MODULE.description}
            </p>

            {/* Bullet points */}
            <div className="mt-3 flex flex-col gap-1.5">
              {CURRENT_MODULE.bullets.map((bullet, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="size-[6px] rounded-full bg-[#1a1a1a]/60" />
                  <span className="text-[11px] font-medium text-[#1a1a1a]/80">{bullet}</span>
                </div>
              ))}
            </div>

            {/* Resume Button */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              className="mt-4 rounded-full bg-[#1a1a1a] px-5 py-2.5 text-[12px] font-bold text-white shadow-sm hover:bg-[#2a2a2a] transition"
            >
              Resume Lesson
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* ───── Completed ───── */}
      <div className="relative z-10 px-6 mt-8">
        <p className="text-[11px] font-extrabold text-white/50 tracking-wider uppercase mb-4">
          Completed
        </p>

        {COMPLETED.map((mod) => (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex items-start gap-4"
          >
            {/* Check icon */}
            <div className="shrink-0 mt-1">
              <div className="size-10 rounded-full bg-[#22c55e] grid place-items-center">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>

            <div className="flex-1 border-l-2 border-[#2a2a2a] pl-4 pb-4">
              <p className="text-[10px] font-bold text-[#f59e0b] tracking-wider uppercase">
                {mod.month} MONTH {mod.monthNum}
              </p>
              <h3 className="text-[15px] font-bold text-white mt-1">{mod.title}</h3>
              <p className="text-[11px] text-white/50 leading-relaxed mt-1 font-medium">{mod.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ───── Upcoming Modules ───── */}
      <div className="relative z-10 px-6 mt-6">
        <p className="text-[11px] font-extrabold text-white/50 tracking-wider uppercase mb-4">
          Upcoming Modules
        </p>

        {UPCOMING.map((mod) => (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex items-start gap-4"
          >
            {/* Lock icon */}
            <div className="shrink-0 mt-1">
              <div className="size-10 rounded-full bg-[#3a3a3a] grid place-items-center">
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 text-white/50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
            </div>

            <div className="flex-1 border-l-2 border-[#2a2a2a] pl-4 pb-4">
              <p className="text-[10px] font-bold text-[#f59e0b] tracking-wider uppercase">
                {mod.month} MONTH {mod.monthNum}
              </p>
              <h3 className="text-[15px] font-bold text-white mt-1">{mod.title}</h3>
              <p className="text-[11px] text-white/50 leading-relaxed mt-1 font-medium">{mod.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
