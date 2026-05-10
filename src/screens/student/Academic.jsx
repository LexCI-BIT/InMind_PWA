import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Academic — student's "Academic" focus dashboard.
 *
 * Layout per Figma:
 *   • Segmented tab toggle (Academic | Non-Academic)
 *   • Card with search icon + "ACADEMICS" header + "CHANGE FOCUS" pill
 *   • "Exam Reference Materials" gradient card with 8 icon tiles (4×2)
 *   • Two gradient pill cards: Skill Education Module, Science Exhibition
 *
 * Switching to "Non-Academic" jumps to /student/home; CHANGE FOCUS goes back
 * to /student/focus.
 */

const TILES = [
  { id: 'circulars', label: 'Examination\nCirculars', Icon: DocIcon       },
  { id: 'bylaws',    label: 'Examination\nBylaws',    Icon: ScalesIcon    },
  { id: 'subjects',  label: 'Subjects\nOffered',      Icon: NotebookIcon  },
  { id: 'curr',      label: 'Curriculum',             Icon: ListIcon      },
  { id: 'samples',   label: 'Sample\nQuestion Papers', Icon: QPaperIcon   },
  { id: 'qbank',     label: 'Question\nBank',         Icon: BankIcon      },
  { id: 'answers',   label: 'Model\nAnswers',         Icon: BadgeIcon     },
  { id: 'stats',     label: 'Examination\nStatistics', Icon: ChartIcon    },
];

export function Academic() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('academic');

  const handleTab = (next) => {
    setTab(next);
    if (next === 'non-academic') navigate('/student/home');
  };

  return (
    <section
      className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col"
      style={{ backgroundColor: '#f7f3ee', fontFamily: "'Poppins', sans-serif" }}
    >
      {/* ───── Segmented tabs ───── */}
      <div className="px-6 pt-safe pt-6">
        <div className="mx-auto flex w-full max-w-[280px] rounded-full bg-white p-1 shadow-sm ring-1 ring-black/5">
          {[
            { id: 'academic',     label: 'Academic'     },
            { id: 'non-academic', label: 'Non-Academic' },
          ].map(({ id, label }) => {
            const on = tab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => handleTab(id)}
                className={[
                  'flex-1 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors',
                  on ? 'bg-white text-[#3b82f6] shadow-sm ring-1 ring-black/5' : 'text-[#6b6660]',
                ].join(' ')}
                aria-pressed={on}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ───── Main scroll ───── */}
      <div className="flex-1 overflow-y-auto px-5 pb-safe pb-8 pt-5">
        {/* Header card with search + ACADEMICS title + CHANGE FOCUS */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5"
        >
          <div className="flex items-center justify-between">
            <button
              type="button"
              aria-label="Search"
              className="grid size-9 place-items-center rounded-full bg-[#f1ece5] text-[#6b6660]"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="9" r="6" />
                <path d="m14 14 4 4" />
              </svg>
            </button>
            <h2 className="text-[14px] font-extrabold tracking-[0.18em] text-[#111]">ACADEMICS</h2>
            <span className="size-9" aria-hidden="true" />
          </div>

          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/student/focus')}
              className="rounded-full bg-[#fde0d4] px-3.5 py-1 text-[10.5px] font-bold uppercase tracking-wider text-[#e25b3b] transition hover:bg-[#fcd0bf]"
            >
              Change Focus
            </button>
          </div>

          <h3 className="mt-5 text-[18px] font-bold text-[#111]">Exam Reference Materials</h3>

          {/* 8-tile gradient card */}
          <div
            className="mt-4 rounded-3xl p-4"
            style={{
              background:
                'linear-gradient(135deg, #2563eb 0%, #38bdf8 55%, #34d399 100%)',
            }}
          >
            <div className="grid grid-cols-4 gap-3">
              {TILES.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  className="flex flex-col items-center gap-1.5 text-center text-white transition hover:opacity-90 focus:outline-none"
                >
                  <span className="grid size-11 place-items-center rounded-full bg-white/20 backdrop-blur-sm">
                    <Icon />
                  </span>
                  <span className="whitespace-pre-line text-[9.5px] font-medium leading-tight text-white/95">
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Skill Education Module */}
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.4 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 flex w-full items-center justify-between rounded-2xl px-5 py-4 text-left text-white shadow-md"
          style={{ background: 'linear-gradient(135deg, #2563eb, #38bdf8)' }}
        >
          <span className="text-[15.5px] font-bold">Skill Education Module</span>
          <ChevronRightIcon />
        </motion.button>

        {/* Science Exhibition */}
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.4 }}
          whileTap={{ scale: 0.98 }}
          className="mt-3 flex w-full items-center justify-between rounded-2xl px-5 py-4 text-left text-white shadow-md"
          style={{ background: 'linear-gradient(135deg, #38bdf8, #0891b2)' }}
        >
          <span className="text-[15.5px] font-bold">Science Exhibition</span>
          <ChevronRightIcon />
        </motion.button>
      </div>
    </section>
  );
}

/* ─── Tile icons ─── */

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h6" />
    </svg>
  );
}
function ScalesIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18" />
      <path d="M5 8h14" />
      <path d="M5 8l-2 6c0 1.5 1 3 3 3s3-1.5 3-3l-2-6" />
      <path d="M19 8l-2 6c0 1.5 1 3 3 3s3-1.5 3-3l-2-6" transform="translate(-3 0)" />
    </svg>
  );
}
function NotebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 7h6M9 11h6M9 15h4" />
    </svg>
  );
}
function ListIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 9h2M8 13h2M8 17h2" />
      <path d="M13 9h4M13 13h4M13 17h3" />
    </svg>
  );
}
function QPaperIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M10 8a2 2 0 1 1 2 2v1" />
      <path d="M12 14h.01" />
    </svg>
  );
}
function BankIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 14h6" />
    </svg>
  );
}
function BadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="11" r="6" />
      <path d="m9 11 2 2 4-4" />
      <path d="m9 17-2 4 5-2 5 2-2-4" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="13" width="3.5" height="7" rx="1" />
      <rect x="10.25" y="9" width="3.5" height="11" rx="1" />
      <rect x="16.5" y="5" width="3.5" height="15" rx="1" />
    </svg>
  );
}
function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 4l6 6-6 6" />
    </svg>
  );
}
