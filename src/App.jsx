import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { RoleProvider, useRole } from './context/RoleContext';

// ─── Shared / Onboarding ────────────────────────────────────
import { SplashLogo } from './screens/SplashLogo';
import { SplashWordmark } from './screens/SplashWordmark';
import { Onboarding } from './screens/Onboarding';
import { RoleSelect } from './screens/RoleSelect';

// ─── Student (10 Main Routes) ───────────────────────────────
import { StudentLogin } from './screens/student/Login';
import { StudentSignUp } from './screens/student/SignUp';
import { MoodCheck } from './screens/student/MoodCheck';
import { StudentHome } from './screens/student/Home';
import { Journal } from './screens/student/journal/Journal';
import { Quiz } from './screens/student/quiz/Quiz';
import { ShareThought } from './screens/student/share/ShareThought';
import { AudioSpace } from './screens/student/AudioSpace';
import { DailyChallenges } from './screens/student/challenges/DailyChallenges';
import { Workshop } from './screens/student/Workshop';
import { Activities } from './screens/student/Activities';
import { Insights } from './screens/student/Insights';
import DailyCheckinFlow from './screens/student/checkin/DailyCheckinFlow';
import DynamicFlow from './screens/student/dynamicflow/DynamicFlow';

// ─── Student (Sub-routes — accessed from main routes) ───────
import { MoodReason } from './screens/student/MoodReason';
import { JournalEntry } from './screens/student/journal/JournalEntry';
import { QuizComplete } from './screens/student/quiz/QuizComplete';
import { MindLab } from './screens/student/mindlab/MindLab';
import { WeekDetail } from './screens/student/mindlab/WeekDetail';
import { MindLabProgress } from './screens/student/mindlab/MindLabProgress';
import { StudentProfile } from './screens/student/Profile';
import { PathSelect } from './screens/student/PathSelect';
import { Academic } from './screens/student/Academic';
import { WeeklyDetail } from './screens/student/mindlab/WeeklyDetail';
import { Notifications } from './screens/student/Notifications';

// ─── Parent ─────────────────────────────────────────────────
import { ParentHome } from './screens/parent/Home';
import { ParentAnnouncements } from './screens/parent/ParentAnnouncements';
import { ParentProfile } from './screens/parent/ParentProfile';
import { ParentSignUp } from './screens/parent/SignUp';
import { WeeklyTimeline } from './screens/parent/WeeklyTimeline';
import { Challenges } from './screens/parent/Challenges';
import { AwarenessPanel } from './screens/parent/AwarenessPanel';

// ─── Teacher ────────────────────────────────────────────────
import { TeacherHome } from './screens/teacher/Home';
import { QuizManager } from './screens/teacher/QuizManager';
import { QuizSessions } from './screens/teacher/QuizSessions';
import { QuizCreation } from './screens/teacher/QuizCreation';
import { ClassAnalytics } from './screens/teacher/ClassAnalytics';
import { TeacherProfile } from './screens/teacher/TeacherProfile';
import { PriorityStudents } from './screens/teacher/PriorityStudents';
import { CheckInSummary } from './screens/teacher/CheckInSummary';
import { AppreciationScreen } from './screens/teacher/AppreciationScreen';
import { TeacherAlerts } from './screens/teacher/TeacherAlerts';
import { TeacherReport } from './screens/teacher/TeacherReport';
import { ClassComparison } from './screens/teacher/ClassComparison';
import { ParticipationTracking } from './screens/teacher/ParticipationTracking';

/* ─────────────────────────────────────────────────────────────
 *  Role-Aware Redirects
 * ───────────────────────────────────────────────────────────── */

const HOME_MAP = {
  student: '/student/home',
  parent: '/parent/home',
  teacher: '/teacher/home',
};

const LOGIN_MAP = {
  student: '/student/home',
  parent: '/parent/home',
  teacher: '/teacher/home',
};

function HomeRedirect() {
  const { role } = useRole();
  return <Navigate to={HOME_MAP[role] || '/role'} replace />;
}

function LoginRedirect() {
  const { role } = useRole();
  return <Navigate to={LOGIN_MAP[role] || '/role'} replace />;
}

/* ─────────────────────────────────────────────────────────────
 *  Route Tree
 *
 *  Student has 10 MAIN routes + 3 sub-routes.
 *  Everything else (Streaks, Notifications, Insights,
 *  Breathing, Academic, FocusSelect) are COMPONENTS
 *  rendered inside main route screens — NOT routes.
 * ───────────────────────────────────────────────────────────── */

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>

        {/* ─── Onboarding ─── */}
        <Route path="/" element={<SplashLogo />} />
        <Route path="/wordmark" element={<SplashWordmark />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/role" element={<RoleSelect />} />

        {/* ─── Role-Aware Redirects ─── */}
        <Route path="/login" element={<LoginRedirect />} />
        <Route path="/home" element={<HomeRedirect />} />

        {/* ─── Student: Auth ─── */}
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/signup" element={<StudentSignUp />} />
        <Route path="/student/path-select" element={<PathSelect />} />

        {/* ─── Student: 10 Main Routes ─── */}
        <Route path="/student/home" element={<StudentHome />} />
        <Route path="/student/academic" element={<Academic />} />
        <Route path="/student/insights" element={<Insights />} />
        <Route path="/student/mood" element={<MoodCheck />} />
        <Route path="/student/daily-checkin" element={<DailyCheckinFlow />} />
        <Route path="/student/day-task" element={<DynamicFlow />} />
        <Route path="/student/journal" element={<Journal />} />
        <Route path="/student/quiz" element={<Quiz />} />
        <Route path="/student/share" element={<ShareThought />} />
        <Route path="/student/audio" element={<AudioSpace />} />
        <Route path="/student/challenges" element={<DailyChallenges />} />
        <Route path="/student/workshop" element={<Workshop />} />
        <Route path="/student/mindspace" element={<Activities />} />
        <Route path="/student/activities" element={<Activities />} />

        {/* ─── Student: Sub-routes ─── */}
        <Route path="/student/mood/reason" element={<MoodReason />} />
        <Route path="/student/journal/:id" element={<JournalEntry />} />
        <Route path="/student/quiz/complete" element={<QuizComplete />} />
        <Route path="/student/mindlab" element={<MindLab />} />
        <Route path="/student/mindlab/week/:weekId" element={<WeekDetail />} />
        <Route path="/student/mindlab/progress" element={<MindLabProgress />} />
        <Route path="/student/mindlab/weekly/:weekId" element={<WeeklyDetail />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/notifications" element={<Notifications />} />

        {/* ─── Parent Routes ─── */}
        <Route path="/parent/signup" element={<ParentSignUp />} />
        <Route path="/parent/home" element={<ParentHome />} />
        <Route path="/parent/weekly" element={<WeeklyTimeline />} />
        <Route path="/parent/challenges" element={<Challenges />} />
        <Route path="/parent/awareness" element={<AwarenessPanel />} />
        <Route path="/parent/announcements" element={<ParentAnnouncements />} />
        <Route path="/parent/profile" element={<ParentProfile />} />

        {/* ─── Teacher Routes ─── */}
        <Route path="/teacher/home" element={<TeacherHome />} />
        <Route path="/teacher/sessions" element={<QuizSessions />} />
        <Route path="/teacher/create-quiz" element={<QuizCreation />} />
        <Route path="/teacher/quiz" element={<QuizManager />} />
        <Route path="/teacher/analytics" element={<ClassAnalytics />} />
        <Route path="/teacher/profile" element={<TeacherProfile />} />
        <Route path="/teacher/priority-students" element={<PriorityStudents />} />
        <Route path="/teacher/checkin-summary" element={<CheckInSummary />} />
        <Route path="/teacher/appreciation" element={<AppreciationScreen />} />
        <Route path="/teacher/alerts" element={<TeacherAlerts />} />
        <Route path="/teacher/report" element={<TeacherReport />} />
        <Route path="/teacher/comparison" element={<ClassComparison />} />
        <Route path="/teacher/participation" element={<ParticipationTracking />} />

        {/* ─── Fallback ─── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <main className="min-h-[100dvh] bg-neutral-950">
      <BrowserRouter>
        <RoleProvider>
          <AnimatedRoutes />
        </RoleProvider>
      </BrowserRouter>
    </main>
  );
}
