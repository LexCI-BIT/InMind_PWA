# InMind Backend Setup Guide

## Quick Start

### 1. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

Or use a virtual environment (recommended):

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
pip install -r requirements.txt
```

### 2. Configure Environment Variables

The `.env` file has been created with your Supabase credentials. You need to add:

1. **Supabase Keys** - Get these from your Supabase dashboard:
   - Go to: https://supabase.com/dashboard/project/wyyujoervprjaswjulor/settings/api
   - Copy `anon` key → Set as `SUPABASE_KEY`
   - Copy `service_role` key → Set as `SUPABASE_SERVICE_KEY`

2. **JWT Secret Key** - Generate a secure secret:
   ```bash
   # On Windows PowerShell
   -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
   
   # Or use Python
   python -c "import secrets; print(secrets.token_hex(32))"
   ```
   Copy the output and set as `SECRET_KEY` in `.env`

### 3. Set Up Database Schema

1. Go to your Supabase SQL Editor:
   https://supabase.com/dashboard/project/wyyujoervprjaswjulor/sql/new

2. Copy the entire contents of `database_schema.sql`

3. Paste and run it in the SQL Editor

This will create:
- All tables (users, sessions, responses, body_map_entries, etc.)
- Indexes for performance
- Sample data for Phase 1 (Module 3, Week 19)
- Demo student account

### 4. Verify Database Setup

Run this query in Supabase SQL Editor to verify:

```sql
-- Check if tables were created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check if sample data exists
SELECT * FROM modules;
SELECT * FROM weeks WHERE week_number = 19;
SELECT * FROM users WHERE student_id = 'STU001';
```

### 5. Run the Backend

```bash
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- **API**: http://localhost:8000
- **Interactive Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### 6. Test the API

#### Test 1: Health Check
```bash
curl http://localhost:8000/health
```

Expected response:
```json
{"status": "healthy"}
```

#### Test 2: Login with Demo Account
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

Expected response:
```json
{
  "access_token": "eyJ...",
  "token_type": "bearer",
  "user_id": 1,
  "role": "student"
}
```

#### Test 3: Start Daily Flow
```bash
# Replace YOUR_TOKEN with the access_token from login
curl -X POST http://localhost:8000/flow/daily-flow \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{}'
```

Expected response:
```json
{
  "session_id": "uuid-here",
  "screen": {
    "screen_type": "context_warmup",
    "title": "Where are you right now?",
    "options": ["At School", "At Home", "With Friends", "Alone", "Travelling"],
    "metadata": {...}
  },
  "is_complete": false
}
```

## Troubleshooting

### Issue: "ModuleNotFoundError"
**Solution**: Make sure you're in the backend directory and have installed dependencies:
```bash
cd backend
pip install -r requirements.txt
```

### Issue: "Connection refused" or database errors
**Solution**: 
1. Check your `.env` file has correct DATABASE_URL
2. Verify your Supabase project is active
3. Check if database schema was created successfully

### Issue: "Could not validate credentials"
**Solution**:
1. Make sure you've set SUPABASE_KEY and SUPABASE_SERVICE_KEY in `.env`
2. Verify the keys are correct in Supabase dashboard
3. Check if SECRET_KEY is set in `.env`

### Issue: "Week 19 not configured"
**Solution**: Run the `database_schema.sql` file in Supabase SQL Editor to create sample data

## Next Steps

### 1. Update Frontend to Connect to Backend

Update your frontend API calls to point to `http://localhost:8000`

### 2. Add More Content

You can add more weeks, prompts, and scenarios by inserting into the database:

```sql
-- Add a new prompt
INSERT INTO prompts (day_id, prompt_text, prompt_type) VALUES
((SELECT id FROM days WHERE week_id = (SELECT id FROM weeks WHERE week_number = 19) AND day_number = 3), 
 'What made you pause today?', 'daily');
```

### 3. Create More Student Accounts

```sql
-- Add a new student (password will need to be hashed in your app)
INSERT INTO users (school_id, class_name, student_id, password_hash, role) VALUES
('DEMO001', '9A', 'STU002', '$2b$12$...', 'student');
```

### 4. Monitor Behavioural Signals

Query behavioural signals to see patterns:

```sql
SELECT 
    signal_type, 
    COUNT(*) as count,
    AVG(signal_value) as avg_value
FROM behavioural_signals
GROUP BY signal_type;
```

## Production Deployment

For production deployment:

1. **Set Environment to Production**
   ```
   ENVIRONMENT=production
   ```

2. **Use Production Database URL**
   Update DATABASE_URL with production credentials

3. **Configure CORS**
   Update `main.py` to allow only your frontend domain

4. **Use Production ASGI Server**
   ```bash
   pip install gunicorn
   gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
   ```

5. **Enable HTTPS**
   Use a reverse proxy (nginx) or deploy to a platform with HTTPS support

## API Documentation

Once the server is running, visit:
- http://localhost:8000/docs - Interactive Swagger UI
- http://localhost:8000/redoc - ReDoc documentation

## Support

For detailed architecture information, see `ARCHITECTURE.md`
For API details, see `README.md`
