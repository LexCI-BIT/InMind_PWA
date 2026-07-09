import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getStaticToday, localDate } from '../../lib/api';

/**
 * PathSelect — After login, students choose their focus path:
 *   • Academic  → /student/academic
 *   • Non-Academic (Wellness) → daily static check-in (once/day), else home
 *
 * Dark theme with two large tappable cards.
 */

export function PathSelect() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(false);

  // Entering the non-academic section: ask the daily static check-in only once
  // per day. The backend is the source of truth (GET /api/flows/today) — if a
  // row exists for today → straight to home; if not → do the check-in.
  async function enterNonAcademic() {
    if (checking) return;
    setChecking(true);
    const today = localDate();
    try {
      const res = await getStaticToday(today);
      if (res?.completed_today) {
        try { localStorage.setItem('inmind_static_last', today); } catch { /* ignore */ }
        navigate('/student/home');          // already checked in today → home
      } else {
        try { localStorage.removeItem('inmind_static_last'); } catch { /* ignore */ }
        navigate('/student/daily-checkin');  // no check-in today → take the flow
      }
    } catch {
      navigate('/student/daily-checkin');    // unsure → ask (safe default)
    } finally {
      setChecking(false);
    }
  }

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#1a1a1a] font-sans">

      {/* Background accents */}
      <div className="absolute top-20 -right-20 size-56 rounded-full bg-[#3d3520] blur-[80px] opacity-50 pointer-events-none" />
      <div className="absolute bottom-32 -left-16 size-48 rounded-full bg-[#2d2c3e] blur-[70px] opacity-40 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 px-6 pt-safe pt-10">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-[13px] text-white/50 font-medium"
        >
          Welcome back 👋
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="text-[28px] font-extrabold text-white leading-tight mt-1"
        >
          Choose Your<br />Focus
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-[13px] text-white/40 mt-2"
        >
          Select what you'd like to explore today
        </motion.p>
      </div>

      {/* Cards */}
      <div className="relative z-10 flex flex-col gap-5 px-6 mt-10 flex-1">

        {/* ── Academic Card ── */}
        <motion.button
          type="button"
          onClick={() => navigate('/student/academic')}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          whileTap={{ scale: 0.97 }}
          className="w-full rounded-[24px] p-6 text-left transition hover:brightness-105"
          style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%)' }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold text-white/80 uppercase tracking-wider backdrop-blur-sm mb-3">
                <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="12" height="12" rx="2" />
                  <path d="M5 6h6M5 8h4M5 10h5" />
                </svg>
                Study Mode
              </div>
              <h2 className="text-[24px] font-extrabold text-white leading-tight">Academic</h2>
              <p className="text-[12px] text-white/60 mt-2 leading-relaxed">
                Exam materials, curriculum, question banks, and study resources
              </p>
            </div>
            <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/10 backdrop-blur-sm ml-4">
              <svg viewBox="0 0 24 24" className="h-7 w-7 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                <path d="M8 7h8M8 11h5" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-5">
            <span className="text-[11px] font-bold text-white/70">Explore →</span>
          </div>
        </motion.button>

        {/* ── Non-Academic Card ── */}
        <motion.button
          type="button"
          onClick={enterNonAcademic}
          disabled={checking}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          whileTap={{ scale: 0.97 }}
          className="w-full rounded-[24px] p-6 text-left transition hover:brightness-105 disabled:opacity-70"
          style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)' }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold text-[#1a1a1a]/70 uppercase tracking-wider backdrop-blur-sm mb-3">
                <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="8" r="6" />
                  <path d="M5.5 9.5s1 1.5 2.5 1.5 2.5-1.5 2.5-1.5" />
                  <circle cx="6" cy="6.5" r="0.5" fill="currentColor" />
                  <circle cx="10" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
                Wellness Mode
              </div>
              <h2 className="text-[24px] font-extrabold text-[#1a1a1a] leading-tight">Non-Academic</h2>
              <p className="text-[12px] text-[#1a1a1a]/60 mt-2 leading-relaxed">
                Mood tracking, meditation, journaling, challenges, and mindfulness
              </p>
            </div>
            <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/20 backdrop-blur-sm ml-4">
              <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#1a1a1a]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-5">
            <span className="text-[11px] font-bold text-[#1a1a1a]/70">{checking ? 'Checking…' : 'Explore →'}</span>
          </div>
        </motion.button>
      </div>

      {/* Footer hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 text-center text-[11px] text-white/25 pb-safe pb-8 mt-6"
      >
        You can switch anytime from the dashboard
      </motion.p>
    </section>
  );
}
