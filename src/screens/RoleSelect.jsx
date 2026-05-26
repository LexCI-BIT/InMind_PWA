import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Screen } from '../components/Screen';
import { useRole } from '../context/RoleContext';

const ROLES = [
  {
    id: 'student',
    title: 'Student',
    sub: 'Track your emotions & grow daily',
    Icon: GraduationIcon,
    iconBg: 'bg-[#ede9fe]',
    iconColor: 'text-[#7c3aed]',
    next: '/student/path-select',
  },
  {
    id: 'parent',
    title: 'Parent',
    sub: "Understand your child's wellbeing",
    Icon: TreeIcon,
    iconBg: 'bg-neutral-200',
    iconColor: 'text-neutral-700',
    next: '/parent/home',
  },
  {
    id: 'teacher',
    title: 'Teacher',
    sub: 'Support your students effectively',
    Icon: UserCardIcon,
    iconBg: 'bg-neutral-200',
    iconColor: 'text-neutral-700',
    next: '/teacher/home',
  },
];

export function RoleSelect() {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const [selected, setSelected] = useState('student');

  const handleRoleClick = (roleId) => {
    setSelected(roleId);
    const role = ROLES.find((r) => r.id === roleId);
    if (role) {
      setRole(role.id);
      navigate(role.next);
    }
  };

  return (
    <Screen tone="dark" className="bg-black">
      <div className="flex flex-1 flex-col px-6 pt-safe pt-16 pb-10">
        <h1 className="mt-12 text-center text-[28px] font-bold tracking-tight text-white">
          Select role
        </h1>

        <div className="mt-10 flex flex-col gap-4">
          {ROLES.map(({ id, title, sub, Icon, iconBg, iconColor }) => {
            const isActive = selected === id;
            return (
              <motion.button
                key={id}
                type="button"
                onClick={() => handleRoleClick(id)}
                whileTap={{ scale: 0.98 }}
                className={[
                  'flex items-center gap-4 rounded-3xl border-2 bg-white px-5 py-4 text-left shadow-sm transition',
                  isActive
                    ? 'border-[#7c3aed]'
                    : 'border-transparent',
                ].join(' ')}
                aria-pressed={isActive}
              >
                <div
                  className={`grid size-12 shrink-0 place-items-center rounded-2xl ${
                    isActive ? 'bg-[#ede9fe]' : iconBg
                  } ${isActive ? 'text-[#7c3aed]' : iconColor}`}
                >
                  <Icon />
                </div>
                <div className="flex-1">
                  <div className="text-[17px] font-semibold text-ink">{title}</div>
                  <div className="text-[13.5px] leading-snug text-neutral-500">{sub}</div>
                </div>
                <Radio active={isActive} />
              </motion.button>
            );
          })}
        </div>
      </div>
    </Screen>
  );
}

function Radio({ active }) {
  return (
    <span
      aria-hidden="true"
      className={`grid size-6 place-items-center rounded-full border-2 ${
        active ? 'border-[#7c3aed]' : 'border-neutral-300'
      }`}
    >
      {active && <span className="size-3 rounded-full bg-[#7c3aed]" />}
    </span>
  );
}

function GraduationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10l9-5 9 5-9 5-9-5z" />
      <path d="M7 12v4c0 1.5 2.5 3 5 3s5-1.5 5-3v-4" />
      <path d="M21 10v6" />
    </svg>
  );
}

function TreeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M8 7l3 9M16 7l-3 9" />
    </svg>
  );
}

function UserCardIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <circle cx="9" cy="11" r="2.5" />
      <path d="M5 17c.8-1.7 2.3-2.5 4-2.5s3.2.8 4 2.5" />
      <path d="M15 10h4M15 14h3" />
    </svg>
  );
}
