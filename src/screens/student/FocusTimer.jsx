import { useEffect, useRef, useState } from 'react';
import {
  ActivityFrame,
  BackButton,
  NeonBellIcon,
  NeonBookIcon,
  BottomControls,
  FocusCircle,
  FocusScene,
  OptionRow,
  NeonTargetIcon,
} from './activityVisuals';

const SESSIONS = [
  { id: 'deep', title: 'Deep Work Focus', minutes: 25, icon: <NeonTargetIcon /> },
  { id: 'study', title: 'Study Focus', minutes: 45, icon: <NeonBookIcon /> },
  { id: 'distraction', title: 'Distraction Free', minutes: 90, icon: <NeonBellIcon /> },
];

function pad(n) {
  return String(n).padStart(2, '0');
}

function formatTime(sec) {
  return `${pad(Math.floor(sec / 60))}:${pad(sec % 60)}`;
}

export function FocusTimer({ onBack }) {
  const [selectedId, setSelectedId] = useState('study');
  const [sessionStarted, setSessionStarted] = useState(false);
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const intervalRef = useRef(null);

  const selected = SESSIONS.find((session) => session.id === selectedId) || SESSIONS[1];
  const totalSeconds = selected.minutes * 60;
  const progress = totalSeconds ? timeLeft / totalSeconds : 0;

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

  const selectSession = (id) => {
    const next = SESSIONS.find((session) => session.id === id);
    setSelectedId(id);
    setTimeLeft(next.minutes * 60);
  };

  const startSession = (id) => {
    const next = SESSIONS.find((session) => session.id === id);
    setSelectedId(id);
    setTimeLeft(next.minutes * 60);
    setSessionStarted(true);
    setRunning(true);
  };

  const handleBack = () => {
    if (sessionStarted) {
      setSessionStarted(false);
      setRunning(false);
      setTimeLeft(totalSeconds);
      return;
    }
    if (onBack) onBack();
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
        <div className="relative z-10 flex-shrink-0 px-4 pt-safe pt-4">
          <BackButton onClick={handleBack} />
        </div>

        <div className="relative z-10 mt-6 flex-shrink-0 text-center">
          <h1 className="text-[26px] font-semibold leading-none text-[#ff625e]">Focus</h1>
          <p className="mt-3 text-[11px] text-white/80">
            {selected.title.replace(' Focus', '')} <span className="mx-1">•</span> {selected.minutes} min
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center min-h-[300px]">
          <FocusCircle progress={progress} time={formatTime(timeLeft)} label="Focus Time" />
        </div>

        <div className="relative z-10 flex-shrink-0">
          <BottomControls
            running={running}
            onEnd={handleEnd}
            onPause={() => setRunning((value) => !value)}
            onRestart={handleRestart}
          />
        </div>
      </ActivityFrame>
    );
  }

  return (
    <ActivityFrame>
      <div className="relative z-10 flex-shrink-0 px-4 pt-safe pt-4">
        <BackButton onClick={handleBack} />
      </div>

      <div className="relative z-10 flex-shrink-0 px-6 pt-5">
        <h1 className="max-w-[320px] text-[26px] font-bold leading-[1.1] tracking-tight text-white">
          Let's build your<br />
          <span className="text-[#ff625e]">Focus</span> muscle.
        </h1>
        <p className="mt-3 max-w-[230px] text-[11px] font-medium leading-snug text-white/70">
          Eliminate distractions and stay in zone.
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center min-h-[200px]">
        <div className="relative z-10">
          <FocusScene />
        </div>
      </div>

      <div className="relative z-10 flex-shrink-0 px-5 pb-safe pb-6">
        <h2 className="mb-4 text-[16px] font-semibold text-white">Choose a Focus Session</h2>
        <div className="space-y-[12px]">
          {SESSIONS.map((session) => (
            <OptionRow
              key={session.id}
              icon={session.icon}
              title={session.title}
              subtitle={`${session.minutes} mins`}
              accent="#ff5c55"
              selected={selectedId === session.id}
              onClick={() => {
                selectSession(session.id);
                startSession(session.id);
              }}
            />
          ))}
        </div>
      </div>
    </ActivityFrame>
  );
}
