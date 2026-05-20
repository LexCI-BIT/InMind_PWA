# 🧠 InMind Backend - Complete Implementation

## 📋 Overview

A complete **FastAPI backend** for the InMind student wellbeing platform. This is a **backend-driven behavioural intelligence system** where the backend controls all flow logic, content delivery, and behavioural analysis.

**Status**: ✅ Phase 1 Complete - Ready for Integration

---

## 🎯 What You Have

### ✅ Complete Backend Structure
- 15 database tables
- 11 API endpoints
- JWT authentication
- Flow engine (backend-driven)
- Behavioural signal detection
- Analytics engine
- Phase 1 content (Module 3, Week 19)

### ✅ Documentation
- Main README
- Architecture guide
- Setup instructions
- API flow guide
- Database schema reference
- Deployment checklist

---

## 🚀 Quick Start (3 Steps)

### Step 1: Configure Environment

Edit `backend/.env` and add:

1. **Supabase Keys** (get from dashboard):
   ```
   SUPABASE_KEY=your_anon_key
   SUPABASE_SERVICE_KEY=your_service_role_key
   ```

2. **JWT Secret** (generate):
   ```bash
   python -c "import secrets; print(secrets.token_hex(32))"
   ```
   Add output as `SECRET_KEY`

### Step 2: Set Up Database

1. Go to: https://supabase.com/dashboard/project/wyyujoervprjaswjulor/sql/new
2. Copy contents of `backend/database_schema.sql`
3. Paste and execute

### Step 3: Run Server

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Visit: http://localhost:8000/docs

---

## 📁 Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI app
│   ├── config.py            # Settings
│   ├── database.py          # DB connection
│   ├── models.py            # 15 SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── auth.py              # JWT authentication
│   └── routers/
│       ├── auth.py          # Login
│       ├── flow.py          # Flow engine ⭐
│       ├── responses.py     # Response submission
│       ├── challenges.py    # Challenges
│       └── analytics.py     # Analytics
├── database_schema.sql      # Complete schema
├── requirements.txt         # Dependencies
├── .env                     # Your config
└── [Documentation files]
```

---

## 🔑 Key Features

### 1. Backend-Driven Flow Engine ⭐

**Frontend asks**: "What comes next?"  
**Backend responds**: Complete screen with all data

```python
POST /flow/daily-flow
→ Returns dynamic screen payload
→ Frontend just renders it
```

### 2. Behavioural Signal Detection

Automatically detects:
- **Rapid taps** (< 2 sec) → Impulsive behaviour
- **High hesitation** (> 5 sec) → Uncertainty
- **Indecisiveness** (> 2 changes) → Internal conflict
- **Distraction** (> 20 sec) → Avoidance

### 3. Complete Analytics

- Streak tracking
- Emotional trends
- Body map patterns
- Engagement metrics
- Flatline detection

---

## 📊 API Endpoints

### Authentication
```
POST /auth/login
```

### Flow Engine (Core)
```
POST /flow/daily-flow        ⭐ Most important
GET  /flow/current-week
GET  /flow/current-day
```

### Responses
```
POST /responses/response
POST /responses/body-map
```

### Challenges
```
POST  /challenges/challenge-status
PATCH /challenges/challenge-status/{id}
GET   /challenges/my-challenges
```

### Analytics
```
GET /analytics/completion-status
GET /analytics/student-analytics
```

---

## 🗄️ Database Schema

### 15 Tables Created

**Content Layer** (CMS-ready):
- modules, weeks, days
- prompts, scenarios
- insights, challenges
- emotion_structures

**User Layer**:
- schools, users

**Behavioural Layer** (Core data):
- sessions
- responses ⭐
- body_map_entries ⭐
- behavioural_signals
- challenge_status

---

## 🎓 Demo Account

Pre-created for testing:

```
School ID: DEMO001
Class: 9A
Student ID: STU001
Password: student123
```

---

## 📈 Phase 1 Content

Pre-loaded with:
- **Module 3**: Risk vs Reward
- **Week 19**: Decision-making under pressure
- **7 Days**: Monday-Sunday with focuses
- **6 Emotions**: Happy, Sad, Anxious, Angry, Confused, Calm
- **4 Challenges**: Sample challenges
- **Sample prompts & scenarios**

---

## 🔄 Typical Flow

```
1. Login
   POST /auth/login
   → Get JWT token

2. Start Flow
   POST /flow/daily-flow (no session_id)
   → Get first screen (context_warmup)

3. Submit Response
   POST /responses/response
   → Store response + metadata

4. Get Next Screen
   POST /flow/daily-flow (with session_id)
   → Get next screen (energy_check)

5. Repeat 3-4 until complete

6. Check Analytics
   GET /analytics/completion-status
   → Get streak, completion %
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Main documentation |
| `ARCHITECTURE.md` | System architecture |
| `SETUP.md` | Quick setup guide |
| `API_FLOW_GUIDE.md` | Visual API flows |
| `DATABASE_SCHEMA_REFERENCE.md` | Schema details |
| `DEPLOYMENT_CHECKLIST.md` | Deployment steps |
| `BACKEND_SUMMARY.md` | Complete summary |

---

## 🎯 Core Principles

### 1. Backend Controls Everything
- Frontend = Rendering engine
- Backend = Intelligence + flow control
- No hardcoded content in frontend

### 2. Every Interaction is Data
- What was selected
- How long it took
- How much hesitation
- How many changes

### 3. Dynamic Content Delivery
- All content from database
- CMS-ready architecture
- Easy to add new weeks/prompts

---

## 🔐 Your Configuration

### Supabase
- **Project**: wyyujoervprjaswjulor
- **Region**: ap-southeast-2 (Sydney)
- **Database**: PostgreSQL with connection pooling

### Connection Strings (Already Configured)
```
# API (pooled)
DATABASE_URL=postgresql://postgres.wyyujoervprjaswjulor:Ruthwikgoud123@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true

# Migrations (direct)
DIRECT_URL=postgresql://postgres.wyyujoervprjaswjulor:Ruthwikgoud123@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres
```

---

## ✅ What's Ready

- ✅ Complete backend structure
- ✅ All API endpoints
- ✅ Database schema
- ✅ Authentication system
- ✅ Flow engine logic
- ✅ Behavioural signal detection
- ✅ Analytics engine
- ✅ Phase 1 content
- ✅ Demo account
- ✅ Comprehensive documentation

---

## 🔜 Next Steps

### 1. Complete Setup (5 minutes)
- [ ] Add Supabase keys to `.env`
- [ ] Generate JWT secret
- [ ] Run database schema
- [ ] Start server
- [ ] Test with demo account

### 2. Frontend Integration
- [ ] Configure frontend to use backend URL
- [ ] Implement authentication flow
- [ ] Implement dynamic screen rendering
- [ ] Add timing metadata capture
- [ ] Test complete flow

### 3. Add More Content
- [ ] Add more weeks
- [ ] Add more prompts
- [ ] Add more scenarios
- [ ] Create more student accounts

---

## 🧪 Testing

### Test Login
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "school_id": "DEMO001",
    "class_name": "9A",
    "student_id": "STU001",
    "password": "student123"
  }'
```

### Test Flow
```bash
curl -X POST http://localhost:8000/flow/daily-flow \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

## 🛠️ Tech Stack

- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database
- **Supabase** - PostgreSQL database
- **Pydantic** - Data validation
- **JWT** - Authentication
- **Bcrypt** - Password hashing

---

## 📊 Key Metrics Tracked

- Daily completion rates
- Emotional trends (7 days)
- Body map patterns
- Engagement scores
- Streak counts
- Behavioural signals
- Response times
- Hesitation patterns

---

## 🔒 Security Features

- JWT token authentication
- Password hashing (bcrypt)
- Role-based access control
- SQL injection protection
- CORS configuration
- Environment variable secrets

---

## 🎓 Important Notes

1. **Body Map is Most Important** - Captures implicit emotional authenticity
2. **Backend Drives Everything** - Frontend never hardcodes content
3. **Every Interaction is Data** - All timing tracked
4. **Signals are Indicators** - Not conclusions
5. **Phase 1 Validates** - Flow, engagement, architecture

---

## 📞 Quick Reference

### API Base URL
```
Development: http://localhost:8000
```

### Interactive Docs
```
Swagger UI: http://localhost:8000/docs
ReDoc: http://localhost:8000/redoc
```

### Supabase Dashboard
```
https://supabase.com/dashboard/project/wyyujoervprjaswjulor
```

---

## 🐛 Common Issues

### "ModuleNotFoundError"
```bash
cd backend
pip install -r requirements.txt
```

### "Could not connect to database"
- Check `.env` configuration
- Verify Supabase project is active
- Check network connection

### "Week 19 not configured"
- Run `database_schema.sql` in Supabase

### "Could not validate credentials"
- Add Supabase keys to `.env`
- Generate and add JWT SECRET_KEY

---

## 🎉 You're Ready!

Everything is set up and ready to go. Just:

1. ✅ Add Supabase keys
2. ✅ Generate JWT secret
3. ✅ Run database schema
4. ✅ Start server
5. ✅ Test API
6. ✅ Integrate with frontend

---

## 📖 Read Next

1. **SETUP.md** - Detailed setup instructions
2. **API_FLOW_GUIDE.md** - Visual API flows
3. **ARCHITECTURE.md** - System architecture
4. **DATABASE_SCHEMA_REFERENCE.md** - Schema details

---

## 💡 Support

For detailed information, see the documentation files in the `backend/` directory.

**You now have a complete, production-ready backend for InMind Phase 1!** 🚀

---

**Version**: 1.0.0  
**Phase**: 1 - Core Foundation  
**Status**: ✅ Ready for Integration
