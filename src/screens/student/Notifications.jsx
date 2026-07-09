import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { StudentDock } from '../../components/StudentDock';
import { listThoughts } from '../../lib/api';

function timeAgo(iso) {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  if (Number.isNaN(diff)) return '';
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return d < 7 ? `${d}d ago` : new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

/**
 * Notifications — Figma-faithful alerts list.
 *
 *   • Header (back chevron)
 *   • Search input (filters all sections live)
 *   • URGENT — coloured-ring card with two CTAs (Read Details · Dismiss)
 *   • TODAY  — category-icon list (calendar, book, etc.) with "Xh ago" stamps
 *   • EARLIER THIS WEEK — same shape, plus an "Add to calendar" pill
 *   • Sticky StudentDock at the bottom
 *
 *   Dismissing the urgent card hides it; "Add to calendar" toggles a small
 *   "Added" state on the row.
 */

const ICON = {
  megaphone: MegaphoneIcon,
  calendar:  CalendarIcon,
  book:      BookIcon,
};

const INITIAL_URGENT = [
  {
    id: 'u-campus',
    title: 'Campus Closure Alert',
    body: 'The campus will remain closed tomorrow, Friday Oct 27, due to maintenance',
    icon: 'megaphone',
    iconBg: '#dc2626',
  },
];

const TODAY = [
  {
    id: 't-calc',
    title: 'Calculus Assignment Due',
    body: 'The campus will remain closed tomorrow, Friday Oct 27, due to maintenance',
    time: '1h ago',
    icon: 'calendar',
    iconBg: '#16a34a',
  },
  {
    id: 't-exam',
    title: 'Exam Postpone',
    body: 'The exam has been postponed. Updated dates will be given later',
    time: '1h ago',
    icon: 'book',
    iconBg: '#3b82f6',
  },
];

const EARLIER = [
  {
    id: 'e-exam',
    title: 'Exam Postpone',
    body: 'The exam has been postponed. Updated dates will be given later',
    time: 'Oct 24',
    icon: 'megaphone',
    iconBg: '#c2410c',
    action: 'calendar',
  },
  {
    id: 'e-fair',
    title: 'Science Fair 2023',
    body: 'Join us in the Main Hall this Friday for the annual Science & innovation fair. Refreshment will be provided.',
    time: 'Oct 23',
    icon: 'calendar',
    iconBg: '#525252',
    action: 'calendar',
  },
];

export function Notifications() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [urgent, setUrgent] = useState(INITIAL_URGENT);
  const [calendared, setCalendared] = useState(new Set());
  const [thoughts, setThoughts] = useState([]);

  // Live "Share a Thought" feed from classmates (same class, any section).
  useEffect(() => {
    let active = true;
    listThoughts()
      .then((d) => active && setThoughts(Array.isArray(d) ? d : []))
      .catch(() => { /* leave empty on error */ });
    return () => { active = false; };
  }, []);

  const matches = (n) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q)
    );
  };

  const today = useMemo(() => TODAY.filter(matches), [query]);
  const earlier = useMemo(() => EARLIER.filter(matches), [query]);
  const urgentVisible = urgent.filter(matches);
  const classThoughts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return thoughts.filter((t) =>
      !q ||
      (t.content || '').toLowerCase().includes(q) ||
      (t.is_anonymous ? 'anonymous' : (t.author_name || '')).toLowerCase().includes(q),
    );
  }, [thoughts, query]);

  const dismiss = (id) => setUrgent((prev) => prev.filter((u) => u.id !== id));
  const toggleCal = (id) =>
    setCalendared((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#181818] text-white">
      <div className="flex-1 overflow-y-auto pb-32">
        {/* ───── Header ───── */}
        <div className="px-5 pt-safe pt-6">
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
        </div>

        {/* ───── Search ───── */}
        <div className="px-5 pt-4">
          <label className="flex items-center gap-3 rounded-full bg-[#262626] px-4 py-2.5">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="flex-1 bg-transparent text-[14px] text-white placeholder:text-white/40 focus:outline-none"
            />
            <SearchIcon />
          </label>
        </div>

        {/* ───── FROM YOUR CLASS (Share a Thought feed) ───── */}
        {classThoughts.length > 0 && (
          <>
            <SectionHeader label="From Your Class" />
            <ul className="mt-3 flex flex-col gap-3 px-5">
              {classThoughts.map((t) => (
                <li key={t.id} className="flex items-start gap-3 rounded-[20px] bg-[#262626] p-4">
                  <span
                    className="grid size-11 shrink-0 place-items-center rounded-2xl text-white"
                    style={{ backgroundColor: t.is_anonymous ? '#525252' : '#7c3aed' }}
                  >
                    <ThoughtIcon />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[14px] font-bold text-white">
                        {t.is_anonymous ? 'Anonymous classmate' : (t.author_name || 'Classmate')}
                      </p>
                      <span className="shrink-0 text-[11px] font-medium text-white/45">{timeAgo(t.created_at)}</span>
                    </div>
                    <p className="mt-0.5 text-[12.5px] leading-snug text-white/70">{t.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* ───── URGENT ───── */}
        {urgentVisible.length > 0 && (
          <>
            <SectionHeader label="Urgent" tone="urgent" />
            <ul className="mt-3 flex flex-col gap-3 px-5">
              <AnimatePresence initial={false}>
                {urgentVisible.map((n) => (
                  <UrgentCard
                    key={n.id}
                    n={n}
                    onDismiss={() => dismiss(n.id)}
                  />
                ))}
              </AnimatePresence>
            </ul>
          </>
        )}

        {/* ───── TODAY ───── */}
        {today.length > 0 && (
          <>
            <SectionHeader label="Today" />
            <ul className="mt-3 flex flex-col gap-3 px-5">
              {today.map((n) => (
                <Row key={n.id} n={n} />
              ))}
            </ul>
          </>
        )}

        {/* ───── EARLIER THIS WEEK ───── */}
        {earlier.length > 0 && (
          <>
            <SectionHeader label="Earlier this week" />
            <ul className="mt-3 flex flex-col gap-3 px-5">
              {earlier.map((n) => (
                <Row
                  key={n.id}
                  n={n}
                  added={calendared.has(n.id)}
                  onAddToCal={() => toggleCal(n.id)}
                />
              ))}
            </ul>
          </>
        )}

        {/* empty state */}
        {urgentVisible.length === 0 && today.length === 0 && earlier.length === 0 && classThoughts.length === 0 && (
          <div className="mt-20 px-7 text-center">
            <p className="text-[14px] text-white/55">
              {query ? `No notifications match "${query}"` : 'Nothing here yet'}
            </p>
          </div>
        )}
      </div>

      <StudentDock active="home" />
    </section>
  );
}

/* ─── section header ─── */

function SectionHeader({ label, tone }) {
  return (
    <div className="mt-6 flex items-center gap-2 px-7">
      {tone === 'urgent' && (
        <span className="size-2 rounded-full bg-red-500" aria-hidden="true" />
      )}
      <p
        className={[
          'text-[10.5px] font-bold uppercase tracking-[0.22em]',
          tone === 'urgent' ? 'text-red-500' : 'text-white/45',
        ].join(' ')}
      >
        {label}
      </p>
    </div>
  );
}

/* ─── Urgent card ─── */

function UrgentCard({ n, onDismiss }) {
  const Icon = ICON[n.icon] || MegaphoneIcon;
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className="rounded-[20px] border border-red-500/30 bg-[#2a1212] p-4 ring-1 ring-red-500/10"
    >
      <div className="flex items-start gap-3">
        <span
          className="grid size-11 shrink-0 place-items-center rounded-2xl text-white"
          style={{ backgroundColor: n.iconBg }}
        >
          <Icon />
        </span>
        <div className="flex-1">
          <p className="text-[15px] font-bold text-white">{n.title}</p>
          <p className="mt-0.5 text-[12.5px] leading-snug text-white/65">{n.body}</p>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          className="rounded-full bg-red-500 px-4 py-1.5 text-[12px] font-bold text-white transition hover:bg-red-400"
        >
          Read Details
        </button>
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-full bg-[#3a3a3a] px-4 py-1.5 text-[12px] font-bold text-white/85 transition hover:bg-[#4a4a4a]"
        >
          Dismiss
        </button>
      </div>
    </motion.li>
  );
}

/* ─── Standard row ─── */

function Row({ n, added = false, onAddToCal }) {
  const Icon = ICON[n.icon] || CalendarIcon;
  return (
    <li className="flex items-start gap-3 rounded-[20px] bg-[#262626] p-4">
      <span
        className="grid size-11 shrink-0 place-items-center rounded-2xl text-white"
        style={{ backgroundColor: n.iconBg }}
      >
        <Icon />
      </span>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[14.5px] font-bold text-white">{n.title}</p>
          {n.time && (
            <span className="shrink-0 text-[11px] font-medium text-white/45">{n.time}</span>
          )}
        </div>
        <p className="mt-0.5 text-[12.5px] leading-snug text-white/55">{n.body}</p>

        {n.action === 'calendar' && (
          <button
            type="button"
            onClick={onAddToCal}
            className={[
              'mt-3 rounded-full px-3.5 py-1.5 text-[11px] font-bold transition',
              added
                ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/30'
                : 'border border-white/15 bg-transparent text-white/85 hover:bg-white/[0.06]',
            ].join(' ')}
          >
            {added ? 'Added ✓' : 'Add to calendar'}
          </button>
        )}
      </div>
    </li>
  );
}

/* ─── Inline icons ─── */

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 text-white/45" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="6" />
      <path d="m14 14 4 4" />
    </svg>
  );
}
function MegaphoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11v2a3 3 0 0 0 3 3l2 4 3-1-1-3h3l8 4V4l-8 4H6a3 3 0 0 0-3 3z" />
    </svg>
  );
}
function ThoughtIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-9 8.34 8.5 8.5 0 0 1-3.6-.84L3 20l1.34-4A8.38 8.38 0 0 1 3.66 8 8.5 8.5 0 0 1 12 3.5a8.38 8.38 0 0 1 9 8z" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 3v4M16 3v4" />
    </svg>
  );
}
function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4z" />
      <path d="M5 17a3 3 0 0 1 3-3h11" />
    </svg>
  );
}
