import { useNavigate } from 'react-router-dom';
import { TeacherDock } from '../../components/TeacherDock';

export function TeacherAlerts() {
  const navigate = useNavigate();

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-x-hidden bg-[#f8f9fb] font-sans pb-[100px]">
      
      {/* ───── Header ───── */}
      <div className="flex items-center gap-3 px-6 pt-safe pt-8">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-[#1f1f1f] hover:opacity-70">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <h1 className="text-[20px] font-extrabold text-[#1f1f1f] leading-tight">Insights & Alerts</h1>
      </div>
      <p className="px-6 text-[11px] font-bold text-gray-500 mt-2 tracking-wide">
        AI-powered behavioral intelligence
      </p>

      {/* ───── Priority Students Card ───── */}
      <div className="mx-6 mt-6 rounded-[24px] bg-[#f8e1e1] p-5 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[14.5px] font-extrabold text-[#f43f5e]">Priority Students</h3>
          <span className="bg-white text-[#f43f5e] text-[10px] font-extrabold px-3 py-1 rounded-full shadow-sm">
            3 Flagged
          </span>
        </div>
        
        <div className="flex flex-col gap-4">
          <PriorityItem initials="RS" name="Rohan Sharma" desc="Stress spike • 3 days streak" />
          <PriorityItem initials="NK" name="Nadia Khan" desc="Inactive 4 days - low mood" />
          <PriorityItem initials="MR" name="Mihail Rajan" desc="Reflection dropped - 6 days" />
        </div>
      </div>

      {/* ───── AI Behavioral Insights ───── */}
      <div className="mx-6 mt-6">
        <h3 className="text-[14.5px] font-extrabold text-[#1f1f1f] mb-4">AI Behavioral Insights</h3>
        <div className="flex flex-col gap-3">
          <InsightCard 
            bg="bg-[#f8e1e1]" 
            textColor="text-[#f43f5e]" 
            icon="🚨" 
            content="Stress spike pattern detected in Class 10A — 7 students showed elevated anxiety this week. May correlate with upcoming exam period." 
          />
          <InsightCard 
            bg="bg-[#fef3c7]" 
            textColor="text-[#d97706]" 
            icon="⚠️" 
            content="Reflection completion dropped 14% school-wide this week. Sending a gentle reminder nudge may improve engagement." 
          />
          <InsightCard 
            bg="bg-[#e6f4ea]" 
            textColor="text-[#059669]" 
            icon="🌱" 
            content="Ananya S. has shown consistent improvement in emotional regulation over 14 days — a great moment to celebrate with her." 
          />
        </div>
      </div>

      {/* ───── All Alerts ───── */}
      <div className="mx-6 mt-6 mb-4">
        <h3 className="text-[14.5px] font-extrabold text-[#1f1f1f] mb-4">All Alerts</h3>
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
            icon={<UpIcon color="#10b981" />}
            iconBg="bg-[#ecfdf5]"
            title="Ananya S. — Notable growth"
            desc="Wellness score improved by 18 pts in 2 weeks"
            time="Yesterday"
          />
        </div>
      </div>

      <TeacherDock />
    </section>
  );
}

function PriorityItem({ initials, name, desc }) {
  return (
    <div className="flex items-center justify-between cursor-pointer group">
      <div className="flex items-center gap-3">
        <div className="grid size-9 place-items-center rounded-full bg-[#fca5a5] shrink-0">
          <span className="text-[12px] font-extrabold text-[#9f1239]">{initials}</span>
        </div>
        <div className="flex flex-col">
          <h4 className="text-[12.5px] font-extrabold text-[#1f1f1f] group-hover:underline">{name}</h4>
          <p className="text-[10.5px] font-semibold text-gray-500 mt-0.5">{desc}</p>
        </div>
      </div>
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#f43f5e]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18l6-6-6-6" />
      </svg>
    </div>
  );
}

function InsightCard({ bg, textColor, icon, content }) {
  return (
    <div className={`w-full rounded-[16px] ${bg} p-4 flex flex-col gap-1`}>
      <span className="text-[14px] leading-none">{icon}</span>
      <p className={`text-[10.5px] font-bold ${textColor} leading-relaxed`}>{content}</p>
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
