import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * StudentCalendar — dark-themed calendar with month navigation,
 * search bar, and upcoming events list.
 * Rendered as an overlay component from StudentHome.
 */

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const EVENTS = [
  {
    id: 1,
    month: 'OCT',
    day: 12,
    monthColor: '#f59e0b',
    title: 'Effective UI/UX Fundamentals',
    description: 'Learn the core principles of designing intuitive digital interface',
    time: '10:00 AM - 12:00PM',
    location: 'Hall B-24',
  },
  {
    id: 2,
    month: 'SEPT',
    day: 12,
    monthColor: '#6366f1',
    title: 'Effective UI/UX Fundamentals',
    description: 'Learn the core principles of designing intuitive digital interface',
    time: '10:00 AM - 12:00PM',
    location: 'Hall B-24',
  },
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export function StudentCalendar({ onBack }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [search, setSearch] = useState('');

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Previous month's trailing days
  const prevMonthDays = getDaysInMonth(year, month - 1);
  const trailingDays = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    trailingDays.push(prevMonthDays - i);
  }

  // Current month days
  const currentDays = [];
  for (let i = 1; i <= daysInMonth; i++) {
    currentDays.push(i);
  }

  // Next month's leading days to fill the grid
  const totalCells = trailingDays.length + currentDays.length;
  const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  const leadingDays = [];
  for (let i = 1; i <= remainingCells; i++) {
    leadingDays.push(i);
  }

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const today = now.getDate();
  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth();

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#1a1a1a] font-sans">
      {/* Background blobs */}
      <div className="absolute top-32 -right-16 size-48 rounded-full bg-[#2d2c3e] blur-[70px] opacity-40 pointer-events-none" />
      <div className="absolute top-[55%] -left-20 size-40 rounded-full bg-[#3d3520] blur-[60px] opacity-30 pointer-events-none" />

      <div className="relative z-10 flex-1 overflow-y-auto pb-10">
        {/* ───── Header ───── */}
        <div className="px-6 pt-safe pt-8">
          <button
            type="button"
            onClick={onBack}
            className="p-2 -ml-2 text-white hover:opacity-80 transition"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </div>

        {/* ───── Search Bar ───── */}
        <div className="px-6 mt-4">
          <label className="flex items-center gap-3 rounded-full bg-[#262626] border border-[#333] px-4 py-2.5">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="flex-1 bg-transparent text-[13px] text-white placeholder:text-white/40 focus:outline-none"
            />
            <svg viewBox="0 0 20 20" className="h-4 w-4 text-white/40 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="9" r="6" />
              <path d="m14 14 4 4" />
            </svg>
          </label>
        </div>

        {/* ───── Month Navigation ───── */}
        <div className="px-6 mt-6 flex items-center justify-center gap-4">
          <h2 className="text-[16px] font-bold text-white">
            {MONTH_NAMES[month]} {year}
          </h2>
          <div className="flex items-center gap-1">
            <button
              onClick={prevMonth}
              className="p-1.5 text-white/50 hover:text-white transition rounded-full hover:bg-white/5"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="12 15 7 10 12 5" />
              </svg>
            </button>
            <button
              onClick={nextMonth}
              className="p-1.5 text-white/50 hover:text-white transition rounded-full hover:bg-white/5"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="8 5 13 10 8 15" />
              </svg>
            </button>
          </div>
        </div>

        {/* ───── Calendar Grid ───── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mx-6 mt-5 rounded-[20px] bg-[#242424] border border-[#303030] px-4 py-5"
        >
          {/* Day headers */}
          <div className="grid grid-cols-7 mb-3">
            {DAYS.map(d => (
              <div key={d} className="text-center text-[11px] font-semibold text-white/50">
                {d}
              </div>
            ))}
          </div>

          {/* Date cells */}
          <div className="grid grid-cols-7 gap-y-2">
            {/* Previous month trailing days */}
            {trailingDays.map((d, i) => (
              <div key={`prev-${i}`} className="flex justify-center">
                <span className="grid size-9 place-items-center text-[13px] font-medium text-white/20">
                  {d}
                </span>
              </div>
            ))}

            {/* Current month */}
            {currentDays.map(d => {
              const isToday = isCurrentMonth && d === today;
              return (
                <div key={d} className="flex justify-center">
                  <span
                    className={[
                      'grid size-9 place-items-center rounded-full text-[13px] font-medium transition',
                      isToday
                        ? 'bg-[#f59e0b] text-[#1a1a1a] font-bold'
                        : 'text-white/80 hover:bg-white/5',
                    ].join(' ')}
                  >
                    {d}
                  </span>
                </div>
              );
            })}

            {/* Next month leading days */}
            {leadingDays.map((d, i) => (
              <div key={`next-${i}`} className="flex justify-center">
                <span className="grid size-9 place-items-center text-[13px] font-medium text-white/20">
                  {d}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ───── Upcoming Events ───── */}
        <div className="px-6 mt-8">
          <h3 className="text-[20px] font-extrabold text-white mb-5">
            Upcoming Events
          </h3>

          <div className="flex flex-col gap-4">
            {EVENTS.map((ev, idx) => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.35 }}
                className="flex items-start gap-4"
              >
                {/* Date badge */}
                <div className="shrink-0 w-[56px] h-[64px] rounded-2xl bg-[#262626] border border-[#333] flex flex-col items-center justify-center">
                  <span
                    className="text-[10px] font-extrabold tracking-wider"
                    style={{ color: ev.monthColor }}
                  >
                    {ev.month}
                  </span>
                  <span className="text-[22px] font-black text-white leading-none mt-0.5">
                    {ev.day}
                  </span>
                </div>

                {/* Event details */}
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-bold text-white leading-snug">
                    {ev.title}
                  </p>
                  <p className="text-[11px] text-white/50 mt-1 leading-relaxed">
                    {ev.description}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-[10px] text-white/40 font-medium">
                      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="8" cy="8" r="6" />
                        <path d="M8 5v3l2 1" />
                      </svg>
                      {ev.time}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-white/40 font-medium">
                      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 1.5c2.5 0 4.5 1.8 4.5 4C12.5 8.5 8 14.5 8 14.5S3.5 8.5 3.5 5.5C3.5 3.3 5.5 1.5 8 1.5z" />
                        <circle cx="8" cy="5.5" r="1.5" />
                      </svg>
                      {ev.location}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
