import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * DailyChallenges — Figma-faithful rebuild of the Daily Challenges screen.
 *
 *   Top of page:
 *     • Back chevron + "Daily Challenges" centred title
 *     • "X of N completed today" + green encouragement line
 *     • Slim green progress bar
 *     • Today's Focus — big emerald gradient card with chat-bubble glyph
 *     • Categories row (SOCIAL · REFLECTION · CONFIDENCE · ZEN)
 *     • UP NEXT list — each challenge card switches between
 *         "MARK DONE" (pending, gray bg) and "COMPLETED" (dark-green bg)
 *     • Brown 5-Day Challenge Streak card
 *
 *   When every challenge is completed, the entire screen is replaced by a
 *   centred "All challenges completed 🎉" celebration view with a Continue
 *   CTA that returns to /student/home.
 */

const INITIAL = [
  {
    id: 'conversation',
    title: 'Start a Small Conversation',
    subtitle: 'Talk to someone new or reconnect with a friend',
    duration: '10 min',
    difficulty: 'Medium',
    category: 'social',
    focus: true,
    completed: false,
  },
  {
    id: 'gratitude',
    title: 'Quick Gratitude',
    subtitle: "Write down 3 things you're grateful for",
    duration: '3 min',
    difficulty: 'Easy',
    category: 'reflection',
    completed: true,
  },
  {
    id: 'detox',
    title: 'Digital Detox',
    subtitle: 'Put your phone away for 1 hour',
    duration: '60 min',
    difficulty: 'Medium',
    category: 'zen',
    completed: false,
  },
  {
    id: 'eye-contact',
    title: 'Eye Contact',
    subtitle: 'Maintain eye contact during a conversation',
    duration: '5 min',
    difficulty: 'Easy',
    category: 'confidence',
    completed: false,
  },
  {
    id: 'breathing',
    title: 'Mindful Breathing',
    subtitle: 'Take 5 deep breaths between classes',
    duration: '2 min',
    difficulty: 'Easy',
    category: 'zen',
    completed: true,
  },
];

const CATEGORIES = [
  { id: 'social',     label: 'SOCIAL',     Icon: PeopleIcon, color: '#4da665' },
  { id: 'reflection', label: 'REFLECTION', Icon: ReflectionIcon, color: '#e2a38c' },
  { id: 'confidence', label: 'CONFIDENCE', Icon: ConfidenceIcon, color: '#eb7b61' },
  { id: 'zen',        label: 'ZEN',        Icon: MeditationIcon, color: '#c9e5d2' },
];

const CATEGORY_ICON = {
  reflection: ReflectionIcon,
  zen:        MeditationIcon,
  confidence: ConfidenceIcon,
  social:     PeopleIcon,
};

export function DailyChallenges() {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState(INITIAL);

  const completedCount = challenges.filter((c) => c.completed).length;
  const total = challenges.length;
  const allDone = completedCount === total;

  const focus = challenges.find((c) => c.focus);
  const upNext = challenges.filter((c) => !c.focus);

  const mark = (id) =>
    setChallenges((prev) => prev.map((c) => (c.id === id ? { ...c, completed: true } : c)));

  // ───── Celebration view ─────
  if (allDone) {
    return (
      <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col items-center justify-center overflow-hidden bg-[#181818] px-7 text-center text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
          className="grid size-20 place-items-center rounded-full bg-white/[0.06]"
        >
          <span className="text-[34px]" role="img" aria-hidden="true">🎉</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.4 }}
          className="mt-6 text-[20px] font-bold"
        >
          All challenges completed <span aria-hidden="true">🎉</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.4 }}
          className="mt-2 text-[13.5px] text-white/55"
        >
          Come back tomorrow for new challenges
        </motion.p>
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.4 }}
          onClick={() => navigate('/student/home')}
          className="mt-7 rounded-full border border-white/15 bg-white/[0.04] px-12 py-3 text-[14px] font-semibold text-white/85 transition hover:bg-white/[0.08]"
        >
          Continue
        </motion.button>
      </section>
    );
  }

  // ───── Default list view ─────
  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#181818] text-white">
      <div className="flex-1 overflow-y-auto pb-10">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-safe pt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Back"
            className="grid size-10 place-items-center rounded-full text-white/85 transition hover:bg-white/[0.06]"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4l-6 6 6 6" />
            </svg>
          </button>
          <h1 className="text-[18px] font-bold">Daily Challenges</h1>
          <span className="size-10" aria-hidden="true" />
        </div>

        {/* Progress copy + bar */}
        <div className="mt-4 px-6">
          <p className="text-[14px] text-white/85">
            <span className="font-bold">
              {completedCount} of {total} completed today
            </span>
            <span className="ml-2 text-emerald-400">Keep going, you're doing great!</span>
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #34d399, #10b981)' }}
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / total) * 100}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Today's Focus card */}
        {focus && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative mx-5 mt-5 overflow-hidden rounded-[28px] p-6 shadow-lg"
            style={{
              background: 'linear-gradient(140deg, #375b33 0%, #1e3d22 50%, #0c2612 100%)',
            }}
          >
            <span className="inline-block rounded-full bg-[#528156]/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#b8d8be]">
              TODAY'S FOCUS
            </span>
            <h2 className="mt-4 max-w-[240px] text-[26px] font-bold leading-[1.15] text-white">
              {focus.title}
            </h2>
            <p className="mt-2 max-w-[230px] text-[14px] leading-snug text-[#5f8464]">
              {focus.subtitle}
            </p>
            <motion.button
              type="button"
              onClick={() => mark(focus.id)}
              whileTap={{ scale: 0.97 }}
              className="mt-6 rounded-full px-8 py-3.5 text-[15px] font-bold transition"
              style={{ background: '#ebf9e6', color: '#1a4321' }}
            >
              {focus.completed ? 'Completed' : 'Start Challenge'}
            </motion.button>

            {/* chat bubble glyph */}
            <span className="pointer-events-none absolute right-2 bottom-2 text-[#467347]/30" aria-hidden="true">
              <ChatBubbleGlyph />
            </span>
          </motion.div>
        )}

        {/* Categories */}
        <div className="mt-6 flex justify-around px-5">
          {CATEGORIES.map(({ id, label, Icon, color }) => (
            <div key={id} className="flex flex-col items-center gap-2">
              <span
                className="grid size-12 place-items-center rounded-2xl bg-[#262626]"
                style={{ color }}
              >
                <Icon />
              </span>
              <span className="text-[10px] font-bold tracking-wider text-white/55">{label}</span>
            </div>
          ))}
        </div>

        {/* UP NEXT */}
        <p className="mt-7 px-7 text-[10.5px] font-bold uppercase tracking-[0.22em] text-white/45">
          Up Next
        </p>
        <ul className="mt-3 flex flex-col gap-3 px-5">
          <AnimatePresence initial={false}>
            {upNext.map((c) => (
              <ChallengeCard key={c.id} challenge={c} onMarkDone={() => mark(c.id)} />
            ))}
          </AnimatePresence>
        </ul>

        {/* Streak */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="relative mx-5 mt-5 overflow-hidden rounded-[24px] p-5"
          style={{
            background:
              'radial-gradient(120% 120% at 100% 100%, rgba(0,0,0,0.45) 0%, transparent 50%), linear-gradient(140deg, #7c3a1d 0%, #4d2110 100%)',
          }}
        >
          <h3 className="text-[22px] font-bold leading-tight text-[#ffd5b5]">
            5 Day Challenge<br />Streak
          </h3>
          <p className="mt-2 text-[13px] text-[#f3c0a0]/85">
            Consistency builds confidence
          </p>
          <span className="pointer-events-none absolute -bottom-2 -right-1 text-[#5b2a14]" aria-hidden="true">
            <PawGlyph />
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Up-next challenge card ─── */

function ChallengeCard({ challenge, onMarkDone }) {
  const Icon = CATEGORY_ICON[challenge.category] || ChecklistIcon;
  const done = challenge.completed;
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className={[
        'flex items-start gap-3 rounded-[20px] p-4',
        done ? 'bg-[#0a2a1a] ring-1 ring-emerald-500/15' : 'bg-[#262626]',
      ].join(' ')}
    >
      <span
        className={[
          'grid size-11 shrink-0 place-items-center rounded-full',
          done ? 'bg-emerald-500/25 text-emerald-300' : 'bg-white/[0.06] text-white/65',
        ].join(' ')}
      >
        {done ? <CheckIcon /> : <Icon />}
      </span>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[15px] font-bold text-white">{challenge.title}</p>
          {done && (
            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
              Completed
            </span>
          )}
        </div>
        <p className="mt-0.5 text-[12.5px] text-white/55">{challenge.subtitle}</p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="flex items-center gap-3 text-[11.5px] text-white/55">
            <span className="inline-flex items-center gap-1">
              <ClockIcon />
              {challenge.duration}
            </span>
            <span className="inline-flex items-center gap-1">
              <BarsIcon />
              {challenge.difficulty}
            </span>
          </p>
          {!done && (
            <button
              type="button"
              onClick={onMarkDone}
              className="rounded-full border border-white/20 px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-wider text-white/85 transition hover:bg-white/[0.06]"
            >
              Mark Done
            </button>
          )}
        </div>
      </div>
    </motion.li>
  );
}

/* ─── Inline icons ─── */

function PeopleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3 19c0-3 2.5-5 6-5s6 2 6 5" />
      <path d="M14 19a4 4 0 0 1 4-4 3 3 0 0 1 3 3" />
    </svg>
  );
}
function ReflectionIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21a9 9 0 0 0 9-9 9 9 0 0 0-9-9 9 9 0 0 0-9 9c0 2.2.8 4.2 2 5.8L4 21l3.5-1A9.2 9.2 0 0 0 12 21z" opacity="0" />
      <path d="M9 20h2" />
      <path d="M10 20v2" />
      <path d="M14 6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6z" opacity="0"/>
      <path d="M16 11V7a4 4 0 0 0-8 0v2a2 2 0 0 1-2 2v4h4.5c.3 0 .5-.2.5-.5v-1" />
      <circle cx="12" cy="11" r="2.5" />
      <path d="M12 7.5V6" />
      <path d="M12 16v-1.5" />
      <path d="M8.5 11H7" />
      <path d="M17 11h-1.5" />
      <path d="M9.5 8.5L8 7" />
      <path d="M16 15l-1.5-1.5" />
      <path d="M14.5 8.5L16 7" />
    </svg>
  );
}
function ConfidenceIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}
function MeditationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <circle cx="12" cy="5" r="2.5" />
      <path d="M16 13l-2-2-1.5 2-1.5-2-2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 21c0-2.5 3.5-5 7-5s7 2.5 7 5z" />
      <path d="M12 16v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h13v9H8l-4 4z" />
    </svg>
  );
}
function ChecklistIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 9l1.5 1.5L13 8" />
      <path d="M9 14h6" />
    </svg>
  );
}
function PhoneOffIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M3 3l18 18" />
      <path d="M11 18h2" />
    </svg>
  );
}
function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5 9-9" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 6v4l2.5 1.5" />
    </svg>
  );
}
function BarsIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="14" x2="4" y2="16" />
      <line x1="10" y1="10" x2="10" y2="16" />
      <line x1="16" y1="6"  x2="16" y2="16" />
    </svg>
  );
}

function ChatBubbleGlyph() {
  return (
    <svg viewBox="0 0 80 60" width="80" height="60" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 8h45v30H22l-10 10z" />
      <path d="M30 18h45v30H62l-10 10z" />
    </svg>
  );
}

function PawGlyph() {
  return (
    <svg viewBox="0 0 110 110" width="110" height="110" fill="currentColor" aria-hidden="true">
      <ellipse cx="35" cy="40" rx="11" ry="14" />
      <ellipse cx="60" cy="32" rx="10" ry="13" />
      <ellipse cx="82" cy="44" rx="11" ry="14" />
      <ellipse cx="58" cy="78" rx="22" ry="20" />
    </svg>
  );
}
