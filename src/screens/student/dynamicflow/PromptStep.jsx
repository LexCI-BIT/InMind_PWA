import React from 'react';
import { motion } from 'framer-motion';

export function PromptStep({ onSelect }) {
  return (
    <div className="flex-1 flex flex-col justify-between px-8 pb-12 pt-4">
      <div className="flex flex-col items-center">
        <div className="w-full text-left mb-16">
          <h2 className="text-[26px] font-medium text-white/95 tracking-wide">Hey Aryan</h2>
        </div>

        <div className="w-[64px] h-[64px] rounded-[22px] bg-[#36363a]/80 backdrop-blur-md flex items-center justify-center mb-8 shadow-lg">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 12 C17 12 21 16 21 22 C15 22 11 18 11 12 Z" />
            <path d="M11 12 L16.5 17.5" />
            <path d="M9 10 C5 10 3 8 3 4 C7 4 9 6 9 10 Z" fill="#10b981" stroke="none" />
            <path d="M14 9 C14 5 16 3 20 3 C20 7 18 9 14 9 Z" fill="#10b981" stroke="none" />
          </svg>
        </div>

        <h1 className="text-[28px] font-medium leading-snug text-white text-center mb-6">
          Something <span className="text-[#10b981]">stayed</span> in<br />
          your <span className="text-[#10b981]">mind</span> today
        </h1>

        <p className="text-white/70 text-[17px] font-normal text-center">
          What was it mostly<br />about?
        </p>
      </div>

      <div className="flex flex-col gap-6 mt-12 mb-10 relative">
        {/* Connecting vertical line behind options */}
        <div className="absolute left-1/2 top-4 bottom-4 w-px bg-white/10 -translate-x-1/2 -z-10" />

        <OptionButton
          icon={<UsersIcon />}
          label="Friends"
          color="#f97316"
          onClick={() => onSelect('friends')}
        />
        
        <OptionButton
          icon={<BookIcon />}
          label="School"
          color="#10b981"
          onClick={() => onSelect('school')}
        />
        
        <OptionButton
          icon={<UserIcon />}
          label="Myself"
          color="#3b82f6"
          onClick={() => onSelect('myself')}
        />
      </div>
    </div>
  );
}

function OptionButton({ icon, label, color, onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex flex-col items-center gap-2 z-10"
    >
      <div 
        className="w-[60px] h-[60px] rounded-full flex items-center justify-center backdrop-blur-md"
        style={{ backgroundColor: `${color}30`, border: `1px solid ${color}40` }}
      >
        <div style={{ color: color }}>
          {icon}
        </div>
      </div>
      <span className="text-white/80 text-[13px] font-medium">{label}</span>
    </motion.button>
  );
}

function UsersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      <path d="M8 7h6" />
      <path d="M8 11h8" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
