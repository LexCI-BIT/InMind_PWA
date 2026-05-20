# InMind Backend API

Backend-driven behavioural intelligence platform for student wellbeing.

## Tech Stack

- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **Supabase** - PostgreSQL database and authentication
- **Pydantic** - Data validation and settings management
- **JWT** - Token-based authentication

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application entry point
│   ├── config.py            # Configuration and settings
│   ├── database.py          # Database connection and session management
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas for request/response
│   ├── auth.py              # Authentication utilities
│   └── routers/
│       ├── __init__.py
│       ├── auth.py          # Authentication endpoints
│       ├── flow.py          # Flow engine endpoints (MOST IMPORTANT)
│       ├── responses.py     # Response submission endpoints
│       ├── challenges.py    # Challenge management endpoints
│       └── analytics.py     # Analytics and completion status endpoints
├── database_schema.sql      # Complete PostgreSQL schema
├── requirements.txt         # Python dependencies
├── .env.example            # Environment variables template
└── README.md               # This file
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required environment variables:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_KEY` - Your Supabase anon key
- `SUPABASE_SERVICE_KEY` - Your Supabase service role key
- `DATABASE_URL` - PostgreSQL connection string
- `SECRET_KEY` - JWT secret key (generate with: `openssl rand -hex 32`)

### 3. Set Up Database

Run the SQL schema in your Supabase SQL editor:

```bash
# Copy contents of database_schema.sql and run in Supabase SQL editor
```

This will create:
- All tables (users, sessions, responses, etc.)
- Indexes for performance
- Sample data for Phase 1 (Module 3, Week 19)
- Demo student account

### 4. Run the Application

```bash
# Development mode with auto-reload
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- API: `http://localhost:8000`
- Interactive docs: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Key Endpoints

### Authentication
- `POST /auth/login` - Student login

### Flow Engine (MOST IMPORTANT)
- `POST /flow/daily-flow` - Get next screen in daily flow
- `GET /flow/current-week` - Get current week information
- `GET /flow/current-day` - Get current day information

### Responses
- `POST /responses/response` - Submit screen response
- `POST /responses/body-map` - Submit body map entry

### Challenges
- `POST /challenges/challenge-status` - Accept/decline challenge
- `PATCH /challenges/challenge-status/{id}` - Mark challenge as completed
- `GET /challenges/my-challenges` - Get user's challenges

### Analytics
- `GET /analytics/completion-status` - Get completion status and streak
- `GET /analytics/student-analytics` - Get comprehensive analytics

## Architecture Principles

### Backend-Driven Flow

The frontend is a **rendering engine**. The backend controls:
- What screen comes next
- What content to display
- When to unlock features
- Progression logic

### No Hardcoded Content

All content comes from the database:
- Prompts
- Scenarios
- Emotions
- Challenges
- Insights

### Behavioural Signal Tracking

Every interaction generates behavioural metadata:
- `response_time_ms` - Time to respond
- `hesitation_time_ms` - Time before first interaction
- `option_change_count` - Answer changes
- Automatic signal detection (rapid taps, hesitation, etc.)

## Database Schema Overview

### Core Tables

1. **users** - Student accounts
2. **sessions** - Daily flow sessions
3. **responses** - All screen responses
4. **body_map_entries** - Body map interactions
5. **behavioural_signals** - Detected patterns

### Content Tables

1. **modules** - Learning modules
2. **weeks** - Weekly themes
3. **days** - Daily focuses
4. **prompts** - Daily prompts
5. **scenarios** - Decision scenarios
6. **insights** - Behavioural insights
7. **challenges** - Daily challenges
8. **emotion_structures** - Emotion hierarchies

## Phase 1 Scope

Phase 1 implements:
- **Module 3** - Risk vs Reward
- **Week 19** - Decision-making under pressure
- **7 Days** - Monday through Sunday
- **Complete flow** - All 10 screens

## Demo Credentials

A demo student account is created automatically:

```
School ID: DEMO001
Class: 9A
Student ID: STU001
Password: student123
```

## Development Notes

### Adding New Content

To add new weeks/days/prompts:

```sql
-- Add a new week
INSERT INTO weeks (week_number, module_id, title, theme) VALUES
(20, 3, 'New Week', 'New Theme');

-- Add prompts for that week
INSERT INTO prompts (day_id, prompt_text, prompt_type) VALUES
((SELECT id FROM days WHERE week_id = ... AND day_number = 1), 
 'Your prompt here', 'daily');
```

### Testing the Flow

1. Login with demo credentials
2. Call `/flow/daily-flow` without session_id (creates new session)
3. Submit responses via `/responses/response`
4. Call `/flow/daily-flow` again with session_id (gets next screen)
5. Repeat until flow is complete

### Behavioural Signals

Signals are automatically detected and stored:
- **rapid_tap** - response_time < 2000ms
- **high_hesitation** - hesitation_time > 5000ms
- **indecisiveness** - option_change_count > 2
- **distraction** - response_time > 20000ms

## API Documentation

Full interactive API documentation is available at `/docs` when the server is running.

## Production Deployment

For production:

1. Set `ENVIRONMENT=production` in `.env`
2. Configure proper CORS origins in `main.py`
3. Use a production-grade ASGI server (Gunicorn + Uvicorn)
4. Enable HTTPS
5. Set up proper database backups
6. Configure monitoring and logging

## Support

For questions or issues, refer to the main project documentation.
