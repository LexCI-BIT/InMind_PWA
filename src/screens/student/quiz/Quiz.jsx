import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getQuiz, submitQuiz } from '../../../lib/api';

/**
 * Quiz — loads a real quiz by id, lets the student answer each question, then
 * submits all answers to the backend which grades them and returns the score.
 *
 *   • Quiz id comes from navigate state ({ quizId }) or the ?id= query param.
 *   • Questions are fetched via GET /api/quizzes/:id (correct answers hidden).
 *   • On finish we POST /api/quizzes/:id/submit and route to the result screen
 *     with the real { score, total, percentage, tier } from the server.
 */

const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.max(0, s) % 60).padStart(2, '0')}`;

export function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();

  // Resolve quiz id from router state or ?id= query param.
  const quizId =
    location.state?.quizId ?? new URLSearchParams(location.search).get('id');

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState({}); // { [questionId]: optionIndex }
  const [timeLeft, setTimeLeft] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const startedAtRef = useRef(null);
  const questionShownRef = useRef(Date.now());
  const responseTimesRef = useRef({}); // { [questionId]: ms }
  const answersRef = useRef(answers);
  answersRef.current = answers;
  const timeLeftRef = useRef(timeLeft);
  timeLeftRef.current = timeLeft;
  const finishedRef = useRef(false);

  // ───── load quiz ─────
  useEffect(() => {
    if (!quizId) {
      setError('No quiz selected.');
      setLoading(false);
      return;
    }
    let active = true;
    (async () => {
      try {
        const data = await getQuiz(quizId);
        if (!active) return;
        const qs = data.questions || [];
        setQuiz(data.quiz || null);
        setQuestions(qs);
        setTimeLeft(data.quiz?.duration_seconds || 210);
        startedAtRef.current = new Date().toISOString();
        questionShownRef.current = Date.now();
      } catch (err) {
        if (active) setError(err.message || 'Could not load this quiz.');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [quizId]);

  // ───── timer ─────
  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) {
      finish();
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const q = questions[idx];
  const total = questions.length;
  const isLast = idx === total - 1;
  const options = q ? [q.option_a, q.option_b, q.option_c, q.option_d] : [];

  function recordResponseTime() {
    if (!q) return;
    const ms = Date.now() - questionShownRef.current;
    if (responseTimesRef.current[q.id] == null) responseTimesRef.current[q.id] = ms;
  }

  async function finish(extraAnswer) {
    if (finishedRef.current) return;
    finishedRef.current = true;

    const finalMap = { ...answersRef.current, ...(extraAnswer || {}) };
    const payload = {
      started_at: startedAtRef.current || new Date().toISOString(),
      time_remaining_seconds: Math.max(0, timeLeftRef.current ?? 0),
      answers: questions.map((qq) => ({
        question_id: qq.id,
        selected_option: finalMap[qq.id] ?? null,
        response_time_ms: responseTimesRef.current[qq.id] ?? null,
      })),
    };

    try {
      setSubmitting(true);
      const result = await submitQuiz(quizId, payload);
      navigate('/student/quiz/complete', {
        state: {
          quizId,
          score: result.score,
          total: result.total,
          percentage: result.percentage,
          tier: result.tier,
          title: quiz?.title,
        },
        replace: true,
      });
    } catch (err) {
      finishedRef.current = false;
      setSubmitting(false);
      setError(err.message || 'Could not submit your answers. Please try again.');
    }
  }

  function handleNext() {
    if (selected === null || !q) return;
    recordResponseTime();
    const updated = { ...answers, [q.id]: selected };
    setAnswers(updated);
    setSelected(null);
    if (isLast) {
      finish({ [q.id]: selected });
    } else {
      questionShownRef.current = Date.now();
      setIdx(idx + 1);
    }
  }

  // ───── states ─────
  if (loading) {
    return (
      <section className="mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col items-center justify-center gap-4 bg-[#222222] text-white">
        <div className="size-10 animate-spin rounded-full border-[3px] border-white/15 border-t-white/80" />
        <p className="text-[13px] font-medium text-white/50">Loading quiz…</p>
      </section>
    );
  }

  if (error || !q) {
    return (
      <section className="mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col items-center justify-center gap-3 bg-[#222222] px-8 text-center text-white">
        <div className="grid size-14 place-items-center rounded-full bg-red-500/15 text-red-300">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4M12 17h.01" /><circle cx="12" cy="12" r="10" /></svg>
        </div>
        <p className="text-[14px] font-semibold">{error || 'This quiz has no questions yet.'}</p>
        <button onClick={() => navigate('/student/quiz')} className="mt-2 rounded-full bg-white/10 px-5 py-2.5 text-[13px] font-bold text-white transition hover:bg-white/20">
          Back to Quizzes
        </button>
      </section>
    );
  }

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#222222] text-white pb-24">
      <div className="absolute -left-12 -top-12 size-48 rounded-full bg-[#2d2c3e] blur-3xl opacity-50 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-safe pt-6">
        <button
          type="button"
          onClick={() => navigate('/student/quiz')}
          aria-label="Back"
          className="grid size-10 place-items-center rounded-[14px] bg-[#2a2a2a] text-white transition hover:bg-[#333]"
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5 pr-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4l-6 6 6 6" />
          </svg>
        </button>

        <p className="text-[14px] font-bold text-white">
          {String(idx + 1).padStart(2, '0')} of {total}
        </p>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4ade80] px-2.5 py-1.5 text-[12.5px] font-bold text-white shadow-md shadow-green-500/20">
          <div className="grid size-4 place-items-center rounded-full bg-white text-[#4ade80]">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z" />
            </svg>
          </div>
          {fmt(timeLeft ?? 0)}
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 mx-6 mt-6 h-2.5 overflow-hidden rounded-full bg-white">
        <motion.div
          className="h-full rounded-full bg-[#4ade80]"
          animate={{ width: `${((idx + (selected !== null ? 1 : 0)) / total) * 100}%` }}
          transition={{ duration: 0.35 }}
        />
      </div>

      {/* Question card */}
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
            <div className="relative w-full">
              <div className="absolute top-4 -right-2 -left-2 bottom-[-16px] rounded-[28px] bg-[#2c2c2c] z-0 shadow-xl" />
              <div className="relative z-10 rounded-[28px] bg-[#c49ae8] p-6 pb-8 shadow-lg shadow-purple-500/20">
                {q.category && (
                  <span className="text-[12.5px] font-bold text-white">{q.category}</span>
                )}
                <h2 className="mt-2 text-[18px] font-bold leading-snug text-[#1f1f1f]">
                  {q.question_text}
                </h2>

                <ul className="mt-6 flex flex-col gap-3">
                  {options.map((opt, i) => {
                    const isSelected = selected === i;
                    return (
                      <motion.li key={i} whileTap={{ scale: 0.98 }}>
                        <button
                          type="button"
                          onClick={() => setSelected(i)}
                          aria-pressed={isSelected}
                          className="block w-full rounded-[20px] px-6 py-4 text-left text-[15.5px] font-bold text-[#1f1f1f] transition-colors"
                          style={{
                            backgroundColor: isSelected ? '#1f1f1f' : '#ffffff',
                            color: isSelected ? '#ffffff' : '#1f1f1f',
                            border: `1.5px solid ${isSelected ? '#1f1f1f' : 'transparent'}`,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
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
                disabled={selected === null || submitting}
                whileTap={{ scale: selected !== null ? 0.95 : 1 }}
                className={[
                  'w-3/5 max-w-[200px] rounded-full py-4 text-[16px] font-bold transition-all',
                  selected === null || submitting
                    ? 'cursor-not-allowed bg-white/5 text-white/30'
                    : 'bg-[#93f58e] text-[#1f1f1f] shadow-[0_8px_20px_rgba(74,222,128,0.25)] hover:bg-[#86efac]',
                ].join(' ')}
              >
                {submitting ? 'Submitting…' : isLast ? 'Finish' : 'Next'}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
