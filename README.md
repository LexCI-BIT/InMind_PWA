<p align="center">
  <img src="public/favicon.svg" alt="InMind Logo" width="80" />
</p>

<h1 align="center">InMind — Student Wellbeing PWA</h1>

<p align="center">
  A Progressive Web Application designed to nurture student mental health and wellbeing through daily check-ins, journaling, guided activities, and real-time analytics — connecting <strong>Students</strong>, <strong>Teachers</strong>, and <strong>Parents</strong> on a single platform.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5.3-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Framer_Motion-11.3-FF0050?logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa&logoColor=white" alt="PWA" />
</p>

---

## 📖 About the Project

**InMind** is an AI-powered student wellbeing platform built as a mobile-first Progressive Web App. It provides a safe, engaging digital space where students can reflect on their emotions, build healthy habits, and stay connected with their support network.

The platform serves three distinct user roles — each with a dedicated portal and tailored experience:

| Role | Purpose |
|------|---------|
| 🎓 **Student** | Daily mood check-ins, journaling, breathing exercises, audio spaces, quizzes, and streaks |
| 🧑‍🏫 **Teacher** | Class analytics, priority student alerts, quiz management, check-in summaries, and appreciation tools |
| 👨‍👩‍👧 **Parent** | Child progress insights, weekly wellbeing reports, announcements, and child profile dashboard |

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | React 18 (JSX) | Component-based UI with hooks |
| **Build Tool** | Vite 5 | Lightning-fast HMR and optimized production builds |
| **Styling** | Tailwind CSS 3 | Utility-first responsive design system |
| **Animations** | Framer Motion 11 | Smooth page transitions, micro-interactions, and gesture support |
| **Routing** | React Router DOM 6 | Declarative client-side routing with nested routes |
| **PWA** | vite-plugin-pwa | Service worker generation, offline support, and installability |
| **Fonts** | Google Fonts (Poppins) | Consistent, modern typography across all screens |
| **Icons** | Inline SVGs | Zero-dependency, pixel-perfect iconography |

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/LexCI-BIT/InMind_PWA.git
cd InMind_PWA

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open the URL Vite prints (default `http://localhost:5173`).

### Production Build

```bash
npm run build
npm run preview
```

---

## 🔄 User Flow

### Onboarding Flow
```
Splash Logo → Splash Wordmark → Onboarding Carousel (3 slides) → Role Selection
                                                                       │
                                  ┌────────────────────────────────────┼────────────────────┐
                                  ▼                                    ▼                    ▼
                            Student Login                        Teacher Home          Parent Home
```

### 🎓 Student Portal Flow
```
Login → Mood Check-In → Mood Reason Selection → Student Home
                                                      │
                    ┌──────────┬──────────┬────────────┼──────────┬──────────┬──────────┐
                    ▼          ▼          ▼            ▼          ▼          ▼          ▼
               Activities  Breathing  Audio Space  Insights  Journaling  Quizzes    Streaks
                    │                                              │          │
                    ▼                                              ▼          ▼
                Workshop                                    Journal Entry  Quiz Flow
                    │                                                      → Quiz Complete
                    ▼
              Focus Select
                    │
                    ▼
            Daily Challenges
                    │
                    ▼
            Share Thought
```

### 🧑‍🏫 Teacher Portal Flow
```
Teacher Home ──┬── Check-In Summary ── Priority Students
               ├── Class Analytics
               ├── Quiz Sessions ── Quiz Creation ── Quiz Manager (Live)
               ├── Appreciation Screen
               └── Teacher Profile
```

### 👨‍👩‍👧 Parent Portal Flow
```
Parent Home ──┬── Announcements (All / Well being / Academic filters)
              ├── Insights (Weekly Reflection Dashboard)
              └── Child Profile (Analytics + Mood Trends)
```

---

## 📂 Project Structure

```
inmind-app/
├── index.html                          # HTML shell + Google Fonts
├── package.json                        # Dependencies & scripts
├── tailwind.config.js                  # Design tokens & theme
├── vite.config.js                      # Vite + PWA plugin config
├── postcss.config.js                   # PostCSS pipeline
│
├── public/
│   ├── favicon.svg                     # App icon
│   ├── icons/                          # PWA icons (192px, 512px)
│   └── illustrations/                  # Onboarding artwork
│
└── src/
    ├── main.jsx                        # React DOM entry point
    ├── App.jsx                         # Root router with all routes
    ├── index.css                       # Tailwind directives + globals
    │
    ├── components/
    │   ├── BottomNav.jsx               # Parent portal bottom dock
    │   ├── StudentDock.jsx             # Student portal bottom dock
    │   ├── TeacherDock.jsx             # Teacher portal bottom dock
    │   ├── NextButton.jsx              # Onboarding CTA button
    │   ├── PageIndicator.jsx           # Onboarding dot indicator
    │   └── Screen.jsx                  # Reusable screen wrapper
    │
    └── screens/
        ├── SplashLogo.jsx              # Animated logo splash
        ├── SplashWordmark.jsx          # Brand wordmark reveal
        ├── Onboarding.jsx              # 3-slide carousel
        ├── RoleSelect.jsx              # Student / Teacher / Parent
        │
        ├── student/
        │   ├── Login.jsx               # Student authentication
        │   ├── MoodCheck.jsx           # Emoji-based mood selector
        │   ├── MoodReason.jsx          # Reason for mood state
        │   ├── Home.jsx                # Student dashboard
        │   ├── Activities.jsx          # Activity hub
        │   ├── Breathing.jsx           # Guided breathing exercise
        │   ├── AudioSpace.jsx          # Ambient audio player
        │   ├── Insights.jsx            # Personal analytics
        │   ├── Academic.jsx            # Academic progress view
        │   ├── Notifications.jsx       # Alert center
        │   ├── Quiz.jsx                # Quiz launcher
        │   ├── Streaks.jsx             # Habit streak tracker
        │   ├── Workshop.jsx            # Workshop activities
        │   ├── FocusSelect.jsx         # Focus area picker
        │   ├── challenges/
        │   │   └── DailyChallenges.jsx # Daily wellbeing challenges
        │   ├── journal/
        │   │   ├── Journal.jsx         # Journal list view
        │   │   ├── JournalEntry.jsx    # Rich text journal entry
        │   │   └── landscapes.jsx      # Journal background assets
        │   ├── quiz/
        │   │   ├── Quiz.jsx            # Interactive quiz flow
        │   │   ├── QuizComplete.jsx    # Results & celebration
        │   │   └── questions.js        # Question bank data
        │   └── share/
        │       └── ShareThought.jsx    # Thought sharing screen
        │
        ├── teacher/
        │   ├── Home.jsx                # Teacher dashboard
        │   ├── CheckInSummary.jsx      # Class mood overview
        │   ├── PriorityStudents.jsx    # At-risk student alerts
        │   ├── ClassAnalytics.jsx      # Class-wide analytics
        │   ├── QuizSessions.jsx        # Quiz session list
        │   ├── QuizCreation.jsx        # Quiz builder
        │   ├── QuizManager.jsx         # Live quiz control panel
        │   ├── AppreciationScreen.jsx  # Student appreciation tool
        │   └── TeacherProfile.jsx      # Teacher profile & settings
        │
        └── parent/
            ├── Home.jsx                # Parent dashboard
            ├── ParentAnnouncements.jsx # Filtered announcements
            ├── ParentInsights.jsx      # Weekly reflection dashboard
            └── ParentProfile.jsx       # Child profile & analytics
```

---

## 🎨 Design Philosophy

- **Mobile-First**: All screens are optimized for a `440px` max-width viewport, mimicking a native mobile experience
- **Premium Aesthetics**: Rich gradients, glassmorphism, micro-animations, and carefully curated color palettes
- **Role-Based Navigation**: Each portal has its own bottom dock with contextual icons and active states
- **Emotional Design**: Warm colors, soft rounded corners, and playful emoji elements create a safe, approachable feel
- **Accessibility**: High-contrast text, touch-friendly tap targets, and semantic HTML throughout

---

## 🎯 Key Features

### Student
- 🎭 **Daily Mood Check-In** — Emoji-driven mood logging with reason tagging
- 📓 **Journaling** — Rich text entries with beautiful landscape backgrounds
- 🧘 **Breathing Exercises** — Guided breathing with animated visual cues
- 🎵 **Audio Spaces** — Ambient soundscapes for focus and relaxation
- 🏆 **Streaks & Challenges** — Gamified wellbeing habit building
- 📊 **Personal Insights** — Mood trends and engagement analytics
- 📝 **Interactive Quizzes** — Timed quizzes with instant feedback

### Teacher
- 📋 **Check-In Summary** — Real-time class mood heatmap
- ⚠️ **Priority Students** — AI-flagged students needing attention
- 📈 **Class Analytics** — Aggregate wellbeing and engagement data
- 🎯 **Quiz Management** — Create, launch, and monitor live quizzes
- ⭐ **Appreciation** — Send recognition and positive reinforcement

### Parent
- 🏠 **Home Dashboard** — Child overview with quick actions
- 📢 **Announcements** — Filtered school updates (All / Wellbeing / Academic)
- 📊 **Weekly Reflection** — Bar charts, mood trends, and AI-generated conversation prompts
- 👤 **Child Profile** — Detailed analytics, journal count, participation streaks, and mood patterns

---

## 📋 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=your_api_url_here
```

> **Note:** The current version uses mock/hardcoded data. API integration is planned for future iterations.

---

## 🗺️ Roadmap

- [ ] Backend API integration (Node.js / Express)
- [ ] Firebase Authentication for all roles
- [ ] Real-time data sync with Firestore
- [ ] Push notifications via FCM
- [ ] AI-powered mood analysis and suggestions
- [ ] Offline-first data persistence
- [ ] Multi-language support (i18n)
- [ ] Dark mode toggle

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is developed by **LexCI BIT** — Birla Institute of Technology.

---

<p align="center">
  Built with ❤️ for student wellbeing
</p>
