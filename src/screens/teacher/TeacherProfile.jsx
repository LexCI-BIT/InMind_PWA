import { useNavigate } from 'react-router-dom';
import { TeacherDock } from '../../components/TeacherDock';

export function TeacherProfile() {
  const navigate = useNavigate();

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#f5f5f5] font-sans pb-[90px]">
      
      {/* ───── Header ───── */}
      <div className="flex items-center justify-center relative px-6 pt-safe pt-8 pb-4">
        <button onClick={() => navigate(-1)} className="absolute left-6 top-safe mt-8 text-[#7c3aed] hover:opacity-80 transition">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <h1 className="text-[17px] font-extrabold text-[#1f1f1f]">Teacher Profile</h1>
      </div>

      <div className="px-6 flex flex-col gap-4">
        
        {/* ───── ID Card ───── */}
        <div className="w-full bg-[#6366f1] rounded-[16px] p-5 relative overflow-hidden shadow-md">
          {/* Illustration */}
          <div className="absolute right-0 bottom-0 w-[140px] h-[120px] pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* Desk */}
              <rect x="20" y="85" width="80" height="3" fill="#fbbf24" />
              <rect x="70" y="75" width="25" height="10" fill="#eab308" />
              <rect x="72" y="70" width="20" height="5" fill="#fde047" />
              {/* Student (Boy) */}
              <path d="M 25 85 L 25 60 Q 30 50 40 50 Q 50 50 55 60 L 55 85 Z" fill="#fde047" /> {/* Yellow shirt */}
              <path d="M 35 35 Q 40 28 45 35 L 45 45 Q 40 50 35 45 Z" fill="#1f2937" /> {/* Hair */}
              <circle cx="40" cy="45" r="8" fill="#fca5a5" /> {/* Face */}
              <path d="M 33 45 Q 40 55 47 45 Z" fill="#fca5a5" /> {/* Chin/Neck */}
              {/* Student Glasses */}
              <circle cx="37" cy="45" r="2.5" fill="none" stroke="#1f2937" strokeWidth="1" />
              <circle cx="43" cy="45" r="2.5" fill="none" stroke="#1f2937" strokeWidth="1" />
              <path d="M 39.5 45 L 40.5 45" stroke="#1f2937" strokeWidth="1" />
              {/* Student Hand Writing */}
              <path d="M 45 65 L 55 80 L 60 80" fill="none" stroke="#fca5a5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="60" y1="80" x2="65" y2="85" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" /> {/* Pencil */}
              {/* Teacher */}
              <path d="M 65 95 L 65 45 Q 75 35 85 45 L 90 95 Z" fill="#eab308" /> {/* Yellow sweater */}
              <circle cx="75" cy="30" r="10" fill="#713f12" /> {/* Dark skin face */}
              <path d="M 65 25 Q 75 10 85 25 L 85 40 Q 75 45 65 40 Z" fill="#1f2937" /> {/* Dark Hair */}
              {/* Teacher Hand/Arm */}
              <path d="M 65 45 L 55 55 L 60 65" fill="none" stroke="#eab308" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="60" cy="65" r="3.5" fill="#713f12" /> {/* Dark hand */}
              {/* Book */}
              <path d="M 45 25 L 55 30 L 65 25 L 55 20 Z" fill="#ffffff" />
              <path d="M 45 25 L 45 35 L 55 40 L 55 30 Z" fill="#f3f4f6" />
              <path d="M 65 25 L 65 35 L 55 40 L 55 30 Z" fill="#e5e7eb" />
              <line x1="48" y1="28" x2="52" y2="30" stroke="#9ca3af" strokeWidth="1" />
              <line x1="58" y1="30" x2="62" y2="28" stroke="#9ca3af" strokeWidth="1" />
              {/* Speech Bubble */}
              <path d="M 65 15 Q 65 5 75 5 Q 85 5 85 15 Q 85 22 75 22 L 70 25 L 72 20 Q 65 18 65 15 Z" fill="#ffffff" />
              <circle cx="70" cy="13" r="1" fill="#1f2937" />
              <circle cx="75" cy="13" r="1" fill="#1f2937" />
              <circle cx="80" cy="13" r="1" fill="#1f2937" />
              {/* Clock */}
              <circle cx="45" cy="15" r="7" fill="#ffffff" />
              <line x1="45" y1="15" x2="45" y2="10" stroke="#1f2937" strokeWidth="1" />
              <line x1="45" y1="15" x2="48" y2="15" stroke="#1f2937" strokeWidth="1" />
            </svg>
          </div>

          <div className="relative z-10">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="size-[60px] rounded-full bg-cover bg-center border-2 border-white" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=41")' }} />
                <div className="absolute bottom-0 right-0 size-3.5 rounded-full bg-[#22c55e] border-2 border-[#6366f1]" />
              </div>
              <div className="flex flex-col gap-1 mt-1">
                <h2 className="text-[18px] font-bold text-white leading-none">Jessica Alba</h2>
                <span className="bg-white text-[#6366f1] text-[8px] font-extrabold px-2 py-0.5 rounded-full w-fit mt-0.5">4th Grade</span>
              </div>
            </div>
            <div className="mt-6">
              <span className="bg-white text-[#6366f1] text-[9px] font-extrabold px-3 py-1.5 rounded-full shadow-sm">Teacher ID : #950216</span>
            </div>
          </div>
        </div>

        {/* ───── Stats Grid ───── */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Card 1: Journal Entries */}
          <div className="bg-[#eab308] rounded-[20px] p-4 h-[140px] flex flex-col justify-between shadow-sm relative overflow-hidden">
            <h3 className="text-[11px] font-bold text-white/90">Journal Entries</h3>
            <span className="text-[48px] font-black text-white leading-none tracking-tight">43</span>
            <div className="absolute bottom-3 right-3 size-[30px] bg-white rounded-full grid place-items-center text-[#eab308]">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
            </div>
          </div>

          {/* Card 2: Participation Streak */}
          <div className="bg-[#f97316] rounded-[20px] p-4 h-[140px] flex flex-col justify-between shadow-sm relative overflow-hidden">
            <h3 className="text-[11px] font-bold text-white/90">Participation Streak</h3>
            <div className="flex items-baseline gap-0.5">
              <span className="text-[48px] font-black text-white leading-none tracking-tight">15</span>
              <span className="text-[16px] font-bold text-white">Days</span>
            </div>
            <div className="absolute bottom-3 right-3 size-[30px] bg-white rounded-full grid place-items-center text-[#f97316]">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13.07 4.8 14.56 3.18C14.71 3.01 14.61 2.76 14.39 2.72C13.78 2.62 13.14 2.72 12.57 2.97C11.51 3.43 10.59 4.24 10 5.25C8.89 7.15 9.17 9.8 10.82 11.41C11.06 11.64 11.3 11.85 11.53 12.08C11.66 12.21 11.75 12.39 11.74 12.58C11.73 12.82 11.55 13.03 11.31 13.06C11.02 13.1 10.74 12.98 10.53 12.78C10.06 12.34 9.68 11.8 9.36 11.23C9.22 10.98 8.84 10.97 8.68 11.2C7.38 13.05 7.42 15.68 8.79 17.49C9.84 18.89 11.6 19.64 13.36 19.46C15.4 19.26 17.22 17.84 17.87 15.89C18.25 14.77 18.2 13.52 17.66 12.3V12.3L17.66 11.2Z"/></svg>
            </div>
          </div>

          {/* Card 3: Most Frequent Mood (Purple) */}
          <div className="bg-[#7c3aed] rounded-[20px] p-4 h-[140px] flex flex-col justify-between shadow-sm relative overflow-hidden">
            <h3 className="text-[11px] font-bold text-white/90">Most Frequent Mood</h3>
            <span className="text-[32px] font-black text-white leading-none tracking-tight">CALM</span>
            <div className="absolute bottom-3 right-3 size-[30px] bg-white rounded-full grid place-items-center text-[#7c3aed]">
              <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 8c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-7 0c.83 0 1.5.67 1.5 1.5S9.33 13 8.5 13 7 12.33 7 11.5 7.67 10 8.5 10zm3.5 8c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z"/></svg>
            </div>
          </div>

          {/* Card 4: Most Frequent Mood (Green) */}
          <div className="bg-[#22c55e] rounded-[20px] p-4 h-[140px] flex flex-col justify-between shadow-sm relative overflow-hidden">
            <h3 className="text-[11px] font-bold text-white/90">Most Frequent Mood</h3>
            <span className="text-[32px] font-black text-white leading-none tracking-tight">CALM</span>
            <div className="absolute bottom-3 right-3 size-[30px] bg-white rounded-full grid place-items-center text-[#22c55e]">
              <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 8c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-7 0c.83 0 1.5.67 1.5 1.5S9.33 13 8.5 13 7 12.33 7 11.5 7.67 10 8.5 10zm3.5 8c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z"/></svg>
            </div>
          </div>

        </div>

        {/* ───── Warning Card ───── */}
        <div className="mt-2 bg-[#fef3c7] rounded-[24px] p-4 border border-[#fde047] shadow-sm flex items-start gap-3">
          <div className="grid size-8 place-items-center rounded-full bg-[#fcd34d] text-[#b45309] shrink-0">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
          <div className="flex flex-col gap-1.5 pt-0.5">
            <h3 className="text-[13px] font-bold text-[#1f1f1f]">Lower Energy This Week</h3>
            <p className="text-[11.5px] font-medium text-gray-600 leading-snug">
              Jessica has mentioned feeling "tired" 3 times in journals this week
            </p>
            <button className="mt-1 w-fit bg-[#eab308] text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-sm hover:opacity-90 transition">
              Check In
            </button>
          </div>
        </div>

        {/* ───── Encryption Footer ───── */}
        <div className="mt-6 bg-[#f3f4f6] rounded-[24px] p-5 border border-dashed border-gray-300 flex flex-col items-center text-center gap-2">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#22c55e]" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
          <p className="text-[11px] font-medium text-gray-500 leading-relaxed px-2">
            Your child's data is end-to-end encrypted. We never sell your data, and it's only used to support Jessica's wellbeing journey at Oakwood International
          </p>
        </div>

      </div>

      {/* Custom Bottom Nav Dock */}
      <TeacherDock />

    </section>
  );
}
