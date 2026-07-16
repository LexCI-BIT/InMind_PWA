# InMind Backend - Quick Reference Summary

## 🎯 What You're Building

A **FastAPI backend** that controls a student wellbeing platform with:
- **2 separate flows**: Static (mandatory 6-step check-in) + Dynamic (optional 6-step curriculum)
- **2 separate streaks**: One for check-ins, one for full completion
- **Behavioral analysis**: Detects rapid taps, hesitation, indecisiveness, distraction
- **32-week curriculum**: Day-by-day unlocking from enrollment date
- **15 database tables**: Users, sessions, responses, body maps, signals, content, etc.

---

## 📊 Database (Supabase PostgreSQL)

**Connection Details:**
- Project: wyyujoervprjaswjulor
- Region: ap-southeast-2 (Sydney)
- Port: 6543 (pooled connection)

**15 Tables:**
1. users
2. schools
3. modules
4. weeks
5. days
6. prompts
7. scenarios
8. reflections
9. insights
10. challenges
11. sessions (CRITICAL)
12. responses (CRITICAL)
13. body_map_entries (MOST IMPORTANT)
14. behavioural_signals
15. emotion_structures
16. challenge_status

---

## 🔑 Core Concepts

### Static Flow (Steps 1-6) - MANDATORY
```
1. Context Warmup → 2. Energy Check → 3. Emotion Check → 
4. Reason Step → 5. Body Map → 6. Sensation Step
```
- **Trigger**: Automatically when user opens app on new day
- **Completion**: `session.current_step > 6`
- **Rule**: User CANNOT access home without completing this

### Dynamic Flow (Steps 7-12) - OPTIONAL
```
7. Daily Prompt → 8. Scenario → 9. Reflection → 
10. Insight → 11. Challenge → 12. Completion
```
- **Trigger**: "Complete Now" button on home page
- **Completion**: `session.completed_at IS NOT NULL`
- **Content**: Changes daily based on 32-week curriculum

### Two Streak Systems
1. **Static Streak**: Consecutive days with `current_step > 6`
2. **Dynamic Streak**: Consecutive days with `completed_at IS NOT NULL`

---

## 🚀 Key Endpoints

### Authentication
- `POST /auth/login` - Login with school_id, class, student_id, password

### Flow Engine
- `GET /flow/check-static-flow` - Check if static flow completed today
- `POST /flow/daily-flow` - Get next screen in flow

### Responses
- `POST /responses/response` - Submit screen response with timing data
- `POST /responses/body-map` - Submit body map entry

### Analytics
- `GET /analytics/completion-status` - Get both streaks + stats
- `GET /analytics/streak-details?streak_type=static|dynamic` - Detailed streak info

---

## 🎯 Critical Rules

1. **Backend controls everything** - Frontend never hardcodes content
2. **Static flow is mandatory** - Cannot be skipped
3. **Two separate streaks** - Track both independently
4. **Behavioral signals** - Analyze every response
5. **Day-by-day unlocking** - From enrollment date, not school calendar
6. **Error handling** - Every endpoint must handle errors gracefully
7. **Session ownership** - Always validate user owns the session
8. **Logging** - Log all important events

---

## 📁 Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI app
│   ├── config.py            # Settings
│   ├── database.py          # Supabase connection
│   ├── models.py            # 15 SQLAlchemy models
│   ├── schemas.py           # Pydantic validation
│   ├── auth.py              # JWT authentication
│   ├── utils/
│   │   └── behavioral.py    # Signal detection
│   └── routers/
│       ├── auth.py          # Login
│       ├── flow.py          # Flow engine
│       ├── responses.py     # Response submission
│       └── analytics.py     # Streaks & analytics
├── .env                     # Environment variables
└── requirements.txt         # Dependencies
```

---

## 🔧 Environment Variables

```env
DATABASE_URL=postgresql://postgres.[ref]:[pass]@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres
SUPABASE_URL=https://wyyujoervprjaswjulor.supabase.co
SUPABASE_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key
SECRET_KEY=your_jwt_secret_32_chars
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

## 🧪 Testing

```bash
# Run tests
pytest

# Test login
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"school_id":"DEMO001","class_name":"9A","student_id":"STU001","password":"student123"}'

# Test flow
curl -X GET http://localhost:8000/flow/check-static-flow \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📦 Deployment Steps

1. Install dependencies: `pip install -r requirements.txt`
2. Set up .env file with Supabase credentials
3. Run database schema in Supabase SQL Editor
4. Load sample data (emotions, demo user, week 19)
5. Start server: `uvicorn app.main:app --reload --port 8000`
6. Test endpoints at http://localhost:8000/docs

---

## 🎓 Behavioral Signals

Every response is analyzed for:
- **Rapid Tap**: < 2 seconds (disengagement)
- **High Hesitation**: > 5 seconds (uncertainty)
- **Indecisiveness**: > 2 answer changes (confusion)
- **Distraction**: > 20 seconds (not focused)

---

## 📊 Streak Milestones

- 🔥 3 days: 3-Day Starter
- ⭐ 7 days: Week Warrior
- 💪 14 days: Two-Week Champion
- 🏆 21 days: Habit Builder
- 👑 30 days: Monthly Master
- 💎 60 days: Diamond Streak
- 🌟 90 days: Quarter Champion
- 🎯 180 days: Half-Year Hero
- 🏅 365 days: Year-Long Legend

---

## ✅ Completion Checklist

- [ ] 15 database tables created
- [ ] 5 routers implemented
- [ ] JWT authentication working
- [ ] Static flow (6 steps) working
- [ ] Dynamic flow (6 steps) working
- [ ] Two streak systems working
- [ ] Behavioral signals working
- [ ] Error handling on all endpoints
- [ ] API docs complete
- [ ] Demo user working

---

**For full implementation details, see BACKEND_BUILD_PROMPT.md**
