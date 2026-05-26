import { useNavigate } from 'react-router-dom';
import { TeacherDock } from '../../components/TeacherDock';

export function PriorityStudents() {
  const navigate = useNavigate();

  // Exactly as in the mockup
  const students = [
    { name: 'Alex Johnson', status: 'Low engagement for 2 days', dashOffset: 80, isOrange: true },
    { name: 'J Sreedharan', status: 'Incomplete Journey', dashOffset: 60, isOrange: true },
    { name: 'James', status: 'Low engagement for 2 days', dashOffset: 40, isOrange: true },
    { name: 'Alex Johnson', status: 'Low engagement for 2 days', dashOffset: 80, isOrange: true },
    { name: 'J Sreedharan', status: 'Low engagement for 2 days', dashOffset: 60, isOrange: true },
    { name: 'James', status: 'Low engagement for 2 days', dashOffset: 40, isOrange: true },
  ];

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#f5f5f5] font-sans pb-[100px]">
      
      {/* ───── Header ───── */}
      <div className="flex items-center gap-3 px-6 pt-safe pt-8 pb-4">
        <button onClick={() => navigate(-1)} className="grid size-8 place-items-center rounded-full bg-[#7c3aed] text-white shadow-sm hover:opacity-90 transition">
          <svg viewBox="0 0 24 24" className="h-4 w-4 pr-0.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <h1 className="text-[16px] font-extrabold text-[#1f1f1f]">Priority Students</h1>
      </div>

      {/* ───── Student List ───── */}
      <div className="px-6 mt-4 flex flex-col gap-3">
        {students.map((student, idx) => (
          <StudentRow 
            key={idx} 
            name={student.name} 
            status={student.status} 
            dashOffset={student.dashOffset} 
            isOrange={student.isOrange}
          />
        ))}
      </div>

      <TeacherDock />
    </section>
  );
}

function StudentRow({ name, status, dashOffset, isOrange }) {
  return (
    <button className="w-full text-left bg-white rounded-[20px] p-4 flex items-center justify-between border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:bg-gray-50 transition">
      <div className="flex items-center gap-3">
        <div className="grid size-11 place-items-center rounded-full bg-[#8f9296] text-white shrink-0">
          <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[14.5px] font-bold text-[#1f1f1f]">{name}</span>
          <span className={`text-[11px] font-bold ${isOrange ? 'text-[#ea580c]' : 'text-gray-500'}`}>{status}</span>
        </div>
      </div>
      
      {/* Circle arrow with partial yellow border */}
      <div className="relative grid size-[42px] place-items-center rounded-full shrink-0">
         <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 40 40">
           <circle cx="20" cy="20" r="19" fill="none" stroke="#facc15" strokeWidth="2.5" strokeDasharray={`${dashOffset} 100`} strokeLinecap="round" />
         </svg>
         <div className="grid size-8 place-items-center rounded-full bg-[#333] text-white shadow-sm z-10">
           <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] pr-[1px]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
         </div>
      </div>
    </button>
  );
}
