import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TeacherDock } from '../../components/TeacherDock';

export function QuizSessions() {
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

      {/* ───── Title ───── */}
      <div className="px-6 mt-6 flex items-center relative">
        <h2 className="text-[28px] font-extrabold text-[#1f1f1f] tracking-tight">Quiz Sessions</h2>
        {/* Tiny sparkle icon */}
        <svg viewBox="0 0 24 24" className="absolute top-[-5px] left-[135px] h-3.5 w-3.5 text-[#4ade80]" fill="currentColor">
          <path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4z" />
        </svg>
      </div>

      {/* ───── Create New Session Button ───── */}
      <div className="px-6 mt-5">
        <button onClick={() => navigate('/teacher/create-quiz')} className="w-full relative flex items-center justify-center py-4 rounded-full bg-[#7c3aed] text-white text-[14.5px] font-bold shadow-[0_8px_20px_rgba(124,58,237,0.25)] hover:bg-[#6d28d9] transition">
          Create New Session
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 size-[36px] rounded-full bg-[#27272a] grid place-items-center text-white border border-[#444]">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </div>
        </button>
      </div>

      {/* ───── Time Filter ───── */}
      <div className="mx-6 mt-6 bg-[#333333] rounded-full p-1.5 flex items-center justify-between shadow-md">
        <button className="flex-1 bg-white text-[#1f1f1f] text-[11px] font-bold py-2.5 rounded-full shadow-sm text-center">Daily</button>
        <button className="flex-1 text-white/80 hover:text-white text-[11px] font-bold py-2.5 rounded-full text-center transition">Weekly</button>
        <button className="flex-1 text-white/80 hover:text-white text-[11px] font-bold py-2.5 rounded-full text-center transition">Monthly</button>
      </div>

      {/* ───── Cards List ───── */}
      <div className="mx-6 mt-6 flex flex-col gap-4">
        
        {/* Card 1: LIVE NOW */}
        <button onClick={() => navigate('/teacher/quiz')} className="w-full text-left bg-white rounded-[24px] p-5 border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:scale-[1.01] transition">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="size-[6px] rounded-full bg-red-500" />
            <span className="text-[10px] font-extrabold uppercase text-[#333] tracking-wider">LIVE NOW</span>
          </div>
          <h3 className="text-[17px] font-extrabold text-[#1f1f1f] leading-tight">Cellular Respiration Quiz</h3>
          <p className="text-[11.5px] font-medium text-gray-500 italic mt-0.5">Started 15mins ago - 24 students joined</p>
          
          <div className="flex items-center gap-2.5 mt-4">
            <div className="flex -space-x-1.5">
              <div className="size-6 rounded-full bg-[#d8b4fe] border-[1.5px] border-white grid place-items-center text-[9px] font-black text-[#1f1f1f]">J</div>
              <div className="size-6 rounded-full bg-[#bbf7d0] border-[1.5px] border-white grid place-items-center text-[9px] font-black text-[#1f1f1f]">D</div>
              <div className="size-6 rounded-full bg-[#bae6fd] border-[1.5px] border-white grid place-items-center text-[9px] font-black text-[#1f1f1f]">H</div>
            </div>
            <span className="text-[10.5px] font-semibold text-gray-500">Real-time engagement high</span>
          </div>
        </button>

        {/* Card 2: SCHEDULED */}
        <div className="w-full text-left bg-white rounded-[24px] p-5 border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)]">
          <div className="mb-2">
            <span className="text-[10px] font-extrabold uppercase text-gray-500 tracking-wider">SCHEDULED</span>
          </div>
          <h3 className="text-[17px] font-extrabold text-[#1f1f1f] leading-tight">Cellular Respiration Quiz</h3>
          <p className="text-[11.5px] font-medium text-gray-500 italic mt-0.5">3 Questions - Tomorrow, 2:30 pm</p>
          
          <div className="flex gap-2.5 mt-5">
            <button className="flex-1 py-3 rounded-full bg-[#f59e0b] text-white text-[12px] font-bold shadow-md shadow-orange-500/20 hover:opacity-90 transition">
              Edit Session
            </button>
            <button className="flex-1 py-3 rounded-full bg-[#f3f4f6] text-[#1f1f1f] text-[12px] font-bold hover:bg-gray-200 transition">
              Preview
            </button>
          </div>
        </div>

        {/* Card 3: DRAFT */}
        <div className="w-full text-left bg-white rounded-[24px] p-5 border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)]">
          <div className="mb-2">
            <span className="text-[10px] font-extrabold uppercase text-gray-500 tracking-wider">DRAFT</span>
          </div>
          <h3 className="text-[17px] font-extrabold text-[#1f1f1f] leading-tight">Genetic Mutation Basics</h3>
          <p className="text-[11.5px] font-medium text-gray-500 italic mt-0.5">10 Questions</p>
          
          <div className="flex items-center gap-2.5 mt-4">
            <div className="flex -space-x-1.5">
              <div className="size-6 rounded-full bg-[#d8b4fe] border-[1.5px] border-white grid place-items-center text-[9px] font-black text-[#1f1f1f]">J</div>
              <div className="size-6 rounded-full bg-[#bbf7d0] border-[1.5px] border-white grid place-items-center text-[9px] font-black text-[#1f1f1f]">D</div>
              <div className="size-6 rounded-full bg-[#bae6fd] border-[1.5px] border-white grid place-items-center text-[9px] font-black text-[#1f1f1f]">H</div>
            </div>
            <span className="text-[10.5px] font-semibold text-gray-500">Real-time engagement high</span>
          </div>
        </div>

      </div>

      {/* Custom Bottom Nav Dock */}
      <TeacherDock />

    </section>
  );
}
