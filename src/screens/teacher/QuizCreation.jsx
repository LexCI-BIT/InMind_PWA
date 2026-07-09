import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { TeacherDock } from '../../components/TeacherDock';
import { createQuiz, updateQuiz, getQuiz, getAuthSession } from '../../lib/api';

/**
 * QuizCreation — teacher builds a quiz/session and saves it to the backend.
 *
 * Flow:
 *   1. Fill session details (title, class, schedule, go-live).
 *   2. Add one or more questions (4 options each, mark the correct one).
 *   3. "Launch Session" → POST /api/quizzes via createQuiz().
 *
 * On success the quiz + its questions are persisted in Supabase and become
 * visible to students on their Quiz screen.
 */

const CLASS_OPTIONS = [
  { label: 'Grade 10 - Biology', target_class: 'Grade 10', target_section: 'A', subject: 'Biology' },
  { label: 'Grade 10 - Chemistry', target_class: 'Grade 10', target_section: 'A', subject: 'Chemistry' },
  { label: 'Grade 9 - Science', target_class: 'Grade 9', target_section: 'B', subject: 'Science' },
  { label: 'Grade 11 - Physics', target_class: 'Grade 11', target_section: 'A', subject: 'Physics' },
  { label: 'Grade 12 - Mathematics', target_class: 'Grade 12', target_section: 'A', subject: 'Mathematics' },
];

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];
const emptyQuestion = () => ({ text: '', options: ['', '', '', ''], correct: 0 });

export function QuizCreation() {
  const navigate = useNavigate();
  const location = useLocation();
  const session = getAuthSession();
  const teacherLabel = session?.email ? session.email.split('@')[0] : 'Teacher';

  // Edit mode: a quiz id passed via router state or ?id= means we're editing.
  const editQuizId = location.state?.quizId ?? new URLSearchParams(location.search).get('id');
  const isEditing = Boolean(editQuizId);
  const [loadingQuiz, setLoadingQuiz] = useState(isEditing);

  // ── Session details ──
  const [title, setTitle] = useState('');
  const [extraClass, setExtraClass] = useState(null); // class combo loaded from an edited quiz
  const [classIdx, setClassIdx] = useState(0);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [durationMin, setDurationMin] = useState(5);
  const [goLive, setGoLive] = useState(false);

  // ── Question editor ──
  const [editorOpen, setEditorOpen] = useState(true);
  const [draft, setDraft] = useState(emptyQuestion());
  const [editingIndex, setEditingIndex] = useState(null);

  // ── Saved questions ──
  const [questions, setQuestions] = useState([]);

  // ── Submission ──
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [launched, setLaunched] = useState(null); // success payload

  const classOptions = extraClass ? [...CLASS_OPTIONS, extraClass] : CLASS_OPTIONS;
  const selectedClass = classOptions[classIdx] || CLASS_OPTIONS[0];

  // ─── Load existing quiz when editing ───
  useEffect(() => {
    if (!editQuizId) return;
    let active = true;
    (async () => {
      try {
        const data = await getQuiz(editQuizId);
        if (!active) return;
        const z = data.quiz || {};
        const qs = data.questions || [];
        setTitle(z.title || '');

        let idx = CLASS_OPTIONS.findIndex(
          (c) => c.target_class === z.target_class && c.subject === z.subject,
        );
        if (idx === -1) {
          setExtraClass({
            label: [z.target_class, z.subject].filter(Boolean).join(' - ') || 'Custom Class',
            target_class: z.target_class || '',
            target_section: z.target_section || '',
            subject: z.subject || '',
          });
          idx = CLASS_OPTIONS.length;
        }
        setClassIdx(idx);
        setDurationMin(Math.max(1, Math.round((z.duration_seconds || 300) / 60)));
        setGoLive(Boolean(z.status === 'live' || z.go_live_immediately));
        if (z.scheduled_at) {
          const dt = new Date(z.scheduled_at);
          if (!Number.isNaN(dt.getTime())) {
            setDate(dt.toISOString().slice(0, 10));
            setTime(dt.toTimeString().slice(0, 5));
          }
        }
        setQuestions(
          qs.map((q) => ({
            text: q.question_text,
            options: [q.option_a, q.option_b, q.option_c, q.option_d],
            correct: q.correct_option ?? 0,
          })),
        );
      } catch (err) {
        if (active) setError(err.message || 'Could not load this session for editing.');
      } finally {
        if (active) setLoadingQuiz(false);
      }
    })();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editQuizId]);

  // ─── Question editor helpers ───
  const setOption = (i, value) =>
    setDraft((d) => ({ ...d, options: d.options.map((o, idx) => (idx === i ? value : o)) }));

  const draftValid =
    draft.text.trim().length > 0 && draft.options.every((o) => o.trim().length > 0);

  function saveQuestion() {
    if (!draftValid) {
      setError('Add a question and fill all four options before saving.');
      return;
    }
    setError('');
    const cleaned = {
      text: draft.text.trim(),
      options: draft.options.map((o) => o.trim()),
      correct: draft.correct,
    };
    if (editingIndex !== null) {
      setQuestions((qs) => qs.map((q, i) => (i === editingIndex ? cleaned : q)));
      setEditingIndex(null);
    } else {
      setQuestions((qs) => [...qs, cleaned]);
    }
    setDraft(emptyQuestion());
  }

  function editQuestion(i) {
    setDraft({ ...questions[i], options: [...questions[i].options] });
    setEditingIndex(i);
    setEditorOpen(true);
  }

  function deleteQuestion(i) {
    setQuestions((qs) => qs.filter((_, idx) => idx !== i));
    if (editingIndex === i) {
      setEditingIndex(null);
      setDraft(emptyQuestion());
    }
  }

  function clearDraft() {
    setDraft(emptyQuestion());
    setEditingIndex(null);
  }

  // ─── Launch ───
  async function handleLaunch() {
    setError('');
    if (!title.trim()) {
      setError('Please add a session title.');
      return;
    }
    if (questions.length === 0) {
      setError('Add at least one question before launching.');
      return;
    }
    if (!goLive && date && !time) {
      setError('Pick a time for the scheduled session (or enable Go Live).');
      return;
    }

    const status = goLive ? 'live' : date && time ? 'scheduled' : 'draft';
    let scheduledAt = null;
    if (!goLive && date && time) {
      const dt = new Date(`${date}T${time}`);
      if (!Number.isNaN(dt.getTime())) scheduledAt = dt.toISOString();
    }

    const payload = {
      title: title.trim(),
      subject: selectedClass.subject,
      target_class: selectedClass.target_class,
      target_section: selectedClass.target_section,
      duration_seconds: Math.max(1, Number(durationMin) || 5) * 60,
      status,
      go_live_immediately: goLive,
      scheduled_at: scheduledAt,
      questions: questions.map((q, i) => ({
        question_number: i + 1,
        category: selectedClass.subject,
        question_text: q.text,
        option_a: q.options[0],
        option_b: q.options[1],
        option_c: q.options[2],
        option_d: q.options[3],
        correct_option: q.correct,
      })),
    };

    try {
      setSubmitting(true);
      if (isEditing) {
        const res = await updateQuiz(editQuizId, payload);
        setLaunched({ id: editQuizId, count: res.questions_count ?? questions.length, status, editing: true });
      } else {
        const res = await createQuiz(payload);
        setLaunched({ id: res.id, count: res.questions_added, status, editing: false });
      }
    } catch (err) {
      setError(err.message || 'Could not save the session. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  // ─── Success screen ───
  if (launched) {
    return (
      <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col items-center justify-center bg-[#f5f5f5] px-8 text-center font-sans">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
          className="grid size-20 place-items-center rounded-full bg-[#10b981] text-white shadow-lg shadow-emerald-500/30"
        >
          <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
        </motion.div>
        <h2 className="mt-6 text-[22px] font-extrabold text-[#1f1f1f]">{launched.editing ? 'Session Updated!' : 'Session Created!'}</h2>
        <p className="mt-2 text-[13px] font-medium text-gray-500">
          “{title.trim()}” is saved with {launched.count} question{launched.count === 1 ? '' : 's'}.
          {launched.status === 'live'
            ? ' It is now live for students.'
            : launched.status === 'scheduled'
            ? ' Students will see it at the scheduled time.'
            : ' Saved as a draft.'}
        </p>
        <div className="mt-8 flex w-full flex-col gap-3">
          <button
            onClick={() => navigate('/teacher/sessions')}
            className="w-full rounded-full bg-[#7c3aed] py-4 text-[14.5px] font-bold text-white shadow-[0_8px_20px_rgba(124,58,237,0.25)] transition hover:bg-[#6d28d9]"
          >
            View Sessions
          </button>
          <button
            onClick={() => {
              setLaunched(null);
              setTitle('');
              setQuestions([]);
              setDraft(emptyQuestion());
              setEditingIndex(null);
              setDate('');
              setTime('');
              setGoLive(false);
            }}
            className="w-full rounded-full bg-white py-4 text-[14.5px] font-bold text-[#7c3aed] border border-purple-100 transition hover:bg-purple-50"
          >
            Create Another
          </button>
        </div>
      </section>
    );
  }

  if (loadingQuiz) {
    return (
      <section className="mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col items-center justify-center gap-4 bg-[#f5f5f5] font-sans">
        <div className="size-10 animate-spin rounded-full border-[3px] border-purple-200 border-t-[#7c3aed]" />
        <p className="text-[13px] font-medium text-gray-500">Loading session…</p>
      </section>
    );
  }

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#f5f5f5] font-sans pb-[120px]">

      {/* ───── Header ───── */}
      <div className="flex items-center gap-3 px-6 pt-safe pt-8">
        <div className="size-11 rounded-full bg-cover bg-center shadow-sm border border-gray-200" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=47")' }} />
        <div className="flex flex-col">
          <h1 className="text-[17px] font-bold text-[#1f1f1f] leading-tight capitalize">{teacherLabel}</h1>
          <p className="text-[11px] font-medium text-gray-500 mt-0.5">{selectedClass.target_class}-{selectedClass.target_section}</p>
        </div>
      </div>

      {/* ───── Title & Back ───── */}
      <div className="px-6 mt-6 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="grid size-8 place-items-center rounded-full bg-[#7c3aed] text-white shadow-sm hover:opacity-90 transition">
          <svg viewBox="0 0 24 24" className="h-4 w-4 pr-0.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <h2 className="text-[16px] font-extrabold text-[#1f1f1f]">{isEditing ? 'Edit Session' : 'Create New Session'}</h2>
      </div>

      {/* ───── Error banner ───── */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mx-6 mt-4 rounded-[12px] bg-red-50 px-4 py-3 text-[12px] font-semibold text-red-600 border border-red-100"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-6 mt-6 flex flex-col gap-5">
        {/* Session Title */}
        <div>
          <label className="text-[10px] font-extrabold uppercase text-gray-500 tracking-wider mb-2 block">Session Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Molecular Biology Review"
            className="w-full bg-white rounded-[12px] px-4 py-3.5 text-[13px] font-medium text-[#1f1f1f] border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] outline-none placeholder:text-gray-400 focus:border-purple-200"
          />
        </div>

        {/* Select Class */}
        <div>
          <label className="text-[10px] font-extrabold uppercase text-gray-500 tracking-wider mb-2 block">Select Class</label>
          <div className="relative">
            <select
              value={classIdx}
              onChange={(e) => setClassIdx(Number(e.target.value))}
              className="w-full appearance-none bg-white rounded-[12px] px-4 py-3.5 text-[13px] font-bold text-[#1f1f1f] border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] outline-none focus:border-purple-200"
            >
              {classOptions.map((c, i) => (
                <option key={c.label} value={i}>{c.label}</option>
              ))}
            </select>
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
          </div>
        </div>

        {/* Date and Time */}
        <div>
          <label className="text-[10px] font-extrabold uppercase text-gray-500 tracking-wider mb-2 block">Date and Time</label>
          <div className="flex gap-3">
            <label className={`flex-1 bg-white rounded-[12px] px-4 py-3.5 border shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-2 ${goLive ? 'opacity-40' : 'border-gray-100'}`}>
              <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-[#7c3aed]" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" /></svg>
              <input type="date" disabled={goLive} value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-transparent text-[12px] font-semibold text-[#1f1f1f] outline-none" />
            </label>
            <label className={`flex-1 bg-white rounded-[12px] px-4 py-3.5 border shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-2 ${goLive ? 'opacity-40' : 'border-gray-100'}`}>
              <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-[#7c3aed]" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>
              <input type="time" disabled={goLive} value={time} onChange={(e) => setTime(e.target.value)} className="w-full bg-transparent text-[12px] font-semibold text-[#1f1f1f] outline-none" />
            </label>
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="text-[10px] font-extrabold uppercase text-gray-500 tracking-wider mb-2 block">Duration (Minutes)</label>
          <input
            type="number"
            min={1}
            max={120}
            value={durationMin}
            onChange={(e) => setDurationMin(e.target.value)}
            className="w-full bg-white rounded-[12px] px-4 py-3.5 text-[13px] font-bold text-[#1f1f1f] border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] outline-none focus:border-purple-200"
          />
        </div>

        {/* Go Live Immediately */}
        <button
          type="button"
          onClick={() => setGoLive((v) => !v)}
          className="w-full bg-white rounded-[16px] p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full bg-red-50 text-red-400">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-extrabold text-[#1f1f1f]">Go Live Immediately</span>
              <span className="text-[10px] font-medium text-gray-500 mt-0.5">Skip scheduling and start now</span>
            </div>
          </div>
          <div className={`w-10 h-6 rounded-full flex items-center p-1 transition-colors ${goLive ? 'bg-[#7c3aed] justify-end' : 'bg-gray-200 justify-start'}`}>
            <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
          </div>
        </button>
      </div>

      {/* ───── Question Editor ───── */}
      <div className="px-6 mt-6">
        <button
          type="button"
          onClick={() => setEditorOpen((v) => !v)}
          className="flex w-full items-center justify-between mb-3"
        >
          <label className="text-[10px] font-extrabold uppercase text-gray-500 tracking-wider">{editingIndex !== null ? `Edit Question ${editingIndex + 1}` : 'Add Question'}</label>
          <div className={`w-10 h-5 rounded-full flex items-center p-1 transition-colors ${editorOpen ? 'bg-[#7c3aed] justify-end' : 'bg-gray-200 justify-start'}`}>
            <div className="w-3 h-3 bg-white rounded-full shadow-sm" />
          </div>
        </button>

        <AnimatePresence initial={false}>
          {editorOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="w-full bg-white rounded-[24px] p-5 border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex gap-3">
                <div className="flex-1">
                  <label className="text-[8px] font-extrabold uppercase text-gray-400 tracking-wider block mb-2">Question Description</label>
                  <div className="bg-gray-50 rounded-[12px] p-3 flex gap-2 mb-5 items-start">
                    <div className="grid size-5 place-items-center rounded-full bg-[#7c3aed] text-white shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold">?</span>
                    </div>
                    <textarea
                      rows={2}
                      value={draft.text}
                      onChange={(e) => setDraft((d) => ({ ...d, text: e.target.value }))}
                      placeholder="What would you like to ask?"
                      className="w-full resize-none bg-transparent text-[12px] font-medium text-[#1f1f1f] outline-none placeholder:text-gray-400"
                    />
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <label className="text-[8px] font-extrabold uppercase text-gray-400 tracking-wider">Options</label>
                    <span className="text-[8px] font-extrabold uppercase text-[#7c3aed] tracking-wider">Mark Correct Answer</span>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    {draft.options.map((opt, i) => {
                      const isCorrect = draft.correct === i;
                      return (
                        <div
                          key={i}
                          className={`w-full rounded-[12px] p-2 flex items-center justify-between border transition-colors ${isCorrect ? 'bg-[#d1fae5] border-emerald-200' : 'bg-white border-gray-100 shadow-[0_2px_4px_rgba(0,0,0,0.02)]'}`}
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <div className={`grid size-6 place-items-center rounded-full text-[10px] font-bold shrink-0 ${isCorrect ? 'bg-[#10b981] text-white' : 'bg-gray-100 text-[#1f1f1f]'}`}>{OPTION_LETTERS[i]}</div>
                            <input
                              type="text"
                              value={opt}
                              onChange={(e) => setOption(i, e.target.value)}
                              placeholder={`Type Option ${OPTION_LETTERS[i]}...`}
                              className="w-full bg-transparent text-[12px] font-bold text-[#1f1f1f] outline-none placeholder:font-medium placeholder:text-gray-400"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => setDraft((d) => ({ ...d, correct: i }))}
                            aria-label={`Mark option ${OPTION_LETTERS[i]} correct`}
                            className="shrink-0 ml-2"
                          >
                            {isCorrect ? (
                              <div className="grid size-5 place-items-center rounded-full bg-[#10b981] text-white">
                                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                              </div>
                            ) : (
                              <div className="size-5 rounded-full border-2 border-gray-200" />
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex gap-2 mt-5">
                    <button
                      type="button"
                      onClick={saveQuestion}
                      className="flex-1 py-3 rounded-[12px] bg-[#7c3aed] text-white text-[12px] font-bold shadow-md shadow-purple-500/20 hover:opacity-90 transition"
                    >
                      {editingIndex !== null ? 'Update Question' : 'Save Question'}
                    </button>
                    <button
                      type="button"
                      onClick={clearDraft}
                      className="size-[42px] rounded-[12px] bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition border border-gray-100"
                      aria-label="Clear question"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ───── Added Questions ───── */}
      <div className="mt-8 pl-6">
        <h3 className="text-[10px] font-extrabold uppercase text-gray-500 tracking-wider mb-4">Added Questions ({questions.length})</h3>
        {questions.length === 0 ? (
          <p className="pr-6 text-[12px] font-medium text-gray-400">No questions yet — add one above to build your quiz.</p>
        ) : (
          <div className="flex gap-3 overflow-x-auto pr-6 pb-4 scrollbar-hide">
            {questions.map((q, i) => (
              <AddedQuestionCard
                key={i}
                num={i + 1}
                question={q}
                onEdit={() => editQuestion(i)}
                onDelete={() => deleteQuestion(i)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Launch Session Button */}
      <div className="px-6 mt-2 mb-8">
        <button
          type="button"
          onClick={handleLaunch}
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-[#7c3aed] text-white text-[14.5px] font-bold shadow-[0_8px_20px_rgba(124,58,237,0.25)] hover:bg-[#6d28d9] transition disabled:opacity-60"
        >
          {submitting ? 'Saving…' : isEditing ? <>Save Changes</> : <>Launch Session <span className="text-[16px]">🚀</span></>}
        </button>
      </div>

      <TeacherDock />
    </section>
  );
}

function AddedQuestionCard({ num, question, onEdit, onDelete }) {
  const correctText = question.options[question.correct];
  return (
    <div className="w-[200px] shrink-0 bg-white rounded-[20px] p-4 border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="bg-[#e0e7ff] text-[#7c3aed] text-[7px] font-extrabold px-2 py-0.5 rounded-full tracking-wider uppercase">Question {num}</span>
          <div className="flex items-center gap-2">
            <button type="button" onClick={onEdit} aria-label="Edit question" className="text-gray-400 hover:text-[#7c3aed] transition">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>
            </button>
            <button type="button" onClick={onDelete} aria-label="Delete question" className="text-gray-400 hover:text-red-500 transition">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
        <p className="text-[12px] font-extrabold text-[#1f1f1f] leading-snug line-clamp-3">{question.text}</p>
      </div>
      <div className="mt-4 bg-[#d1fae5] text-[#10b981] text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center justify-between">
        <span className="truncate pr-2">{correctText}</span>
        <div className="size-1.5 rounded-full bg-[#10b981] shrink-0" />
      </div>
    </div>
  );
}
