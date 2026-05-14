import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * MindLab — weekly activity hub.
 *
 *   • Back chevron
 *   • Dark "Search" pill
 *   • ONE large brown card that contains:
 *       – "Hey, jessica" subtle line
 *       – Big 3-line headline "You've completed 2 activities this week"
 *       – Amber "View Progress ↗" pill
 *       – "View all" link, right-aligned above the rail
 *       – Horizontal carousel of tall week tiles (white + amber alternating)
 *         WEEK label + number stack in amber (on white tile) / dark (on amber tile),
 *         title bold + black at the top
 *
 * Each tile → /student/mindlab/week/:weekId.
 */

const WEEKS = [
  { id: 1, number: '01', title: 'Clarity &\nConfidence',     tone: 'light' },
  { id: 2, number: '02', title: 'Leadership',                tone: 'amber' },
  { id: 3, number: '03', title: 'Self-\nawareness',          tone: 'light' },
  { id: 4, number: '04', title: 'Emotional\nIntelligence',   tone: 'amber' },
  { id: 5, number: '05', title: 'Growth\nMindset',           tone: 'light' },
  { id: 6, number: '06', title: 'Resilience',                tone: 'amber' },
];

export function MindLab() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const list = WEEKS.filter((w) =>
    !search.trim() ? true : w.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#181818] text-white">
      <div className="flex-1 overflow-y-auto pb-12">
        {/* ───── Header ───── */}
        <div className="px-5 pt-safe pt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Back"
            className="grid size-10 place-items-center rounded-full text-white/85 transition hover:bg-white/[0.06]"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4l-6 6 6 6" />
            </svg>
          </button>
        </div>

        {/* ───── Search ───── */}
        <div className="px-5 pt-3">
          <label className="flex items-center gap-3 rounded-full bg-[#3a3a3a]/70 px-5 py-3">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="flex-1 bg-transparent text-[15px] text-white placeholder:text-white/55 focus:outline-none"
            />
            <SearchIcon />
          </label>
        </div>

        {/* ───── Big brown card containing everything ───── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative mx-4 mt-4 overflow-hidden rounded-[28px] shadow-lg"
          style={{
            background:
              'radial-gradient(circle at 10% 0%, rgba(245,179,12,0.12) 0%, transparent 35%), radial-gradient(circle at 95% 30%, rgba(245,179,12,0.10) 0%, transparent 40%), linear-gradient(165deg, #3a2c18 0%, #2a1f10 100%)',
          }}
        >
          {/* Greeting + headline + CTA */}
          <div className="px-6 pt-7">
            <p className="text-[15px] text-white/80">Hey, jessica</p>
            <h2 className="mt-3 text-[28px] font-bold leading-[1.15] text-white">
              You've completed<br />2 activities this<br />week
            </h2>

            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/student/mindlab/progress')}
              className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-5 py-2.5 text-[13.5px] font-bold text-[#1f1f1f] transition hover:bg-amber-300"
            >
              View Progress
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 15l10-10" />
                <path d="M7 5h8v8" />
              </svg>
            </motion.button>
          </div>

          {/* "View all" right-aligned above the rail */}
          <div className="flex items-center justify-end px-6 pt-5">
            <button
              type="button"
              className="text-[13px] font-medium text-white/85 transition hover:text-white"
            >
              View all
            </button>
          </div>

          {/* Horizontal week carousel — INSIDE the brown card */}
          <div className="no-scrollbar mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-7">
            {list.map((w, i) => (
              <WeekCard
                key={w.id}
                week={w}
                index={i}
                onOpen={() => navigate(`/student/mindlab/week/${w.id}`)}
              />
            ))}
          </div>

          {/* Empty state */}
          {list.length === 0 && (
            <p className="px-6 pb-7 text-center text-[13px] text-white/55">
              No weeks match "{search}"
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Week tile ─── */

function WeekCard({ week, index, onOpen }) {
  const amber = week.tone === 'amber';
  const accent = amber ? '#1a1a1a' : '#f5b30c';

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.06, duration: 0.4 }}
      className="relative flex h-[280px] w-[150px] shrink-0 snap-start flex-col rounded-[24px] p-5 text-left shadow-md shadow-black/30"
      style={{
        backgroundColor: amber ? '#f5b30c' : '#ffffff',
      }}
    >
      {/* WEEK label + number stacked */}
      <div>
        <p
          className="text-[18px] font-extrabold leading-none"
          style={{ color: accent }}
        >
          WEEK
        </p>
        <p
          className="mt-0.5 text-[22px] font-extrabold leading-none"
          style={{ color: accent }}
        >
          {week.number}
        </p>
      </div>

      {/* Title block (with intentional line breaks) */}
      <p className="mt-4 whitespace-pre-line text-[15px] font-bold leading-snug text-[#1a1a1a]">
        {week.title}
      </p>
    </motion.button>
  );
}

/* ─── Inline icon ─── */

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 text-white/55" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="6" />
      <path d="m14 14 4 4" />
    </svg>
  );
}
