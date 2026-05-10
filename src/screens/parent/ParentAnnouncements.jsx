import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../../components/BottomNav';

export function ParentAnnouncements() {
  const [activeFilter, setActiveFilter] = useState('All');
  
  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#f8f9fa] font-sans pb-[100px]">

      <div className="px-6 flex flex-col gap-5 pt-safe pt-8">
        {/* Search Bar */}
        <div className="w-full bg-white rounded-[16px] px-4 py-3.5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center gap-3">
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder="Search announcements..." 
            className="flex-1 bg-transparent text-[13px] font-medium text-[#1f1f1f] outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6">
          <button 
            onClick={() => setActiveFilter('All')}
            className={`shrink-0 text-[12px] font-bold px-5 py-2.5 rounded-full shadow-sm transition ${activeFilter === 'All' ? 'bg-[#7c3aed] text-white' : 'bg-white text-gray-500 border border-gray-100'}`}
          >
            All
          </button>
          <button 
            onClick={() => setActiveFilter('Well being')}
            className={`shrink-0 text-[12px] font-bold px-5 py-2.5 rounded-full shadow-sm transition ${activeFilter === 'Well being' ? 'bg-[#7c3aed] text-white' : 'bg-white text-gray-500 border border-gray-100'}`}
          >
            Well being
          </button>
          <button 
            onClick={() => setActiveFilter('Academics')}
            className={`shrink-0 text-[12px] font-bold px-5 py-2.5 rounded-full shadow-sm transition relative ${activeFilter === 'Academics' ? 'bg-[#7c3aed] text-white' : 'bg-white text-gray-500 border border-gray-100'}`}
          >
            Academics
            {activeFilter !== 'Academics' && <span className="absolute top-2 right-2 size-1.5 rounded-full bg-[#7c3aed]"></span>}
          </button>
          <button 
            onClick={() => setActiveFilter('Events')}
            className={`shrink-0 text-[12px] font-bold px-5 py-2.5 rounded-full shadow-sm transition ${activeFilter === 'Events' ? 'bg-[#7c3aed] text-white' : 'bg-white text-gray-500 border border-gray-100'}`}
          >
            Events
          </button>
        </div>
      </div>

      {activeFilter === 'Well being' ? (
        <div className="mx-6 mt-6 flex-1 flex flex-col gap-6">
          {/* TODAY */}
          <div>
            <span className="text-[11px] font-extrabold text-[#8b5cf6] tracking-wider uppercase mb-3 block">TODAY</span>
            <div className="flex flex-col gap-3">
               <div className="bg-white rounded-[16px] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-gray-100 flex gap-4 items-start">
                 <div className="shrink-0 size-10 rounded-full bg-[#e0e7ff] grid place-items-center text-[#6366f1]">
                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
                 </div>
                 <div>
                   <h4 className="text-[13px] font-extrabold text-[#6366f1] mb-1 leading-tight">Emotional Awareness Week</h4>
                   <p className="text-[10.5px] font-medium text-gray-700 leading-relaxed">This week, students are exploring emotions through guided discussions and reflection.</p>
                 </div>
               </div>

               <div className="bg-white rounded-[16px] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-gray-100 flex gap-4 items-start">
                 <div className="shrink-0 size-10 rounded-full bg-[#ffedd5] grid place-items-center text-[#f97316]">
                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
                 </div>
                 <div>
                   <h4 className="text-[13px] font-extrabold text-[#6366f1] mb-1 leading-tight">Mindfulness in Class</h4>
                   <p className="text-[10.5px] font-medium text-gray-700 leading-relaxed">Students will practice brief mindfulness and breathing exercises this week.</p>
                 </div>
               </div>

               <div className="bg-white rounded-[16px] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-gray-100 flex gap-4 items-start">
                 <div className="shrink-0 size-10 rounded-full bg-[#fefce8] grid place-items-center text-[#eab308]">
                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
                 </div>
                 <div>
                   <h4 className="text-[13px] font-extrabold text-[#6366f1] mb-1 leading-tight">Confidence & Expression</h4>
                   <p className="text-[10.5px] font-medium text-gray-700 leading-relaxed">Students are encouraged to express ideas through storytelling, art, and group discussion.</p>
                 </div>
               </div>
            </div>
          </div>

          {/* YESTERDAY */}
          <div className="mb-8">
            <span className="text-[11px] font-extrabold text-[#8b5cf6] tracking-wider uppercase mb-3 block">YESTERDAY</span>
            <div className="flex flex-col gap-3">
               <div className="bg-white rounded-[16px] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-gray-100 flex gap-4 items-start">
                 <div className="shrink-0 size-10 rounded-full bg-[#e0e7ff] grid place-items-center text-[#6366f1]">
                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
                 </div>
                 <div>
                   <h4 className="text-[13px] font-extrabold text-[#6366f1] mb-1 leading-tight">Emotional Awareness Week</h4>
                   <p className="text-[10.5px] font-medium text-gray-700 leading-relaxed">This week, students are exploring emotions through guided discussions and reflection.</p>
                 </div>
               </div>

               <div className="bg-white rounded-[16px] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-gray-100 flex gap-4 items-start">
                 <div className="shrink-0 size-10 rounded-full bg-[#ffedd5] grid place-items-center text-[#f97316]">
                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
                 </div>
                 <div>
                   <h4 className="text-[13px] font-extrabold text-[#6366f1] mb-1 leading-tight">Mindfulness in Class</h4>
                   <p className="text-[10.5px] font-medium text-gray-700 leading-relaxed">Students will practice brief mindfulness and breathing exercises this week.</p>
                 </div>
               </div>

               <div className="bg-white rounded-[16px] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-gray-100 flex gap-4 items-start">
                 <div className="shrink-0 size-10 rounded-full bg-[#fefce8] grid place-items-center text-[#eab308]">
                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
                 </div>
                 <div>
                   <h4 className="text-[13px] font-extrabold text-[#6366f1] mb-1 leading-tight">Confidence & Expression</h4>
                   <p className="text-[10.5px] font-medium text-gray-700 leading-relaxed">Students are encouraged to express ideas through storytelling, art, and group discussion.</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* ───── Urgent Card ───── */}
          <div className="mx-6 mt-4 bg-[#fef2f2] rounded-[24px] p-5 border border-[#fecaca]">
             <div className="flex items-center justify-between mb-3">
                <span className="bg-white text-[#ef4444] text-[8px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider shadow-sm border border-[#fee2e2]">URGENT</span>
                <span className="text-[10px] font-extrabold text-[#ef4444]">15m ago</span>
             </div>
             <h3 className="text-[15px] font-extrabold text-[#1f1f1f] mb-2 leading-tight">Extreme Weather conditions</h3>
             <p className="text-[12px] font-medium text-gray-600 leading-snug">School will remain open, but outdoor sporting activities are postponed until further notice.</p>
          </div>

          {/* ───── Recent Updates ───── */}
          <div className="mx-6 mt-8 flex-1 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[16px] font-black text-[#1f1f1f]">Recent Updates</h3>
              <span className="text-[11px] font-bold text-gray-500 cursor-pointer hover:text-gray-700">View All</span>
            </div>

            {/* Update Card 1 */}
            <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                 <div className="flex items-center gap-2">
                    <span className="bg-[#eff6ff] text-[#3b82f6] text-[8px] font-black uppercase px-2.5 py-1 rounded-[6px] tracking-wider">WELLBEING</span>
                    <span className="text-[10px] font-bold text-gray-400">• 2hrs ago</span>
                 </div>
                 <div className="size-2 rounded-full bg-[#22c55e]" />
              </div>
              <h4 className="text-[14px] font-black text-[#1f1f1f] mb-2 leading-snug">Mental Health Awareness Week</h4>
              <p className="text-[11.5px] font-medium text-gray-500 leading-relaxed mb-4">Join us for a series of workshop focused on resilience and mindfulness of both students and ..</p>
              
              <div className="h-[1px] w-full bg-blue-100/50 mb-4" />
              
              <div className="flex items-center gap-2">
                 <div className="size-6 rounded-full bg-cover bg-center" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=5")' }} />
                 <span className="text-[10.5px] font-bold text-gray-600">Ms.Radhika sudhakar</span>
              </div>
            </div>

            {/* Update Card 2 */}
            <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                 <div className="flex items-center gap-2">
                    <span className="bg-[#ecfdf5] text-[#10b981] text-[8px] font-black uppercase px-2.5 py-1 rounded-[6px] tracking-wider">SUCCESS</span>
                    <span className="text-[10px] font-bold text-gray-400">• 1 Day ago</span>
                 </div>
              </div>
              <h4 className="text-[14px] font-black text-[#1f1f1f] mb-2 leading-snug">Mental Health Awareness Week</h4>
              <p className="text-[11.5px] font-medium text-gray-500 leading-relaxed mb-4">Join us for a series of workshop focused on resilience and mindfulness of both students and ..</p>
              
              <div className="h-[1px] w-full bg-green-100/50 mb-4" />
              
              <div className="flex items-center gap-2">
                 <div className="size-6 rounded-full bg-cover bg-center" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=5")' }} />
                 <span className="text-[10.5px] font-bold text-gray-600">Ms.Radhika sudhakar</span>
              </div>
            </div>

            {/* Update Card 3 */}
            <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col mb-4">
              <div className="flex items-center justify-between mb-3">
                 <div className="flex items-center gap-2">
                    <span className="bg-[#fefce8] text-[#eab308] text-[8px] font-black uppercase px-2.5 py-1 rounded-[6px] tracking-wider">ACADEMICS</span>
                    <span className="text-[10px] font-bold text-gray-400">• 1 Day ago</span>
                 </div>
              </div>
              <h4 className="text-[14px] font-black text-[#1f1f1f] mb-2 leading-snug">Mental Health Awareness Week</h4>
              <p className="text-[11.5px] font-medium text-gray-500 leading-relaxed mb-4">Join us for a series of workshop focused on resilience and mindfulness of both students and ..</p>
              
              <div className="h-[1px] w-full bg-yellow-100/50 mb-4" />
              
              <div className="flex items-center gap-2">
                 <div className="size-6 rounded-full bg-cover bg-center" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=5")' }} />
                 <span className="text-[10.5px] font-bold text-gray-600">Ms.Radhika sudhakar</span>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-50">
         <BottomNav active="announcements" />
      </div>

    </section>
  );
}
