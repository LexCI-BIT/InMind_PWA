import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { SplashLogo } from './screens/SplashLogo';
import { SplashWordmark } from './screens/SplashWordmark';
import { Onboarding } from './screens/Onboarding';

import { RoleSelect } from './screens/RoleSelect';
import { StudentLogin } from './screens/student/Login';
import { FocusSelect } from './screens/student/FocusSelect';
import { Academic } from './screens/student/Academic';
import { MoodCheck } from './screens/student/MoodCheck';
import { MoodReason } from './screens/student/MoodReason';
import { StudentHome } from './screens/student/Home';
import { Insights } from './screens/student/Insights';
import { Journal } from './screens/student/journal/Journal';
import { JournalEntry } from './screens/student/journal/JournalEntry';
import { Quiz } from './screens/student/quiz/Quiz';
import { QuizComplete } from './screens/student/quiz/QuizComplete';
import { ShareThought } from './screens/student/share/ShareThought';
import { DailyChallenges } from './screens/student/challenges/DailyChallenges';
import { Workshop } from './screens/student/Workshop';
import { AudioSpace } from './screens/student/AudioSpace';
import { Notifications } from './screens/student/Notifications';
import { Activities } from './screens/student/Activities';
import { Breathing } from './screens/student/Breathing';
import { Streaks } from './screens/student/Streaks';
import { ParentHome } from './screens/parent/Home';
import { ParentAnnouncements } from './screens/parent/ParentAnnouncements';
import { ParentInsights } from './screens/parent/ParentInsights';
import { ParentProfile } from './screens/parent/ParentProfile';
import { TeacherHome } from './screens/teacher/Home';
import { QuizManager } from './screens/teacher/QuizManager';
import { QuizSessions } from './screens/teacher/QuizSessions';
import { QuizCreation } from './screens/teacher/QuizCreation';
import { ClassAnalytics } from './screens/teacher/ClassAnalytics';
import { TeacherProfile } from './screens/teacher/TeacherProfile';
import { PriorityStudents } from './screens/teacher/PriorityStudents';
import { CheckInSummary } from './screens/teacher/CheckInSummary';
import { AppreciationScreen } from './screens/teacher/AppreciationScreen';

/**
 * The whole app is wrapped in a HashRouter so it works equally well from
 * a static host AND when launched as an installed PWA from the home screen.
 *
 * Flow:
 *   /                    → SplashLogo (auto → /wordmark)
 *   /wordmark            → SplashWordmark (auto → /onboarding)
 *   /onboarding          → 3-step paged onboarding (Skip / Next → /login)
 *   /login               → email + password (Continue → /role)
 *   /role                → Student / Parent / Teacher picker
 *   /student/mood        → animated mood check
 *   /student/mood-reason → reasons selection post-mood
 *   /student/quiz        → quiz flow
 *   /student/workshop    → workshop flow
 *   /student/audio       → audio space
 *   /student/home        → student dashboard
 *   /parent/home         → parent home (stub)
 *   /teacher/home        → teacher home (stub)
 */
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<SplashLogo />} />
        <Route path="/wordmark" element={<SplashWordmark />} />
        <Route path="/onboarding" element={<Onboarding />} />

        <Route path="/role" element={<RoleSelect />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/focus" element={<FocusSelect />} />
        <Route path="/student/academic" element={<Academic />} />
        <Route path="/student/mood" element={<MoodCheck />} />
        <Route path="/student/mood-reason" element={<MoodReason />} />
        <Route path="/student/home" element={<StudentHome />} />
        <Route path="/student/insights" element={<Insights />} />
        <Route path="/student/journal" element={<Journal />} />
        <Route path="/student/journal/:id" element={<JournalEntry />} />
        <Route path="/student/quiz" element={<Quiz />} />
        <Route path="/student/quiz/complete" element={<QuizComplete />} />
        <Route path="/student/share" element={<ShareThought />} />
        <Route path="/student/challenges" element={<DailyChallenges />} />
        <Route path="/student/workshop" element={<Workshop />} />
        <Route path="/student/audio" element={<AudioSpace />} />
        <Route path="/student/notifications" element={<Notifications />} />
        <Route path="/student/activities" element={<Activities />} />
        <Route path="/student/breathing" element={<Breathing />} />
        <Route path="/student/streaks" element={<Streaks />} />
        <Route path="/parent/home" element={<ParentHome />} />
        <Route path="/parent/announcements" element={<ParentAnnouncements />} />
        <Route path="/parent/insights" element={<ParentInsights />} />
        <Route path="/parent/profile" element={<ParentProfile />} />
        <Route path="/teacher/home" element={<TeacherHome />} />
        <Route path="/teacher/sessions" element={<QuizSessions />} />
        <Route path="/teacher/create-quiz" element={<QuizCreation />} />
        <Route path="/teacher/quiz" element={<QuizManager />} />
        <Route path="/teacher/analytics" element={<ClassAnalytics />} />
        <Route path="/teacher/profile" element={<TeacherProfile />} />
        <Route path="/teacher/priority-students" element={<PriorityStudents />} />
        <Route path="/teacher/checkin-summary" element={<CheckInSummary />} />
        <Route path="/teacher/appreciation" element={<AppreciationScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <main className="min-h-[100dvh] bg-neutral-950">
      <HashRouter>
        <AnimatedRoutes />
      </HashRouter>
    </main>
  );
}
