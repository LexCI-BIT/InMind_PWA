import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ParentDock } from '../../components/ParentDock';

export function ParentProfile() {
  const navigate = useNavigate();

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#f8f9fa] font-sans pb-[100px]">

      {/* ───── Header Card ───── */}
      <div className="bg-gradient-to-b from-[#0f4e7c] to-[#03335e] pt-safe pt-16 pb-6 relative overflow-hidden shadow-sm">
        <div className="relative z-10 flex flex-col items-center">
          <div className="size-[68px] rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#4338ca] grid place-items-center text-white font-bold text-[26px] mb-3 shadow-lg tracking-wide">
            PS
          </div>
          <h1 className="text-[22px] font-bold text-white mb-1.5 tracking-wide">Priya Sharma</h1>
          <p className="text-[10px] font-medium text-blue-100/80 mb-4">Parent · Connected since Jan 2026</p>
          
          <div className="bg-white rounded-full px-3 py-1.5 shadow-sm">
            <div className="flex items-center gap-1.5">
              <div className="size-[5px] rounded-full bg-[#22c55e]" />
              <span className="text-[9px] font-bold text-[#1a1a1a]">Aarav Sharma - Grade 7B</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pt-8 space-y-7">
        
        {/* ───── Notifications ───── */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wide mb-3 pl-1">
            Notifications
          </h3>
          <div className="bg-white rounded-[16px] shadow-sm border border-gray-100 overflow-hidden">
            
            {/* Item 1 */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="size-9 rounded-[10px] bg-[#e0e7ff]" />
                <span className="text-[13px] font-bold text-[#1a1a1a]">Weekly Reports</span>
              </div>
              <span className="text-[12px] font-bold text-[#22c55e]">On</span>
            </div>

            {/* Item 2 */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="size-9 rounded-[10px] bg-[#ffedd5]" />
                <span className="text-[13px] font-bold text-[#1a1a1a]">Insight Alerts</span>
              </div>
              <span className="text-[12px] font-bold text-[#22c55e]">On</span>
            </div>

            {/* Item 3 */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="size-9 rounded-[10px] bg-[#dcfce7]" />
                <span className="text-[13px] font-bold text-[#1a1a1a]">Challenge Milestones</span>
              </div>
              <span className="text-[12px] font-bold text-[#94a3b8]">Off</span>
            </div>

          </div>
        </motion.div>

        {/* ───── Report Preferences ───── */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wide mb-3 pl-1">
            Report Preferences
          </h3>
          <div className="bg-white rounded-[16px] shadow-sm border border-gray-100 overflow-hidden">
            
            {/* Item 1 */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="size-9 rounded-[10px] bg-[#f5f3ff]" />
                <span className="text-[13px] font-bold text-[#1a1a1a]">Emotional Report Format</span>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="size-9 rounded-[10px] bg-[#e0e7ff]" />
                <span className="text-[13px] font-bold text-[#1a1a1a]">Report Frequency</span>
              </div>
              <span className="text-[12px] font-bold text-[#64748b]">Weekly</span>
            </div>

          </div>
        </motion.div>

        {/* ───── Privacy & Account ───── */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wide mb-3 pl-1">
            Privacy & Account
          </h3>
          <div className="bg-white rounded-[16px] shadow-sm border border-gray-100 overflow-hidden">
            
            {/* Item 1 */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="size-9 rounded-[10px] bg-[#f1f5f9]" />
                <span className="text-[13px] font-bold text-[#1a1a1a]">Privacy Settings</span>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="size-9 rounded-[10px] bg-[#f1f5f9]" />
                <span className="text-[13px] font-bold text-[#1a1a1a]">Data & Security</span>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="size-9 rounded-[10px] bg-[#f1f5f9]" />
                <span className="text-[13px] font-bold text-[#1a1a1a]">Help & Support</span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* ───── Sign Out Button ───── */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="pb-[40px]"
        >
          <button 
            onClick={() => navigate('/role')}
            className="w-full bg-[#fee2e2] hover:bg-red-200 text-[#dc2626] font-bold text-[15px] py-4 rounded-[16px] transition shadow-sm border border-red-200"
          >
            Sign Out
          </button>
        </motion.div>

      </div>

      <ParentDock />

    </section>
  );
}
