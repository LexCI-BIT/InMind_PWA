import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * ═══════════════════════════════════════════════════════════════════
 *  ChallengeStep — Dynamic Flow Step 6
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Daily challenge acceptance screen.
 *  Student can accept/decline and optionally set a reminder.
 *
 *  Behavioral tracking:
 *    - Hesitation before accepting
 *    - Whether challenge was accepted
 *    - Whether reminder was set
 * ═══════════════════════════════════════════════════════════════════
 */

export function ChallengeStep({ onNext, onTrackTap, onTrackOptionChange, onTrackFirstInteraction, data }) {
  const challengeText = data?.challenge || "Before replying during an\nemotional moment, pause for 5\nsec first";
  const [accepted, setAccepted] = useState(false);
  const [reminder, setReminder] = useState(false);

  const handleAccept = () => {
    if (onTrackTap) onTrackTap();
    if (onTrackOptionChange) onTrackOptionChange(accepted, !accepted);
    if (onTrackFirstInteraction) onTrackFirstInteraction();
    setAccepted(!accepted);
  };

  const handleReminder = () => {
    if (onTrackTap) onTrackTap();
    if (onTrackOptionChange) onTrackOptionChange(`reminder:${reminder}`, `reminder:${!reminder}`);
    setReminder(!reminder);
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-6 pb-8 pt-4 h-full">
      <div className="flex flex-col items-center mt-2">
        
        <div className="mb-4 text-[#8b5cf6]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>

        <h2 className="text-[22px] font-medium leading-tight text-white text-center mb-6">
          Your Challenge for today
        </h2>

        <p className="text-white/90 text-[18px] text-center px-4 mb-8 leading-snug">
          {challengeText}
        </p>

        <p className="text-white/80 text-[16px] text-center mb-10">
          Do you take the challenge for<br />today?
        </p>

        <div className="w-full flex flex-col gap-4 mt-auto mb-10">
          
          <button 
            onClick={handleAccept}
            className="w-full flex items-center justify-between bg-[#181a25]/90 border border-white/5 rounded-2xl p-5 shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="text-[#10b981]">
                <CalendarIcon />
              </div>
              <span className="text-white/90 text-[14px] font-normal">I accept this challenge</span>
            </div>
            <div className={`w-5 h-5 rounded border border-white/40 flex items-center justify-center transition-colors ${accepted ? 'bg-transparent border-[#10b981]' : ''}`}>
              {accepted && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </div>
          </button>

          <div className="w-full flex flex-col bg-[#181a25]/90 border border-white/5 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center gap-4 mb-1">
              <div className="text-[#10b981]">
                <BellIcon />
              </div>
              <span className="text-white/90 text-[14px] font-normal">Reminder(Optional)</span>
            </div>
            <div className="flex items-center justify-between ml-8 mt-1">
              <span className="text-white/50 text-[12px]">Set a reminder for later</span>
              
              <button 
                onClick={handleReminder}
                className={`w-10 h-5 rounded-full relative transition-colors ${reminder ? 'bg-[#10b981]' : 'bg-white/20'}`}
              >
                <div className={`absolute top-0.5 bottom-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${reminder ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => onNext({ accepted, reminder })}
        disabled={!accepted}
        className="w-full mt-auto py-4 rounded-xl flex items-center justify-center gap-2 text-white/90 font-medium text-[16px] disabled:opacity-50 transition-opacity"
        style={{ background: '#191512', border: '1px solid rgba(255,255,255,0.05)' }}
      >
        Next <span>→</span>
      </motion.button>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
