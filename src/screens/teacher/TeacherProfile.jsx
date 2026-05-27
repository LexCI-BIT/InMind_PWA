import { motion } from 'framer-motion';
import { TeacherDock } from '../../components/TeacherDock';

export function TeacherProfile() {
  const notifications = [
    { icon: '📊', label: 'Weekly Reports', enabled: true, color: 'bg-blue-50' },
    { icon: '💡', label: 'Insight Alerts', enabled: true, color: 'bg-amber-50' },
    { icon: '🎯', label: 'Challenge Milestones', enabled: false, color: 'bg-green-50' },
  ];

  const reportPreferences = [
    { label: 'Emotional Report Format', value: '', color: 'bg-purple-50' },
    { label: 'Report Frequency', value: 'Weekly', color: 'bg-indigo-50' },
  ];

  const privacyOptions = [
    { label: 'Privacy Settings', icon: '🔒' },
    { label: 'Data & Security', icon: '🛡️' },
    { label: 'Help & Support', icon: '❓' },
  ];

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#f5f5f7] font-sans pb-[100px]">

      {/* ───── Header Card ───── */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 pt-safe pt-8 pb-12 px-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-12 -mt-12" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-8 -mb-8" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="size-20 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 grid place-items-center shadow-xl text-white font-bold text-2xl mb-4">
            PS
          </div>
          <h1 className="text-[22px] font-bold text-white mb-1">Priya Sharma</h1>
          <p className="text-[12px] font-medium text-blue-200 mb-4">Parent · Connected since Jan 2025</p>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 grid place-items-center text-white font-bold text-[10px]">
                A
              </div>
              <span className="text-[11px] font-semibold text-white">Aarav Sharma · Grade 7</span>
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ───── Notifications ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-5 -mt-6 mb-6"
      >
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
          <h3 className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Notifications</h3>
          
          <div className="space-y-3">
            {notifications.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`size-10 rounded-xl ${item.color} grid place-items-center text-lg`}>
                    {item.icon}
                  </div>
                  <span className="text-[13px] font-semibold text-[#1a1a1a]">{item.label}</span>
                </div>
                <button 
                  className={`relative w-12 h-6 rounded-full transition-colors ${item.enabled ? 'bg-green-500' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${item.enabled ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ───── Report Preferences ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-5 mb-6"
      >
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Report Preferences</h3>
          
          <div className="space-y-3">
            {reportPreferences.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-[13px] font-semibold text-[#1a1a1a]">{item.label}</span>
                {item.value ? (
                  <span className="text-[12px] font-semibold text-indigo-600">{item.value}</span>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ───── Privacy & Account ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mx-5 mb-6"
      >
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Privacy & Account</h3>
          
          <div className="space-y-2">
            {privacyOptions.map((item, idx) => (
              <button 
                key={idx}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-[13px] font-semibold text-[#1a1a1a]">{item.label}</span>
                </div>
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ───── Sign Out Button ───── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-5 mb-8"
      >
        <button className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold text-[14px] py-4 rounded-2xl transition shadow-sm border border-red-100">
          Sign Out
        </button>
      </motion.div>

      <TeacherDock active="profile" />

    </section>
  );
}
