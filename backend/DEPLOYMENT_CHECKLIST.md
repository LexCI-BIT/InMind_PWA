# InMind Backend Deployment Checklist

## ✅ Pre-Deployment Setup

### 1. Environment Configuration

- [ ] Copy `.env.example` to `.env`
- [ ] Add Supabase URL (already configured)
- [ ] Add Supabase anon key from dashboard
- [ ] Add Supabase service role key from dashboard
- [ ] Generate and add JWT SECRET_KEY
- [ ] Verify DATABASE_URL is correct
- [ ] Set ENVIRONMENT to "development" or "production"

**Get Supabase Keys**:
1. Go to: https://supabase.com/dashboard/project/wyyujoervprjaswjulor/settings/api
2. Copy `anon` key → `SUPABASE_KEY`
3. Copy `service_role` key → `SUPABASE_SERVICE_KEY`

**Generate JWT Secret**:
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

### 2. Database Setup

- [ ] Open Supabase SQL Editor
- [ ] Copy contents of `database_schema.sql`
- [ ] Execute SQL script
- [ ] Verify tables created (15 tables)
- [ ] Verify sample data exists (Module 3, Week 19)
- [ ] Verify demo user created (STU001)

**Verification Query**:
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

Expected tables:
- behavioural_signals
- body_map_entries
- challenge_status
- challenges
- days
- emotion_structures
- insights
- modules
- prompts
- responses
- scenarios
- schools
- sessions
- users
- weeks

### 3. Python Environment

- [ ] Python 3.8+ installed
- [ ] Create virtual environment (optional but recommended)
- [ ] Install dependencies: `pip install -r requirements.txt`
- [ ] Verify all packages installed successfully

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

### 4. Test Database Connection

- [ ] Run test connection script

Create `test_connection.py`:
```python
from app.database import engine
from sqlalchemy import text

try:
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1"))
        print("✅ Database connection successful!")
except Exception as e:
    print(f"❌ Database connection failed: {e}")
```

Run:
```bash
python test_connection.py
```

## 🚀 Development Deployment

### 1. Start Development Server

- [ ] Navigate to backend directory
- [ ] Activate virtual environment (if using)
- [ ] Start server with auto-reload

```bash
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Verify Server Running

- [ ] Server starts without errors
- [ ] Visit http://localhost:8000
- [ ] Visit http://localhost:8000/docs (Swagger UI)
- [ ] Visit http://localhost:8000/health

Expected response from `/health`:
```json
{"status": "healthy"}
```

### 3. Test Authentication

- [ ] Test login with demo account

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

Expected: JWT token returned

### 4. Test Flow Engine

- [ ] Test daily flow start (without session_id)
- [ ] Verify session created
- [ ] Verify first screen returned

```bash
curl -X POST http://localhost:8000/flow/daily-flow \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{}'
```

Expected: context_warmup screen returned

### 5. Test Response Submission

- [ ] Submit a test response
- [ ] Verify response stored
- [ ] Verify behavioural signals detected (if applicable)

### 6. Test Analytics

- [ ] Get completion status
- [ ] Get student analytics
- [ ] Verify data returned correctly

## 🔒 Security Checklist

### Development

- [ ] `.env` file in `.gitignore`
- [ ] No hardcoded secrets in code
- [ ] JWT secret is strong (32+ characters)
- [ ] Password hashing enabled (bcrypt)
- [ ] CORS configured for development

### Production

- [ ] Change `ENVIRONMENT` to "production"
- [ ] Use production database credentials
- [ ] Configure CORS for specific origins only
- [ ] Enable HTTPS
- [ ] Use environment variables (not .env file)
- [ ] Set up database backups
- [ ] Configure rate limiting
- [ ] Set up monitoring and logging
- [ ] Use production ASGI server (Gunicorn)

## 📊 Data Verification

### 1. Verify Content Exists

```sql
-- Check modules
SELECT * FROM modules;
-- Expected: 1 row (Module 3)

-- Check weeks
SELECT * FROM weeks WHERE week_number = 19;
-- Expected: 1 row (Week 19)

-- Check days
SELECT * FROM days WHERE week_id = (SELECT id FROM weeks WHERE week_number = 19);
-- Expected: 7 rows (Monday-Sunday)

-- Check emotions
SELECT * FROM emotion_structures;
-- Expected: 6 rows (Happy, Sad, Anxious, Angry, Confused, Calm)

-- Check challenges
SELECT * FROM challenges;
-- Expected: 4 rows
```

### 2. Verify Demo User

```sql
SELECT * FROM users WHERE student_id = 'STU001';
-- Expected: 1 row
```

### 3. Test Complete Flow

- [ ] Login as demo user
- [ ] Start daily flow
- [ ] Submit response for each screen
- [ ] Complete entire flow
- [ ] Verify session marked as completed
- [ ] Check analytics updated

## 🐛 Troubleshooting

### Issue: "ModuleNotFoundError: No module named 'app'"

**Solution**:
```bash
# Make sure you're in the backend directory
cd backend
# And running from there
python -m uvicorn app.main:app --reload
```

### Issue: "Could not connect to database"

**Solutions**:
1. Check DATABASE_URL in `.env`
2. Verify Supabase project is active
3. Check network connection
4. Verify password is correct (no special characters issues)

### Issue: "Week 19 not configured"

**Solution**:
Run `database_schema.sql` in Supabase SQL Editor

### Issue: "Could not validate credentials"

**Solutions**:
1. Check SUPABASE_KEY and SUPABASE_SERVICE_KEY in `.env`
2. Verify SECRET_KEY is set
3. Check token hasn't expired (30 min default)

### Issue: "Table does not exist"

**Solution**:
Run complete `database_schema.sql` script

## 📈 Performance Checklist

### Database

- [ ] Indexes created (automatic from schema)
- [ ] Connection pooling enabled (pgbouncer)
- [ ] Query performance acceptable (< 100ms)

### API

- [ ] Response times < 200ms for most endpoints
- [ ] Flow engine responds quickly
- [ ] No memory leaks during long sessions

## 🧪 Testing Checklist

### Manual Testing

- [ ] Login works
- [ ] Flow engine returns correct screens
- [ ] Responses stored correctly
- [ ] Body map entries stored
- [ ] Behavioural signals detected
- [ ] Analytics calculated correctly
- [ ] Streak tracking works
- [ ] Session continuity works
- [ ] Error handling works

### API Testing (via Swagger UI)

- [ ] All endpoints documented
- [ ] All endpoints testable
- [ ] Request/response schemas correct
- [ ] Authentication works

## 📱 Frontend Integration Checklist

### API Configuration

- [ ] Frontend configured to use backend URL
- [ ] CORS allows frontend origin
- [ ] Token storage implemented
- [ ] Token refresh implemented (if needed)

### Flow Integration

- [ ] Frontend calls `/flow/daily-flow` correctly
- [ ] Frontend renders dynamic screens
- [ ] Frontend captures timing metadata
- [ ] Frontend submits responses with metadata
- [ ] Frontend handles session continuity

### Error Handling

- [ ] Frontend handles 401 (re-login)
- [ ] Frontend handles 404 (new session)
- [ ] Frontend handles network errors
- [ ] Frontend shows user-friendly messages

## 🚀 Production Deployment

### Pre-Production

- [ ] All development tests pass
- [ ] Database migrations tested
- [ ] Backup strategy in place
- [ ] Monitoring configured
- [ ] Logging configured
- [ ] Error tracking configured (e.g., Sentry)

### Production Server

- [ ] Use Gunicorn + Uvicorn workers
- [ ] Configure worker count (4-8 recommended)
- [ ] Set up reverse proxy (nginx)
- [ ] Enable HTTPS
- [ ] Configure firewall
- [ ] Set up health checks
- [ ] Configure auto-restart on failure

**Production Start Command**:
```bash
gunicorn app.main:app \
  -w 4 \
  -k uvicorn.workers.UvicornWorker \
  --bind 0.0.0.0:8000 \
  --access-logfile - \
  --error-logfile -
```

### Post-Deployment

- [ ] Verify all endpoints accessible
- [ ] Test complete user flow
- [ ] Monitor error rates
- [ ] Monitor response times
- [ ] Monitor database performance
- [ ] Set up alerts for issues

## 📊 Monitoring Checklist

### Metrics to Track

- [ ] API response times
- [ ] Error rates
- [ ] Database query performance
- [ ] Active sessions
- [ ] Daily completions
- [ ] User engagement
- [ ] Behavioural signal frequency

### Alerts to Configure

- [ ] API downtime
- [ ] High error rate (> 5%)
- [ ] Slow response times (> 1s)
- [ ] Database connection issues
- [ ] Disk space low
- [ ] Memory usage high

## 🔄 Maintenance Checklist

### Daily

- [ ] Check error logs
- [ ] Monitor API performance
- [ ] Check database health

### Weekly

- [ ] Review user engagement metrics
- [ ] Check for flatline patterns
- [ ] Review behavioural signals
- [ ] Database backup verification

### Monthly

- [ ] Update dependencies
- [ ] Security audit
- [ ] Performance optimization
- [ ] Add new content (weeks/prompts)

## ✅ Final Verification

Before considering deployment complete:

- [ ] All environment variables set
- [ ] Database schema created
- [ ] Sample data loaded
- [ ] Server starts successfully
- [ ] All API endpoints work
- [ ] Authentication works
- [ ] Flow engine works
- [ ] Responses stored correctly
- [ ] Analytics calculated correctly
- [ ] Documentation reviewed
- [ ] Team trained on API usage

## 📚 Documentation Checklist

- [ ] README.md reviewed
- [ ] ARCHITECTURE.md reviewed
- [ ] SETUP.md followed
- [ ] API_FLOW_GUIDE.md understood
- [ ] DATABASE_SCHEMA_REFERENCE.md reviewed
- [ ] Team has access to all docs

---

## 🎉 Ready to Deploy!

Once all items are checked:

1. ✅ Environment configured
2. ✅ Database set up
3. ✅ Server running
4. ✅ Tests passing
5. ✅ Documentation complete

**You're ready to integrate with the frontend!**

---

## 📞 Support Resources

- **API Documentation**: http://localhost:8000/docs
- **Architecture Guide**: `ARCHITECTURE.md`
- **Database Reference**: `DATABASE_SCHEMA_REFERENCE.md`
- **API Flow Guide**: `API_FLOW_GUIDE.md`
- **Setup Guide**: `SETUP.md`

---

**Last Updated**: Phase 1 - Core Foundation
**Version**: 1.0.0
