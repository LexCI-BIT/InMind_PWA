import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AppreciationScreen() {
  const navigate = useNavigate();
  const [selectedStudents, setSelectedStudents] = useState(['alex', 'marcus', 'chloe']); // Hardcoding selection to match mockup

  const students = [
    { id: 'alex', name: 'Alex Johnson', img: '11' },
    { id: 'sarah', name: 'sarah williams', img: '12' },
    { id: 'marcus', name: 'Marcus chen', img: '13' },
    { id: 'jordan', name: 'Jordan Blake', img: '14' },
    { id: 'maya', name: 'Maya Rodriquez', img: '15' },
    { id: 'leo', name: 'Leo Thompson', img: '16' },
    { id: 'chloe', name: 'Chloe Garcia', img: '17' },
  ];

  const toggleStudent = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter(s => s !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col bg-[#f8f9fa] font-sans pb-[180px]">
      
      {/* ───── Top Bar ───── */}
      <div className="flex items-center justify-between px-6 pt-safe pt-8 pb-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-white hover:opacity-80 transition">
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button className="p-2 -mr-2 text-white hover:opacity-80 transition">
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>

      <div className="px-6 flex flex-col gap-5">
        {/* Search Bar */}
        <div className="w-full bg-white rounded-full px-4 py-3 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center gap-3">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder="Search students or keywords......" 
            className="flex-1 bg-transparent text-[13px] font-medium text-[#1f1f1f] outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Segmented Control */}
        <div className="w-full bg-[#333] rounded-full p-1 flex items-center shadow-sm">
          <button className="flex-1 bg-white text-[#1f1f1f] text-[12px] font-bold py-2 rounded-full shadow-sm text-center">All</button>
          <button className="flex-1 text-white/90 hover:text-white text-[12px] font-bold py-2 rounded-full text-center transition">Sent</button>
          <button className="flex-1 text-white/90 hover:text-white text-[12px] font-bold py-2 rounded-full text-center transition">Marked</button>
        </div>
      </div>

      {/* ───── Student List ───── */}
      <div className="mt-6 flex flex-col px-6">
        {students.map((student, idx) => {
          const isSelected = selectedStudents.includes(student.id);
          return (
            <div key={student.id} className={`flex items-center justify-between py-4 ${idx !== students.length - 1 ? 'border-b border-gray-200' : ''}`}>
              <div className="flex items-center gap-4">
                {/* Checkbox */}
                <button 
                  onClick={() => toggleStudent(student.id)}
                  className={`size-4 rounded-[3px] border grid place-items-center transition ${isSelected ? 'bg-[#7c3aed] border-[#7c3aed]' : 'bg-white border-gray-300'}`}
                >
                  {isSelected && <svg viewBox="0 0 24 24" className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                </button>
                
                {/* Avatar & Name */}
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-cover bg-center border border-gray-100 shadow-sm" style={{ backgroundImage: `url("https://i.pravatar.cc/150?img=${student.img}")` }} />
                  <span className="text-[13px] font-extrabold text-[#1f1f1f]">{student.name}</span>
                </div>
              </div>
              
              <button className="bg-[#8b5cf6] hover:bg-[#7c3aed] transition text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-sm">
                Quick Praise
              </button>
            </div>
          );
        })}
      </div>

      {/* ───── Bottom Paginator & Floating Card ───── */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] flex flex-col items-center pb-8 pt-4 bg-gradient-to-t from-[#f8f9fa] via-[#f8f9fa] to-transparent pointer-events-none">
        
        {/* Pagination text & dots */}
        <div className="flex flex-col items-center mb-4 pointer-events-auto">
          <span className="text-[10px] font-extrabold text-gray-500 mb-2">Showing 7 OF 24 students</span>
          <div className="flex items-center gap-1.5">
            <div className="size-1.5 rounded-full bg-[#7c3aed]"></div>
            <div className="size-1.5 rounded-full bg-gray-400"></div>
            <div className="size-1.5 rounded-full bg-gray-400"></div>
          </div>
        </div>

        {/* Floating Action Card */}
        <div className="w-[calc(100%-3rem)] bg-white rounded-[24px] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex flex-col items-center gap-4 border border-gray-100 pointer-events-auto">
          <span className="text-[12px] font-extrabold text-[#333]">{selectedStudents.length} students selected</span>
          
          <button className="w-full bg-[#bbf7d0] hover:bg-[#86efac] transition text-[#1f1f1f] text-[13px] font-extrabold py-3.5 rounded-full shadow-sm">
            Send Group Acknowledgment
          </button>
          
          <button onClick={() => navigate(-1)} className="w-full bg-[#fca5a5] hover:bg-[#f87171] transition text-[#1f1f1f] text-[13px] font-extrabold py-3.5 rounded-full shadow-sm">
            Cancel
          </button>
        </div>

      </div>

    </section>
  );
}
