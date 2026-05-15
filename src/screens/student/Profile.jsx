import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { StudentDock } from '../../components/StudentDock';

/**
 * StudentProfile — full profile page matching mockup:
 *   • Curved amber banner header
 *   • Avatar, name, roll number
 *   • Grade & School badges
 *   • Stats row (Attendance, CGPA, Achievements)
 *   • Edit Profile button
 *   • Personal Information expandable sections
 *   • Account section (change/reset password)
 */

const STUDENT = {
  name: 'Aryan Sharma',
  roll: 5,
  grade: 7,
  school: 'DPS',
  avatar: '/avatar-student.png',
  attendance: '82.4%',
  cgpa: '7.3',
  achievements: 12,
  personal: {
    fullName: 'Aryan Sharma',
    dob: '15 March 2012',
    bloodGroup: 'B+',
    gender: 'Male',
  },
  contact: {
    email: 'aryan.sharma@school.edu',
    phone: '+91 98765 43210',
    address: '42, Sector 15, Gurugram, Haryana',
  },
  academic: {
    class: '7th',
    section: 'A',
    branch: 'Science',
    school: 'Delhi Public School',
  },
  health: {
    weight: '42 kg',
    height: '152 cm',
    medical: 'No known allergies',
  },
};

const INFO_SECTIONS = [
  {
    id: 'personal',
    title: 'Personal Details',
    subtitle: 'Name, Date Of Birth, Blood Group',
    icon: PersonIcon,
    data: STUDENT.personal,
    labels: { fullName: 'Full Name', dob: 'Date of Birth', bloodGroup: 'Blood Group', gender: 'Gender' },
  },
  {
    id: 'contact',
    title: 'Contact Information',
    subtitle: 'Email, Phone Number, Address',
    icon: PhoneIcon,
    data: STUDENT.contact,
    labels: { email: 'Email', phone: 'Phone', address: 'Address' },
  },
  {
    id: 'academic',
    title: 'Academic Information',
    subtitle: 'Class, Section, Branch, School',
    icon: BookIcon,
    data: STUDENT.academic,
    labels: { class: 'Class', section: 'Section', branch: 'Branch', school: 'School' },
  },
  {
    id: 'health',
    title: 'Health Information',
    subtitle: 'Weight, Height, Medical Details',
    icon: HeartIcon,
    data: STUDENT.health,
    labels: { weight: 'Weight', height: 'Height', medical: 'Medical Details' },
  },
];

export function StudentProfile() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(STUDENT.avatar);
  const fileRef = useRef(null);

  const toggle = (id) => setExpanded(prev => prev === id ? null : id);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#1a1a1a] font-sans pb-28">

      {/* ───── Curved Amber Header ───── */}
      <div className="relative">
        {/* Amber curve background */}
        <div className="absolute inset-x-0 top-0 h-[160px] overflow-hidden">
          <div
            className="absolute inset-x-0 top-0 h-[200px] rounded-b-[50%]"
            style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}
          />
        </div>

        {/* Header content */}
        <div className="relative z-10 px-6 pt-safe pt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-white hover:opacity-80 transition"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <h1 className="flex-1 text-center text-[22px] font-bold text-white pr-7">Profile</h1>
        </div>

        {/* Avatar — overlapping the curve */}
        <div className="relative z-10 flex justify-center mt-4 mb-3">
          <div className="relative">
            <div className="size-[90px] rounded-full border-[3px] border-[#f59e0b] overflow-hidden bg-[#333] shadow-xl shadow-black/30">
              <img
                src={avatarUrl}
                alt={STUDENT.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            {/* Change photo button */}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="absolute bottom-0 right-0 grid size-7 place-items-center rounded-full bg-[#f59e0b] border-2 border-[#1a1a1a] shadow-md hover:brightness-110 transition"
              aria-label="Change profile photo"
            >
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-[#1a1a1a]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15.5 3.5a2.12 2.12 0 0 1 3 3L7 18l-4 1 1-4L15.5 3.5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ───── Scrollable Body ───── */}
      <div className="relative z-10 flex-1 overflow-y-auto">

        {/* Name & Roll */}
        <div className="text-center mt-1">
          <h2 className="text-[20px] font-bold text-white">{STUDENT.name}</h2>
          <p className="text-[13px] text-white/50 mt-0.5">Roll No - {STUDENT.roll}</p>
        </div>

        {/* Badges */}
        <div className="flex items-center justify-center gap-3 mt-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2a2a2a] border border-[#3a3a3a] px-3.5 py-1.5 text-[11px] font-bold text-white">
            <svg viewBox="0 0 16 16" className="h-3 w-3 text-[#f59e0b]" fill="currentColor"><path d="M2 2h12v12H2V2zm2 2v8h8V4H4z" /></svg>
            Grade - {STUDENT.grade}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2a2a2a] border border-[#3a3a3a] px-3.5 py-1.5 text-[11px] font-bold text-white">
            <svg viewBox="0 0 16 16" className="h-3 w-3 text-[#f59e0b]" fill="currentColor"><path d="M8 1L1 5v6c0 3.3 3 6 7 9 4-3 7-5.7 7-9V5L8 1z" /></svg>
            School - {STUDENT.school}
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-6 mt-5 px-6">
          <StatItem icon={<AttendanceIcon />} value={STUDENT.attendance} label="Attendance" />
          <StatItem icon={<StarIcon />} value={STUDENT.cgpa} label="CGPA" />
          <StatItem icon={<TrophyIcon />} value={STUDENT.achievements} label="Achievements" />
        </div>

        {/* Edit Profile */}
        <div className="flex justify-center mt-4">
          <motion.button
            type="button"
            onClick={() => setEditMode(!editMode)}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border-2 border-[#f59e0b] px-6 py-2 text-[12px] font-bold text-[#f59e0b] hover:bg-[#f59e0b]/10 transition"
          >
            {editMode ? 'Save Profile' : 'Edit Profile'}
          </motion.button>
        </div>

        {/* ───── Personal Information ───── */}
        <div className="px-6 mt-8">
          <h3 className="text-[17px] font-bold text-white mb-4">Personal Information</h3>

          <div className="flex flex-col gap-3">
            {INFO_SECTIONS.map((section) => {
              const isOpen = expanded === section.id;
              const IconComp = section.icon;
              return (
                <div key={section.id}>
                  <motion.button
                    type="button"
                    onClick={() => toggle(section.id)}
                    className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-[#242424] border border-[#2e2e2e] hover:border-[#3a3a3a] transition"
                  >
                    <div className="grid size-9 place-items-center rounded-xl bg-[#2e2e2e]">
                      <IconComp />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-[13px] font-bold text-white">{section.title}</p>
                      <p className="text-[10px] text-white/35 mt-0.5">{section.subtitle}</p>
                    </div>
                    <motion.svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-white/30 shrink-0"
                      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <polyline points="9 6 15 12 9 18" />
                    </motion.svg>
                  </motion.button>

                  {/* Expandable content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 py-3 mt-1 rounded-2xl bg-[#1f1f1f] border border-[#2a2a2a]">
                          {Object.entries(section.data).map(([key, val]) => (
                            <div key={key} className="flex items-center justify-between py-2 border-b border-[#2a2a2a] last:border-0">
                              <span className="text-[11px] text-white/40 font-medium">{section.labels[key]}</span>
                              {editMode ? (
                                <input
                                  type="text"
                                  defaultValue={val}
                                  className="text-[12px] text-white font-semibold bg-[#2a2a2a] rounded-lg px-2 py-1 w-[140px] text-right border border-[#3a3a3a] focus:border-[#f59e0b] focus:outline-none transition"
                                />
                              ) : (
                                <span className="text-[12px] text-white font-semibold">{val}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* ───── Account ───── */}
        <div className="px-6 mt-8 mb-6">
          <h3 className="text-[17px] font-bold text-white mb-4">Account</h3>

          <div className="flex flex-col gap-3">
            <AccountRow
              icon={<LockIcon />}
              title="Change Password"
              subtitle="Update your account password"
              color="#f59e0b"
            />
            <AccountRow
              icon={<LogoutIcon />}
              title="Log Out"
              subtitle="Sign out of your account"
              color="#ef4444"
              onClick={() => navigate('/role')}
            />
          </div>
        </div>
      </div>

      <StudentDock active="profile" />
    </section>
  );
}

/* ─── Sub-components ─── */

function StatItem({ icon, value, label }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="grid size-9 place-items-center rounded-xl bg-[#2a2a2a]">
        {icon}
      </div>
      <p className="text-[16px] font-extrabold text-white leading-none mt-1">{value}</p>
      <p className="text-[10px] text-white/40 font-medium">{label}</p>
    </div>
  );
}

function AccountRow({ icon, title, subtitle, color, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-[#242424] border border-[#2e2e2e] hover:border-[#3a3a3a] transition text-left"
    >
      <div
        className="grid size-9 place-items-center rounded-xl"
        style={{ background: `${color}15` }}
      >
        <div style={{ color }}>{icon}</div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-bold text-white">{title}</p>
        <p className="text-[10px] text-white/35 mt-0.5">{subtitle}</p>
      </div>
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-white/30 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 6 15 12 9 18" />
      </svg>
    </motion.button>
  );
}

/* ─── Icons ─── */

function PersonIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 text-[#f59e0b]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="7" r="3" />
      <path d="M3 18a7 7 0 0 1 14 0" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 text-[#6366f1]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="10" height="16" rx="2" />
      <line x1="10" y1="15" x2="10" y2="15.01" />
    </svg>
  );
}
function BookIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 text-[#22d3ee]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 4h5a3 3 0 0 1 3 3v10a2 2 0 0 0-2-2H3V4z" />
      <path d="M17 4h-5a3 3 0 0 0-3 3v10a2 2 0 0 1 2-2h6V4z" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 text-[#ef4444]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 17S3 12 3 7.5a3.5 3.5 0 0 1 7 0 3.5 3.5 0 0 1 7 0C17 12 10 17 10 17z" />
    </svg>
  );
}
function AttendanceIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 text-[#f59e0b]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="14" height="14" rx="2" />
      <path d="M7 10l2 2 4-4" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 text-[#f59e0b]" fill="currentColor">
      <path d="M10 1l2.47 5.01L18 6.9l-4 3.9.94 5.5L10 13.77l-4.94 2.6L6 10.8l-4-3.9 5.53-.87L10 1z" />
    </svg>
  );
}
function TrophyIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 text-[#f59e0b]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2h8v6a4 4 0 0 1-8 0V2z" />
      <path d="M6 4H3v2a3 3 0 0 0 3 3" />
      <path d="M14 4h3v2a3 3 0 0 1-3 3" />
      <line x1="10" y1="12" x2="10" y2="15" />
      <path d="M7 15h6" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="9" width="10" height="8" rx="2" />
      <path d="M7 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  );
}
function LogoutIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3" />
      <polyline points="11 15 15 10 11 5" />
      <line x1="15" y1="10" x2="7" y2="10" />
    </svg>
  );
}
