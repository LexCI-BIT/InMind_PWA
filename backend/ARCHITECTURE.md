# InMind Backend Architecture

## Overview

InMind is a **backend-driven behavioural operating system**, not a static app. The backend controls all flow logic, content delivery, and behavioural analysis.

## Core Principles

### 1. Backend-Driven Everything

```
Frontend = Rendering Engine
Backend = Intelligence + Flow Control
```

The frontend NEVER hardcodes:
- Prompts
- Scenarios
- Emotions
- Weeks
- Challenges
- Flow sequence

### 2. Dynamic Content Delivery

Every screen payload comes from the backend via API:

```python
# Frontend asks: "What comes next?"
POST /flow/daily-flow

# Backend responds with complete screen payload
{
  "session_id": "uuid",
  "screen": {
    "screen_type": "emotion_check",
    "title": "How are you feeling?",
    "emotions": [...],
    "metadata": {...}
  }
}
```

### 3. Behavioural Signal Collection

Every interaction generates metadata:

```python
{
  "screen_type": "emotion_check",
  "response_data": {"primary_emotion": "anxious", "sub_emotion": "overwhelmed"},
  "response_time_ms": 4500,      # Time to respond
  "hesitation_time_ms": 1200,    # Time before first tap
  "option_change_count": 2        # Times answer changed
}
```

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
│                    (React + Vite PWA)                        │
│                                                              │
│  - Renders screens from backend payloads                    │
│  - Captures interaction metadata                            │
│  - Sends responses with timing data                         │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ HTTPS/REST API
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                      FASTAPI BACKEND                         │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              FLOW ENGINE (Core)                     │    │
│  │  - Determines next screen                          │    │
│  │  - Controls progression                            │    │
│  │  - Manages session state                           │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │            CONTENT ENGINE                           │    │
│  │  - Fetches prompts, scenarios, insights            │    │
│  │  - Builds screen payloads                          │    │
│  │  - CMS-ready architecture                          │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │         BEHAVIOURAL SIGNAL PROCESSOR                │    │
│  │  - Detects rapid taps                              │    │
│  │  - Identifies hesitation patterns                  │    │
│  │  - Flags indecisiveness                            │    │
│  │  - Stores signals for analysis                     │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              ANALYTICS ENGINE                       │    │
│  │  - Calculates streaks                              │    │
│  │  - Tracks emotional trends                         │    │
│  │  - Detects flatline behaviour                      │    │
│  │  - Generates insights                              │    │
│  └────────────────────────────────────────────────────┘    │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ SQL
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                  SUPABASE / POSTGRESQL                       │
│                                                              │
│  - Users & Authentication                                   │
│  - Content (Modules, Weeks, Days, Prompts, Scenarios)      │
│  - Sessions & Responses                                     │
│  - Body Map Entries                                         │
│  - Behavioural Signals                                      │
│  - Analytics Views                                          │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Student Login

```
Student → POST /auth/login
         ↓
Backend validates credentials
         ↓
Returns JWT token + user_id
```

### 2. Daily Flow Start

```
Frontend → POST /flow/daily-flow (no session_id)
          ↓
Backend creates new session
          ↓
Determines current week/day
          ↓
Returns first screen (context_warmup)
```

### 3. Response Submission

```
Frontend → POST /responses/response
          ↓
Backend stores response + metadata
          ↓
Analyzes behavioural signals
          ↓
Updates session.current_screen
          ↓
Returns success
```

### 4. Next Screen Request

```
Frontend → POST /flow/daily-flow (with session_id)
          ↓
Backend checks session.current_screen
          ↓
Builds next screen payload
          ↓
Returns screen data
```

### 5. Flow Completion

```
Frontend → POST /responses/response (last screen)
          ↓
Backend marks session.is_completed = true
          ↓
Updates streak count
          ↓
Returns completion status
```

## Database Design

### Entity Relationships

```
schools
  └── users
       ├── sessions
       │    ├── responses
       │    ├── body_map_entries
       │    └── behavioural_signals
       └── challenge_status

modules
  └── weeks
       └── days
            ├── prompts
            └── scenarios
```

### Key Tables

#### sessions
Tracks user progress through daily flow:
- `session_id` - Unique session identifier
- `current_screen` - Where user is in flow
- `is_completed` - Whether flow is done
- `started_at` / `completed_at` - Timing

#### responses
Stores all user responses:
- `screen_type` - Which screen
- `response_data` - The actual answer (JSONB)
- `response_time_ms` - Speed of response
- `hesitation_time_ms` - Delay before interaction
- `option_change_count` - Answer changes

#### body_map_entries
Most important for emotional authenticity:
- `body_zone` - Head, Chest, Stomach, etc.
- `sensation_type` - Tight, Heavy, Warm, etc.
- `sensation_intensity` - 1-5 scale
- `selection_order` - Order of selection

#### behavioural_signals
Automatically detected patterns:
- `signal_type` - rapid_tap, hesitation, etc.
- `signal_value` - Numeric value
- `metadata` - Additional context

## Flow Engine Logic

### Screen Sequence (Phase 1)

```python
FLOW_SEQUENCE = [
    "context_warmup",      # Where are you?
    "energy_check",        # Energy level slider
    "emotion_check",       # Primary + sub-emotion
    "body_map",           # Body sensations (MOST IMPORTANT)
    "daily_prompt",       # Reflective question
    "scenario",           # Decision scenario
    "reflection",         # Self-awareness question
    "insight",            # Behavioural feedback
    "challenge",          # Daily challenge
    "completion"          # Streak + encouragement
]
```

### Progression Logic

```python
def get_next_screen(session):
    current_index = FLOW_SEQUENCE.index(session.current_screen)
    
    if current_index >= len(FLOW_SEQUENCE):
        return completion_screen()
    
    next_screen_type = FLOW_SEQUENCE[current_index]
    return build_screen_payload(next_screen_type, session)
```

### Screen Payload Building

Each screen type has a builder function:

```python
def build_screen_payload(screen_type, session, db):
    if screen_type == "emotion_check":
        emotions = fetch_emotions_from_db(db)
        return {
            "screen_type": "emotion_check",
            "title": "How are you feeling?",
            "emotions": emotions,
            "metadata": {...}
        }
```

## Behavioural Signal Detection

### Automatic Detection Rules

```python
# Rapid tap (< 2 seconds)
if response_time_ms < 2000:
    store_signal("rapid_tap", response_time_ms)

# High hesitation (> 5 seconds)
if hesitation_time_ms > 5000:
    store_signal("high_hesitation", hesitation_time_ms)

# Indecisiveness (> 2 changes)
if option_change_count > 2:
    store_signal("indecisiveness", option_change_count)

# Distraction (> 20 seconds)
if response_time_ms > 20000:
    store_signal("distraction", response_time_ms)
```

### Signal Interpretation

Signals are **indicators**, not conclusions:

| Signal | Possible Meaning |
|--------|-----------------|
| rapid_tap | Impulsive, disengaged, or habitual |
| high_hesitation | Uncertainty, emotional conflict |
| indecisiveness | Internal conflict, complexity |
| distraction | Environmental distraction, avoidance |

## Analytics Engine

### Streak Calculation

```python
def calculate_streak(user_id):
    # Get completed sessions ordered by date
    sessions = get_completed_sessions(user_id)
    
    streak = 0
    current_date = today()
    
    for session in sessions:
        if session.date == current_date or session.date == current_date - streak:
            streak += 1
            current_date = session.date
        else:
            break
    
    return streak
```

### Flatline Detection

```python
def detect_flatline(user_id):
    # Get last 5 emotional responses
    emotions = get_last_5_emotions(user_id)
    
    # If all same emotion = flatline
    return len(set(emotions)) == 1
```

### Engagement Scoring

```python
engagement_score = (
    completion_rate * 0.3 +
    interaction_depth * 0.3 +
    response_quality * 0.2 +
    consistency * 0.2
)
```

## Security

### Authentication

- JWT-based token authentication
- Tokens expire after 30 minutes (configurable)
- Password hashing with bcrypt
- Role-based access control (student, facilitator, admin)

### Data Protection

- All timestamps in UTC
- JSONB for flexible response storage
- Foreign key constraints for data integrity
- Indexes for query performance

## Scalability Considerations

### Database Optimization

- Indexes on frequently queried columns
- Materialized views for analytics
- Partitioning for large tables (future)

### API Performance

- Async/await for I/O operations
- Connection pooling
- Response caching (future)

### Content Management

- All content in database (CMS-ready)
- No hardcoded strings
- Easy to add new weeks/modules

## Phase 1 Limitations

What Phase 1 does NOT include:
- AI prediction models
- Advanced analytics dashboards
- Parent/teacher portals
- Gamification features
- Real-time notifications
- Multi-language support

Phase 1 validates:
- Behavioural flow
- Engagement patterns
- Backend-driven architecture
- Data collection quality

## Future Enhancements

### Phase 2+
- ML-based insight generation
- Adaptive flow (personalized screens)
- Teacher dashboard
- Parent portal
- Advanced analytics
- Predictive alerts
- Content recommendation engine

## Testing Strategy

### Unit Tests
- Model validation
- Schema validation
- Signal detection logic

### Integration Tests
- Complete flow end-to-end
- Session continuity
- Response storage

### Load Tests
- Concurrent users
- Database performance
- API response times

## Deployment

### Development
```bash
uvicorn app.main:app --reload
```

### Production
```bash
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

### Environment Variables
- Development: `.env`
- Production: Environment-specific secrets

## Monitoring

Key metrics to track:
- API response times
- Database query performance
- Session completion rates
- Error rates
- User engagement patterns

## Conclusion

InMind's architecture is designed for:
1. **Flexibility** - Easy to add new content
2. **Intelligence** - Backend controls everything
3. **Scalability** - Can handle growth
4. **Insights** - Rich behavioural data collection

The backend is the brain. The frontend is the interface.
