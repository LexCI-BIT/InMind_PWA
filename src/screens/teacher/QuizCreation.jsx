import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TeacherDock } from '../../components/TeacherDock';

export function QuizCreation() {
  const navigate = useNavigate();

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#f5f5f5] font-sans pb-[120px]">
      
      {/* ───── Header ───── */}
      <div className="flex items-center gap-3 px-6 pt-safe pt-8">
        <div className="size-11 rounded-full bg-cover bg-center shadow-sm border border-gray-200" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=47")' }} />
        <div className="flex flex-col">
          <h1 className="text-[17px] font-bold text-[#1f1f1f] leading-tight">Sarah</h1>
          <p className="text-[11px] font-medium text-gray-500 mt-0.5">Grade 10-A</p>
        </div>
      </div>

      {/* ───── Title & Back ───── */}
      <div className="px-6 mt-6 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="grid size-8 place-items-center rounded-full bg-[#7c3aed] text-white shadow-sm hover:opacity-90 transition">
          <svg viewBox="0 0 24 24" className="h-4 w-4 pr-0.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <h2 className="text-[16px] font-extrabold text-[#1f1f1f]">Create New Session</h2>
      </div>

      <div className="px-6 mt-6 flex flex-col gap-5">
        {/* Session Title */}
        <div>
          <label className="text-[10px] font-extrabold uppercase text-gray-500 tracking-wider mb-2 block">Session Title</label>
          <input 
            type="text" 
            placeholder="e.g. Molecular Biology Review" 
            className="w-full bg-white rounded-[12px] px-4 py-3.5 text-[13px] font-medium text-[#1f1f1f] border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Select Class */}
        <div>
          <label className="text-[10px] font-extrabold uppercase text-gray-500 tracking-wider mb-2 block">Select Class</label>
          <div className="w-full bg-white rounded-[12px] px-4 py-3.5 text-[13px] font-bold text-[#1f1f1f] border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between">
            Grade 10 - Biology
          </div>
        </div>

        {/* Date and Time */}
        <div>
          <label className="text-[10px] font-extrabold uppercase text-gray-500 tracking-wider mb-2 block">Date and Time</label>
          <div className="flex gap-3">
            <div className="flex-1 bg-white rounded-[12px] px-4 py-3.5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#7c3aed]" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/></svg>
            </div>
            <div className="flex-1 bg-white rounded-[12px] px-4 py-3.5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#7c3aed]" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
            </div>
          </div>
        </div>

        {/* Go Live Immediately */}
        <div className="w-full bg-white rounded-[16px] p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full bg-red-50 text-red-400">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-extrabold text-[#1f1f1f]">Go Live Immediately</span>
              <span className="text-[10px] font-medium text-gray-500 mt-0.5">Skip scheduling and start now</span>
            </div>
          </div>
          {/* Toggle Switch */}
          <div className="w-10 h-6 bg-gray-200 rounded-full flex items-center p-1">
            <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
          </div>
        </div>

      </div>

      {/* ───── Question Editor ───── */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-3">
          <label className="text-[10px] font-extrabold uppercase text-gray-500 tracking-wider">Add Question</label>
          <div className="w-10 h-5 bg-[#e0e7ff] rounded-full flex items-center p-1 justify-end">
             <div className="w-3 h-3 bg-white rounded-full shadow-sm" />
          </div>
        </div>

        <div className="w-full bg-white rounded-[24px] p-5 border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex gap-3">
          {/* Drag Handle */}
          <div className="flex flex-col gap-1 pt-1 opacity-20">
            <div className="size-1 rounded-full bg-black" />
            <div className="size-1 rounded-full bg-black" />
            <div className="size-1 rounded-full bg-black" />
          </div>

          <div className="flex-1">
            <label className="text-[8px] font-extrabold uppercase text-gray-400 tracking-wider block mb-2">Question Description</label>
            <div className="bg-gray-50 rounded-[12px] p-3 flex gap-2 mb-5">
               <div className="grid size-5 place-items-center rounded-full bg-[#7c3aed] text-white shrink-0">
                  <span className="text-[10px] font-bold">?</span>
               </div>
               <span className="text-[12px] font-medium text-gray-400">What would you like to ask?</span>
            </div>

            <div className="flex items-center justify-between mb-3">
              <label className="text-[8px] font-extrabold uppercase text-gray-400 tracking-wider">Options</label>
              <span className="text-[8px] font-extrabold uppercase text-[#7c3aed] tracking-wider">Mark Correct Answer</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {/* Option A (Correct) */}
              <div className="w-full bg-[#d1fae5] rounded-[12px] p-2 flex items-center justify-between border border-emerald-200">
                <div className="flex items-center gap-3">
                  <div className="grid size-6 place-items-center rounded-full bg-[#10b981] text-white text-[10px] font-bold">A</div>
                  <span className="text-[12px] font-bold text-[#1f1f1f]">It Was A Happy Day</span>
                </div>
                <div className="grid size-5 place-items-center rounded-full bg-[#10b981] text-white">
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
              </div>

              {/* Option B */}
              <div className="w-full bg-white rounded-[12px] p-2 flex items-center justify-between border border-gray-100 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-3">
                  <div className="grid size-6 place-items-center rounded-full bg-gray-100 text-[#1f1f1f] text-[10px] font-bold">B</div>
                  <span className="text-[12px] font-medium text-gray-400">Type Option B...</span>
                </div>
                <div className="size-5 rounded-full border-2 border-gray-200" />
              </div>

              {/* Option C */}
              <div className="w-full bg-white rounded-[12px] p-2 flex items-center justify-between border border-gray-100 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-3">
                  <div className="grid size-6 place-items-center rounded-full bg-gray-100 text-[#1f1f1f] text-[10px] font-bold">C</div>
                  <span className="text-[12px] font-medium text-gray-400">Type Option C...</span>
                </div>
                <div className="size-5 rounded-full border-2 border-gray-200" />
              </div>

              {/* Option D */}
              <div className="w-full bg-white rounded-[12px] p-2 flex items-center justify-between border border-gray-100 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-3">
                  <div className="grid size-6 place-items-center rounded-full bg-gray-100 text-[#1f1f1f] text-[10px] font-bold">D</div>
                  <span className="text-[12px] font-medium text-gray-400">Type Option D...</span>
                </div>
                <div className="size-5 rounded-full border-2 border-gray-200" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-5">
              <button className="flex-1 py-3 rounded-[12px] bg-[#7c3aed] text-white text-[12px] font-bold shadow-md shadow-purple-500/20 hover:opacity-90 transition">
                Save Question
              </button>
              <button className="size-[42px] rounded-[12px] bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition border border-gray-100">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ───── Added Questions ───── */}
      <div className="mt-8 pl-6">
        <h3 className="text-[10px] font-extrabold uppercase text-gray-500 tracking-wider mb-4">Added Questions (3)</h3>
        <div className="flex gap-3 overflow-x-auto pr-6 pb-4 scrollbar-hide">
          <AddedQuestionCard num={1} />
          <AddedQuestionCard num={2} />
        </div>
      </div>

      {/* Launch Session Button */}
      <div className="px-6 mt-2 mb-8">
        <button className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-[#7c3aed] text-white text-[14.5px] font-bold shadow-[0_8px_20px_rgba(124,58,237,0.25)] hover:bg-[#6d28d9] transition">
          Launch Session <span className="text-[16px]">🚀</span>
        </button>
      </div>

      <TeacherDock />

    </section>
  );
}

function AddedQuestionCard({ num }) {
  return (
    <div className="w-[200px] shrink-0 bg-white rounded-[20px] p-4 border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="bg-[#e0e7ff] text-[#7c3aed] text-[7px] font-extrabold px-2 py-0.5 rounded-full tracking-wider uppercase">Question {num}</span>
          <span className="text-gray-400 font-bold opacity-50">⋮</span>
        </div>
        <p className="text-[12px] font-extrabold text-[#1f1f1f] leading-snug">What Is The Primary Function Of Mitochondria?</p>
      </div>
      <div className="mt-4 bg-[#d1fae5] text-[#10b981] text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center justify-between">
        <span className="truncate pr-2">Energy Production (ATP)</span>
        <div className="size-1.5 rounded-full bg-[#10b981] shrink-0" />
      </div>
    </div>
  );
}
