import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StudentDock } from '../../../components/StudentDock';
import { MorningLandscape, EveningLandscape } from './landscapes';

/**
 * Journal — entry list / dashboard.
 *
 * Sections:
 *   • Header (back arrow + "My Journal")
 *   • Day-of-week chip row with circular date numbers (today highlighted)
 *   • Two large time-of-day cards (Start your day / Evening) — horizontal scroll
 *   • Quick Journal: 2×2 grid of coloured prompt cards
 *
 * Each card navigates to /student/journal/:id where the entry editor opens.
 */

const QUICK = [
  {
    id: 'career', tag: 'CAREER AND PURPOSE',
    tagBg: '#473105', tagText: '#fde68a',
    bg: '#ffb703',
    question: "What's the one thing you did well today?", text: '#473105',
    decor: 'radial-gradient(ellipse at 90% 90%, #fb8500 0%, transparent 70%), radial-gradient(ellipse at 110% 40%, #e85d04 0%, transparent 60%)',
  },
  {
    id: 'tried', tag: 'WELLNESS',
    tagBg: '#314159', tagText: '#e2e8f0',
    bg: '#7bb2ff',
    question: "What's the one thing you tried even it was difficult today?", text: '#1e293b',
    decor: 'radial-gradient(circle at -10% -10%, #d8b4fe 0%, transparent 50%), radial-gradient(circle at 10% 40%, #bae6fd 0%, transparent 50%)',
  },
  {
    id: 'differently', tag: 'WELLNESS',
    tagBg: '#4b5563', tagText: '#f3f4f6',
    bg: '#e2e8f0',
    question: 'What will you do differently tomorrow?', text: '#1f2937',
    decor: 'radial-gradient(circle at 10% 110%, #dcfce7 0%, transparent 60%), radial-gradient(circle at 30% 90%, #fee2e2 0%, transparent 60%)',
  },
  {
    id: 'controlled', tag: 'WELLNESS',
    tagBg: '#6b1c1c', tagText: '#fecaca',
    bg: '#fa4d4d',
    question: 'Was there a moment you controlled yourself today?', text: '#450a0a',
    decor: 'radial-gradient(ellipse at 90% 120%, #b91c1c 0%, transparent 70%), radial-gradient(circle at 60% 90%, #dc2626 0%, transparent 60%)',
  },
];

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function thisWeek() {
  // Week starting Monday → array of 7 Date objects.
  const today = new Date();
  const dow = today.getDay(); // 0 = Sun, 1 = Mon, ... 6 = Sat
  const diffToMonday = dow === 0 ? -6 : 1 - dow;
  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

export function Journal() {
  const navigate = useNavigate();
  const days = thisWeek();
  const todayKey = new Date().toDateString();

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#181818]">
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Header */}
        <div className="px-5 pt-safe pt-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Back"
            className="grid size-10 place-items-center rounded-full bg-white/[0.06] text-white/85 transition hover:bg-white/10"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4l-6 6 6 6" />
            </svg>
          </button>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-4 text-[34px] font-bold text-white"
          >
            My Journal
          </motion.h1>
        </div>

        {/* Day picker */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.4 }}
          className="mt-6 flex justify-between px-5"
        >
          {days.map((d, i) => {
            const isToday = d.toDateString() === todayKey;
            return (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className={`text-[11.5px] font-semibold ${isToday ? 'text-amber-400' : 'text-white/55'}`}>
                  {DAY_NAMES[i]}
                </span>
                <span
                  className={[
                    'grid size-9 place-items-center rounded-full text-[13px] font-bold transition',
                    isToday
                      ? 'bg-amber-400 text-[#1f1f1f] shadow-md shadow-amber-400/30'
                      : 'bg-white/[0.08] text-white/65',
                  ].join(' ')}
                >
                  {d.getDate()}
                </span>
              </div>
            );
          })}
        </motion.div>

        {/* Time-of-day cards (horizontal scroll) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.4 }}
          className="no-scrollbar mt-6 flex gap-3 overflow-x-auto px-5 pb-2"
        >
          {/* Start your day */}
          <button
            type="button"
            onClick={() => navigate('/student/journal/start-day')}
            className="relative h-[170px] w-[270px] shrink-0 overflow-hidden rounded-[24px] text-left shadow-lg shadow-black/30 transition active:scale-[0.99]"
          >
            <MorningLandscape className="absolute inset-0 h-full w-full" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/55 to-transparent" />
            <span className="absolute bottom-4 left-4 text-[20px] font-bold text-white drop-shadow">
              Start your day
            </span>
          </button>

          {/* Evening */}
          <button
            type="button"
            onClick={() => navigate('/student/journal/evening')}
            className="relative h-[170px] w-[110px] shrink-0 overflow-hidden rounded-[24px] text-left shadow-lg shadow-black/30 transition active:scale-[0.99]"
          >
            <EveningLandscape className="absolute inset-0 h-full w-full" />
            <span className="absolute inset-y-0 right-3 flex items-center text-[18px] font-bold text-white drop-shadow [writing-mode:vertical-rl] rotate-180">
              Evening
            </span>
          </button>
        </motion.div>

        {/* Quick Journal */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.4 }}
          className="mt-7 px-5 text-[22px] font-bold text-white"
        >
          Quick Journal
        </motion.h2>

        <div className="mt-3 grid grid-cols-2 gap-3 px-5">
          {QUICK.map(({ id, tag, tagBg, tagText, bg, decor, question, text }, i) => (
            <motion.button
              key={id}
              type="button"
              onClick={() => navigate(`/student/journal/${id}`)}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 + i * 0.07, duration: 0.4 }}
              className="relative h-[180px] overflow-hidden rounded-[20px] p-4 text-left shadow-md shadow-black/30 transition"
              style={{
                background: `${decor}, ${bg}`,
              }}
            >
              <span
                className="inline-block rounded-md px-2.5 py-[5px] text-[9.5px] font-bold tracking-wider"
                style={{ backgroundColor: tagBg, color: tagText }}
              >
                {tag}
              </span>
              <p className="mt-4 text-[15px] font-bold leading-snug" style={{ color: text }}>
                {question}
              </p>
              <span
                className="absolute bottom-3 right-3 grid size-7 place-items-center rounded-full bg-black/40 text-white"
                aria-hidden="true"
              >
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 15l10-10" />
                  <path d="M7 5h8v8" />
                </svg>
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <StudentDock active="edit" />
    </section>
  );
}
