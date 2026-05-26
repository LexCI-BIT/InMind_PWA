import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeacherDock } from '../../components/TeacherDock';

export function ClassAnalytics() {
  const navigate = useNavigate();
  const [classDropdown, setClassDropdown] = useState(false);
  const [selectedClass, setSelectedClass] = useState('Class 9A');
  const [timeDropdown, setTimeDropdown] = useState(false);
  const [selectedTime, setSelectedTime] = useState('This Week');

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-x-hidden bg-[#f8f9fb] font-sans pb-[100px]">
      
      {/* ───── Header ───── */}
      <div className="flex items-center justify-between px-6 pt-safe pt-8">
        <h1 className="text-[20px] font-extrabold text-[#1f1f1f] leading-tight">Class Analytics</h1>
        <button onClick={() => navigate('/teacher/alerts')} className="relative grid size-11 place-items-center rounded-full bg-[#7c3aed] text-white shadow-md shadow-purple-500/20 hover:bg-[#6d28d9] transition">
          <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
          </svg>
          <span className="absolute right-0 top-0 size-[12px] rounded-full bg-[#ef4444] border-[2.5px] border-[#f8f9fb]" />
        </button>
      </div>

      {/* ───── Filters ───── */}
      <div className="px-6 mt-4 flex items-start gap-3 relative z-40">
        {/* Class Dropdown */}
        <div className="relative">
          <div onClick={() => { setClassDropdown(!classDropdown); setTimeDropdown(false); }} className="flex items-center justify-between bg-white px-3 py-1.5 rounded-[6px] border border-gray-200 shadow-sm min-w-[100px] cursor-pointer hover:bg-gray-50">
            <span className="text-[11.5px] font-bold text-[#1f1f1f]">{selectedClass}</span>
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#7c3aed] ml-2" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6"/></svg>
          </div>
          {classDropdown && (
            <div className="absolute top-[110%] left-0 w-full min-w-max bg-white border border-gray-200 rounded-[6px] shadow-md py-1 z-50">
              {['Class 9A', 'Class 9B', 'Class 9C', 'Class 9D', 'Class 9E', 'Class 9F'].map(cls => (
                <div key={cls} onClick={() => { setSelectedClass(cls); setClassDropdown(false); }} className="px-3 py-1.5 text-[11.5px] font-bold text-[#1f1f1f] hover:bg-gray-50 cursor-pointer">
                  {cls}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Time Dropdown */}
        <div className="relative">
          <div onClick={() => { setTimeDropdown(!timeDropdown); setClassDropdown(false); }} className="flex items-center justify-between bg-white px-3 py-1.5 rounded-[6px] border border-gray-200 shadow-sm min-w-[100px] cursor-pointer hover:bg-gray-50">
            <span className="text-[11.5px] font-bold text-[#1f1f1f]">{selectedTime}</span>
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#7c3aed] ml-2" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6"/></svg>
          </div>
          {timeDropdown && (
            <div className="absolute top-[110%] left-0 w-full min-w-max bg-white border border-gray-200 rounded-[6px] shadow-md py-1 z-50">
              {['This Week', 'This Month'].map(time => (
                <div key={time} onClick={() => { setSelectedTime(time); setTimeDropdown(false); }} className="px-3 py-1.5 text-[11.5px] font-bold text-[#1f1f1f] hover:bg-gray-50 cursor-pointer">
                  {time}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ───── Blue Score Card ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="mx-6 mt-6 rounded-[20px] bg-[#005086] p-5 shadow-lg"
      >
        <div className="flex items-start justify-between">
          {/* Left Side */}
          <div>
            <p className="text-[11px] font-bold text-white tracking-wide">Class 9A Wellness</p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-[36px] font-black text-white leading-none">78</span>
              <span className="text-[14px] font-bold text-white/80">/100 Score</span>
            </div>
            <p className="text-[10px] font-semibold text-white/80 mt-4">32 students - Ms. Kavitha</p>
          </div>
          
          {/* Right Side */}
          <div className="text-right">
            <p className="text-[11px] font-bold text-white tracking-wide">Class Rank</p>
            <div className="mt-1">
              <span className="text-[28px] font-black text-white leading-none">#2</span>
            </div>
            <p className="text-[10px] font-semibold text-white/80 mt-5">of 8 classes</p>
          </div>
        </div>
      </motion.div>

      {/* ───── Metric Cards ───── */}
      <div className="mx-6 mt-4 grid grid-cols-2 gap-3">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100 flex flex-col justify-between">
          <p className="text-[9.5px] font-extrabold text-gray-400 uppercase tracking-wider">PARTICIPATION</p>
          <div className="mt-2">
            <span className="text-[20px] font-black text-[#1f1f1f]">82%</span>
          </div>
          <div className="mt-3 w-fit bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
            <svg viewBox="0 0 24 24" className="h-3 w-3 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            <span className="text-[10px] font-extrabold text-emerald-600">+8%</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100 flex flex-col justify-between">
          <p className="text-[9.5px] font-extrabold text-gray-400 uppercase tracking-wider">REFLECTION RATE</p>
          <div className="mt-2">
            <span className="text-[20px] font-black text-[#1f1f1f]">71%</span>
          </div>
          <div className="mt-3 w-fit bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
            <svg viewBox="0 0 24 24" className="h-3 w-3 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            <span className="text-[10px] font-extrabold text-emerald-600">+3%</span>
          </div>
        </motion.div>
      </div>

      {/* ───── Emotional Trend Bar Chart ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        className="mx-6 mt-4 bg-white rounded-[24px] p-5 shadow-sm border border-gray-100"
      >
        <h3 className="text-[15px] font-bold text-[#1f1f1f] mb-6">Emotional Trend - Week</h3>
        
        {/* Bars */}
        <div className="flex items-end justify-between h-[100px] px-2">
          <TrendBar day="Mon" val="65%" h="65%" color="bg-[#0284c7]" />
          <TrendBar day="Tue" val="78%" h="78%" color="bg-[#10b981]" />
          <TrendBar day="Wed" val="38%" h="38%" color="bg-[#0284c7]" />
          <TrendBar day="Thu" val="73%" h="73%" color="bg-[#10b981]" />
          <TrendBar day="Fri" val="50%" h="50%" color="bg-[#0284c7]" />
          <TrendBar day="Sat" val="79%" h="79%" color="bg-[#10b981]" />
          <TrendBar day="Sun" val="82%" h="82%" color="bg-[#10b981]" />
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-6 px-2">
          <div className="flex items-center gap-2">
            <div className="size-2 bg-[#10b981]" />
            <span className="text-[9.5px] font-extrabold text-gray-500">Positive mood</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 bg-[#0284c7]" />
            <span className="text-[9.5px] font-extrabold text-gray-500">All Moods</span>
          </div>
        </div>
      </motion.div>

      {/* ───── Most Common Emotional State ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="mx-6 mt-4 rounded-[20px] bg-[#e6f4ea] p-4 flex items-center gap-4"
      >
        <div className="text-[38px] leading-none pb-1">😌</div>
        <div className="flex flex-col">
          <p className="text-[9px] font-extrabold text-[#0d9488] uppercase tracking-wide">Most Common Emotional State</p>
          <p className="text-[15px] font-extrabold text-[#1f1f1f] mt-0.5">Calm & Focused</p>
          <p className="text-[10px] font-bold text-[#0d9488] mt-1">Reported by 43% of Class 9A students this week</p>
        </div>
      </motion.div>

      {/* ───── Needs Attention ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        className="mx-6 mt-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[16px] font-bold text-[#1f1f1f]">Needs Attention</h3>
          <span className="text-[11px] font-extrabold text-[#ef4444]">3 Students</span>
        </div>
        
        <div className="flex flex-col gap-3">
          <AttentionRow 
            icon={<WarningIcon color="#ef4444" />}
            iconBg="bg-[#fef2f2]"
            name="Rohan Sharma"
            desc="Stress trend - 3-day streak"
            tag="High"
            tagColor="text-[#ef4444]"
            tagBg="bg-[#fef2f2]"
          />
          <AttentionRow 
            icon={<PauseIcon color="#eab308" />}
            iconBg="bg-[#fefce8]"
            name="Preethi Kumar"
            desc="Reflection drop - 5 days"
            tag="Medium"
            tagColor="text-[#eab308]"
            tagBg="bg-[#fefce8]"
          />
          <AttentionRow 
            icon={<WarningIcon color="#ef4444" />}
            iconBg="bg-[#fef2f2]"
            name="Arjun Verma"
            desc="Low participation - 2 weeks"
            tag="Medium"
            tagColor="text-[#eab308]"
            tagBg="bg-[#fefce8]"
          />
        </div>
      </motion.div>

      {/* ───── Reflection Consistency ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="mx-6 mt-6 bg-white rounded-[24px] p-5 shadow-sm border border-gray-100"
      >
        <h3 className="text-[16px] font-bold text-[#1f1f1f] mb-5">Reflection Consistency</h3>
        
        <div className="flex flex-col gap-4">
          <ProgressRow dotColor="#0284c7" label="Daily check-ins" val="72%" w="w-[72%]" barColor="bg-[#0284c7]" />
          <ProgressRow dotColor="#eab308" label="Mood logs" val="81%" w="w-[81%]" barColor="bg-[#eab308]" />
          <ProgressRow dotColor="#10b981" label="Gratitude journal" val="52%" w="w-[52%]" barColor="bg-[#10b981]" />
          <ProgressRow dotColor="#d946ef" label="Session notes" val="38%" w="w-[38%]" barColor="bg-[#d946ef]" />
        </div>
      </motion.div>

      {/* ───── Participation Tracking Button ───── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
        className="mx-6 mt-6"
      >
        <button
          onClick={() => navigate('/teacher/participation')}
          className="w-full py-4 rounded-[12px] bg-[#0284c7] text-white text-[16px] font-bold shadow-sm hover:bg-[#0369a1] transition flex items-center justify-center gap-2"
        >
          Participation Tracking <span className="text-[18px] leading-none mb-[2px]">→</span>
        </button>
      </motion.div>

      <TeacherDock active="analytics" />
    </section>
  );
}

function TrendBar({ day, val, h, color }) {
  return (
    <div className="flex flex-col items-center gap-1.5 h-full justify-end">
      <span className="text-[8.5px] font-bold text-gray-500">{val}</span>
      <div className={`w-[14px] ${color} rounded-t-[4px]`} style={{ height: h }} />
      <span className="text-[10px] font-bold text-[#1f1f1f] mt-1">{day}</span>
    </div>
  );
}

function AttentionRow({ icon, iconBg, name, desc, tag, tagBg, tagColor }) {
  return (
    <div className="w-full bg-white rounded-[16px] p-4 flex items-center justify-between shadow-sm border border-gray-100">
      <div className="flex items-center gap-3">
        <div className={`grid size-8 place-items-center rounded-lg ${iconBg} shrink-0`}>
          {icon}
        </div>
        <div className="flex flex-col">
          <h4 className="text-[12.5px] font-extrabold text-[#1f1f1f]">{name}</h4>
          <p className="text-[10px] font-semibold text-gray-400 mt-0.5">{desc}</p>
        </div>
      </div>
      <div className={`px-2.5 py-1 rounded-full ${tagBg}`}>
        <span className={`text-[9px] font-extrabold ${tagColor}`}>{tag}</span>
      </div>
    </div>
  );
}

function ProgressRow({ dotColor, label, val, w, barColor }) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2 w-[120px]">
        <span className="size-2 rounded-full" style={{ backgroundColor: dotColor }} />
        <span className="text-[10.5px] font-semibold text-[#1f1f1f]">{label}</span>
      </div>
      <div className="flex-1 h-2 bg-gray-200 rounded-full mx-3 overflow-hidden">
        <div className={`h-full ${w} rounded-full ${barColor}`} />
      </div>
      <span className="text-[10.5px] font-extrabold text-gray-500 w-[24px] text-right">{val}</span>
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
