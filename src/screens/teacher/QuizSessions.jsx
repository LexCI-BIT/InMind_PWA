import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { listQuizzes, updateQuiz, getAuthSession } from '../../lib/api';

/**
 * QuizSessions — the teacher's session dashboard, populated live from the DB.
 *
 *   • GET /api/quizzes returns this teacher's quizzes with question_count and
 *     participant_count.
 *   • Quizzes are grouped into Live / Scheduled / Draft / Completed.
 *   • Daily/Weekly/Monthly tabs filter by the quiz's reference date.
 *   • Edit, Preview, Go Live and End Session call real endpoints.
 */

const AVATAR_COLORS = ['bg-amber-400', 'bg-emerald-400', 'bg-indigo-400', 'bg-rose-400', 'bg-sky-400'];
const WINDOW_DAYS = { Daily: 1, Weekly: 7, Monthly: 31 };

function refDate(q) {
  return new Date(q.scheduled_at || q.started_at || q.created_at || Date.now());
}

function timeAgo(iso) {
  if (!iso) return null;
  const diff = Date.now() - new Date(iso).getTime();
  if (Number.isNaN(diff)) return null;
  const mins = Math.max(0, Math.floor(diff / 60000));
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}min${mins === 1 ? '' : 's'} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function formatSchedule(iso) {
  if (!iso) return 'Not scheduled';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return 'Not scheduled';
  const startOfDay = (x) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const diffDays = Math.round((startOfDay(d) - startOfDay(new Date())) / 86400000);
  const dayLabel =
    diffDays === 0 ? 'Today' :
    diffDays === 1 ? 'Tomorrow' :
    diffDays === -1 ? 'Yesterday' :
    d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  const time = d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  return `${dayLabel}, ${time}`;
}

function Avatars({ count }) {
  const shown = Math.min(count, 3);
  if (shown <= 0) return null;
  return (
    <div className="flex -space-x-2">
      {Array.from({ length: shown }).map((_, i) => (
        <div key={i} className={`w-7 h-7 rounded-full border-2 border-white ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`} />
      ))}
    </div>
  );
}

export function QuizSessions() {
  const navigate = useNavigate();
  const session = getAuthSession();
  const teacherLabel = session?.email ? session.email.split('@')[0] : 'Teacher';
  const todayLabel = new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

  const [activeTab, setActiveTab] = useState('Daily');
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);

  function load() {
    setError('');
    return listQuizzes()
      .then((d) => setQuizzes(Array.isArray(d) ? d : []))
      .catch((e) => setError(e.message || 'Could not load sessions.'))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    let active = true;
    listQuizzes()
      .then((d) => active && setQuizzes(Array.isArray(d) ? d : []))
      .catch((e) => active && setError(e.message || 'Could not load sessions.'))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  async function patchStatus(id, status) {
    setBusyId(id);
    try {
      await updateQuiz(id, { status });
      await load();
    } catch (e) {
      setError(e.message || 'Could not update the session.');
    } finally {
      setBusyId(null);
    }
  }

  const editSession = (id) => navigate('/teacher/create-quiz', { state: { quizId: id } });
  const preview = (id) => navigate(`/student/quiz/take?id=${id}`, { state: { quizId: id } });
  const viewResults = (id) => navigate(`/teacher/results/${id}`, { state: { quizId: id } });

  // Tab window filter
  const windowDays = WINDOW_DAYS[activeTab];
  const filtered = quizzes.filter((q) => {
    const diffDays = Math.abs(Date.now() - refDate(q).getTime()) / 86400000;
    return diffDays <= windowDays;
  });

  const groups = {
    live: filtered.filter((q) => q.status === 'live'),
    scheduled: filtered.filter((q) => q.status === 'scheduled'),
    draft: filtered.filter((q) => q.status === 'draft'),
    completed: filtered.filter((q) => q.status === 'completed'),
  };
  const hasAny = filtered.length > 0;

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col bg-white font-sans pb-10">

      {/* ───── Header ───── */}
      <div className="px-6 pt-safe pt-8 flex items-center gap-3">
        <button onClick={() => navigate('/teacher/home')} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition" aria-label="Back">
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cover bg-center shadow-sm" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=47")' }} />
          <div>
            <h2 className="text-[14px] font-bold text-gray-900 capitalize">Hello, {teacherLabel}</h2>
            <p className="text-[11px] text-gray-400 font-medium">{todayLabel}</p>
          </div>
        </div>
      </div>

      {/* ───── Title + Create Button ───── */}
      <div className="px-6 mt-6">
        <h1 className="text-[26px] font-extrabold text-gray-900 tracking-tight">Quiz Sessions</h1>
        <motion.button
          onClick={() => navigate('/teacher/create-quiz')}
          whileTap={{ scale: 0.98 }}
          className="mt-4 w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-[14px] font-bold text-white shadow-md"
          style={{ background: 'linear-gradient(135deg, #1f1f1f 0%, #374151 100%)' }}
        >
          <span>Create New Session</span>
          <div className="w-6 h-6 rounded-full bg-[#22c55e] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
        </motion.button>
      </div>

      {/* ───── Tabs ───── */}
      <div className="px-6 mt-6">
        <div className="flex bg-gray-100 p-1 rounded-full">
          {['Daily', 'Weekly', 'Monthly'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-[13px] font-bold rounded-full transition-all ${
                activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ───── Body ───── */}
      <div className="px-6 mt-6 flex flex-col gap-5">

        {loading && (
          <div className="flex flex-col items-center justify-center gap-3 py-16">
            <div className="size-9 animate-spin rounded-full border-[3px] border-gray-200 border-t-gray-800" />
            <p className="text-[12.5px] font-medium text-gray-400">Loading sessions…</p>
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <p className="text-[13px] font-semibold text-gray-700">Couldn't load your sessions</p>
            <p className="text-[12px] text-gray-400">{error}</p>
            <button onClick={() => { setLoading(true); load(); }} className="rounded-full bg-gray-900 px-5 py-2.5 text-[12px] font-bold text-white">Try again</button>
          </div>
        )}

        {!loading && !error && !hasAny && (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <div className="grid size-14 place-items-center rounded-2xl bg-gray-100 text-gray-400">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
            </div>
            <p className="text-[14px] font-bold text-gray-800">No {activeTab.toLowerCase()} sessions</p>
            <p className="text-[12px] text-gray-400">Create a new session to get started.</p>
          </div>
        )}

        {/* LIVE NOW */}
        {!loading && groups.live.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[11px] font-extrabold text-red-500 uppercase tracking-wider">Live Now</span>
            </div>
            <div className="flex flex-col gap-4">
              {groups.live.map((q) => (
                <motion.div key={q.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[20px] p-5 border border-gray-100 shadow-sm">
                  <h3 className="text-[16px] font-extrabold text-gray-900">{q.title}</h3>
                  <p className="text-[11px] text-gray-400 font-medium mt-1">
                    {q.started_at ? `Started ${timeAgo(q.started_at)} · ` : ''}{q.participant_count} student{q.participant_count === 1 ? '' : 's'} joined
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    {q.participant_count > 0 ? <Avatars count={q.participant_count} /> : null}
                    <span className="text-[11px] font-semibold text-gray-400 ml-1">
                      {q.participant_count > 0 ? `${q.participant_count} joined` : 'Waiting for students…'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 mt-4 flex-wrap">
                    <button onClick={() => viewResults(q.id)} className="px-5 py-2 rounded-full bg-[#7c3aed] text-white text-[12px] font-bold shadow-sm hover:bg-[#6d28d9] transition">
                      View Analytics
                    </button>
                    <button onClick={() => patchStatus(q.id, 'completed')} disabled={busyId === q.id} className="px-5 py-2 rounded-full bg-red-500 text-white text-[12px] font-bold shadow-sm hover:bg-red-600 transition disabled:opacity-50">
                      {busyId === q.id ? '…' : 'End Session'}
                    </button>
                    <button onClick={() => preview(q.id)} className="px-5 py-2 rounded-full border border-gray-200 text-gray-600 text-[12px] font-bold hover:bg-gray-50 transition">
                      Preview
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* SCHEDULED */}
        {!loading && groups.scheduled.length > 0 && (
          <div>
            <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.1em] mb-3">Scheduled</p>
            <div className="flex flex-col gap-4">
              {groups.scheduled.map((q) => (
                <motion.div key={q.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[20px] p-5 border border-gray-100 shadow-sm">
                  <h3 className="text-[16px] font-extrabold text-gray-900">{q.title}</h3>
                  <p className="text-[11px] text-gray-400 font-medium mt-1">
                    {q.question_count} Question{q.question_count === 1 ? '' : 's'} · {formatSchedule(q.scheduled_at)}
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <button onClick={() => editSession(q.id)} className="px-5 py-2 rounded-full bg-[#f97316] text-white text-[12px] font-bold shadow-sm hover:bg-[#ea580c] transition">
                      Edit Session
                    </button>
                    <button onClick={() => patchStatus(q.id, 'live')} disabled={busyId === q.id} className="px-5 py-2 rounded-full border border-gray-200 text-gray-700 text-[12px] font-bold hover:bg-gray-50 transition disabled:opacity-50">
                      {busyId === q.id ? '…' : 'Go Live'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* DRAFT */}
        {!loading && groups.draft.length > 0 && (
          <div>
            <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.1em] mb-3">Draft</p>
            <div className="flex flex-col gap-4">
              {groups.draft.map((q) => (
                <motion.div key={q.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[20px] p-5 border border-gray-100 shadow-sm">
                  <h3 className="text-[16px] font-extrabold text-gray-900">{q.title}</h3>
                  <p className="text-[11px] text-gray-400 font-medium mt-1">{q.question_count} Question{q.question_count === 1 ? '' : 's'}</p>
                  <div className="flex items-center gap-3 mt-4">
                    <button onClick={() => editSession(q.id)} className="px-5 py-2 rounded-full bg-gray-900 text-white text-[12px] font-bold shadow-sm hover:bg-black transition">
                      Edit
                    </button>
                    <button onClick={() => patchStatus(q.id, 'live')} disabled={busyId === q.id || q.question_count === 0} className="px-5 py-2 rounded-full bg-[#22c55e] text-white text-[12px] font-bold shadow-sm hover:bg-[#16a34a] transition disabled:opacity-50">
                      {busyId === q.id ? '…' : 'Publish'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* COMPLETED */}
        {!loading && groups.completed.length > 0 && (
          <div>
            <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.1em] mb-3">Completed</p>
            <div className="flex flex-col gap-4">
              {groups.completed.map((q) => (
                <motion.div key={q.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[20px] p-5 border border-gray-100 shadow-sm">
                  <h3 className="text-[16px] font-extrabold text-gray-900">{q.title}</h3>
                  <p className="text-[11px] text-gray-400 font-medium mt-1">
                    {q.question_count} Question{q.question_count === 1 ? '' : 's'} · {q.participant_count} student{q.participant_count === 1 ? '' : 's'} completed
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    {q.participant_count > 0 && <Avatars count={q.participant_count} />}
                    <span className="text-[11px] font-semibold text-gray-400 ml-1">
                      {q.participant_count > 0 ? 'Session finished' : 'No attempts recorded'}
                    </span>
                  </div>
                  <div className="mt-4">
                    <button onClick={() => viewResults(q.id)} className="px-5 py-2 rounded-full bg-[#7c3aed] text-white text-[12px] font-bold shadow-sm hover:bg-[#6d28d9] transition">
                      View Analytics
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
