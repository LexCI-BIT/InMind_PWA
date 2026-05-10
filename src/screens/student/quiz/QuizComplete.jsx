import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * QuizComplete — celebrates the quiz score and shows daily reflection +
 * key takeaway. Opens with score data passed via navigate(state).
 *
 *   location.state = { score, total, answers }
 *
 * "Back To Home" returns to /student/home.
 * "Review Answers" is a stub (TODO when results review is built).
 */
export function QuizComplete() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const score = state?.score ?? 0;
  const total = state?.total ?? 10;
  const pct = total ? Math.round((score / total) * 100) : 0;

  // Tier copy keyed off percentage.
  const tier =
    pct >= 90 ? { label: 'PERFECT',   line: 'Outstanding emotional awareness today!' }
    : pct >= 70 ? { label: 'EXCELLENT', line: 'You understood emotional awareness well today' }
    : pct >= 50 ? { label: 'GOOD',     line: 'Solid effort — a few gaps to revisit' }
    :              { label: 'KEEP GOING', line: 'Every quiz is practice. Try again tomorrow!' };

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#181818] text-white">
      <div className="flex-1 overflow-y-auto pb-10">
        {/* Header */}
        <div className="px-5 pt-safe pt-6">
          <button
            type="button"
            onClick={() => navigate('/student/home')}
            aria-label="Back"
            className="grid size-10 place-items-center rounded-full bg-white/[0.06] text-white/85 transition hover:bg-white/10"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4l-6 6 6 6" />
            </svg>
          </button>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="px-5 pt-6 text-center"
        >
          <h1 className="text-[34px] font-bold leading-tight">Great Job!</h1>
          <p className="mt-1 text-[13.5px] text-white/55">You've completed today's quiz</p>
        </motion.div>

        {/* Score card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 220, damping: 22 }}
          className="mx-5 mt-6 overflow-hidden rounded-[28px] p-6 shadow-lg shadow-violet-900/40"
          style={{
            background: 'linear-gradient(160deg, #4c1d95 0%, #6d28d9 50%, #8b5cf6 100%)',
          }}
        >
          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-white">
            {tier.label}
          </span>

          <p className="mt-4 text-[44px] font-extrabold leading-none">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="inline-block"
            >
              {score}
            </motion.span>
            <span className="text-white/55"> / {total}</span>
          </p>
          <p className="mt-1 text-[13px] font-medium text-white/85">Correct Answers</p>

          <div className="mt-4 flex items-center gap-2 rounded-2xl bg-white/12 px-4 py-3 ring-1 ring-white/10">
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-violet-200" fill="currentColor">
              <path d="M12 2l1.6 4.4 4.4 1.6-4.4 1.6L12 14l-1.6-4.4L6 8l4.4-1.6L12 2z" />
            </svg>
            <p className="text-[12.5px] font-medium text-white/90">{tier.line}</p>
          </div>
        </motion.div>

        {/* Streak + points pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mx-5 mt-4 flex flex-col gap-2"
        >
          <span className="flex items-center gap-2.5 rounded-full bg-[#262626] px-4 py-2.5 text-[12.5px] font-semibold text-white/85">
            <span className="text-base" role="img" aria-hidden="true">🔥</span>
            3 Day Streak Maintained
          </span>
          <span className="flex items-center gap-2.5 rounded-full bg-[#262626] px-4 py-2.5 text-[12.5px] font-semibold text-white/85">
            <span className="grid size-4 place-items-center rounded-full bg-amber-400/20 text-amber-300">
              <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor">
                <path d="M8 1.5l1.6 4 4.4.4-3.4 2.9 1.1 4.3L8 10.9l-3.7 2.2 1.1-4.3L2 5.9l4.4-.4z" />
              </svg>
            </span>
            +10 Points Earned
          </span>
        </motion.div>

        {/* Daily Reflection */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.4 }}
          className="mx-5 mt-6"
        >
          <h3 className="text-[16px] font-bold">Daily Reflection</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-white/55">
            Today you learned about emotions, habits, and self-awareness.
          </p>

          {/* Key takeaway */}
          <div className="mt-3 rounded-[20px] bg-[#262626] p-4">
            <span className="inline-block rounded-md bg-amber-400/15 px-2.5 py-[3px] text-[10px] font-bold uppercase tracking-wider text-amber-300">
              Key Takeaway
            </span>
            <p className="mt-3 text-[13.5px] leading-snug text-white/90">
              "Recognizing emotions helps you respond better"
            </p>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36, duration: 0.4 }}
          className="mx-5 mt-7"
        >
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/student/home')}
            className="w-full rounded-full bg-amber-400 py-4 text-[15.5px] font-bold text-[#1f1f1f] shadow-md shadow-amber-400/25 transition hover:bg-amber-300"
          >
            Back To Home
          </motion.button>
          <button
            type="button"
            className="mt-3 flex w-full items-center justify-center gap-1.5 text-[13px] font-semibold text-white/55 transition hover:text-white"
          >
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 10a7 7 0 0 1 14 0 7 7 0 0 1-14 0z" />
              <path d="M10 7v3l2 2" />
            </svg>
            Review Answers
          </button>
        </motion.div>
      </div>
    </section>
  );
}
