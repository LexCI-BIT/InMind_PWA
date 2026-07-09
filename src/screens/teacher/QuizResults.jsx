import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getQuizResults } from '../../lib/api';

/**
 * QuizResults — teacher analytics for a single quiz.
 * Pulls GET /api/quizzes/:id/results: aggregate stats, every student's
 * attempt, and a per-question accuracy breakdown.
 */

const TIER_STYLES = {
  PERFECT: 'bg-emerald-100 text-emerald-700',
  EXCELLENT: 'bg-sky-100 text-sky-700',
  GOOD: 'bg-amber-100 text-amber-700',
  'KEEP GOING': 'bg-rose-100 text-rose-700',
};

function initials(name, email) {
  const src = (name || email || '?').trim();
  const parts = src.split(/[\s@.]+/).filter(Boolean);
  return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase() || '?';
}

function fmtWhen(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

function StatCard({ label, value, accent }) {
  return (
    <div className="flex-1 rounded-[18px] bg-white border border-gray-100 shadow-sm p-4">
      <p className="text-[22px] font-extrabold leading-none" style={{ color: accent }}>{value}</p>
      <p className="text-[10.5px] font-semibold text-gray-400 mt-1.5 uppercase tracking-wide">{label}</p>
    </div>
  );
}

export function QuizResults() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const quizId = params.quizId ?? location.state?.quizId;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  function load() {
    setError('');
    setLoading(true);
    return getQuizResults(quizId)
      .then(setData)
      .catch((e) => setError(e.message || 'Could not load results.'))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (!quizId) {
      setError('No quiz selected.');
      setLoading(false);
      return;
    }
    let active = true;
    getQuizResults(quizId)
      .then((d) => active && setData(d))
      .catch((e) => active && setError(e.message || 'Could not load results.'))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]);

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col bg-[#f7f7f8] font-sans pb-12">
      {/* Header */}
      <div className="px-6 pt-safe pt-8 flex items-center gap-3">
        <button onClick={() => navigate('/teacher/sessions')} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition" aria-label="Back">
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <h1 className="text-[18px] font-extrabold text-gray-900">Quiz Analytics</h1>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center gap-3 py-24">
          <div className="size-9 animate-spin rounded-full border-[3px] border-gray-200 border-t-gray-800" />
          <p className="text-[12.5px] font-medium text-gray-400">Loading analytics…</p>
        </div>
      )}

      {!loading && error && (
        <div className="flex flex-col items-center gap-3 py-20 text-center px-8">
          <p className="text-[13px] font-semibold text-gray-700">Couldn't load analytics</p>
          <p className="text-[12px] text-gray-400">{error}</p>
          <button onClick={load} className="rounded-full bg-gray-900 px-5 py-2.5 text-[12px] font-bold text-white">Try again</button>
        </div>
      )}

      {!loading && !error && data && (
        <div className="px-6 mt-5 flex flex-col gap-6">
          {/* Quiz title */}
          <div>
            <h2 className="text-[22px] font-extrabold text-gray-900 tracking-tight">{data.quiz.title}</h2>
            <p className="text-[12px] font-medium text-gray-400 mt-1">
              {[data.quiz.subject, data.quiz.target_class].filter(Boolean).join(' · ')}
              {data.quiz.question_count ? ` · ${data.quiz.question_count} questions` : ''}
            </p>
          </div>

          {/* Stat cards */}
          <div className="flex gap-3">
            <StatCard label="Attempts" value={data.stats.attempts} accent="#7c3aed" />
            <StatCard label="Avg Score" value={`${Math.round(data.stats.average_percentage)}%`} accent="#0ea5e9" />
            <StatCard label="Pass Rate" value={`${Math.round(data.stats.pass_rate)}%`} accent="#10b981" />
          </div>

          {data.stats.attempts === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12 text-center">
              <div className="grid size-14 place-items-center rounded-2xl bg-gray-100 text-gray-400">
                <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /></svg>
              </div>
              <p className="text-[14px] font-bold text-gray-800">No attempts yet</p>
              <p className="text-[12px] text-gray-400">Results appear here once students take this quiz.</p>
            </div>
          ) : (
            <>
              {/* Student leaderboard */}
              <div>
                <h3 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-[0.1em] mb-3">Students ({data.stats.attempts})</h3>
                <div className="flex flex-col gap-2.5">
                  {data.results.map((r, i) => (
                    <motion.div
                      key={r.id ?? i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="flex items-center gap-3 rounded-[16px] bg-white border border-gray-100 shadow-sm p-3"
                    >
                      <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[#ede9fe] text-[#7c3aed] text-[12px] font-bold">
                        {initials(r.student_name, r.student_email)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-bold text-gray-900 truncate">{r.student_name || r.student_email || 'Student'}</p>
                        <p className="text-[10.5px] font-medium text-gray-400">{r.completed_at ? fmtWhen(r.completed_at) : 'In progress'}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[14px] font-extrabold text-gray-900">{r.score}/{r.total_questions}</p>
                        <span className={`inline-block mt-0.5 rounded-full px-2 py-[2px] text-[8.5px] font-extrabold uppercase tracking-wide ${TIER_STYLES[r.tier] || 'bg-gray-100 text-gray-500'}`}>
                          {Math.round(r.percentage)}% · {r.tier}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Per-question breakdown */}
              <div>
                <h3 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-[0.1em] mb-3">Question Breakdown</h3>
                <div className="flex flex-col gap-3">
                  {data.per_question.map((q) => (
                    <div key={q.question_number} className="rounded-[16px] bg-white border border-gray-100 shadow-sm p-4">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-[12.5px] font-bold text-gray-800 leading-snug">
                          <span className="text-[#7c3aed]">Q{q.question_number}.</span> {q.question_text}
                        </p>
                        <span className="shrink-0 text-[12px] font-extrabold text-gray-900">{Math.round(q.accuracy)}%</span>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${q.accuracy}%`,
                            backgroundColor: q.accuracy >= 70 ? '#10b981' : q.accuracy >= 40 ? '#f59e0b' : '#ef4444',
                          }}
                        />
                      </div>
                      <p className="mt-1.5 text-[10.5px] font-medium text-gray-400">{q.correct_count} of {q.total_answers} correct</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
}
