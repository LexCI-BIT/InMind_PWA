import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { StudentDock } from '../../components/StudentDock';
import { useRole } from '../../context/RoleContext';
import { getMe, updateMe, listQuizzes, clearAuthSession } from '../../lib/api';

/**
 * StudentProfile — real profile, fetched from GET /auth/me.
 *   • Header, name, roll, grade, school from the users + students rows.
 *   • Personal / Contact / Academic / Health sections from real columns.
 *   • Stats computed from the student's real quiz attempts.
 *   • Edit Profile persists changes via PATCH /auth/me.
 */

// Each editable field maps to a DB column: scope 'user' → users table,
// 'detail' → the students table.
const SECTIONS = [
  {
    id: 'personal', title: 'Personal Details', subtitle: 'Name, Date of Birth, Blood Group', icon: PersonIcon,
    fields: [
      { col: 'full_name', scope: 'user', label: 'Full Name' },
      { col: 'date_of_birth', scope: 'detail', label: 'Date of Birth', type: 'date' },
      { col: 'blood_group', scope: 'detail', label: 'Blood Group' },
    ],
  },
  {
    id: 'contact', title: 'Contact Information', subtitle: 'Email, Phone, School Email', icon: PhoneIcon,
    fields: [
      { col: 'email', scope: 'user', label: 'Email', readOnly: true },
      { col: 'phone_number', scope: 'user', label: 'Phone' },
      { col: 'school_email', scope: 'detail', label: 'School Email' },
    ],
  },
  {
    id: 'academic', title: 'Academic Information', subtitle: 'Class, Section, Board, School', icon: BookIcon,
    fields: [
      { col: 'class_name', scope: 'detail', label: 'Class' },
      { col: 'section', scope: 'detail', label: 'Section' },
      { col: 'board', scope: 'detail', label: 'Board' },
      { col: 'school_name', scope: 'detail', label: 'School' },
    ],
  },
  {
    id: 'health', title: 'Health & Guardian', subtitle: 'Height, Weight, Parent details', icon: HeartIcon,
    fields: [
      { col: 'height', scope: 'detail', label: 'Height' },
      { col: 'weight', scope: 'detail', label: 'Weight' },
      { col: 'parents_name', scope: 'detail', label: 'Parent / Guardian' },
      { col: 'parents_phone', scope: 'detail', label: 'Parent Phone' },
    ],
  },
];

const DETAIL_COLS = [
  'roll_number', 'school_email', 'school_name', 'board', 'class_name', 'section',
  'date_of_birth', 'blood_group', 'height', 'weight', 'parents_name', 'parents_phone', 'profile_photo_url',
];

function buildForm(user = {}, detail = {}) {
  const form = {
    full_name: user.full_name || '',
    email: user.email || '',
    phone_number: user.phone_number || '',
  };
  DETAIL_COLS.forEach((c) => { form[c] = (detail && detail[c]) || ''; });
  return form;
}

function fmtDate(v) {
  if (!v) return '';
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return v;
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
}

function initials(name, email) {
  const src = (name || email || '?').trim();
  const parts = src.split(/[\s@.]+/).filter(Boolean);
  return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase() || '?';
}

export function StudentProfile() {
  const navigate = useNavigate();
  const { clearRole } = useRole();
  const fileRef = useRef(null);

  const [form, setForm] = useState(null);
  const [stats, setStats] = useState({ quizzes: 0, avg: 0, best: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    Promise.all([getMe(), listQuizzes().catch(() => [])])
      .then(([me, quizzes]) => {
        if (!active) return;
        setForm(buildForm(me.user, me.detail));
        const attempts = (Array.isArray(quizzes) ? quizzes : [])
          .map((q) => q.my_attempt)
          .filter(Boolean);
        const pcts = attempts.map((a) => Number(a.percentage) || 0);
        setStats({
          quizzes: attempts.length,
          avg: pcts.length ? Math.round(pcts.reduce((s, p) => s + p, 0) / pcts.length) : 0,
          best: pcts.length ? Math.round(Math.max(...pcts)) : 0,
        });
      })
      .catch((e) => active && setError(e.message || 'Could not load your profile.'))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  const toggle = (id) => setExpanded((p) => (p === id ? null : id));
  const setField = (col, val) => setForm((f) => ({ ...f, [col]: val }));

  async function handleEditSave() {
    if (!editMode) { setEditMode(true); return; }
    // Save
    const detail = {};
    DETAIL_COLS.forEach((c) => { if (c !== 'profile_photo_url') detail[c] = form[c] || null; });
    try {
      setSaving(true);
      const me = await updateMe({
        full_name: form.full_name || null,
        phone_number: form.phone_number || null,
        detail,
      });
      setForm(buildForm(me.user, me.detail));
      setEditMode(false);
      setError('');
    } catch (e) {
      setError(e.message || 'Could not save changes.');
    } finally {
      setSaving(false);
    }
  }

  function handleLogout() {
    clearAuthSession();
    clearRole();
    navigate('/role');
  }

  function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (file) setField('profile_photo_url', URL.createObjectURL(file));
  }

  if (loading) {
    return (
      <section className="mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col items-center justify-center gap-4 bg-[#1a1a1a] text-white">
        <div className="size-10 animate-spin rounded-full border-[3px] border-white/15 border-t-amber-400" />
        <p className="text-[13px] font-medium text-white/50">Loading your profile…</p>
      </section>
    );
  }

  if (error && !form) {
    return (
      <section className="mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col items-center justify-center gap-3 bg-[#1a1a1a] px-8 text-center text-white">
        <p className="text-[14px] font-semibold">Couldn't load profile</p>
        <p className="text-[12px] text-white/50">{error}</p>
        <button onClick={() => navigate('/student/home')} className="mt-2 rounded-full bg-white/10 px-5 py-2.5 text-[13px] font-bold text-white">Back home</button>
      </section>
    );
  }

  const displayName = form.full_name || (form.email ? form.email.split('@')[0] : 'Student');
  const roll = form.roll_number || '—';
  const grade = form.class_name || '—';
  const school = form.school_name || '—';

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-[#1a1a1a] font-sans pb-28">

      {/* ───── Curved Amber Header ───── */}
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-[160px] overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[200px] rounded-b-[50%]" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }} />
        </div>

        <div className="relative z-10 px-6 pt-safe pt-6 flex items-center gap-3">
          <button type="button" onClick={() => navigate('/student/home')} className="p-2 -ml-2 text-white hover:opacity-80 transition">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <h1 className="flex-1 text-center text-[22px] font-bold text-white pr-7">Profile</h1>
        </div>

        {/* Avatar */}
        <div className="relative z-10 flex justify-center mt-4 mb-3">
          <div className="relative">
            <div className="size-[90px] rounded-full border-[3px] border-[#f59e0b] overflow-hidden bg-[#333] shadow-xl shadow-black/30 grid place-items-center">
              {form.profile_photo_url ? (
                <img src={form.profile_photo_url} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[28px] font-extrabold text-white/90">{initials(form.full_name, form.email)}</span>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            <button type="button" onClick={() => fileRef.current?.click()} className="absolute bottom-0 right-0 grid size-7 place-items-center rounded-full bg-[#f59e0b] border-2 border-[#1a1a1a] shadow-md hover:brightness-110 transition" aria-label="Change profile photo">
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-[#1a1a1a]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.5 3.5a2.12 2.12 0 0 1 3 3L7 18l-4 1 1-4L15.5 3.5z" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* ───── Body ───── */}
      <div className="relative z-10 flex-1 overflow-y-auto">

        {/* Name & Roll */}
        <div className="text-center mt-1">
          <h2 className="text-[20px] font-bold text-white capitalize">{displayName}</h2>
          <p className="text-[13px] text-white/50 mt-0.5">Roll No - {roll}</p>
        </div>

        {/* Badges */}
        <div className="flex items-center justify-center gap-3 mt-3 px-6 flex-wrap">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2a2a2a] border border-[#3a3a3a] px-3.5 py-1.5 text-[11px] font-bold text-white">
            <svg viewBox="0 0 16 16" className="h-3 w-3 text-[#f59e0b]" fill="currentColor"><path d="M2 2h12v12H2V2zm2 2v8h8V4H4z" /></svg>
            Class - {grade}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2a2a2a] border border-[#3a3a3a] px-3.5 py-1.5 text-[11px] font-bold text-white max-w-[200px] truncate">
            <svg viewBox="0 0 16 16" className="h-3 w-3 shrink-0 text-[#f59e0b]" fill="currentColor"><path d="M8 1L1 5v6c0 3.3 3 6 7 9 4-3 7-5.7 7-9V5L8 1z" /></svg>
            {school}
          </span>
        </div>

        {/* Stats — real, from quiz attempts */}
        <div className="flex items-center justify-center gap-6 mt-5 px-6">
          <StatItem icon={<BookIcon />} value={stats.quizzes} label="Quizzes" />
          <StatItem icon={<StarIcon />} value={`${stats.avg}%`} label="Avg Score" />
          <StatItem icon={<TrophyIcon />} value={`${stats.best}%`} label="Best" />
        </div>

        {/* Edit / Save */}
        <div className="flex justify-center mt-4">
          <motion.button
            type="button"
            onClick={handleEditSave}
            disabled={saving}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border-2 border-[#f59e0b] px-6 py-2 text-[12px] font-bold text-[#f59e0b] hover:bg-[#f59e0b]/10 transition disabled:opacity-60"
          >
            {saving ? 'Saving…' : editMode ? 'Save Profile' : 'Edit Profile'}
          </motion.button>
        </div>

        {error && form && (
          <p className="text-center text-[11px] font-semibold text-red-400 mt-3 px-6">{error}</p>
        )}

        {/* ───── Personal Information ───── */}
        <div className="px-6 mt-8">
          <h3 className="text-[17px] font-bold text-white mb-4">Personal Information</h3>
          <div className="flex flex-col gap-3">
            {SECTIONS.map((section) => {
              const isOpen = expanded === section.id;
              const IconComp = section.icon;
              return (
                <div key={section.id}>
                  <motion.button type="button" onClick={() => toggle(section.id)} className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-[#242424] border border-[#2e2e2e] hover:border-[#3a3a3a] transition">
                    <div className="grid size-9 place-items-center rounded-xl bg-[#2e2e2e]"><IconComp /></div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-[13px] font-bold text-white">{section.title}</p>
                      <p className="text-[10px] text-white/35 mt-0.5">{section.subtitle}</p>
                    </div>
                    <motion.svg viewBox="0 0 24 24" className="h-4 w-4 text-white/30 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                      <polyline points="9 6 15 12 9 18" />
                    </motion.svg>
                  </motion.button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                        <div className="px-4 py-3 mt-1 rounded-2xl bg-[#1f1f1f] border border-[#2a2a2a]">
                          {section.fields.map((field) => {
                            const raw = form[field.col] || '';
                            const shown = field.type === 'date' ? (fmtDate(raw) || 'Not provided') : (raw || 'Not provided');
                            return (
                              <div key={field.col} className="flex items-center justify-between gap-3 py-2 border-b border-[#2a2a2a] last:border-0">
                                <span className="text-[11px] text-white/40 font-medium shrink-0">{field.label}</span>
                                {editMode && !field.readOnly ? (
                                  <input
                                    type={field.type || 'text'}
                                    value={raw}
                                    onChange={(e) => setField(field.col, e.target.value)}
                                    className="text-[12px] text-white font-semibold bg-[#2a2a2a] rounded-lg px-2 py-1 w-[150px] text-right border border-[#3a3a3a] focus:border-[#f59e0b] focus:outline-none transition"
                                  />
                                ) : (
                                  <span className={`text-[12px] font-semibold text-right ${raw ? 'text-white' : 'text-white/30'}`}>{shown}</span>
                                )}
                              </div>
                            );
                          })}
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
            <AccountRow icon={<LockIcon />} title="Change Password" subtitle="Update your account password" color="#f59e0b" />
            <AccountRow icon={<LogoutIcon />} title="Log Out" subtitle="Sign out of your account" color="#ef4444" onClick={handleLogout} />
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
      <div className="grid size-9 place-items-center rounded-xl bg-[#2a2a2a]">{icon}</div>
      <p className="text-[16px] font-extrabold text-white leading-none mt-1">{value}</p>
      <p className="text-[10px] text-white/40 font-medium">{label}</p>
    </div>
  );
}

function AccountRow({ icon, title, subtitle, color, onClick }) {
  return (
    <motion.button type="button" onClick={onClick} whileTap={{ scale: 0.98 }} className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-[#242424] border border-[#2e2e2e] hover:border-[#3a3a3a] transition text-left">
      <div className="grid size-9 place-items-center rounded-xl" style={{ background: `${color}15` }}>
        <div style={{ color }}>{icon}</div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-bold text-white">{title}</p>
        <p className="text-[10px] text-white/35 mt-0.5">{subtitle}</p>
      </div>
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-white/30 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
    </motion.button>
  );
}

/* ─── Icons ─── */
function PersonIcon() {
  return (<svg viewBox="0 0 20 20" className="h-4 w-4 text-[#f59e0b]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="7" r="3" /><path d="M3 18a7 7 0 0 1 14 0" /></svg>);
}
function PhoneIcon() {
  return (<svg viewBox="0 0 20 20" className="h-4 w-4 text-[#6366f1]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="10" height="16" rx="2" /><line x1="10" y1="15" x2="10" y2="15.01" /></svg>);
}
function BookIcon() {
  return (<svg viewBox="0 0 20 20" className="h-4 w-4 text-[#22d3ee]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h5a3 3 0 0 1 3 3v10a2 2 0 0 0-2-2H3V4z" /><path d="M17 4h-5a3 3 0 0 0-3 3v10a2 2 0 0 1 2-2h6V4z" /></svg>);
}
function HeartIcon() {
  return (<svg viewBox="0 0 20 20" className="h-4 w-4 text-[#ef4444]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 17S3 12 3 7.5a3.5 3.5 0 0 1 7 0 3.5 3.5 0 0 1 7 0C17 12 10 17 10 17z" /></svg>);
}
function StarIcon() {
  return (<svg viewBox="0 0 20 20" className="h-4 w-4 text-[#f59e0b]" fill="currentColor"><path d="M10 1l2.47 5.01L18 6.9l-4 3.9.94 5.5L10 13.77l-4.94 2.6L6 10.8l-4-3.9 5.53-.87L10 1z" /></svg>);
}
function TrophyIcon() {
  return (<svg viewBox="0 0 20 20" className="h-4 w-4 text-[#f59e0b]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2h8v6a4 4 0 0 1-8 0V2z" /><path d="M6 4H3v2a3 3 0 0 0 3 3" /><path d="M14 4h3v2a3 3 0 0 1-3 3" /><line x1="10" y1="12" x2="10" y2="15" /><path d="M7 15h6" /></svg>);
}
function LockIcon() {
  return (<svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="9" width="10" height="8" rx="2" /><path d="M7 9V6a3 3 0 0 1 6 0v3" /></svg>);
}
function LogoutIcon() {
  return (<svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3" /><polyline points="11 15 15 10 11 5" /><line x1="15" y1="10" x2="7" y2="10" /></svg>);
}
