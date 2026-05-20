import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ActivityFrame, BackButton, BottomControls, BreathingOrb, DurationButton } from './activityVisuals';

const DURATIONS = [5, 10, 15, 20];

function pad(n) {
  return String(n).padStart(2, '0');
}

function formatTime(sec) {
  return `${Math.floor(sec / 60)}:${pad(sec % 60)}`;
}

function getBreathPhase(second) {
  const beat = second % 14;
  if (beat < 4) return 'Inhale';
  if (beat < 8) return 'Hold';
  return 'Exhale';
}

export function Breathing({ onBack }) {
  const [selectedMinutes, setSelectedMinutes] = useState(5);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const intervalRef = useRef(null);

  const totalSeconds = selectedMinutes * 60;
  const elapsed = totalSeconds - timeLeft;
  const phase = useMemo(() => getBreathPhase(elapsed), [elapsed]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (!sessionStarted || !running || timeLeft <= 0) return undefined;
    intervalRef.current = setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          return 0;
        }
        return value - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [running, sessionStarted, timeLeft]);

  const handleBack = () => {
    if (sessionStarted) {
      setSessionStarted(false);
      setRunning(false);
      setTimeLeft(totalSeconds);
      return;
    }
    if (onBack) onBack();
  };

  const handleDuration = (minutes) => {
    setSelectedMinutes(minutes);
    setTimeLeft(minutes * 60);
  };

  const handleStart = () => {
    setTimeLeft(totalSeconds);
    setSessionStarted(true);
    setRunning(true);
  };

  const handleEnd = () => {
    setSessionStarted(false);
    setRunning(false);
    setTimeLeft(totalSeconds);
  };

  const handleRestart = () => {
    setTimeLeft(totalSeconds);
    setRunning(true);
  };

  if (sessionStarted) {
    return (
      <ActivityFrame>
        <div className="relative z-10 px-4 pt-safe pt-4">
          <BackButton onClick={handleBack} />
        </div>

        <div className="relative z-10 mt-1 text-center">
          <h1 className="text-[25px] font-semibold leading-none text-[#28cfff]">Breathing</h1>
          <p className="mt-4 text-[10px] font-medium text-white/70">Follow the rhythm</p>
        </div>

        <div className="relative z-10 mt-9">
          <BreathingOrb size={232} active={running} phase={phase} />
        </div>

        <div className="relative z-10 mt-3 text-center">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[27px] font-bold leading-none text-[#8beaff]"
            style={{ textShadow: '0 0 8px #35ccff, 0 2px 0 #0c4c68' }}
          >
            {phase}
          </motion.div>
          <div
            className="mt-1 text-[30px] font-extrabold leading-none text-[#8beaff] tabular-nums"
            style={{ textShadow: '0 0 8px #35ccff, 0 2px 0 #0c4c68' }}
          >
            {formatTime(timeLeft)}
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-8 grid w-[300px] grid-cols-3 text-center text-[14px] font-bold leading-tight text-[#8beaff]"
             style={{ textShadow: '0 0 8px rgba(53,204,255,0.4)' }}>
          <div>Inhale<br /><span className="mt-1 block text-[12px]">4 sec</span></div>
          <div>Hold<br /><span className="mt-1 block text-[12px]">4 sec</span></div>
          <div>Exhale<br /><span className="mt-1 block text-[12px]">6 sec</span></div>
        </div>

        <div className="flex-1" />

        <BottomControls
          running={running}
          onEnd={handleEnd}
          onPause={() => setRunning((value) => !value)}
          onRestart={handleRestart}
        />
      </ActivityFrame>
    );
  }

  return (
    <ActivityFrame>
      <div className="relative z-10 flex-shrink-0 px-4 pt-safe pt-4">
        <BackButton onClick={handleBack} />
      </div>

      <div className="relative z-10 flex-shrink-0 px-6 pt-4">
        <h1 className="max-w-[320px] text-[26px] font-bold leading-[1.08] tracking-tight text-white">
          <span className="text-[#28cfff]">Breathe</span> In Calm,<br />
          breathe out stress.
        </h1>
        <p className="mt-3 text-[11px] font-medium text-white/70">Follow the guide to find your rhythm</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center min-h-[300px]">
        <div className="relative z-10">
          <BreathingOrb size={260} />
        </div>
        <div className="relative z-10 mt-6 text-center">
          <div
            className="text-[32px] font-bold leading-none text-[#8beaff]"
            style={{ textShadow: '0 0 12px rgba(53,204,255,0.4)' }}
          >
            Inhale
          </div>
          <div
            className="mt-2 text-[42px] font-extrabold leading-none text-[#8beaff] tabular-nums tracking-tight"
            style={{ textShadow: '0 0 12px rgba(53,204,255,0.4)' }}
          >
            {selectedMinutes}:00
          </div>
        </div>
      </div>

      <div className="relative z-10 flex-shrink-0 px-4">
        <h2 className="text-[16px] font-semibold text-white">Choose Duration</h2>
        <div className="mt-4 flex items-center justify-between">
          {DURATIONS.map((minutes) => (
            <DurationButton
              key={minutes}
              minutes={minutes}
              selected={selectedMinutes === minutes}
              accent="#74dcff"
              onClick={() => handleDuration(minutes)}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-8 mb-4 flex flex-shrink-0 justify-center px-4 pb-safe pb-2">
        <motion.button
          type="button"
          onClick={handleStart}
          whileTap={{ scale: 0.97 }}
          className="flex h-[56px] w-full max-w-[320px] items-center justify-center gap-2 rounded-[16px] bg-gradient-to-r from-[#28cfff] to-[#37bdf5] px-6 text-[18px] font-bold text-white shadow-[0_0_24px_rgba(40,207,255,0.35)] transition"
        >
          Start Breathing
          <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12h16" />
            <path d="M14 6l6 6-6 6" />
          </svg>
        </motion.button>
      </div>
    </ActivityFrame>
  );
}
