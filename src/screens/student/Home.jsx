import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { StudentDock } from '../../components/StudentDock';
import { Streaks } from './Streaks';
import { StudentCalendar } from './Calendar';
import { Breathing } from './Breathing';
import { useDailyStaticGate } from '../../lib/useDailyStaticGate';

/**
 * StudentHome — pixel-faithful rebuild from the long Figma frame.
 *
 *   1. Greeting + bell
 *   2. Cyan mood blob (gentle floating animation)
 *   3. "Start Today's Emotional Check-In" card (yellow CTA)
 *   4. "Today's Progress" card (purple bar + Complete Now)
 *   5. "5 Day Streak" coral card with trophy + star achievement chips
 *   6. DAILY EXPLORER 2-col tile grid (vertical tiles, circle icon chip on top)
 *   7. INSIGHTS · Weekly Mood Trend rounded-mountain bar chart
 *   8. AI SUGGESTION breathing-break card with wind glyph
 *   9. Floating bottom nav (5 icons, centre = active home in amber)
 */

const DAYS_FULL = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
const MONTHS = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
];

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}
function dateLine() {
  const d = new Date();
  return `${DAYS_FULL[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

const EXPLORER = [
  { 
    id: 'journal', label: 'Journal', path: '/student/journal',
    iconBg: '#c4b5fd', iconColor: '#5b21b6',
    Icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h2v16H4z" fill="currentColor" opacity="0.3"/>
        <rect x="4" y="3" width="16" height="18" rx="2"/>
        <path d="M9 8h6"/>
        <path d="M9 12h6"/>
        <path d="M9 16h4"/>
      </svg>
    )
  },
  { 
    id: 'challenges', label: 'Weekly Challenges', path: '/student/challenges',
    iconBg: '#99f6e4', iconColor: '#0f766e',
    Icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
        <path d="M12 2v4"/>
        <path d="M12 18v4"/>
        <path d="M2 12h4"/>
        <path d="M18 12h4"/>
      </svg>
    )
  },
  { 
    id: 'mindlab', label: 'Mind Lab', path: '/student/mindlab',
    iconBg: '#fed7aa', iconColor: '#9a3412',
    Icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 7v10"/>
        <path d="M18 7v10"/>
        <path d="M6 12h12"/>
        <rect x="3" y="8" width="3" height="8" rx="1"/>
        <rect x="18" y="8" width="3" height="8" rx="1"/>
      </svg>
    )
  },
  { 
    id: 'quiz', label: 'Quiz', path: '/student/quiz',
    iconBg: '#e5e5e5', iconColor: '#374151',
    Icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2"/>
        <path d="M9 10a3 3 0 1 1 3 3v1"/>
        <circle cx="12" cy="17" r="0.5" fill="currentColor"/>
      </svg>
    )
  },
  { 
    id: 'share', label: 'Share a Thought', path: '/student/share',
    iconBg: '#c4b5fd', iconColor: '#5b21b6',
    Icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="10" r="7"/>
        <path d="M12 17v4"/>
        <path d="M8 21h8"/>
        <circle cx="12" cy="10" r="3"/>
        <path d="M12 7v0"/>
        <path d="M15 10h0"/>
        <path d="M12 13v0"/>
        <path d="M9 10h0"/>
      </svg>
    )
  },
  { 
    id: 'audio', label: 'Audio Space', path: '/student/audio',
    iconBg: '#99f6e4', iconColor: '#0f766e',
    Icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="14" rx="2"/>
        <path d="M2 6l9-3h2l9 3"/>
        <path d="M2 10h20"/>
        <path d="M7 6v4"/>
        <path d="M12 6v4"/>
        <path d="M17 6v4"/>
      </svg>
    )
  },
  { 
    id: 'workshop', label: 'Workshop', path: '/student/workshop',
    iconBg: '#fef08a', iconColor: '#854d0e',
    Icon: () => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="14" rx="2"/>
        <path d="M8 21h8"/>
        <path d="M12 17v4"/>
        <path d="M8 8l3 3-3 3"/>
        <path d="M14 14h3"/>
      </svg>
    )
  },
];

// Mood trend (0-100) per weekday — Friday spikes (highlighted bar)
const TREND = [
  { d: 'M', v: 55 },
  { d: 'T', v: 78 },
  { d: 'W', v: 42 },
  { d: 'T', v: 28 },
  { d: 'F', v: 95, highlight: true },
  { d: 'S', v: 60 },
  { d: 'S', v: 70 },
];

export function StudentHome() {
  const navigate = useNavigate();
  useDailyStaticGate(); // once-per-day static check-in gate (on login/landing)
  const [showStreaks, setShowStreaks] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  const completed = 3;
  const total = 7;
  const pct = Math.round((completed / total) * 100);

  /* ── Streaks overlay ── */
  if (showStreaks) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100]"
        >
          <Streaks onBack={() => setShowStreaks(false)} />
        </motion.div>
      </AnimatePresence>
    );
  }

  /* ── Calendar overlay ── */
  if (showCalendar) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100]"
        >
          <StudentCalendar onBack={() => setShowCalendar(false)} />
        </motion.div>
      </AnimatePresence>
    );
  }

  /* ── Breathing overlay ── */
  if (showBreathing) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100]"
        >
          <Breathing onBack={() => setShowBreathing(false)} />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#181818]">
      {/* ───── Scroll body ───── */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Header: greeting + bell */}
        <div className="flex items-start justify-between px-7 pt-safe pt-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-[32px] font-bold leading-tight text-white">{greeting()}</h1>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.05em] text-white/80">
              {dateLine()}
            </p>
          </motion.div>

          <div className="flex items-center gap-2 shrink-0 ml-4">
            {/* Calendar button */}
            <motion.button
              type="button"
              aria-label="Calendar"
              onClick={() => setShowCalendar(true)}
              whileTap={{ scale: 0.92 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="grid size-11 place-items-center rounded-full bg-[#2a2a2a] border border-[#3a3a3a] shadow-md"
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </motion.button>

            {/* Notifications button */}
            <motion.button
              type="button"
              aria-label="Notifications"
              onClick={() => navigate('/student/notifications')}
              whileTap={{ scale: 0.92 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="relative grid size-11 place-items-center rounded-full bg-[#ffb703] shadow-md shadow-amber-400/25"
            >
              <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="#ffffff">
                <path d="M12 2a6 6 0 0 0-6 6c0 5-2 7-3 8h18c-1-1-3-3-3-8a6 6 0 0 0-6-6zM10.3 20a2 2 0 0 0 3.4 0z" />
              </svg>
              <span className="absolute right-2 top-2 size-2.5 rounded-full bg-[#ef4444]" />
            </motion.button>
          </div>
        </div>

        {/* Mood blob */}
        <div className="my-8 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 180, damping: 18 }}
            className="animate-floaty"
          >
            <svg viewBox="0 0 200 200" width="180" height="180" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="blobFill" cx="40%" cy="35%" r="70%">
                <stop offset="0%" stopColor="#e6fbff" />
                <stop offset="65%" stopColor="#9ee7f5" />
                <stop offset="100%" stopColor="#5ec5dc" />
              </radialGradient>
              <filter id="blobGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <path
              d="M100 18 C 142 18 174 50 174 96 C 174 134 158 168 122 178 C 92 186 60 178 36 156 C 14 134 18 96 32 68 C 48 38 70 18 100 18 Z"
              fill="url(#blobFill)"
              stroke="rgba(255, 255, 255, 0.7)"
              strokeWidth="2.5"
              filter="url(#blobGlow)"
            />
            <circle cx="80" cy="92" r="6.5" fill="#1f1f1f" />
            <circle cx="120" cy="92" r="6.5" fill="#1f1f1f" />
            <path d="M86 112 L114 112" stroke="#1f1f1f" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          </svg>
          </motion.div>
        </div>




        {/* Today's Progress */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mx-6 mt-4 rounded-[28px] bg-[#262626] p-5"
        >
          <div className="flex items-center justify-between">
            <div className="grid size-9 place-items-center rounded-full bg-violet-500/15">
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <span className="text-[14.5px] font-bold text-violet-400">{pct}% done</span>
          </div>

          <div className="mt-3.5">
            <p className="text-[17px] font-bold text-white">Today's Progress</p>
            <p className="mt-0.5 text-[12.5px] text-white/45">
              {completed}/{total} activities completed
            </p>
          </div>

          <div className="mt-3 h-[7px] overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #8b5cf6, #6366f1)' }}
              initial={{ width: '0%' }}
              animate={{ width: `${pct}%` }}
              transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            />
          </div>

          <div className="mt-3 flex gap-1.5">
            {Array.from({ length: total }).map((_, i) => (
              <span
                key={i}
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: i < completed ? '#8b5cf6' : 'rgba(255,255,255,0.12)' }}
              />
            ))}
          </div>

          <motion.button
            type="button"
            onClick={() => navigate('/student/day-task')}
            whileTap={{ scale: 0.97 }}
            className="mt-5 w-full rounded-full bg-violet-500 py-3.5 text-[15px] font-bold text-white shadow-md shadow-violet-500/25 transition hover:brightness-110"
          >
            Complete Now
          </motion.button>
        </motion.div>

        {/* 5 Day Streak */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          onClick={() => setShowStreaks(true)}
          className="mx-6 mt-4 flex items-center gap-3 rounded-[24px] px-5 py-4 cursor-pointer hover:opacity-90 transition-opacity"
          style={{ background: '#ff5c5c' }}
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/20">
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none">
              <path d="M12 2C12 2 7 8 7 13a5 5 0 0 0 10 0c0-5-5-11-5-11z" fill="#fff" />
              <path d="M12 10c0 0-2 2.5-2 5a2 2 0 0 0 4 0c0-2.5-2-5-2-5z" fill="#fbbf24" />
            </svg>
          </span>
          <div className="flex-1">
            <p className="text-[16px] font-bold leading-tight text-white">5 Day Streak</p>
            <p className="mt-0.5 text-[11.5px] leading-snug text-white/85">
              You're staying<br />consistent, Alex!
            </p>
          </div>
          <div className="flex gap-1.5">
            <span className="grid size-7 place-items-center rounded-full bg-pink-200">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="#db2777">
                <path d="M7 4h10v3a5 5 0 0 1-5 5 5 5 0 0 1-5-5V4zm5 9v4m-3 4h6v-2H9v2z" />
              </svg>
            </span>
            <span className="grid size-7 place-items-center rounded-full bg-emerald-200">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="#059669">
                <path d="M12 2l2.5 6 6 .5-4.5 4 1.5 6-5.5-3-5.5 3 1.5-6-4.5-4 6-.5z" />
              </svg>
            </span>
          </div>
        </motion.div>

        {/* DAILY EXPLORER */}
        <p className="mt-7 px-7 text-[10.5px] font-bold uppercase tracking-[0.22em] text-white/45">
          Daily Explorer
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3 px-6">
          {EXPLORER.map(({ id, label, iconBg, iconColor, Icon, path }, i) => (
            <motion.button
              key={id}
              type="button"
              onClick={() => path && navigate(path)}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.05, duration: 0.35 }}
              className="flex flex-col items-start gap-3 rounded-[20px] bg-[#262626] p-4 text-left transition hover:bg-[#2c2c2c]"
            >
              <span
                className="grid size-10 place-items-center rounded-full"
                style={{ backgroundColor: iconBg, color: iconColor }}
              >
                <Icon />
              </span>
              <span className="text-[14.5px] font-bold leading-tight text-white">{label}</span>
            </motion.button>
          ))}
        </div>

        {/* INSIGHTS */}
        <div className="mt-7 flex items-center justify-between px-7">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-white/45">Insights</p>
          <button type="button" className="text-[12px] font-semibold text-violet-400 transition hover:text-violet-300">
            View All
          </button>
        </div>

        {/* Weekly Mood Trend chart */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="mx-6 mt-3 rounded-[24px] bg-[#262626] p-5"
        >
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-bold text-white">Weekly Mood Trend</p>
            <span className="rounded-full bg-white/8 px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-wider text-white/55">
              Last 7 Days
            </span>
          </div>

          {/* mountain bar chart */}
          <div className="relative mt-6 h-[120px]">
            <div className="flex h-full items-end justify-between gap-1.5">
              {TREND.map(({ v, highlight }, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${v}%` }}
                  transition={{ delay: 0.7 + i * 0.06, duration: 0.55, ease: 'easeOut' }}
                  className="relative flex-1"
                  style={{ minHeight: 8 }}
                >
                  <span
                    className="absolute inset-x-0 bottom-0 rounded-t-[40px]"
                    style={{
                      height: '100%',
                      background: highlight
                        ? 'linear-gradient(180deg, #67e8f9 0%, #22d3ee 70%, #0ea5b8 100%)'
                        : 'linear-gradient(180deg, #475569 0%, #334155 100%)',
                      boxShadow: highlight ? '0 0 24px rgba(34,211,238,0.45)' : 'none',
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* day labels */}
          <div className="mt-3 flex justify-between px-0.5">
            {TREND.map(({ d }, i) => (
              <span key={i} className="text-[11px] font-medium text-white/45">{d}</span>
            ))}
          </div>
        </motion.div>

        {/* AI SUGGESTION breathing card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="mx-6 mt-5 rounded-[24px] p-5 text-white"
          style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)' }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/75">
            AI Suggestion
          </p>
          <div className="mt-2 flex items-start justify-between gap-3">
            <p className="text-[18px] font-bold leading-tight">
              Take a 2-minute<br />breathing break
            </p>
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/15 backdrop-blur-sm" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h11a3 3 0 1 0-3-3" />
                <path d="M3 13h15a3 3 0 1 1-3 3" />
                <path d="M3 18h7" />
              </svg>
            </span>
          </div>
          <motion.button
            type="button"
            onClick={() => setShowBreathing(true)}
            whileTap={{ scale: 0.97 }}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-[12.5px] font-bold text-[#7c3aed] shadow-sm transition hover:bg-white/90"
          >
            Try Now
          </motion.button>
        </motion.div>
      </div>

      {/* ───── Floating bottom nav (shared dock) ───── */}
      <StudentDock active="home" />
    </section>
  );
}

/* ─── Daily Explorer tile icons ─── */

function PencilLineIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4l6 6-10 10H4v-6l10-10z" />
      <path d="M14 4l6 6" />
    </svg>
  );
}
function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-9-9" />
      <path d="M21 3l-9 9" />
      <path d="M16 3h5v5" />
    </svg>
  );
}
function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
      <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
    </svg>
  );
}
function QuizIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 9a3 3 0 1 1 3 3v2" />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" />
    </svg>
  );
}
function BulbIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-4 10.5c.7.6 1 1.4 1 2.5h6c0-1 .3-1.9 1-2.5A6 6 0 0 0 12 3z" />
    </svg>
  );
}
function AudioIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 9v6l5-3-5-3z" fill="currentColor" />
    </svg>
  );
}
function HandsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11V6a2 2 0 1 1 4 0v5" />
      <path d="M13 11V8a2 2 0 1 1 4 0v6a6 6 0 0 1-12 0v-3a2 2 0 1 1 4 0" />
    </svg>
  );
}
