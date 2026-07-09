import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getMyQuizResult } from '../../../lib/api';

/**
 * QuizReview — a student's review of a quiz they already attempted.
 * Shows their score and every question with the correct answer, the option
 * they picked, and whether they got it right (GET /api/quizzes/:id/my-result).
 */

const LETTERS = ['A', 'B', 'C', 'D'];

export function QuizReview() {
  const navigate = useNavigate();
  const location = useLocation();
  const quizId = location.state?.quizId ?? new URLSearchParams(location.search).get('id');

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!quizId) {
      setError('No quiz selected.');
      setLoading(false);
      return;
    }
    let active = true;
    getMyQuizResult(quizId)
      .then((d) => active && setData(d))
      .catch((e) => active && setError(e.message || 'Could not load your result.'))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [quizId]);

  if (loading) {
    return (
      <section className="mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col items-center justify-center gap-4 bg-[#181818] text-white">
        <div className="size-10 animate-spin rounded-full border-[3px] border-white/15 border-t-white/80" />
        <p className="text-[13px] font-medium text-white/50">Loading your result…</p>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col items-center justify-center gap-3 bg-[#181818] px-8 text-center text-white">
        <p className="text-[14px] font-semibold">{error || 'No result found.'}</p>
        <button onClick={() => navigate('/student/quiz')} className="mt-2 rounded-full bg-white/10 px-5 py-2.5 text-[13px] font-bold text-white transition hover:bg-white/20">
          Back to Quizzes
        </button>
      </section>
    );
  }

  const s = data.session || {};
  const pct = Math.round(s.percentage ?? 0);

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#181818] text-white">
      <div className="flex-1 overflow-y-auto pb-12">
        {/* Header */}
        <div className="px-5 pt-safe pt-6">
          <button
            type="button"
            onClick={() => navigate('/student/quiz')}
            aria-label="Back"
            className="grid size-10 place-items-center rounded-full bg-white/[0.06] text-white/85 transition hover:bg-white/10"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4l-6 6 6 6" /></svg>
          </button>
        </div>

        {/* Score card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          className="mx-5 mt-4 overflow-hidden rounded-[28px] p-6 shadow-lg shadow-violet-900/40"
          style={{ background: 'linear-gradient(160deg, #4c1d95 0%, #6d28d9 50%, #8b5cf6 100%)' }}
        >
          <p className="text-[12px] font-semibold text-white/70">{data.quiz?.title || 'Quiz'}</p>
          <span className="mt-2 inline-block rounded-full bg-white/20 px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-white">
            {s.tier || '—'}
          </span>
          <p className="mt-3 text-[44px] font-extrabold leading-none">
            {s.score}
            <span className="text-white/55"> / {s.total_questions}</span>
          </p>
          <p className="mt-1 text-[13px] font-medium text-white/85">Correct Answers · {pct}%</p>
        </motion.div>

        {/* Question-by-question review */}
        <div className="mx-5 mt-6 flex flex-col gap-4">
          <h3 className="text-[13px] font-bold text-white/90">Your Answers</h3>
          {data.questions.map((q) => {
            const options = [q.option_a, q.option_b, q.option_c, q.option_d];
            const answered = q.selected_option !== null && q.selected_option !== undefined;
            return (
              <div key={q.id} className="rounded-[20px] bg-[#262626] p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[13.5px] font-bold leading-snug text-white">
                    <span className="text-violet-300">Q{q.question_number}.</span> {q.question_text}
                  </p>
                  <span className={`shrink-0 grid size-6 place-items-center rounded-full ${q.is_correct ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                    {q.is_correct ? (
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                    )}
                  </span>
                </div>

                <ul className="mt-3 flex flex-col gap-2">
                  {options.map((opt, i) => {
                    const isCorrect = i === q.correct_option;
                    const isPicked = i === q.selected_option;
                    let cls = 'bg-white/[0.04] text-white/70 border border-transparent';
                    if (isCorrect) cls = 'bg-emerald-500/15 text-emerald-200 border border-emerald-500/40';
                    else if (isPicked) cls = 'bg-rose-500/15 text-rose-200 border border-rose-500/40';
                    return (
                      <li key={i} className={`flex items-center justify-between rounded-[12px] px-3.5 py-2.5 text-[13px] font-semibold ${cls}`}>
                        <span className="flex items-center gap-2.5">
                          <span className="text-[11px] font-bold opacity-70">{LETTERS[i]}</span>
                          {opt}
                        </span>
                        {isCorrect ? (
                          <span className="text-[10px] font-bold uppercase tracking-wide">Correct</span>
                        ) : isPicked ? (
                          <span className="text-[10px] font-bold uppercase tracking-wide">Your pick</span>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>

                {!answered && (
                  <p className="mt-2 text-[11px] font-semibold text-amber-300/80">You didn't answer this question.</p>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mx-5 mt-7">
          <button
            type="button"
            onClick={() => navigate('/student/home')}
            className="w-full rounded-full bg-amber-400 py-4 text-[15.5px] font-bold text-[#1f1f1f] shadow-md shadow-amber-400/25 transition hover:bg-amber-300"
          >
            Back To Home
          </button>
        </div>
      </div>
    </section>
  );
}
