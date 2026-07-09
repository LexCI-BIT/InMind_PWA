import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { listQuizzes } from '../../../lib/api';

/**
 * QuizList — shows the quizzes a teacher has published, pulled live from the
 * backend (GET /api/quizzes). Drafts are filtered out server-side, so students
 * only ever see scheduled / live / completed sessions.
 *
 * Tapping "Start Quiz" routes to /student/quiz/take with the quiz id so the
 * take screen can load that quiz's real questions.
 */

const CARD_COLORS = ['#7b5eea', '#d946ef', '#22c55e', '#f59e0b', '#06b6d4'];

const QuizIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#93c5fd]">
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

function formatDate(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
}

export function QuizList() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  function load() {
    setError('');
    setLoading(true);
    return listQuizzes()
      .then((d) => setQuizzes(Array.isArray(d) ? d : []))
      .catch((e) => setError(e.message || 'Could not load quizzes.'))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    let active = true;
    listQuizzes()
      .then((d) => active && setQuizzes(Array.isArray(d) ? d : []))
      .catch((e) => active && setError(e.message || 'Could not load quizzes.'))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#222222] text-white">
      {/* Header */}
      <div className="flex flex-col px-6 pt-safe pt-8 pb-4">
        <button
          onClick={() => navigate('/student/home')}
          className="text-white hover:opacity-80 transition w-8 h-8 mb-6 mt-4"
          aria-label="Back"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="text-[42px] font-bold tracking-tight">Quiz</h1>
      </div>

      {/* ── Loading ── */}
      {loading && (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 pb-24">
          <div className="size-10 animate-spin rounded-full border-[3px] border-white/15 border-t-white/80" />
          <p className="text-[13px] font-medium text-white/50">Loading your quizzes…</p>
        </div>
      )}

      {/* ── Error ── */}
      {!loading && error && (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center pb-24">
          <div className="grid size-14 place-items-center rounded-full bg-red-500/15 text-red-300">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4M12 17h.01" /><circle cx="12" cy="12" r="10" /></svg>
          </div>
          <p className="text-[14px] font-semibold">Couldn't load quizzes</p>
          <p className="text-[12px] text-white/50">{error}</p>
          <button onClick={load} className="mt-2 rounded-full bg-white/10 px-5 py-2.5 text-[13px] font-bold text-white transition hover:bg-white/20">
            Try again
          </button>
        </div>
      )}

      {/* ── Empty ── */}
      {!loading && !error && quizzes.length === 0 && (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center pb-24">
          <div className="grid size-16 place-items-center rounded-[24px] bg-white/[0.06]">
            <QuizIcon />
          </div>
          <p className="text-[15px] font-semibold">No quizzes yet</p>
          <p className="text-[12.5px] text-white/50">When your teacher launches a session, it will show up right here.</p>
        </div>
      )}

      {/* ── Carousel ── */}
      {!loading && !error && quizzes.length > 0 && (
        <div className="flex-1 overflow-x-auto px-6 pb-12 pt-4 snap-x snap-mandatory flex gap-6 hide-scrollbar">
          {quizzes.map((quiz, i) => {
            const color = CARD_COLORS[i % CARD_COLORS.length];
            const minutes = Math.max(1, Math.round((quiz.duration_seconds || 210) / 60));
            const dateLabel = formatDate(quiz.scheduled_at) || formatDate(quiz.created_at) || '—';
            const count = quiz.question_count ?? 0;
            const subtitle = [quiz.target_class, quiz.subject].filter(Boolean).join(' • ') || 'Quiz';
            const attempt = quiz.my_attempt;            // student's own session, or null
            const ended = quiz.status === 'completed';  // teacher ended the session

            return (
              <div
                key={quiz.id}
                className="shrink-0 w-[85%] snap-center rounded-[24px] bg-black p-6 flex flex-col relative"
                style={{ boxShadow: `-5px 0px 0px ${color}, 0px 5px 0px ${color}, -5px 5px 0px ${color}` }}
              >
                {/* Status pill */}
                {attempt ? (
                  <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                    Completed · {Math.round(attempt.percentage)}%
                  </span>
                ) : ended ? (
                  <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/70">
                    Ended
                  </span>
                ) : quiz.status === 'live' ? (
                  <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-red-500/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                    <span className="size-1.5 rounded-full bg-white animate-pulse" /> Live
                  </span>
                ) : null}

                {/* Header */}
                <div className="flex items-center gap-4 mb-8 mt-2">
                  <div className="grid size-14 place-items-center rounded-full text-[20px] font-bold text-white" style={{ backgroundColor: color }}>
                    {(quiz.subject || quiz.title || 'Q').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-[18px] tracking-wide leading-tight">{quiz.subject || 'Quiz'}</h3>
                    <p className="text-white/60 text-[13px] font-medium">{subtitle}</p>
                  </div>
                </div>

                {/* Main Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-[24px] flex items-center justify-center" style={{ backgroundColor: '#312e81' }}>
                    <QuizIcon />
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-center text-white text-[20px] font-bold mb-8 line-clamp-2">{quiz.title}</h2>

                {/* Details */}
                <div className="flex flex-col gap-3 mb-10 pl-[10%]">
                  <div className="flex items-center gap-4">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white/70">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span className="text-white text-[14px] font-medium tracking-wide">{minutes} mins</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white/70">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span className="text-white text-[14px] font-medium tracking-wide">{dateLabel}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white/70">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <span className="text-white text-[14px] font-medium tracking-wide">{count} Question{count === 1 ? '' : 's'}</span>
                  </div>
                </div>

                {/* Action button — depends on attempt / ended / available */}
                <div className="mt-auto flex flex-col items-center gap-2 pb-2">
                  {attempt && (
                    <p className="text-white/70 text-[12px] font-semibold">
                      You scored {attempt.score}/{attempt.total_questions}
                    </p>
                  )}

                  {attempt ? (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(`/student/quiz/result?id=${quiz.id}`, { state: { quizId: quiz.id } })}
                      className="w-full max-w-[220px] py-3.5 rounded-[12px] text-white font-bold text-[15px] flex items-center justify-center gap-2 transition hover:opacity-90 shadow-lg"
                      style={{ backgroundColor: color }}
                    >
                      View Result
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                      </svg>
                    </motion.button>
                  ) : ended ? (
                    <button
                      disabled
                      className="w-full max-w-[220px] py-3.5 rounded-[12px] bg-white/10 text-white/50 font-bold text-[15px] flex items-center justify-center gap-2 cursor-not-allowed"
                    >
                      Session Ended
                    </button>
                  ) : (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      disabled={count === 0}
                      onClick={() => navigate(`/student/quiz/take?id=${quiz.id}`, { state: { quizId: quiz.id } })}
                      className="w-full max-w-[220px] py-3.5 rounded-[12px] text-white font-bold text-[15px] flex items-center justify-center gap-2 transition hover:opacity-90 shadow-lg disabled:opacity-40"
                      style={{ backgroundColor: color }}
                    >
                      {count === 0 ? 'No Questions' : 'Start Quiz'}
                      {count > 0 && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      )}
                    </motion.button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
