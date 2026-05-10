import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TeacherDock } from '../../components/TeacherDock';

export function QuizManager() {
  const navigate = useNavigate();

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#f5f5f5] font-sans pb-[100px]">
      
      {/* ───── Header ───── */}
      <div className="flex items-center gap-3 px-6 pt-safe pt-8">
        <div className="size-11 rounded-full bg-cover bg-center shadow-sm border border-gray-200" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=47")' }} />
        <div className="flex flex-col">
          <h1 className="text-[17px] font-bold text-[#1f1f1f] leading-tight">Hello, Sarah</h1>
          <p className="text-[11px] font-medium text-gray-500 mt-0.5">Wed, Oct 24</p>
        </div>
      </div>

      {/* ───── Quiz Info ───── */}
      <div className="px-6 mt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="grid size-9 place-items-center rounded-full bg-[#7c3aed] text-white shadow-sm hover:opacity-90">
            <svg viewBox="0 0 24 24" className="h-4 w-4 pr-0.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <div className="flex flex-col">
            <h2 className="text-[15px] font-extrabold text-[#1f1f1f]">Cellular Respiration Quiz</h2>
            <p className="text-[11px] font-medium text-gray-500 mt-0.5">Started 15 mins ago</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100">
          <div className="size-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[9px] font-extrabold text-red-500 tracking-wide">LIVE</span>
        </div>
      </div>

      {/* ───── Action Buttons ───── */}
      <div className="px-6 mt-6 flex gap-3">
        <button className="flex-1 py-3 rounded-[14px] bg-[#f59e0b] text-white text-[14px] font-bold shadow-md shadow-orange-500/20 hover:opacity-90 transition">
          Add Time
        </button>
        <button className="flex-1 py-3 rounded-[14px] bg-[#f97316] text-white text-[14px] font-bold shadow-md shadow-orange-600/20 hover:opacity-90 transition">
          End Session
        </button>
      </div>

      {/* ───── Stats ───── */}
      <div className="px-6 mt-5 flex gap-3">
        {/* Joined */}
        <div className="flex-1 bg-white rounded-[20px] p-4 border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
          <span className="bg-[#333] text-white text-[8px] font-black tracking-widest px-2 py-1 rounded-full">JOINED</span>
          <div className="mt-2.5 flex items-baseline gap-0.5">
            <span className="text-[34px] font-black text-[#1f1f1f] leading-none tracking-tight">24</span>
            <span className="text-[16px] font-bold text-[#1f1f1f]/50">/30</span>
          </div>
          {/* Progress */}
          <div className="mt-3.5 h-1.5 w-full bg-indigo-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#6366f1] w-[80%] rounded-full" />
          </div>
        </div>
        {/* Avg Accuracy */}
        <div className="flex-1 bg-white rounded-[20px] p-4 border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
          <span className="bg-[#333] text-white text-[8px] font-black tracking-widest px-2 py-1 rounded-full">AVG.ACCURACY</span>
          <div className="mt-2.5 flex items-baseline gap-0.5">
            <span className="text-[34px] font-black text-[#1f1f1f] leading-none tracking-tight">78</span>
            <span className="text-[18px] font-bold text-[#1f1f1f]/50">%</span>
          </div>
          {/* Progress */}
          <div className="mt-3.5 h-1.5 w-full bg-indigo-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#6366f1] w-[78%] rounded-full" />
          </div>
        </div>
      </div>

      {/* ───── Real-time Engagement ───── */}
      <div className="mx-6 mt-5 bg-white rounded-[24px] p-5 border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[14px] font-extrabold text-[#1f1f1f]">Real-time Engagement</h3>
          <span className="bg-[#22c55e] text-white text-[8px] font-extrabold tracking-wider px-2.5 py-1 rounded-full uppercase">High Engagement</span>
        </div>
        
        {/* Bar Chart */}
        <div className="flex items-end justify-between h-[100px] mt-4 px-1 gap-2.5">
           {[0.8, 0.4, 0.6, 0.5, 0.65, 0.5, 0.75].map((val, i) => (
             <div key={i} className="relative w-full h-full bg-gray-100 rounded-full overflow-hidden flex items-end">
               <motion.div 
                 initial={{ height: 0 }}
                 animate={{ height: `${val * 100}%` }}
                 transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                 className="w-full bg-[#7c3aed] rounded-full opacity-80" 
               />
             </div>
           ))}
        </div>
        
        {/* X Axis Labels */}
        <div className="flex justify-between mt-3 px-1 text-[8px] font-black text-gray-400 tracking-wider">
           <span>15M AGO</span>
           <span>10M AGO</span>
           <span>NOW</span>
        </div>
      </div>

      {/* ───── Student Progress ───── */}
      <div className="mx-6 mt-8 flex-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[16px] font-bold text-[#1f1f1f]">Student Progress</h3>
          <button className="text-[9px] font-extrabold uppercase text-gray-400 tracking-wider hover:text-gray-600 transition">VIEW ALL</button>
        </div>
        
        <div className="flex flex-col gap-3">
          <StudentProgressRow name="Alex johnson" score={8} />
          <StudentProgressRow name="Alex johnson" score={2} />
        </div>
      </div>

      {/* Custom Bottom Nav Dock */}
      <TeacherDock />

    </section>
  );
}

function StudentProgressRow({ name, score }) {
  return (
    <div className="w-full bg-white rounded-[20px] p-4 flex items-center justify-between border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:bg-gray-50 transition cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="grid size-11 place-items-center rounded-full bg-[#7c3aed] text-white">
          <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[14.5px] font-bold text-[#1f1f1f] capitalize">{name}</span>
          <span className="text-[10px] font-black text-gray-400 tracking-wide uppercase">Question {score}/10</span>
        </div>
      </div>
      
      {/* 10 dots progress */}
      <div className="flex gap-1.5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className={`size-[5px] rounded-full ${i < score ? 'bg-[#0d9488]' : 'bg-gray-200'}`} />
        ))}
      </div>
    </div>
  );
}
