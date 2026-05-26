import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TeacherDock } from '../../components/TeacherDock';

export function TeacherHome() {
  const navigate = useNavigate();
  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-x-hidden bg-[#f8f9fb] font-sans pb-[100px]">
      
      {/* ───── Header ───── */}
      <div className="flex items-center justify-between px-6 pt-safe pt-8">
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-full bg-cover bg-center shadow-sm" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=47")' }} />
          <div className="flex flex-col">
            <h2 className="text-[12px] font-semibold text-gray-500 leading-tight">Good Morning, Ms Sarah</h2>
            <h1 className="text-[20px] font-extrabold text-[#1f1f1f] mt-0.5 leading-tight">School Overview</h1>
          </div>
        </div>
        <button onClick={() => navigate('/teacher/alerts')} className="relative grid size-11 place-items-center rounded-full bg-[#7c3aed] text-white shadow-md shadow-purple-500/20 hover:bg-[#6d28d9] transition">
          <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
          </svg>
          <span className="absolute right-0 top-0 size-[12px] rounded-full bg-[#ef4444] border-[2.5px] border-[#f8f9fb]" />
        </button>
      </div>

      {/* ───── School Wellness Score Card ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-6 mt-6 rounded-[24px] bg-[#005086] p-6 relative overflow-hidden shadow-lg"
      >
        {/* Decorative Circles */}
        <div className="absolute -top-12 -right-4 w-48 h-48 bg-[#005a96] rounded-full opacity-50" />
        <div className="absolute -bottom-16 -right-12 w-48 h-48 bg-[#006bb3] rounded-full opacity-80" />

        <div className="relative z-10">
          <p className="text-[11.5px] font-bold text-white tracking-wide">
            Today-<span className="text-[#eab308]">Thursday, 22nd may</span>
          </p>
          <p className="text-[10px] font-extrabold text-white/70 mt-3 uppercase tracking-wider">
            School Wellness Score
          </p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-[44px] font-black text-white leading-none">74</span>
            <span className="text-[20px] font-bold text-white/80">/100</span>
          </div>
          <p className="text-[10px] font-semibold text-white/80 mt-4">
            Based on 312 active student profiles
          </p>
        </div>
      </motion.div>

      {/* ───── 4 Metric Cards Grid ───── */}
      <div className="mx-6 mt-5 grid grid-cols-2 gap-3">
        {/* Card 1 */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100 flex flex-col justify-between">
          <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Active Students</p>
          <div className="mt-2 flex items-baseline gap-0.5">
            <span className="text-[20px] font-black text-[#1f1f1f]">312</span>
            <span className="text-[12px] font-bold text-gray-500">/320</span>
          </div>
          <div className="mt-3 w-fit bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
            <svg viewBox="0 0 24 24" className="h-3 w-3 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            <span className="text-[10px] font-extrabold text-emerald-600">91.7%</span>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100 flex flex-col justify-between">
          <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Session Participation</p>
          <div className="mt-2">
            <span className="text-[20px] font-black text-[#1f1f1f]">78%</span>
          </div>
          <div className="mt-3 w-fit bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
            <svg viewBox="0 0 24 24" className="h-3 w-3 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            <span className="text-[10px] font-extrabold text-emerald-600">+4% MoM</span>
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100 flex flex-col justify-between">
          <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Reflection Completion</p>
          <div className="mt-2">
            <span className="text-[20px] font-black text-[#1f1f1f]">65%</span>
          </div>
          <div className="mt-3 w-fit bg-rose-50 px-2 py-0.5 rounded flex items-center gap-1">
            <svg viewBox="0 0 24 24" className="h-3 w-3 text-rose-500" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
            <span className="text-[10px] font-extrabold text-rose-600">-2% MoM</span>
          </div>
        </motion.div>

        {/* Card 4 (Red) */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-[#fff1f2] rounded-[20px] p-4 shadow-sm border border-red-50 flex flex-col justify-between">
          <p className="text-[10px] font-extrabold text-[#ef4444] uppercase tracking-wider">Needs Attention</p>
          <div className="mt-2">
            <span className="text-[24px] font-black text-[#991b1b]">23</span>
          </div>
          <div className="mt-2">
            <span className="text-[11px] font-bold text-[#ef4444]">Students Flagged</span>
          </div>
        </motion.div>
      </div>

      {/* ───── Emotional Stability Trend ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="mx-6 mt-5 bg-white rounded-[24px] p-5 shadow-sm border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[15px] font-bold text-[#1f1f1f]">Emotional Stability Trend</h3>
          <div className="flex items-center gap-1 bg-gray-50 rounded-full p-1 border border-gray-100">
            <button className="px-3 py-1 rounded-full bg-[#1e40af] text-white text-[10px] font-bold shadow-sm">7D</button>
            <button className="px-3 py-1 rounded-full text-gray-500 text-[10px] font-bold">30D</button>
          </div>
        </div>

        {/* SVG Line Chart */}
        <div className="w-full h-[60px] relative mt-2">
          <svg viewBox="0 0 300 60" className="w-full h-full overflow-visible">
            {/* The Line */}
            <path d="M 15 50 L 60 40 L 105 45 L 150 30 L 195 20 L 240 40 L 285 10" fill="none" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* The Points */}
            <circle cx="15" cy="50" r="3.5" fill="#10b981" />
            <circle cx="60" cy="40" r="3.5" fill="#ef4444" />
            <circle cx="105" cy="45" r="3.5" fill="#10b981" />
            <circle cx="150" cy="30" r="3.5" fill="#eab308" />
            <circle cx="195" cy="20" r="3.5" fill="#10b981" />
            <circle cx="240" cy="40" r="3.5" fill="#ef4444" />
            <circle cx="285" cy="10" r="3.5" fill="#10b981" />
          </svg>
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between mt-3 text-[10.5px] font-bold text-gray-400 px-1">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>

        <div className="mt-5 flex justify-between items-center px-1">
          <p className="text-[11.5px] font-bold text-gray-500">Avg Stability: <span className="text-[#0284c7]">72/100</span></p>
          <p className="text-[11.5px] font-bold text-[#10b981]">Improving</p>
        </div>
      </motion.div>

      {/* ───── Mood Distribution Today ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        className="mx-6 mt-5 bg-white rounded-[24px] p-5 shadow-sm border border-gray-100"
      >
        <h3 className="text-[15px] font-bold text-[#1f1f1f] mb-6">Mood Distribution Today</h3>
        
        <div className="flex items-end justify-between px-2 h-[80px]">
          {/* Bar Chart (5 Bars) */}
          <div className="flex items-end gap-[18px] h-full flex-1">
            <div className="w-[18px] h-[55%] bg-[#10b981] rounded-t-[6px]" /> {/* Happy */}
            <div className="w-[18px] h-[95%] bg-[#0284c7] rounded-t-[6px]" /> {/* Calm */}
            <div className="w-[18px] h-[40%] bg-[#eab308] rounded-t-[6px]" /> {/* Anxious */}
            <div className="w-[18px] h-[25%] bg-[#cbd5e1] rounded-t-[6px]" /> {/* Sad */}
            <div className="w-[18px] h-[35%] bg-[#ef4444] rounded-t-[6px]" /> {/* Stress */}
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-2 shrink-0 ml-4 pb-1">
            <LegendItem color="#10b981" label="Happy" w="w-8" />
            <LegendItem color="#0284c7" label="Calm" w="w-12" />
            <LegendItem color="#eab308" label="Anxious" w="w-5" />
            <LegendItem color="#cbd5e1" label="Sad" w="w-3" />
            <LegendItem color="#ef4444" label="Stress" w="w-4" />
          </div>
        </div>

        <p className="text-[11.5px] font-extrabold text-[#1f1f1f] mt-6 px-1">
          Total 43% calm
        </p>
      </motion.div>

      {/* ───── Recent Alerts ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="mx-6 mt-6 flex-1"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[16px] font-bold text-[#1f1f1f]">Recent Alerts</h3>
          <button className="text-[11.5px] font-extrabold text-[#0284c7] tracking-wide hover:underline">View all</button>
        </div>
        
        <div className="flex flex-col gap-3">
          <AlertCard 
            icon={<WarningIcon color="#ef4444" />}
            iconBg="bg-[#fef2f2]"
            title="Rohan.M - Stress Spike Detected"
            desc="3 consecutive high-stress check-ins, reflection skipped"
            time="2 hours ago"
          />
          <AlertCard 
            icon={<PauseIcon color="#eab308" />}
            iconBg="bg-[#fefce8]"
            title="Class 10A — Low participation"
            desc="Session attendance dropped to 48% this week"
            time="Today"
          />
          <AlertCard 
            icon={<UpIcon color="#ef4444" />}
            iconBg="bg-[#fef2f2]"
            title="Ananya S. — Notable growth"
            desc="Wellness score improved by 18 pts in 2 weeks"
            time="Yesterday"
          />
        </div>
      </motion.div>

      {/* ───── Needs Attention ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}
        className="mx-6 mt-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[16px] font-bold text-[#1f1f1f]">Needs Attention</h3>
          <button onClick={() => navigate('/teacher/priority-students')} className="text-[11.5px] font-extrabold text-[#0284c7] tracking-wide hover:underline">View All</button>
        </div>
        
        <div className="flex flex-col gap-3">
          <NeedsAttentionCard 
            iconType="danger"
            name="Rohan Sharma"
            desc="Stress trend · 3-day streak"
            badgeLabel="High"
            badgeColor="bg-red-200 text-red-600"
          />
          <NeedsAttentionCard 
            iconType="warning"
            name="Preethi Kumar"
            desc="Reflection drop · 5 days"
            badgeLabel="Watch"
            badgeColor="bg-amber-100 text-amber-600"
          />
          <NeedsAttentionCard 
            iconType="danger"
            name="Arjun Verma"
            desc="Low participation · 2 weeks"
            badgeLabel="Watch"
            badgeColor="bg-amber-100 text-amber-600"
          />
        </div>
      </motion.div>

      {/* ───── Start Quiz Session CTA ───── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="mx-6 mt-8"
      >
        <button
          onClick={() => navigate('/teacher/sessions')}
          className="w-full py-5 rounded-[20px] bg-[#0369a1] text-white text-[18px] font-bold shadow-lg hover:bg-[#075985] transition-all active:scale-[0.98]"
        >
          Start Quiz Session →
        </button>
      </motion.div>

      <TeacherDock active="home" />
    </section>
  );
}

function LegendItem({ color, label, w }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5 w-[50px]">
        <span className="size-1.5 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-[10px] font-bold text-gray-600">{label}</span>
      </div>
      <div className="w-[45px] h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full ${w} rounded-full`} style={{ backgroundColor: color }} />
      </div>
    </div>
  );
}

function AlertCard({ icon, iconBg, title, desc, time }) {
  return (
    <div className="w-full bg-white rounded-[16px] p-4 flex items-start gap-3 shadow-sm border border-gray-100">
      <div className={`grid size-8 place-items-center rounded-[8px] ${iconBg} shrink-0 mt-0.5`}>
        {icon}
      </div>
      <div className="flex flex-col flex-1">
        <h4 className="text-[11.5px] font-extrabold text-[#1f1f1f] leading-snug">{title}</h4>
        <p className="text-[10px] font-semibold text-gray-400 mt-1 leading-snug">{desc}</p>
        <span className="text-[9px] font-bold text-gray-400 mt-3">{time}</span>
      </div>
    </div>
  );
}

function WarningIcon({ color }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function PauseIcon({ color }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}

function UpIcon({ color }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <path d="M12 16L12 9" />
      <path d="M9 12L12 9L15 12" />
    </svg>
  );
}

function NeedsAttentionCard({ iconType, name, desc, badgeLabel, badgeColor }) {
  const icon = iconType === 'danger' ? (
    <div className="grid size-9 place-items-center rounded-[10px] bg-[#fecaca] shrink-0">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    </div>
  ) : (
    <div className="grid size-9 place-items-center rounded-[10px] bg-[#fef08a] shrink-0">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    </div>
  );

  return (
    <div className="w-full bg-white rounded-[24px] p-4 flex items-center justify-between shadow-sm border border-gray-100">
      <div className="flex items-center gap-4">
        {icon}
        <div className="flex flex-col">
          <h4 className="text-[14px] font-extrabold text-[#1f1f1f]">{name}</h4>
          <p className="text-[11px] font-medium text-gray-500">{desc}</p>
        </div>
      </div>
      <div className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold ${badgeColor}`}>
        {badgeLabel}
      </div>
    </div>
  );
}
