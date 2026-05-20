# InMind API Flow Guide

Visual guide to API interactions and data flow.

## 🔄 Complete User Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                    1. STUDENT LOGIN                              │
└─────────────────────────────────────────────────────────────────┘

POST /auth/login
{
  "school_id": "DEMO001",
  "class_name": "9A",
  "student_id": "STU001",
  "password": "student123"
}

                    ↓

Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user_id": 1,
  "role": "student"
}

                    ↓
        Store token for subsequent requests


┌─────────────────────────────────────────────────────────────────┐
│              2. START DAILY FLOW (NEW SESSION)                   │
└─────────────────────────────────────────────────────────────────┘

POST /flow/daily-flow
Headers: Authorization: Bearer {token}
Body: {}  // No session_id = new session

                    ↓

Backend:
1. Creates new session
2. Determines current week (19) and day (Monday)
3. Sets current_screen = "context_warmup"
4. Builds first screen payload

                    ↓

Response:
{
  "session_id": "550e8400-e29b-41d4-a716-446655440000",
  "screen": {
    "screen_type": "context_warmup",
    "title": "Where are you right now?",
    "options": [
      "At School",
      "At Home",
      "With Friends",
      "Alone",
      "Travelling"
    ],
    "metadata": {
      "week": 19,
      "module": 3,
      "day": 1,
      "screen_order": 0
    }
  },
  "is_complete": false
}

                    ↓
        Frontend renders screen
        User interacts with screen
        Frontend tracks timing


┌─────────────────────────────────────────────────────────────────┐
│                3. SUBMIT RESPONSE                                │
└─────────────────────────────────────────────────────────────────┘

POST /responses/response
Headers: Authorization: Bearer {token}
Body:
{
  "session_id": "550e8400-e29b-41d4-a716-446655440000",
  "screen_type": "context_warmup",
  "response_data": {
    "selected_context": "At School"
  },
  "response_time_ms": 3500,
  "hesitation_time_ms": 800,
  "option_change_count": 1
}

                    ↓

Backend:
1. Validates session belongs to user
2. Stores response in database
3. Analyzes behavioural signals:
   - response_time_ms = 3500 (normal, no signal)
   - hesitation_time_ms = 800 (normal, no signal)
   - option_change_count = 1 (normal, no signal)
4. Updates session.current_screen = "energy_check"

                    ↓

Response:
{
  "id": 1,
  "user_id": 1,
  "screen_type": "context_warmup",
  "response_data": {"selected_context": "At School"},
  "response_time_ms": 3500,
  "hesitation_time_ms": 800,
  "option_change_count": 1,
  "created_at": "2024-01-15T10:30:00Z"
}


┌─────────────────────────────────────────────────────────────────┐
│              4. GET NEXT SCREEN (CONTINUE FLOW)                  │
└─────────────────────────────────────────────────────────────────┘

POST /flow/daily-flow
Headers: Authorization: Bearer {token}
Body:
{
  "session_id": "550e8400-e29b-41d4-a716-446655440000"
}

                    ↓

Backend:
1. Finds session by session_id
2. Checks current_screen = "energy_check"
3. Builds energy check screen payload

                    ↓

Response:
{
  "session_id": "550e8400-e29b-41d4-a716-446655440000",
  "screen": {
    "screen_type": "energy_check",
    "title": "How's your energy level?",
    "scale_min": 0,
    "scale_max": 100,
    "labels": {
      "0": "Exhausted",
      "25": "Low",
      "50": "Neutral",
      "75": "Energized",
      "100": "Overstimulated"
    },
    "metadata": {
      "week": 19,
      "module": 3,
      "day": 1,
      "screen_order": 1
    }
  },
  "is_complete": false
}

                    ↓
        Frontend renders energy slider
        User adjusts slider
        Frontend tracks adjustments


┌─────────────────────────────────────────────────────────────────┐
│           5. SUBMIT ENERGY CHECK RESPONSE                        │
└─────────────────────────────────────────────────────────────────┘

POST /responses/response
Headers: Authorization: Bearer {token}
Body:
{
  "session_id": "550e8400-e29b-41d4-a716-446655440000",
  "screen_type": "energy_check",
  "response_data": {
    "energy_value": 65
  },
  "response_time_ms": 5200,
  "hesitation_time_ms": 1200,
  "option_change_count": 3
}

                    ↓

Backend:
1. Stores response
2. Analyzes signals:
   - option_change_count = 3 → SIGNAL: indecisiveness
3. Stores behavioural_signal:
   {
     "signal_type": "indecisiveness",
     "signal_value": 3,
     "metadata": {"screen_type": "energy_check"}
   }
4. Updates session.current_screen = "emotion_check"


┌─────────────────────────────────────────────────────────────────┐
│              6. EMOTION CHECK (DYNAMIC CONTENT)                  │
└─────────────────────────────────────────────────────────────────┘

POST /flow/daily-flow
Headers: Authorization: Bearer {token}
Body: {"session_id": "550e8400-..."}

                    ↓

Backend:
1. Queries emotion_structures table
2. Builds emotion options from database
3. Returns dynamic content

                    ↓

Response:
{
  "session_id": "550e8400-...",
  "screen": {
    "screen_type": "emotion_check",
    "title": "How are you feeling?",
    "emotions": [
      {
        "primary_emotion": "Happy",
        "sub_emotions": ["Joyful", "Content", "Excited", "Peaceful"]
      },
      {
        "primary_emotion": "Anxious",
        "sub_emotions": ["Restless", "Overwhelmed", "Pressured", "Nervous"]
      },
      // ... more emotions from database
    ],
    "metadata": {...}
  },
  "is_complete": false
}


┌─────────────────────────────────────────────────────────────────┐
│         7. BODY MAP (MOST IMPORTANT SCREEN)                      │
└─────────────────────────────────────────────────────────────────┘

POST /flow/daily-flow
Headers: Authorization: Bearer {token}
Body: {"session_id": "550e8400-..."}

                    ↓

Response:
{
  "session_id": "550e8400-...",
  "screen": {
    "screen_type": "body_map",
    "title": "Where do you feel it in your body?",
    "body_zones": [
      {
        "zone": "Head",
        "sensations": ["Tight", "Heavy", "Warm", "Buzzy", "Numb", "Relaxed", "Nothing"]
      },
      {
        "zone": "Chest",
        "sensations": ["Tight", "Heavy", "Warm", "Buzzy", "Numb", "Relaxed", "Nothing"]
      },
      // ... more zones
    ],
    "intensity_scale": {"min": 1, "max": 5},
    "metadata": {...}
  },
  "is_complete": false
}

                    ↓
        User taps body zones
        Selects sensations
        Rates intensity


┌─────────────────────────────────────────────────────────────────┐
│              8. SUBMIT BODY MAP ENTRIES                          │
└─────────────────────────────────────────────────────────────────┘

// User selected 3 body zones, submit each:

POST /responses/body-map
Headers: Authorization: Bearer {token}
Body:
{
  "session_id": "550e8400-...",
  "body_zone": "Chest",
  "sensation_type": "Tight",
  "sensation_intensity": 4,
  "selection_order": 1,
  "time_spent_ms": 2300
}

POST /responses/body-map
Body:
{
  "session_id": "550e8400-...",
  "body_zone": "Stomach",
  "sensation_type": "Heavy",
  "sensation_intensity": 3,
  "selection_order": 2,
  "time_spent_ms": 1800
}

POST /responses/body-map
Body:
{
  "session_id": "550e8400-...",
  "body_zone": "Head",
  "sensation_type": "Buzzy",
  "sensation_intensity": 2,
  "selection_order": 3,
  "time_spent_ms": 1500
}

                    ↓

Backend stores all entries in body_map_entries table

                    ↓

// Then submit screen completion:
POST /responses/response
Body:
{
  "session_id": "550e8400-...",
  "screen_type": "body_map",
  "response_data": {
    "zones_selected": 3,
    "total_time_ms": 5600
  },
  "response_time_ms": 5600,
  "hesitation_time_ms": 900,
  "option_change_count": 0
}


┌─────────────────────────────────────────────────────────────────┐
│              9. CONTINUE THROUGH ALL SCREENS                     │
└─────────────────────────────────────────────────────────────────┘

Repeat steps 4-5 for:
- daily_prompt
- scenario
- reflection
- insight
- challenge
- completion

Each time:
1. POST /flow/daily-flow → Get next screen
2. User interacts
3. POST /responses/response → Submit response
4. Backend updates session.current_screen


┌─────────────────────────────────────────────────────────────────┐
│              10. FLOW COMPLETION                                 │
└─────────────────────────────────────────────────────────────────┘

POST /flow/daily-flow
Headers: Authorization: Bearer {token}
Body: {"session_id": "550e8400-..."}

                    ↓

Backend:
1. Detects all screens completed
2. Sets session.is_completed = true
3. Sets session.completed_at = NOW()
4. Updates user streak

                    ↓

Response:
{
  "session_id": "550e8400-...",
  "screen": {
    "screen_type": "completion",
    "streak_count": 5,
    "progress_percentage": 100,
    "encouragement_text": "Great work! You're staying consistent!",
    "metadata": {...}
  },
  "is_complete": true
}


┌─────────────────────────────────────────────────────────────────┐
│              11. CHECK COMPLETION STATUS                         │
└─────────────────────────────────────────────────────────────────┘

GET /analytics/completion-status
Headers: Authorization: Bearer {token}

                    ↓

Response:
{
  "is_completed": true,
  "completion_percentage": 71,  // 5 out of 7 days this week
  "streak_count": 5,
  "last_completed_at": "2024-01-15T11:15:00Z"
}


┌─────────────────────────────────────────────────────────────────┐
│              12. GET STUDENT ANALYTICS                           │
└─────────────────────────────────────────────────────────────────┘

GET /analytics/student-analytics
Headers: Authorization: Bearer {token}

                    ↓

Response:
{
  "emotional_trends": [
    {
      "date": "2024-01-15",
      "primary_emotion": "Anxious",
      "energy_level": 65
    },
    {
      "date": "2024-01-14",
      "primary_emotion": "Happy",
      "energy_level": 78
    }
    // ... last 7 days
  ],
  "engagement_metrics": {
    "daily_completion_rate": 71.4,
    "average_session_duration_minutes": 6.5,
    "interaction_depth_score": 85.2,
    "streak_count": 5
  },
  "body_map_patterns": {
    "Chest": 12,
    "Stomach": 8,
    "Head": 15,
    "Shoulders": 6
  },
  "flatline_detected": false
}
```

## 🎯 Key API Patterns

### 1. Authentication Pattern
```
All protected endpoints require:
Headers: {
  "Authorization": "Bearer {access_token}"
}
```

### 2. Flow Engine Pattern
```
Frontend: "What comes next?"
Backend: "Here's the next screen with all data"

Frontend NEVER decides:
- What screen to show
- What content to display
- When to unlock features
```

### 3. Response Submission Pattern
```
Every response includes:
- response_data (the answer)
- response_time_ms (speed)
- hesitation_time_ms (delay)
- option_change_count (changes)

Backend automatically:
- Stores response
- Analyzes signals
- Updates progression
```

### 4. Session Continuity Pattern
```
Session persists across:
- App refreshes
- Network interruptions
- Multiple devices (same user)

session_id is the key to continuity
```

## 🔍 Behavioural Signal Detection

### Automatic Detection Rules

```python
# Rapid Tap
if response_time_ms < 2000:
    signal = "rapid_tap"
    meaning = "Impulsive, disengaged, or habitual"

# High Hesitation
if hesitation_time_ms > 5000:
    signal = "high_hesitation"
    meaning = "Uncertainty, emotional conflict"

# Indecisiveness
if option_change_count > 2:
    signal = "indecisiveness"
    meaning = "Internal conflict, complexity"

# Distraction
if response_time_ms > 20000:
    signal = "distraction"
    meaning = "Environmental distraction, avoidance"
```

## 📊 Data Flow Summary

```
User Interaction
      ↓
Frontend captures:
- What was selected
- How long it took
- How much hesitation
- How many changes
      ↓
POST /responses/response
      ↓
Backend stores:
- Response data
- Timing metadata
- Behavioural signals
      ↓
Database:
- responses table
- behavioural_signals table
      ↓
Analytics Engine:
- Calculates trends
- Detects patterns
- Generates insights
      ↓
GET /analytics/student-analytics
      ↓
Frontend displays:
- Emotional trends
- Engagement metrics
- Body map patterns
```

## 🚦 Error Handling

### 401 Unauthorized
```json
{
  "detail": "Could not validate credentials"
}
```
**Action**: Re-login to get new token

### 404 Not Found
```json
{
  "detail": "Session not found"
}
```
**Action**: Start new session (POST /flow/daily-flow without session_id)

### 500 Internal Server Error
```json
{
  "detail": "Week 19 not configured"
}
```
**Action**: Run database_schema.sql to create content

## 🔄 Session Recovery

If user closes app mid-flow:

```
1. User reopens app
2. Frontend checks for incomplete session:
   GET /analytics/completion-status
3. If is_completed = false:
   POST /flow/daily-flow with last session_id
4. Backend returns current screen
5. User continues from where they left off
```

## 📈 Analytics Queries

### Daily Completion
```
GET /analytics/completion-status
→ Returns today's status + streak
```

### Full Analytics
```
GET /analytics/student-analytics
→ Returns 7-day trends + patterns
```

### Current Progress
```
GET /flow/current-week
GET /flow/current-day
→ Returns current position in curriculum
```

## 🎓 Best Practices

1. **Always include timing data** in responses
2. **Store session_id** for continuity
3. **Handle token expiration** gracefully
4. **Track all interactions** (even skips)
5. **Submit body map entries** individually
6. **Check completion status** on app open
7. **Respect backend flow control** (don't skip screens)

---

**This API is designed to be:**
- ✅ Backend-driven (frontend is rendering engine)
- ✅ Behavioural-first (every interaction is data)
- ✅ Session-aware (continuity across interruptions)
- ✅ Analytics-ready (rich metadata collection)
- ✅ CMS-ready (all content from database)
