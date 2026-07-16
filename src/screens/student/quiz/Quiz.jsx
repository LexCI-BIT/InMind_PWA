import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS, OPTION_COLORS, QUIZ_DURATION } from './questions';

/**
 * Quiz — single-question card with timer, multiple choice, and a Next CTA.
 *
 *  State
 *   • idx        — current question index (0-based)
 *   • selected   — index of currently picked option, or null
 *   • answers    — array of picked indices for completed questions
 *   • timeLeft   — seconds remaining; auto-finishes the quiz at 0
 *
 *  On the last question Next becomes "Finish" and routes to
 *  /student/quiz/complete with { score, total, answers } in location state.
 */

const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export function Quiz() {
  const navigate = useNavigate();
  const [idx, setIdx]         = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION);
  // Use a ref so the finish-on-zero effect always sees the latest answers.
  const answersRef = useRef(answers);
  answersRef.current = answers;

  const q = QUESTIONS[idx];
  const isLast = idx === QUESTIONS.length - 1;

  // ───── timer ─────
  useEffect(() => {
    if (timeLeft <= 0) {
      finish(answersRef.current);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  // ───── handlers ─────
  function finish(finalAnswers) {
    const score = QUESTIONS.reduce(
      (sum, qq, i) => sum + (finalAnswers[i] === qq.correct ? 1 : 0),
      0,
    );
    navigate('/student/quiz/complete', {
      state: { score, total: QUESTIONS.length, answers: finalAnswers },
      replace: true,
    });
  }

  function handleNext() {
    if (selected === null) return;
    const next = [...answers, selected];
    setAnswers(next);
    setSelected(null);
    if (isLast) {
      finish(next);
    } else {
      setIdx(idx + 1);
    }
  }

  // ───── render ─────
  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#222222] text-white pb-24">
      {/* Background decoration */}
      <div className="absolute -left-12 -top-12 size-48 rounded-full bg-[#2d2c3e] blur-3xl opacity-50 pointer-events-none" />

      {/* ─── Header: back · "02 of 10" · timer pill ─── */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-safe pt-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="grid size-10 place-items-center rounded-[14px] bg-[#2a2a2a] text-white transition hover:bg-[#333]"
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5 pr-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4l-6 6 6 6" />
          </svg>
        </button>

        <p className="text-[14px] font-bold text-white">
          {String(idx + 1).padStart(2, '0')} of {QUESTIONS.length}
        </p>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4ade80] px-2.5 py-1.5 text-[12.5px] font-bold text-white shadow-md shadow-green-500/20">
          <div className="grid size-4 place-items-center rounded-full bg-white text-[#4ade80]">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/>
            </svg>
          </div>
          {fmt(timeLeft)}
        </span>
      </div>

      {/* ─── Progress bar ─── */}
      <div className="relative z-10 mx-6 mt-6 h-2.5 overflow-hidden rounded-full bg-white">
        <motion.div
          className="h-full rounded-full bg-[#4ade80]"
          animate={{ width: `${((idx + (selected !== null ? 1 : 0)) / QUESTIONS.length) * 100}%` }}
          transition={{ duration: 0.35 }}
        />
      </div>

      {/* ─── Question card + options ─── */}
      <div className="relative z-10 flex flex-1 flex-col px-6 pt-8 pb-safe">
        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex flex-col"
          >
            {/* Stacked Card Container */}
            <div className="relative w-full">
              {/* Shadow Card */}
              <div className="absolute top-4 -right-2 -left-2 bottom-[-16px] rounded-[28px] bg-[#2c2c2c] z-0 shadow-xl" />
              
              {/* Main Purple Card */}
              <div className="relative z-10 rounded-[28px] bg-[#c49ae8] p-6 pb-8 shadow-lg shadow-purple-500/20">
                <span className="text-[12.5px] font-bold text-white">
                  {q.category}
                </span>
                <h2 className="mt-2 text-[18px] font-bold leading-snug text-[#1f1f1f]">
                  {q.question}
                </h2>

                {/* Options */}
                <ul className="mt-6 flex flex-col gap-3">
                  {q.options.map((opt, i) => {
                    const isSelected = selected === i;
                    const showEval = selected !== null;
                    const isCorrect = i === q.correct;
                    
                    let bg = '#ffffff';
                    let border = 'transparent';
                    
                    if (showEval) {
                      if (isCorrect) {
                        bg = '#d1fabb';
                        border = '#86efac';
                      } else if (isSelected) {
                        bg = '#fee2e2';
                        border = '#fca5a5';
                      }
                    } else if (isSelected) {
                       bg = '#f3f4f6';
                       border = '#d1d5db';
                    }

                    return (
                      <motion.li key={i} whileTap={{ scale: showEval ? 1 : 0.98 }}>
                        <button
                          type="button"
                          onClick={() => !showEval && setSelected(i)}
                          aria-pressed={isSelected}
                          className="block w-full rounded-[20px] px-6 py-4 text-left text-[15.5px] font-bold text-[#1f1f1f] transition-colors"
                          style={{
                            backgroundColor: bg,
                            border: `1.5px solid ${border}`,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                          }}
                        >
                          {opt}
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Next / Finish */}
            <div className="mt-12 flex justify-center">
              <motion.button
                type="button"
                onClick={handleNext}
                disabled={selected === null}
                whileTap={{ scale: selected !== null ? 0.95 : 1 }}
                className={[
                  'w-3/5 max-w-[200px] rounded-full py-4 text-[16px] font-bold transition-all',
                  selected === null
                    ? 'cursor-not-allowed bg-white/5 text-white/30'
                    : 'bg-[#93f58e] text-[#1f1f1f] shadow-[0_8px_20px_rgba(74,222,128,0.25)] hover:bg-[#86efac]',
                ].join(' ')}
              >
                {isLast ? 'Finish' : 'Next'}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
