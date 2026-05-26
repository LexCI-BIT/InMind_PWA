import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TeacherDock } from '../../components/TeacherDock';

export function TeacherProfile() {
  const navigate = useNavigate();

  // Toggle states for notification settings
  const [emotionalAlerts, setEmotionalAlerts] = useState(true);
  const [weeklySummaries, setWeeklySummaries] = useState(true);
  const [parentReports, setParentReports] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState(true);
  const [burnoutDetection, setBurnoutDetection] = useState(true);
  const [studentRiskAlerts, setStudentRiskAlerts] = useState(true);

  // Personalization toggles
  const [darkMode, setDarkMode] = useState(false);
  const [aiPersonalization, setAiPersonalization] = useState(true);

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col bg-[#f7f8fa] font-sans pb-[120px]">

      {/* Decorative top curve */}
      <div className="absolute top-0 left-0 right-0 h-[160px] bg-white rounded-b-[40px]" />

      <div className="relative z-10 px-5 pt-safe pt-8">

        {/* ═══════ Profile Header ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[28px] px-6 py-7 shadow-sm border border-gray-100/60"
        >
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div
                className="w-[60px] h-[60px] rounded-full bg-cover bg-center border-2 border-white shadow-md"
                style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=47")' }}
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-400 rounded-full border-[2.5px] border-white" />
            </div>

            {/* Name + Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-[20px] font-extrabold text-gray-900 leading-tight">Sarah Johnson</h1>
                <button className="shrink-0 px-3 py-1 rounded-full border border-gray-300 text-[11px] font-bold text-gray-700 hover:bg-gray-50 transition">
                  Edit Profile
                </button>
              </div>
              <p className="text-[13px] font-semibold text-gray-500 mt-0.5">Biology Teacher</p>
              <p className="text-[11px] text-gray-400 font-medium">Greenwood High School</p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2 mt-5">
            <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-[11px] font-bold text-emerald-600 border border-emerald-100">
              Wellness 82
            </span>
            <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-[11px] font-bold text-emerald-600 border border-emerald-100">
              8 yrs exp
            </span>
            <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-[11px] font-bold text-emerald-600 border border-emerald-100">
              4 classes
            </span>
          </div>
        </motion.div>

        {/* ═══════ Quick Actions ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="grid grid-cols-2 gap-3 mt-5"
        >
          <button
            onClick={() => navigate('/teacher/checkin-summary')}
            className="bg-white rounded-[24px] py-6 flex flex-col items-center gap-3 shadow-sm border border-gray-100/60 hover:shadow-md transition"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <span className="text-[14px] font-bold text-gray-800">Check-in</span>
          </button>

          <button
            onClick={() => navigate('/teacher/create-quiz')}
            className="bg-white rounded-[24px] py-6 flex flex-col items-center gap-3 shadow-sm border border-gray-100/60 hover:shadow-md transition"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
                <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
              </svg>
            </div>
            <span className="text-[14px] font-bold text-gray-800">Start Quiz</span>
          </button>
        </motion.div>

        {/* ═══════ Classroom Analytics ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-[18px] font-extrabold text-gray-900 mt-8 mb-4">Classroom Analytics</h2>

          {/* Two metric cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100/60">
              <p className="text-[9px] font-extrabold text-gray-400 uppercase tracking-[0.08em]">Student Participation</p>
              <p className="text-[28px] font-black text-gray-900 mt-1 leading-none">79%</p>
              {/* Mini bar chart */}
              <div className="flex items-end gap-[3px] mt-3 h-[24px]">
                <div className="w-[6px] rounded-sm bg-indigo-500" style={{ height: '60%' }} />
                <div className="w-[6px] rounded-sm bg-indigo-500" style={{ height: '80%' }} />
                <div className="w-[6px] rounded-sm bg-emerald-400" style={{ height: '45%' }} />
                <div className="w-[6px] rounded-sm bg-emerald-400" style={{ height: '100%' }} />
                <div className="w-[6px] rounded-sm bg-emerald-400" style={{ height: '70%' }} />
              </div>
              <div className="mt-2 inline-flex px-2 py-0.5 rounded bg-emerald-50 text-[9px] font-bold text-emerald-600">
                +4%
              </div>
            </div>

            <div className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100/60">
              <p className="text-[9px] font-extrabold text-gray-400 uppercase tracking-[0.08em]">Class Engagement</p>
              <p className="text-[28px] font-black text-gray-900 mt-1 leading-none">84%</p>
              <div className="flex items-end gap-[3px] mt-3 h-[24px]">
                <div className="w-[6px] rounded-sm bg-indigo-400" style={{ height: '50%' }} />
                <div className="w-[6px] rounded-sm bg-indigo-500" style={{ height: '75%' }} />
                <div className="w-[6px] rounded-sm bg-indigo-500" style={{ height: '60%' }} />
                <div className="w-[6px] rounded-sm bg-emerald-400" style={{ height: '90%' }} />
                <div className="w-[6px] rounded-sm bg-emerald-400" style={{ height: '100%' }} />
              </div>
              <div className="mt-2 inline-flex px-2 py-0.5 rounded bg-emerald-50 text-[9px] font-bold text-emerald-600">
                +7%
              </div>
            </div>
          </div>

          {/* Progress bars card */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100/60 mt-4">
            <AnalyticsBar label="Emotional Wellness Score" percent="85%" color="bg-emerald-400" />
            <AnalyticsBar label="Reflection consistency" percent="62%" color="bg-indigo-500" />
            <AnalyticsBar label="Quiz completion rate" percent="74%" color="bg-amber-400" />
            <AnalyticsBar label="Classroom stability index" percent="48%" color="bg-pink-500" />
          </div>
        </motion.div>

        {/* ═══════ Classes Managed ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className="text-[18px] font-extrabold text-gray-900 mt-8 mb-4">Classes Managed</h2>

          <div className="bg-white rounded-[24px] px-6 py-5 shadow-sm border border-gray-100/60 flex flex-col gap-6">
            {/* Grade 10A */}
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[15px] font-extrabold text-gray-900">Grade 10A</h3>
                  <p className="text-[11px] text-gray-400 font-medium">32 students</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-500 border border-emerald-100">
                  Stable
                </span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-[11px] font-semibold text-gray-500 shrink-0">Participation</span>
                <div className="flex-1 h-[6px] bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-400 rounded-full" style={{ width: '82%' }} />
                </div>
                <span className="text-[12px] font-bold text-gray-700 shrink-0">82%</span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100" />

            {/* Biology Advanced */}
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[15px] font-extrabold text-gray-900">Biology Advanced</h3>
                  <p className="text-[11px] text-gray-400 font-medium">16 students</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-500 border border-emerald-100">
                  Stable
                </span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-[11px] font-semibold text-gray-500 shrink-0">Participation</span>
                <div className="flex-1 h-[6px] bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: '91%' }} />
                </div>
                <span className="text-[12px] font-bold text-gray-700 shrink-0">91%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═══════ Notification Settings ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-[18px] font-extrabold text-gray-900 mt-8 mb-4">Notification Settings</h2>

          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100/60 overflow-hidden">
            <NotifRow
              iconColor="bg-rose-100"
              title="Emotional alerts"
              sub="Stress spikes & mood drops"
              checked={emotionalAlerts}
              onChange={() => setEmotionalAlerts(!emotionalAlerts)}
            />
            <NotifRow
              iconColor="bg-indigo-100"
              title="Weekly summaries"
              sub="Class & student reports"
              checked={weeklySummaries}
              onChange={() => setWeeklySummaries(!weeklySummaries)}
            />
            <NotifRow
              iconColor="bg-gray-100"
              title="Parent reports"
              sub="Auto-generated summaries"
              checked={parentReports}
              onChange={() => setParentReports(!parentReports)}
            />
            <NotifRow
              iconColor="bg-emerald-100"
              title="AI recommendations"
              sub="Personalized insights"
              checked={aiRecommendations}
              onChange={() => setAiRecommendations(!aiRecommendations)}
            />
            <NotifRow
              iconColor="bg-amber-100"
              title="Burnout detection"
              sub="Early warning system"
              checked={burnoutDetection}
              onChange={() => setBurnoutDetection(!burnoutDetection)}
            />
            <NotifRow
              iconColor="bg-rose-100"
              title="Student risk alerts"
              sub="Flagged for attention"
              checked={studentRiskAlerts}
              onChange={() => setStudentRiskAlerts(!studentRiskAlerts)}
              last
            />
          </div>
        </motion.div>

        {/* ═══════ Personalization ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h2 className="text-[18px] font-extrabold text-gray-900 mt-8 mb-4">Personalization</h2>

          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100/60 overflow-hidden">
            <PersonRow label="Dark mode" right={<Toggle checked={darkMode} onChange={() => setDarkMode(!darkMode)} />} />
            <PersonRow label="Language" right={<span className="text-[13px] font-semibold text-gray-400">English</span>} />
            <PersonRow label="Export reports" />
            <PersonRow label="AI personalization" right={<Toggle checked={aiPersonalization} onChange={() => setAiPersonalization(!aiPersonalization)} />} />
            <PersonRow label="Accessibility" last />
          </div>
        </motion.div>

        {/* ═══════ Account & Privacy ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-[18px] font-extrabold text-gray-900 mt-8 mb-4">Account & privacy</h2>

          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100/60 overflow-hidden">
            <PersonRow label="Privacy policy" />
            <PersonRow label="Student safety" />
            <PersonRow label="Data protection" />
            <PersonRow label="Reset password" />
            <div className="px-6 py-4">
              <button
                onClick={() => navigate('/role')}
                className="text-[14px] font-semibold text-rose-500 hover:text-rose-600 transition"
              >
                Log out
              </button>
            </div>
          </div>
        </motion.div>

      </div>

      <TeacherDock active="profile" />
    </section>
  );
}

/* ─── Analytics Progress Bar ─── */
function AnalyticsBar({ label, percent, color }) {
  return (
    <div className="flex items-center gap-3 mb-3 last:mb-0">
      <span className="text-[11px] font-semibold text-gray-600 w-[160px] shrink-0">{label}</span>
      <div className="flex-1 h-[8px] bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: percent }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full ${color} rounded-full`}
        />
      </div>
    </div>
  );
}

/* ─── Notification Row ─── */
function NotifRow({ iconColor, title, sub, checked, onChange, last }) {
  return (
    <div className={`flex items-center gap-4 px-6 py-4 ${!last ? 'border-b border-gray-50' : ''}`}>
      <div className={`w-9 h-9 rounded-xl ${iconColor} shrink-0`} />
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-bold text-gray-800">{title}</p>
        <p className="text-[11px] text-gray-400 font-medium">{sub}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

/* ─── Personalization Row ─── */
function PersonRow({ label, right, last }) {
  return (
    <div className={`flex items-center justify-between px-6 py-4 ${!last ? 'border-b border-gray-50' : ''}`}>
      <span className="text-[14px] font-semibold text-gray-700">{label}</span>
      {right && right}
    </div>
  );
}

/* ─── Toggle Switch ─── */
function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative inline-flex h-[28px] w-[50px] shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
        checked ? 'bg-indigo-500' : 'bg-gray-200'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-[24px]' : 'translate-x-[2px]'
        } mt-[2px]`}
      />
    </button>
  );
}
