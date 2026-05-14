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
    iconBg: 'bg-brand-purple-soft',
    iconColor: 'text-brand-purple',
    next: '/login',
  },
  {
    id: 'parent',
    title: 'Parent',
    sub: "Understand your child's wellbeing",
    Icon: TreeIcon,
    iconBg: 'bg-neutral-200',
    iconColor: 'text-neutral-700',
    next: '/home',
  },
  {
    id: 'teacher',
    title: 'Teacher',
    sub: 'Support your students effectively',
    Icon: UserCardIcon,
    iconBg: 'bg-neutral-200',
    iconColor: 'text-neutral-700',
    next: '/home',
  },
];

export function RoleSelect() {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const [selected, setSelected] = useState('student');

  const continueToPortal = () => {
    const role = ROLES.find((r) => r.id === selected);
    if (role) {
      setRole(role.id);
      navigate(role.next);
    }
  };

  return (
    <Screen tone="light" className="!bg-brand-cream">
      <div className="flex flex-1 flex-col px-6 pt-safe pt-16">
        <h1 className="mt-6 text-center text-[28px] font-bold lowercase tracking-tight">
          select role
        </h1>

        <div className="mt-10 flex flex-col gap-4">
          {ROLES.map(({ id, title, sub, Icon, iconBg, iconColor }) => {
            const isActive = selected === id;
            return (
              <motion.button
                key={id}
                type="button"
                onClick={() => setSelected(id)}
                whileTap={{ scale: 0.98 }}
                className={[
                  'flex items-center gap-4 rounded-3xl border bg-white px-5 py-4 text-left shadow-sm transition',
                  isActive
                    ? 'border-brand-purple shadow-brand-purple/10'
                    : 'border-neutral-200/80',
                ].join(' ')}
                aria-pressed={isActive}
              >
                <div
                  className={`grid size-12 shrink-0 place-items-center rounded-2xl ${
                    isActive ? 'bg-brand-purple-soft' : iconBg
                  } ${isActive ? 'text-brand-purple' : iconColor}`}
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

        <motion.button
          type="button"
          onClick={continueToPortal}
          whileTap={{ scale: 0.98 }}
          className="mt-auto mb-safe mb-10 w-full rounded-full bg-brand-purple py-4 text-[17px] font-semibold text-white shadow-lg shadow-brand-purple/30 transition hover:brightness-110"
        >
          Continue
        </motion.button>
      </div>
    </Screen>
  );
}

function Radio({ active }) {
  return (
    <span
      aria-hidden="true"
      className={`grid size-6 place-items-center rounded-full border-2 ${
        active ? 'border-brand-purple' : 'border-neutral-300'
      }`}
    >
      {active && <span className="size-3 rounded-full bg-brand-purple" />}
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
