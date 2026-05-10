import { useNavigate } from 'react-router-dom';
import { TeacherDock } from '../../components/TeacherDock';

export function CheckInSummary() {
  const navigate = useNavigate();

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#f5f5f5] font-sans pb-[100px]">
      
      {/* ───── Header ───── */}
      <div className="flex items-center justify-between px-6 pt-safe pt-8">
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-full bg-cover bg-center shadow-sm border border-gray-200" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=47")' }} />
          <div className="flex flex-col">
            <h1 className="text-[17px] font-bold text-[#1f1f1f] leading-tight">Sarah</h1>
            <p className="text-[11px] font-medium text-gray-500 mt-0.5">Grade 10-A</p>
          </div>
        </div>
        <button className="relative size-10 rounded-full bg-[#7c3aed] grid place-items-center text-white shadow-sm hover:opacity-90 transition">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          <div className="absolute top-0 right-0 size-3 rounded-full bg-red-500 border-2 border-[#f5f5f5]" />
        </button>
      </div>

      {/* ───── Title & Back ───── */}
      <div className="px-6 mt-6 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="grid size-8 place-items-center rounded-full bg-[#3b82f6] text-white shadow-sm hover:opacity-90 transition">
          <svg viewBox="0 0 24 24" className="h-4 w-4 pr-0.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <h2 className="text-[20px] font-extrabold text-[#1f1f1f]">Summary</h2>
      </div>

      <div className="px-6 mt-5 flex flex-col gap-4">
        {/* Search Bar */}
        <div className="w-full bg-white rounded-full px-4 py-3 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-3">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder="Search students or keywords......" 
            className="flex-1 bg-transparent text-[12px] font-medium text-[#1f1f1f] outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Month Dropdown */}
        <div className="w-fit bg-white rounded-[10px] px-3 py-1.5 border border-gray-100 shadow-sm flex items-center gap-2 cursor-pointer">
          <span className="text-[12px] font-bold text-[#1f1f1f]">Month</span>
          <svg viewBox="0 0 24 24" className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
      </div>

      {/* ───── Timeline Cards ───── */}
      <div className="pl-6 mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <div className="w-[70px] shrink-0 bg-white rounded-[14px] p-2 flex flex-col items-center justify-center border border-gray-100 shadow-sm">
           <span className="text-[9px] font-bold text-gray-400">18-24</span>
           <span className="text-[12px] font-extrabold text-[#1f1f1f]">Sep</span>
        </div>
        <div className="w-[70px] shrink-0 bg-white rounded-[14px] p-2 flex flex-col items-center justify-center border border-gray-100 shadow-sm">
           <span className="text-[9px] font-bold text-gray-400">18-24</span>
           <span className="text-[12px] font-extrabold text-[#1f1f1f]">Sep</span>
        </div>
        <div className="w-[85px] shrink-0 bg-[#7c3aed] rounded-[14px] p-2 flex flex-col items-center justify-center shadow-md shadow-purple-500/20">
           <span className="text-[9px] font-bold text-white/90">CURRENT</span>
           <span className="text-[12px] font-extrabold text-white">Sep 2-8</span>
        </div>
        <div className="w-[70px] shrink-0 bg-white rounded-[14px] p-2 flex flex-col items-center justify-center border border-gray-100 shadow-sm pr-6">
           <span className="text-[9px] font-bold text-gray-400">18-24</span>
           <span className="text-[12px] font-extrabold text-[#1f1f1f]">Sep</span>
        </div>
      </div>

      {/* ───── Filters ───── */}
      <div className="pl-6 mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
         <button className="shrink-0 bg-[#333] text-white text-[11px] font-bold px-4 py-2 rounded-full shadow-sm">All Responses</button>
         <button className="shrink-0 bg-white text-gray-600 border border-gray-200 text-[11px] font-bold px-4 py-2 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.02)]">Flagged</button>
         <button className="shrink-0 bg-white text-gray-600 border border-gray-200 text-[11px] font-bold px-4 py-2 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.02)]">Positive</button>
         <button className="shrink-0 bg-white text-gray-600 border border-gray-200 text-[11px] font-bold px-4 py-2 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.02)] pr-6">Neutral</button>
      </div>

      {/* ───── Stats Cards ───── */}
      <div className="px-6 mt-4 grid grid-cols-2 gap-3">
        {/* Response Rate */}
        <div className="bg-[#fbbf24] rounded-[16px] p-4 flex flex-col shadow-sm border border-yellow-300">
          <span className="bg-white text-[#fbbf24] text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full w-fit tracking-wider">Response Rate</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-[42px] font-black text-white leading-none tracking-tight">24</span>
            <span className="text-[16px] font-bold text-white/80">/30</span>
          </div>
          <div className="mt-3 w-full h-1.5 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full w-[80%]" />
          </div>
        </div>
        {/* Sentiment Score */}
        <div className="bg-[#22c55e] rounded-[16px] p-4 flex flex-col shadow-sm border border-green-500">
          <span className="bg-white text-[#22c55e] text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full w-fit tracking-wider">Sentiment Score</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-[42px] font-black text-white leading-none tracking-tight">78</span>
            <span className="text-[20px] font-black text-white">%</span>
          </div>
          <div className="mt-3 w-full h-1.5 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full w-[78%]" />
          </div>
        </div>
      </div>

      {/* ───── Question Card ───── */}
      <div className="px-6 mt-4">
        <div className="w-full bg-white rounded-[16px] p-4 border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)]">
          <span className="text-[10px] font-extrabold uppercase text-[#3b82f6] tracking-wider mb-2 block">Monday, Oct 2</span>
          <p className="text-[14px] font-extrabold text-[#1f1f1f] leading-snug">how are you feeling about this week's goals?</p>
        </div>
      </div>

      {/* ───── Responses List ───── */}
      <div className="px-6 mt-6 flex flex-col gap-6">
        
        {/* Need Attention */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-red-500" />
            <h3 className="text-[11px] font-extrabold uppercase text-red-500 tracking-wider">Need Attention (2)</h3>
          </div>
          
          {/* Response Card 1 */}
          <div className="bg-[#fef2f2] rounded-[16px] p-4 border border-[#fecaca] shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-cover bg-center border border-white shadow-sm" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=11")' }} />
              <div className="flex flex-col">
                <span className="text-[12px] font-bold text-[#1f1f1f]">Alex Johnson</span>
                <span className="text-[9px] font-medium text-gray-500">8:12 AM</span>
              </div>
            </div>
            <p className="text-[12px] font-medium text-[#1f1f1f] leading-snug">"I'm feeling really stressed about the math project. I don't think I can finish it on time and i don't understand the last part."</p>
            <div className="flex gap-2 mt-1">
              <button className="flex-1 bg-white text-[#1f1f1f] text-[10px] font-bold py-2 rounded-full shadow-sm border border-gray-100 hover:bg-gray-50 transition">Reply</button>
              <button className="size-8 bg-white rounded-[8px] grid place-items-center text-gray-400 shadow-sm border border-gray-100 hover:bg-gray-50 transition">
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path></svg>
              </button>
            </div>
          </div>

          {/* Response Card 2 */}
          <div className="bg-[#fef2f2] rounded-[16px] p-4 border border-[#fecaca] shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-cover bg-center border border-white shadow-sm" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=12")' }} />
              <div className="flex flex-col">
                <span className="text-[12px] font-bold text-[#1f1f1f]">Alex Johnson</span>
                <span className="text-[9px] font-medium text-gray-500">8:12 AM - Math reflection</span>
              </div>
            </div>
            <p className="text-[12px] font-medium text-[#1f1f1f] leading-snug">"I'm feeling really stressed about the math project. I don't think I can finish it on time and i don't understand the last part."</p>
            <div className="flex gap-2 mt-1">
              <button className="flex-1 bg-white text-[#1f1f1f] text-[10px] font-bold py-2 rounded-full shadow-sm border border-gray-100 hover:bg-gray-50 transition">Reply</button>
              <button className="size-8 bg-white rounded-[8px] grid place-items-center text-gray-400 shadow-sm border border-gray-100 hover:bg-gray-50 transition">
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Neutral */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-[#f59e0b]" />
            <h3 className="text-[11px] font-extrabold uppercase text-[#f59e0b] tracking-wider">Neutral (12)</h3>
          </div>
          
          <div className="bg-white rounded-[16px] p-4 border border-gray-100 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-cover bg-center border border-gray-100 shadow-sm" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=13")' }} />
              <div className="flex flex-col">
                <span className="text-[12px] font-bold text-[#1f1f1f]">Alex Johnson</span>
                <span className="text-[9px] font-medium text-gray-500">8:12 AM - Math reflection</span>
              </div>
            </div>
            <p className="text-[12px] font-medium text-gray-500 leading-snug">"Feeling okay, just a normal Monday. Ready to get things done."</p>
            <div className="flex gap-2 mt-1">
              <button className="flex-1 bg-white text-[#1f1f1f] text-[10px] font-bold py-2 rounded-full shadow-sm border border-gray-100 hover:bg-gray-50 transition">Reply</button>
              <button className="size-8 bg-white rounded-[8px] grid place-items-center text-gray-400 shadow-sm border border-gray-100 hover:bg-gray-50 transition">
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Positive */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-[#10b981]" />
            <h3 className="text-[11px] font-extrabold uppercase text-[#10b981] tracking-wider">Positive (8)</h3>
          </div>
          
          <div className="bg-[#f0fdf4] rounded-[16px] p-4 border border-[#bbf7d0] shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-cover bg-center border border-white shadow-sm" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=14")' }} />
              <div className="flex flex-col">
                <span className="text-[12px] font-bold text-[#1f1f1f]">Alex Johnson</span>
                <span className="text-[9px] font-medium text-gray-500">8:12 AM - Math reflection</span>
              </div>
              <div className="ml-auto size-6 bg-white rounded-[6px] grid place-items-center text-gray-400 shadow-sm border border-gray-100">
                 <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path></svg>
              </div>
            </div>
            <p className="text-[12px] font-bold text-[#15803d] leading-snug">"I'm super excited for the debate this week! I've been practicing a lot."</p>
            <div className="flex gap-2 mt-1">
              <button className="flex-1 bg-white text-[#1f1f1f] text-[10px] font-bold py-2 rounded-full shadow-sm border border-gray-100 hover:bg-gray-50 transition">Reply</button>
              <button className="size-8 bg-white rounded-[8px] grid place-items-center text-gray-400 shadow-sm border border-gray-100 hover:bg-gray-50 transition">
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path></svg>
              </button>
            </div>
          </div>
        </div>

      </div>

      <TeacherDock />
    </section>
  );
}
