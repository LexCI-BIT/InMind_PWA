# InMind Database Schema Reference

Quick reference for all tables and their relationships.

## 📊 Schema Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CONTENT LAYER                             │
│  (CMS-ready, backend-controlled)                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  modules (3 total)                                              │
│    └── weeks (32 total, Phase 1: Week 19)                      │
│         └── days (7 per week: Mon-Sun)                         │
│              ├── prompts (daily questions)                      │
│              └── scenarios (decision points)                    │
│                                                                  │
│  emotion_structures (6 primary emotions)                        │
│  insights (behavioural feedback)                                │
│  challenges (daily challenges)                                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                         USER LAYER                               │
│  (Authentication & user management)                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  schools                                                         │
│    └── users (students, facilitators, admins)                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      BEHAVIOURAL LAYER                           │
│  (Core data collection)                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  sessions (daily flow instances)                                │
│    ├── responses (all screen responses)                         │
│    ├── body_map_entries (physical sensations)                  │
│    └── behavioural_signals (detected patterns)                 │
│                                                                  │
│  challenge_status (user challenge tracking)                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 📋 Table Details

### 1. users
**Purpose**: Student, facilitator, and admin accounts

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| school_id | VARCHAR | School identifier |
| class_name | VARCHAR | Class/grade (e.g., "9A") |
| student_id | VARCHAR | Unique student ID |
| password_hash | VARCHAR | Bcrypt hashed password |
| role | ENUM | student, facilitator, admin |
| created_at | TIMESTAMP | Account creation |
| updated_at | TIMESTAMP | Last update |

**Indexes**: school_id, student_id

---

### 2. sessions
**Purpose**: Track user progress through daily flow

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| user_id | INTEGER | FK to users |
| session_id | UUID | Unique session identifier |
| week_id | INTEGER | FK to weeks |
| day_id | INTEGER | FK to days |
| started_at | TIMESTAMP | Session start |
| completed_at | TIMESTAMP | Session completion |
| current_screen | VARCHAR | Current position in flow |
| is_completed | BOOLEAN | Completion status |

**Indexes**: user_id, session_id, started_at

**Key Points**:
- One session per day per user
- `current_screen` tracks progress
- Used by flow engine to determine next screen

---

### 3. responses
**Purpose**: Store all user responses (CORE DATA)

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| user_id | INTEGER | FK to users |
| session_id | INTEGER | FK to sessions |
| screen_type | VARCHAR | Which screen (emotion_check, etc.) |
| response_data | JSONB | The actual answer |
| response_time_ms | INTEGER | Time to respond |
| hesitation_time_ms | INTEGER | Time before first interaction |
| option_change_count | INTEGER | Number of answer changes |
| created_at | TIMESTAMP | Response timestamp |

**Indexes**: user_id, session_id, screen_type, created_at

**Example response_data**:
```json
{
  "primary_emotion": "anxious",
  "sub_emotion": "overwhelmed"
}
```

**Behavioural Interpretation**:
- `response_time_ms < 2000` → Rapid tap (impulsive)
- `response_time_ms > 20000` → Distraction
- `hesitation_time_ms > 5000` → High hesitation (uncertainty)
- `option_change_count > 2` → Indecisiveness

---

### 4. body_map_entries
**Purpose**: Physical sensation tracking (MOST IMPORTANT FOR AUTHENTICITY)

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| user_id | INTEGER | FK to users |
| session_id | INTEGER | FK to sessions |
| body_zone | VARCHAR | Head, Chest, Stomach, etc. |
| sensation_type | VARCHAR | Tight, Heavy, Warm, etc. |
| sensation_intensity | INTEGER | 1-5 scale |
| selection_order | INTEGER | Order of zone selection |
| time_spent_ms | INTEGER | Time spent on this zone |
| created_at | TIMESTAMP | Entry timestamp |

**Indexes**: user_id, session_id, created_at

**Body Zones**:
- Head
- Chest
- Stomach
- Throat
- Shoulders
- Hands
- Legs

**Sensation Types**:
- Tight
- Heavy
- Warm
- Buzzy
- Numb
- Relaxed
- Nothing

**Why Important**: Body sensations are harder to fake than verbal emotions, providing implicit emotional authenticity.

---

### 5. behavioural_signals
**Purpose**: Automatically detected behavioural patterns

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| session_id | INTEGER | FK to sessions |
| signal_type | VARCHAR | rapid_tap, hesitation, etc. |
| signal_value | FLOAT | Numeric value |
| metadata | JSONB | Additional context |
| created_at | TIMESTAMP | Detection timestamp |

**Indexes**: session_id, signal_type, created_at

**Signal Types**:
- `rapid_tap` - Response < 2 seconds
- `high_hesitation` - Hesitation > 5 seconds
- `indecisiveness` - Option changes > 2
- `distraction` - Response > 20 seconds

**Example metadata**:
```json
{
  "screen_type": "emotion_check",
  "context": "morning_session"
}
```

---

### 6. modules
**Purpose**: Top-level learning modules

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| module_number | INTEGER | Module number (1-3) |
| title | VARCHAR | Module title |
| description | TEXT | Module description |
| created_at | TIMESTAMP | Creation timestamp |

**Phase 1**: Module 3 - "Risk vs Reward"

---

### 7. weeks
**Purpose**: Weekly themes within modules

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| week_number | INTEGER | Week number (1-32) |
| module_id | INTEGER | FK to modules |
| title | VARCHAR | Week title |
| theme | VARCHAR | Week theme |
| created_at | TIMESTAMP | Creation timestamp |

**Phase 1**: Week 19 - "Risk vs Reward" / "Decision-making under pressure"

---

### 8. days
**Purpose**: Daily focuses within weeks

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| week_id | INTEGER | FK to weeks |
| day_number | INTEGER | 1-7 (Monday-Sunday) |
| day_name | VARCHAR | Monday, Tuesday, etc. |
| focus | VARCHAR | Daily focus theme |
| created_at | TIMESTAMP | Creation timestamp |

**Week 19 Days**:
1. Monday - Awareness
2. Tuesday - Recognition
3. Wednesday - Conflict
4. Thursday - Real-Life Mapping
5. Friday - Behaviour Action
6. Saturday - Simulation
7. Sunday - Weekly Reflection

---

### 9. prompts
**Purpose**: Daily reflective questions

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| day_id | INTEGER | FK to days |
| prompt_text | TEXT | The question |
| prompt_type | VARCHAR | daily, reflection, etc. |
| quick_select_options | JSONB | Optional quick answers |
| created_at | TIMESTAMP | Creation timestamp |

**Example**:
```
"What decision stayed in your mind today?"
```

---

### 10. scenarios
**Purpose**: Decision-making scenarios

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| day_id | INTEGER | FK to days |
| scenario_text | TEXT | The scenario |
| options | JSONB | Decision options |
| metadata | JSONB | Additional data |
| created_at | TIMESTAMP | Creation timestamp |

**Example**:
```
Scenario: "Your friends ask you to skip class."
Options: ["Go", "Refuse", "Hesitate"]
```

---

### 11. emotion_structures
**Purpose**: Emotion hierarchy (primary + sub-emotions)

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| primary_emotion | VARCHAR | Happy, Sad, Anxious, etc. |
| sub_emotions | JSONB | Array of sub-emotions |
| created_at | TIMESTAMP | Creation timestamp |

**Example**:
```json
{
  "primary_emotion": "Anxious",
  "sub_emotions": ["Restless", "Overwhelmed", "Pressured", "Nervous"]
}
```

**Phase 1 Emotions**:
1. Happy → Joyful, Content, Excited, Peaceful
2. Sad → Lonely, Disappointed, Hurt, Down
3. Anxious → Restless, Overwhelmed, Pressured, Nervous
4. Angry → Frustrated, Irritated, Upset, Annoyed
5. Confused → Uncertain, Lost, Conflicted, Unsure
6. Calm → Relaxed, Centered, Balanced, At ease

---

### 12. insights
**Purpose**: Behavioural feedback messages

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| insight_text | TEXT | The insight message |
| category | VARCHAR | emotional, behavioural, etc. |
| trigger_conditions | JSONB | When to show this |
| created_at | TIMESTAMP | Creation timestamp |

**Example**:
```
"You tend to hesitate more during social pressure situations."
```

---

### 13. challenges
**Purpose**: Daily behavioural challenges

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| challenge_text | TEXT | The challenge |
| challenge_type | VARCHAR | pause, reflect, action, etc. |
| duration_minutes | INTEGER | Expected duration |
| created_at | TIMESTAMP | Creation timestamp |

**Examples**:
- "Pause for 10 seconds before one important decision today."
- "Take 3 deep breaths when you feel pressure."
- "Write down one thing you're grateful for."

---

### 14. challenge_status
**Purpose**: Track user challenge acceptance/completion

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| user_id | INTEGER | FK to users |
| challenge_id | INTEGER | FK to challenges |
| accepted | BOOLEAN | Challenge accepted? |
| completed | BOOLEAN | Challenge completed? |
| completed_at | TIMESTAMP | Completion timestamp |
| created_at | TIMESTAMP | Creation timestamp |

**Unique constraint**: (user_id, challenge_id)

---

### 15. schools
**Purpose**: School information

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| school_id | VARCHAR | Unique school identifier |
| name | VARCHAR | School name |
| created_at | TIMESTAMP | Creation timestamp |

---

## 🔍 Useful Queries

### Get User's Latest Session
```sql
SELECT * FROM sessions 
WHERE user_id = 1 
ORDER BY started_at DESC 
LIMIT 1;
```

### Get All Responses for a Session
```sql
SELECT 
    screen_type,
    response_data,
    response_time_ms,
    hesitation_time_ms,
    option_change_count
FROM responses 
WHERE session_id = 1
ORDER BY created_at;
```

### Get User's Emotional Trend (Last 7 Days)
```sql
SELECT 
    DATE(created_at) as date,
    response_data->>'primary_emotion' as emotion,
    COUNT(*) as count
FROM responses 
WHERE user_id = 1 
  AND screen_type = 'emotion_check'
  AND created_at >= NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at), response_data->>'primary_emotion'
ORDER BY date;
```

### Get Body Map Patterns
```sql
SELECT 
    body_zone,
    sensation_type,
    COUNT(*) as frequency,
    AVG(sensation_intensity) as avg_intensity
FROM body_map_entries 
WHERE user_id = 1
GROUP BY body_zone, sensation_type
ORDER BY frequency DESC;
```

### Get Behavioural Signals Summary
```sql
SELECT 
    signal_type,
    COUNT(*) as occurrences,
    AVG(signal_value) as avg_value,
    MIN(signal_value) as min_value,
    MAX(signal_value) as max_value
FROM behavioural_signals bs
JOIN sessions s ON bs.session_id = s.id
WHERE s.user_id = 1
GROUP BY signal_type;
```

### Calculate User Streak
```sql
WITH daily_completions AS (
    SELECT DISTINCT DATE(started_at) as completion_date
    FROM sessions
    WHERE user_id = 1 AND is_completed = true
    ORDER BY completion_date DESC
)
SELECT COUNT(*) as streak
FROM daily_completions
WHERE completion_date >= CURRENT_DATE - INTERVAL '30 days';
```

### Detect Flatline (Same Emotion 5+ Days)
```sql
WITH recent_emotions AS (
    SELECT 
        response_data->>'primary_emotion' as emotion,
        DATE(created_at) as date
    FROM responses
    WHERE user_id = 1 
      AND screen_type = 'emotion_check'
    ORDER BY created_at DESC
    LIMIT 5
)
SELECT 
    emotion,
    COUNT(DISTINCT date) as days
FROM recent_emotions
GROUP BY emotion
HAVING COUNT(DISTINCT date) >= 5;
```

---

## 📈 Analytics Views

### daily_completion_rates
```sql
SELECT * FROM daily_completion_rates WHERE user_id = 1;
```

### emotional_trends
```sql
SELECT * FROM emotional_trends WHERE user_id = 1;
```

### body_map_patterns
```sql
SELECT * FROM body_map_patterns WHERE user_id = 1;
```

---

## 🔐 Security Notes

- All passwords stored as bcrypt hashes
- JWT tokens for authentication
- Foreign key constraints enforce data integrity
- Indexes optimize query performance
- JSONB for flexible data storage

---

## 📊 Data Size Estimates (Per User, Per Year)

- **Sessions**: ~365 rows (1 per day)
- **Responses**: ~3,650 rows (10 per day)
- **Body Map Entries**: ~730 rows (2 per day avg)
- **Behavioural Signals**: ~1,000 rows (varies)
- **Total**: ~5,745 rows per user per year

**Storage**: ~2-3 MB per user per year (with JSONB compression)

---

This schema is designed for:
✅ Flexibility (JSONB for dynamic data)
✅ Performance (strategic indexes)
✅ Scalability (normalized structure)
✅ Analytics (views and aggregations)
✅ CMS-readiness (all content in database)
