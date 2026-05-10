import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StudentDock } from '../../components/StudentDock';

/**
 * Your Emotional Insights — opens when the chart icon in the bottom dock is
 * tapped. Pixel-faithful Figma rebuild covering:
 *
 *   • Header (back · title · bell)
 *   • Weekly Mood Trends card (label, "+12%" pill, "Mostly Calm" headline,
 *     smooth wave chart, M-T-W-T-F-S-S labels)
 *   • Encouragement pill ("You've been feeling more consistent this week…")
 *   • 2-col row: Emotion Mix donut + Journal stats
 *   • Activity Impact list (Mindfulness, Evening Walk)
 *   • Journal Snapshot card
 *   • Common Triggers pills
 *   • Growth Progress bars (Self-awareness, Resilience)
 *   • Try this today (Box Breathing, Gratitude Log)
 *   • Floating bottom dock (Insights tab active)
 */

export function Insights() {
  const navigate = useNavigate();

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#181818]">
      <div className="flex-1 overflow-y-auto pb-32">
        {/* ───── Header ───── */}
        <div className="flex items-center justify-between px-5 pt-safe pt-8">
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
          <h1 className="text-[16px] font-bold text-white">Your Emotional Insights</h1>
          <button
            type="button"
            aria-label="Notifications"
            onClick={() => navigate('/student/notifications')}
            className="relative grid size-10 place-items-center rounded-full bg-white/[0.06] text-white/85 transition hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.7 21a2 2 0 0 1-3.4 0" />
            </svg>
          </button>
        </div>

        {/* ───── Weekly Mood Trends card ───── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-5 mt-6 rounded-[24px] border border-white/10 bg-transparent p-5"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-semibold tracking-wide text-white/55">
                Weekly Mood Trends
              </p>
              <h2 className="mt-1 text-[24px] font-bold leading-tight text-white">Mostly Calm</h2>
            </div>
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white">
              +12%
            </span>
          </div>

          {/* Wave chart */}
          <div className="mt-5 relative">
            <svg viewBox="0 0 320 120" className="w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="waveStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stopColor="#ffffff" />
                  <stop offset="50%"  stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
                <linearGradient id="waveFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
              </defs>
              
              {/* Fill under wave */}
              <motion.path
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                d="M 0,75 C 20,75 50,85 70,85 C 90,85 100,45 130,45 C 160,45 170,90 200,90 C 230,90 240,25 270,25 C 290,25 310,50 320,75 L 320,120 L 0,120 Z"
                fill="url(#waveFill)"
              />
              
              {/* Wave line */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                d="M 0,75 C 20,75 50,85 70,85 C 90,85 100,45 130,45 C 160,45 170,90 200,90 C 230,90 240,25 270,25 C 290,25 310,50 320,75"
                fill="none"
                stroke="url(#waveStroke)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* peak dots */}
              <circle cx="100" cy="59" r="3.5" fill="#ffffff" />
              <circle cx="230" cy="58" r="3.5" fill="#ffffff" />
              <circle cx="270" cy="25" r="3.5" fill="#ffffff" />
            </svg>
            <div className="absolute bottom-2 left-0 right-0 flex justify-between px-2 text-[11px] font-bold text-white">
              {['M','T','W','T','F','S','S'].map((d, i) => (
                <span key={i}>{d}</span>
              ))}
            </div>
          </div>

          {/* Encouragement box */}
          <div className="mt-5 flex items-start gap-3 rounded-2xl bg-[#1d3331] p-4">
            <span className="shrink-0 text-white mt-0.5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l1.912 5.813a2 2 0 001.272 1.272L21 12l-5.813 1.912a2 2 0 00-1.272 1.272L12 21l-1.912-5.813a2 2 0 00-1.272-1.272L3 12l5.813-1.912a2 2 0 001.272-1.272L12 3z" fill="white"/>
                <path d="M5 3l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" fill="white"/>
              </svg>
            </span>
            <p className="text-[13px] leading-relaxed text-white">
              You've been feeling more consistent this week. Your calm mornings are helping you stay focused!
            </p>
          </div>
        </motion.div>

        {/* ───── Emotion Mix + Journal row ───── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.4 }}
          className="mx-5 mt-4 grid grid-cols-2 gap-3"
        >
          {/* Emotion Mix donut */}
          <div className="rounded-[24px] border border-white/10 bg-transparent p-5">
            <p className="text-[12px] font-semibold tracking-wide text-white/55">Emotion Mix</p>
            <div className="mt-4 flex justify-center">
              <DonutChart calm={45} excited={25} />
            </div>
            <ul className="mt-6 space-y-1.5 text-[11px] font-bold">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-white" />
                <span className="text-white">Calm 45%</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#a78bfa]" />
                <span className="text-white">Excited 25%</span>
              </li>
            </ul>
          </div>

          {/* Journal stats */}
          <div className="rounded-[24px] border border-white/10 bg-transparent p-5">
            <div className="flex items-center gap-2">
              <span className="text-white">
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 4h12a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V4z" />
                  <path d="M9 8h6M9 12h6" />
                </svg>
              </span>
              <p className="text-[14px] font-bold text-white">Journal</p>
            </div>
            <p className="mt-1 text-[12px] font-bold text-white">4 entries</p>
            <p className="mt-6 text-[42px] font-bold leading-none text-[#06b6d4]">65%</p>
            <p className="mt-2 text-[12px] font-bold text-[#06b6d4]">Positive tone</p>
          </div>
        </motion.div>

        {/* ───── Activity Impact ───── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.4 }}
          className="mx-5 mt-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="text-[16px]">🚀</span>
            <h3 className="text-[16px] font-bold text-white">Activity Impact</h3>
          </div>

          <ul className="flex flex-col gap-3">
            <ActivityRow Icon={LotusGlyph} label="Mindfulness" sub="Boosts Focus" delta="↑18%" iconBg="bg-[#3b2e59]" iconColor="text-[#b69df8]" />
            <ActivityRow Icon={WalkGlyph}  label="Evening Walk" sub="Reduces Stress" delta="↑12%" iconBg="bg-[#213945]" iconColor="text-[#7ac6e4]" />
          </ul>
        </motion.div>

        {/* ───── Journal Snapshot ───── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.4 }}
          className="mx-5 mt-6 rounded-[20px] border border-white/10 bg-[#352a46] p-5"
        >
          <div className="flex items-center gap-2">
            <span className="text-[#c4b5fd]">
              <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                <path d="M9 8h6M9 12h6" />
              </svg>
            </span>
            <p className="text-[15px] font-bold text-white">Journal Snapshot</p>
          </div>
          <p className="mt-2.5 text-[12.5px] leading-relaxed text-white/75">
            "You mentioned 'school' 15 times this week. Most entries were written after 9 PM.
            Consider trying a brain-dump earlier in the day to improve sleep."
          </p>
        </motion.div>

        {/* ───── Common Triggers ───── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.4 }}
          className="mx-5 mt-6"
        >
          <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-white/55">
            Common Triggers
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <TriggerPill color="rose" label="School Workload" />
            <TriggerPill color="amber" label="Lack of Sleep"  />
            <TriggerPill color="indigo" label="Social Time" />
            <TriggerPill color="cyan"   label="Creative Arts" />
          </div>
        </motion.div>

        {/* ───── Growth Progress ───── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mx-5 mt-6 rounded-[20px] bg-[#262626] p-4"
        >
          <p className="text-[13px] font-bold text-white">Growth Progress</p>
          <ProgressBar label="Self-awareness" value={72} color="#ffffff" delay={0.55} />
          <ProgressBar label="Resilience"     value={45} color="#a78bfa" delay={0.65} />
        </motion.div>

        {/* ───── Try this today ───── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.4 }}
          className="mx-5 mt-6"
        >
          <p className="text-[13px] font-bold text-white">Try this today</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <SuggestionCard
              Icon={LeafGlyph}
              tint="bg-emerald-500/15 text-emerald-300"
              title="Box Breathing"
              sub="2 min · Quick Calm"
            />
            <SuggestionCard
              Icon={NoteGlyph}
              tint="bg-sky-500/15 text-sky-300"
              title="Gratitude Log"
              sub="5 min · Positivity"
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom dock */}
      <StudentDock active="chart" />
    </section>
  );
}

/* ─── donut chart ─── */

function DonutChart({ calm = 45, excited = 25 }) {
  const C = 2 * Math.PI * 38; // circumference at r=38
  const seg1 = (calm / 100) * C;
  const seg2 = (excited / 100) * C;
  return (
    <svg viewBox="0 0 100 100" width="92" height="92" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="calmGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a5f3fc" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="exciteGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>

      {/* track */}
      <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />

      {/* calm segment */}
      <motion.circle
        cx="50" cy="50" r="38" fill="none"
        stroke="url(#calmGrad)" strokeWidth="9" strokeLinecap="round"
        strokeDasharray={`${seg1} ${C}`}
        transform="rotate(-90 50 50)"
        initial={{ strokeDashoffset: C }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      />

      {/* excited segment, offset by calm */}
      <motion.circle
        cx="50" cy="50" r="38" fill="none"
        stroke="url(#exciteGrad)" strokeWidth="9" strokeLinecap="round"
        strokeDasharray={`${seg2} ${C}`}
        strokeDashoffset={-seg1}
        transform="rotate(-90 50 50)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.4 }}
      />

      {/* tiny smiley at centre */}
      <circle cx="50" cy="50" r="14" fill="none" stroke="#ffffff" strokeWidth="1.5" />
      <circle cx="46" cy="47.5" r="1.5" fill="#ffffff" />
      <circle cx="54" cy="47.5" r="1.5" fill="#ffffff" />
      <path d="M45 52 Q 50 57 55 52" stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ─── activity row ─── */

function ActivityRow({ Icon, label, sub, delta, iconBg = 'bg-violet-500/15', iconColor = 'text-violet-300' }) {
  return (
    <li className="flex items-center gap-4 rounded-[20px] border border-white/10 bg-transparent px-4 py-3.5">
      <span className={`grid size-11 place-items-center rounded-full ${iconBg} ${iconColor}`}>
        <Icon />
      </span>
      <div className="flex-1">
        <p className="text-[14px] font-bold text-white">{label}</p>
        <p className="mt-0.5 text-[12px] font-medium text-white/55">{sub}</p>
      </div>
      <span className="text-[14px] font-bold text-white">{delta}</span>
    </li>
  );
}

/* ─── trigger pill ─── */

const TRIGGER_TONES = {
  rose:   { bg: 'bg-rose-500/15',   text: 'text-rose-300' },
  amber:  { bg: 'bg-amber-500/15',  text: 'text-amber-300' },
  indigo: { bg: 'bg-indigo-500/15', text: 'text-indigo-300' },
  cyan:   { bg: 'bg-cyan-500/15',   text: 'text-cyan-300' },
};

function TriggerPill({ color = 'rose', label }) {
  const t = TRIGGER_TONES[color] || TRIGGER_TONES.rose;
  return (
    <span className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold ${t.bg} ${t.text}`}>
      {label}
    </span>
  );
}

/* ─── progress bar ─── */

function ProgressBar({ label, value, color, delay = 0 }) {
  return (
    <div className="mt-3">
      <div className="flex justify-between text-[12px]">
        <span className="text-white/70">{label}</span>
        <span className="font-semibold" style={{ color }}>{value}%</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/8">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ delay, duration: 0.7, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

/* ─── suggestion card ─── */

function SuggestionCard({ Icon, tint, title, sub }) {
  return (
    <button
      type="button"
      className="flex flex-col items-start gap-2.5 rounded-[18px] bg-[#262626] p-4 text-left transition hover:bg-[#2c2c2c]"
    >
      <span className={`grid size-9 place-items-center rounded-full ${tint}`}>
        <Icon />
      </span>
      <div>
        <p className="text-[13.5px] font-bold text-white">{title}</p>
        <p className="mt-0.5 text-[11px] text-white/50">{sub}</p>
      </div>
    </button>
  );
}

/* ─── tiny inline glyphs ─── */

function LotusGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="2" />
      <path d="M6 18c0-3 2.7-6 6-6s6 3 6 6" />
      <path d="M3 18h18" />
    </svg>
  );
}
function WalkGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13" cy="4" r="2" />
      <path d="M9 21l3-7 3 4 3 1" />
      <path d="M9 13l3-2 4 4" />
    </svg>
  );
}
function LeafGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 19c0-9 7-14 16-14 0 9-5 14-14 14H5z" />
      <path d="M5 19c4-5 7-7 11-9" />
    </svg>
  );
}
function NoteGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </svg>
  );
}
