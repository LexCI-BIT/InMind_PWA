import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * WeekDetail — shows activities for a specific week module.
 * Activities have 3 states: completed (green check), active (amber play), locked (gray lock).
 */

const WEEKS_DATA = {
  1: { number: '01', title: 'Clarity & Confidence', titleColor: '#f59e0b' },
  2: { number: '02', title: 'Leadership', titleColor: '#ffffff' },
  3: { number: '03', title: 'Leadership', titleColor: '#f59e0b' },
  4: { number: '04', title: 'Emotional Intelligence', titleColor: '#ffffff' },
  5: { number: '05', title: 'Growth Mindset', titleColor: '#f59e0b' },
  6: { number: '06', title: 'Resilience', titleColor: '#ffffff' },
};

const ACTIVITIES = [
  {
    id: 1,
    day: 'MONDAY',
    duration: '15 mins',
    title: 'Mindset Audit',
    description: 'Activity discription ...',
    status: 'completed', // 'completed' | 'active' | 'locked'
  },
  {
    id: 2,
    day: 'WEDNESDAY',
    duration: '15 mins',
    title: 'Core Values',
    description: 'Activity discription ...',
    status: 'active',
  },
  {
    id: 3,
    day: 'FRIDAY',
    duration: '15 mins',
    title: 'Vision Casting',
    description: 'Activity discription ...',
    status: 'locked',
  },
  {
    id: 4,
    day: 'FRIDAY',
    duration: '15 mins',
    title: 'Fear Setting',
    description: 'Activity discription ...',
    status: 'locked',
  },
];

function StatusIcon({ status }) {
  if (status === 'completed') {
    return (
      <div className="size-10 rounded-full bg-[#22c55e] grid place-items-center shadow-sm">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    );
  }
  if (status === 'active') {
    return (
      <div className="size-10 rounded-full bg-[#f59e0b] grid place-items-center shadow-sm">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    );
  }
  // locked
  return (
    <div className="size-10 rounded-full bg-[#3a3a3a] grid place-items-center">
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 text-white/50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    </div>
  );
}

export function WeekDetail() {
  const navigate = useNavigate();
  const { weekId } = useParams();
  const week = WEEKS_DATA[weekId] || WEEKS_DATA[1];

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#1a1a1a] font-sans pb-10">
      {/* Background blobs */}
      <div className="absolute top-32 -right-16 size-48 rounded-full bg-[#3d2c2c] blur-[70px] opacity-50 pointer-events-none" />
      <div className="absolute top-[60%] -left-20 size-56 rounded-full bg-[#2c2d3e] blur-[60px] opacity-40 pointer-events-none" />

      {/* ───── Header ───── */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-safe pt-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-white hover:opacity-80 transition"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button className="p-2 -mr-2 text-white/60 hover:text-white transition">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {/* ───── Week Title ───── */}
      <div className="relative z-10 px-6 mt-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-[18px] font-black tracking-wide"
          style={{ color: week.titleColor }}
        >
          WEEK {week.number}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.3 }}
          className="text-[28px] font-extrabold text-white leading-tight mt-1"
        >
          {week.title}
        </motion.h1>
      </div>

      {/* ───── Activity Cards ───── */}
      <div className="relative z-10 px-6 mt-8 flex flex-col gap-4">
        {ACTIVITIES.map((activity, idx) => {
          const isActive = activity.status === 'active';
          const cardBg = isActive ? '#f59e0b' : '#2a2a2a';
          const textColor = isActive ? '#1a1a1a' : '#ffffff';
          const subColor = isActive ? 'rgba(26,26,26,0.7)' : 'rgba(255,255,255,0.5)';
          const dayColor = isActive ? 'rgba(26,26,26,0.8)' : '#f59e0b';

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.35 }}
              className="rounded-[20px] p-5 flex items-center gap-4"
              style={{ background: cardBg }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold tracking-wider" style={{ color: dayColor }}>
                    {activity.day}
                  </span>
                  <span className="text-[10px] font-medium" style={{ color: subColor }}>
                    • {activity.duration}
                  </span>
                </div>
                <p className="text-[16px] font-bold mt-1.5 leading-tight" style={{ color: textColor }}>
                  {activity.title}
                </p>
                <p className="text-[12px] mt-1" style={{ color: subColor }}>
                  {activity.description}
                </p>
              </div>
              <StatusIcon status={activity.status} />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
