import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { WEEKS } from './weeklyData';
import DynamicFlow from '../dynamicflow/DynamicFlow';

/**
 * WeeklyDetail — shows a single week's 7-day card list.
 *
 * Route: /student/mindlab/weekly/:weekId
 *
 * Design (matching mockup):
 *   • Back arrow, WEEK XX label (amber), week title (white)
 *   • 7 stacked day cards: day label · duration, focus title, description
 *   • Status: ✓ done  ▶ current (amber)  🔒 locked (grey)
 *   • Tap the current/unlocked day to enter the 7-step daily flow
 */

const pad = (n) => String(n).padStart(2, '0');

export function WeeklyDetail() {
  const navigate = useNavigate();
  const { weekId } = useParams();
  const weekIndex = parseInt(weekId, 10) - 1;
  const week = WEEKS[weekIndex];

  // Track which day user is doing (0-based, simulated progress)
  const [currentDay, setCurrentDay] = useState(1); // 0 = done, 1 = active
  const [activeDayIdx, setActiveDayIdx] = useState(null);

  if (!week) {
    return (
      <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col items-center justify-center bg-[#1a1a1a] font-sans">
        <p className="text-white/50 text-sm">Week not found</p>
        <button type="button" onClick={() => navigate(-1)} className="mt-4 text-[#f59e0b] text-sm font-bold">Go Back</button>
      </section>
    );
  }

  /* ── Day Activity overlay ── */
  if (activeDayIdx !== null) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100]"
        >
          <DynamicFlow
            week={week}
            dayIndex={activeDayIdx}
            onBack={() => setActiveDayIdx(null)}
            onComplete={() => {
              setCurrentDay(prev => Math.min(prev + 1, 7));
              setActiveDayIdx(null);
            }}
          />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#1a1a1a] font-sans pb-10">

      {/* Background blobs */}
      <div className="absolute -right-20 top-20 size-52 rounded-full bg-[#3d2c2c] blur-[80px] opacity-40 pointer-events-none" />
      <div className="absolute -left-16 bottom-40 size-48 rounded-full bg-[#2c2d3e] blur-[70px] opacity-30 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 px-6 pt-safe pt-8">
        <button type="button" onClick={() => navigate(-1)} className="text-white p-2 -ml-2 mb-4 hover:opacity-70 transition">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <p className="text-[#f59e0b] text-[13px] font-bold uppercase tracking-widest">
          WEEK {pad(week.id)}
        </p>
        <h1 className="text-[28px] font-bold text-white leading-tight mt-1">
          {week.title}
        </h1>
      </div>

      {/* Day Cards */}
      <div className="relative z-10 flex-1 overflow-y-auto px-6 mt-8">
        <div className="flex flex-col gap-3">
          {week.days.map((day, idx) => {
            const isDone = idx < currentDay;
            const isCurrent = idx === currentDay;
            const isLocked = idx > currentDay;

            return (
              <motion.button
                key={idx}
                type="button"
                disabled={isLocked}
                onClick={() => {
                  if (!isLocked) setActiveDayIdx(idx);
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                className={[
                  'w-full rounded-2xl p-4 text-left transition flex items-center justify-between',
                  isCurrent
                    ? 'bg-[#f59e0b] shadow-lg shadow-[#f59e0b]/20'
                    : 'bg-[#242424] border border-[#2e2e2e]',
                  isLocked ? 'opacity-60' : 'hover:brightness-105',
                ].join(' ')}
              >
                <div className="flex-1 min-w-0">
                  <p className={[
                    'text-[10px] font-bold uppercase tracking-wider',
                    isCurrent ? 'text-[#1a1a1a]/60' : 'text-white/40',
                  ].join(' ')}>
                    {day.day} · {day.duration}
                  </p>
                  <p className={[
                    'text-[15px] font-bold mt-0.5',
                    isCurrent ? 'text-[#1a1a1a]' : 'text-white',
                  ].join(' ')}>
                    {day.focus}
                  </p>
                  <p className={[
                    'text-[11px] mt-0.5',
                    isCurrent ? 'text-[#1a1a1a]/50' : 'text-white/30',
                  ].join(' ')}>
                    Activity description ...
                  </p>
                </div>

                {/* Status icon */}
                <div className="shrink-0 ml-3">
                  {isDone && (
                    <div className="grid size-8 place-items-center rounded-full bg-[#22c55e]/20">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#22c55e]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                  {isCurrent && (
                    <div className="grid size-8 place-items-center rounded-full bg-[#1a1a1a]/20">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#1a1a1a] ml-0.5" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                  {isLocked && (
                    <div className="grid size-8 place-items-center rounded-full bg-white/5">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 text-white/20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="11" width="14" height="10" rx="2" />
                        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                      </svg>
                    </div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
