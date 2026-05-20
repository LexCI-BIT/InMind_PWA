import { useEffect, useRef, useState } from 'react';
import {
  ActivityFrame,
  BackButton,
  BottomControls,
  NeonLotusIcon,
  MeditationScene,
  NeonMindIcon,
  NeonMeditateIcon,
  OptionRow,
} from './activityVisuals';

const SESSIONS = [
  { id: 'calm', title: 'Clam Mind', minutes: 10, icon: <NeonMindIcon /> },
  { id: 'mindful', title: 'Mindful Meditation', minutes: 20, icon: <NeonMeditateIcon /> },
  { id: 'relax', title: 'Deep Relaxation', minutes: 30, icon: <NeonLotusIcon /> },
];

function pad(n) {
  return String(n).padStart(2, '0');
}

function formatTime(sec) {
  return `${Math.floor(sec / 60)}:${pad(sec % 60)}`;
}

export function Meditation({ onBack }) {
  const [selectedId, setSelectedId] = useState('calm');
  const [sessionStarted, setSessionStarted] = useState(false);
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const intervalRef = useRef(null);

  const selected = SESSIONS.find((session) => session.id === selectedId) || SESSIONS[0];
  const totalSeconds = selected.minutes * 60;
  const completion = totalSeconds ? Math.round(((totalSeconds - timeLeft) / totalSeconds) * 100) : 0;

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
          <h1 className="text-[26px] font-semibold leading-none text-[#9b35ff]">Meditation</h1>
          <p className="mt-3 text-[11px] text-white/80">
            {selected.title} <span className="mx-1">•</span> {selected.minutes} min
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center min-h-[300px]">
          <div className="relative z-10 w-full">
            <MeditationScene />
          </div>

          <div className="relative z-10 mt-6 w-full text-center">
            <div className="text-[56px] font-bold leading-none tracking-tight text-white tabular-nums">{formatTime(timeLeft)}</div>
            <div className="mt-3 text-[12px] font-medium text-white/60">Time Left</div>
            <div className="mx-auto mt-5 h-[8px] w-[260px] overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-[#a855f7] transition-all duration-1000 ease-linear"
                style={{ width: `${Math.max(completion, 4)}%` }}
              />
            </div>
            <div className="mt-4 text-[11px] font-medium text-white/60">{completion}% Completed</div>
          </div>
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

      <div className="relative z-10 flex-shrink-0 px-6 pt-7">
        <h1 className="max-w-[300px] text-[26px] font-bold leading-[1.12] tracking-tight text-white">
          Find your clam,<br />
          <span className="text-[#9b35ff]">Aryan.</span>
        </h1>
        <p className="mt-3 max-w-[220px] text-[11px] font-medium leading-snug text-white/70">
          Take a few minutes to pause and reconnect with yourself
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center min-h-[200px]">
        <div className="relative z-10 w-full">
          <MeditationScene />
        </div>
      </div>

      <div className="relative z-10 flex-shrink-0 px-4 pb-safe pb-6">
        <h2 className="mb-4 text-[16px] font-semibold text-white">Choose Duration</h2>
        <div className="space-y-[12px]">
          {SESSIONS.map((session) => (
            <OptionRow
              key={session.id}
              icon={session.icon}
              title={session.title}
              subtitle={`${session.minutes} min`}
              accent="#9b35ff"
              selected={selectedId === session.id}
              onClick={() => startSession(session.id)}
            />
          ))}
        </div>
      </div>
    </ActivityFrame>
  );
}
