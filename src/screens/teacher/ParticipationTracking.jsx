import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function ParticipationTracking() {
  const navigate = useNavigate();

  // Heatmap rows
  const students = [
    { name: 'Alex',  days: ['completed', 'completed', 'completed', 'completed', 'completed'] },
    { name: 'James', days: ['completed', 'completed', 'completed', 'completed', 'missed'] },
    { name: 'Sarah', days: ['completed', 'missed', 'completed', 'missed', 'incomplete'] },
    { name: 'Alex',  days: ['completed', 'completed', 'missed', 'missed', 'completed'] },
    { name: 'Sarah', days: ['completed', 'completed', 'completed', 'completed', 'completed'] },
    { name: 'James', days: ['completed', 'completed', 'missed', 'incomplete', 'incomplete'] },
  ];

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col bg-[#f5f5f5] font-sans pb-[40px]">
      
      {/* ───── Header ───── */}
      <header className="px-6 pt-safe pt-8 pb-4 flex flex-col relative">
        {/* Back Button (hidden in mockup but we need navigation back) */}
        <button onClick={() => navigate(-1)} className="absolute top-safe mt-9 right-6 w-11 h-11 rounded-full bg-[#7c3aed] flex items-center justify-center text-white shadow-md z-10">
          <svg viewBox="0 0 24 24" className="w-[20px] h-[20px]" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
          </svg>
          <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-[#ef4444] border-[2px] border-[#f5f5f5]" />
        </button>

        <div className="flex items-center gap-2 mt-1">
          <button onClick={() => navigate(-1)} className="pr-1 text-gray-500">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <h1 className="text-[20px] font-extrabold text-[#1f1f1f] pr-[50px]">Participation Tracking</h1>
        </div>
        <p className="text-[12px] font-semibold text-gray-500 mt-1.5 ml-8">
          Track Students interaction consistency
        </p>
      </header>

      {/* ───── Heatmap Card ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
        className="mx-6 mt-4 bg-white rounded-[20px] p-5 shadow-sm border border-gray-100/60"
      >
        <h3 className="text-[14px] font-extrabold text-[#1f1f1f] mb-6">Participation Heatmap</h3>
        
        {/* Table Header */}
        <div className="grid grid-cols-[50px_1fr_1fr_1fr_1fr_1fr] gap-2 mb-4 text-center items-center">
          <div /> {/* Empty top-left */}
          <span className="text-[11px] font-bold text-[#1f1f1f]">Mon</span>
          <span className="text-[11px] font-bold text-[#1f1f1f]">Tue</span>
          <span className="text-[11px] font-bold text-[#1f1f1f]">Wed</span>
          <span className="text-[11px] font-bold text-[#1f1f1f]">Thu</span>
          <span className="text-[11px] font-bold text-[#1f1f1f]">Fri</span>
        </div>

        {/* Rows */}
        <div className="flex flex-col gap-4">
          {students.map((row, i) => (
            <div key={i} className="grid grid-cols-[50px_1fr_1fr_1fr_1fr_1fr] gap-2 items-center text-center">
              <span className="text-[11.5px] font-medium text-gray-600 text-left">{row.name}</span>
              {row.days.map((status, j) => (
                <div key={j} className="flex justify-center">
                  <div className={`h-[16px] w-full max-w-[36px] rounded-full ${getStatusColor(status)}`} />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between mt-8 px-2 border-t border-gray-50 pt-4">
          <LegendItem color="bg-[#10b981]" label="Completed" />
          <LegendItem color="bg-[#eab308]" label="Missed" />
          <LegendItem color="bg-[#ef4444]" label="Incomplete" />
        </div>
      </motion.div>

      {/* ───── Inactive Students Card ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="mx-6 mt-6 bg-white rounded-[20px] p-5 shadow-sm border border-gray-100/60"
      >
        <h3 className="text-[14px] font-extrabold text-[#1f1f1f] mb-5">Inactive Students</h3>

        <div className="flex flex-col gap-5">
          {/* Sarah */}
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-gray-600 w-[45px]">Sarah</span>
            <div className="flex-1 h-[2.5px] bg-gray-200 rounded-full mx-3 relative">
              <div className="absolute top-0 left-0 h-full w-[20%] bg-[#ef4444] rounded-full" />
            </div>
            <span className="text-[11px] font-bold text-[#1f1f1f] w-[35px] text-right">1 day</span>
            <div className="size-2.5 rounded-full bg-[#ef4444] ml-3 shrink-0" />
          </div>

          {/* James */}
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-gray-600 w-[45px]">James</span>
            <div className="flex-1 h-[2.5px] bg-gray-200 rounded-full mx-3 relative">
              <div className="absolute top-0 left-0 h-full w-[35%] bg-[#ef4444] rounded-full" />
            </div>
            <span className="text-[11px] font-bold text-[#1f1f1f] w-[35px] text-right">2 day</span>
            <div className="size-2.5 rounded-full bg-[#ef4444] ml-3 shrink-0" />
          </div>
        </div>
      </motion.div>

    </section>
  );
}

function getStatusColor(status) {
  switch (status) {
    case 'completed': return 'bg-[#10b981]';
    case 'missed': return 'bg-[#eab308]';
    case 'incomplete': return 'bg-[#ef4444]';
    default: return 'bg-gray-200';
  }
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={`size-1.5 rounded-full ${color}`} />
      <span className="text-[10px] font-semibold text-[#1f1f1f]">{label}</span>
    </div>
  );
}
