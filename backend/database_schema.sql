-- InMind Database Schema for Supabase/PostgreSQL
-- Phase 1: Core Foundation

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============= USERS & AUTH =============

CREATE TABLE schools (
    id SERIAL PRIMARY KEY,
    school_id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE user_role AS ENUM ('student', 'facilitator', 'admin');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    school_id VARCHAR(255) NOT NULL,
    class_name VARCHAR(255) NOT NULL,
    student_id VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'student',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_school FOREIGN KEY (school_id) REFERENCES schools(school_id)
);

CREATE INDEX idx_users_school_id ON users(school_id);
CREATE INDEX idx_users_student_id ON users(student_id);

-- ============= CONTENT STRUCTURE =============

CREATE TABLE modules (
    id SERIAL PRIMARY KEY,
    module_number INTEGER UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE weeks (
    id SERIAL PRIMARY KEY,
    week_number INTEGER UNIQUE NOT NULL,
    module_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    theme VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_module FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
);

CREATE TABLE days (
    id SERIAL PRIMARY KEY,
    week_id INTEGER NOT NULL,
    day_number INTEGER NOT NULL CHECK (day_number BETWEEN 1 AND 7),
    day_name VARCHAR(50) NOT NULL,
    focus VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_week FOREIGN KEY (week_id) REFERENCES weeks(id) ON DELETE CASCADE,
    UNIQUE(week_id, day_number)
);

CREATE TABLE prompts (
    id SERIAL PRIMARY KEY,
    day_id INTEGER NOT NULL,
    prompt_text TEXT NOT NULL,
    prompt_type VARCHAR(100),
    quick_select_options JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_day_prompt FOREIGN KEY (day_id) REFERENCES days(id) ON DELETE CASCADE
);

CREATE TABLE scenarios (
    id SERIAL PRIMARY KEY,
    day_id INTEGER NOT NULL,
    scenario_text TEXT NOT NULL,
    options JSONB NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_day_scenario FOREIGN KEY (day_id) REFERENCES days(id) ON DELETE CASCADE
);

CREATE TABLE insights (
    id SERIAL PRIMARY KEY,
    insight_text TEXT NOT NULL,
    category VARCHAR(100),
    trigger_conditions JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE challenges (
    id SERIAL PRIMARY KEY,
    challenge_text TEXT NOT NULL,
    challenge_type VARCHAR(100),
    duration_minutes INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE emotion_structures (
    id SERIAL PRIMARY KEY,
    primary_emotion VARCHAR(100) NOT NULL,
    sub_emotions JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============= SESSIONS & RESPONSES =============

CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    session_id UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
    week_id INTEGER NOT NULL,
    day_id INTEGER NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    current_screen VARCHAR(100),
    is_completed BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_user_session FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_week_session FOREIGN KEY (week_id) REFERENCES weeks(id),
    CONSTRAINT fk_day_session FOREIGN KEY (day_id) REFERENCES days(id)
);

CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_session_id ON sessions(session_id);
CREATE INDEX idx_sessions_started_at ON sessions(started_at);

CREATE TABLE responses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    session_id INTEGER NOT NULL,
    screen_type VARCHAR(100) NOT NULL,
    response_data JSONB NOT NULL,
    response_time_ms INTEGER,
    hesitation_time_ms INTEGER,
    option_change_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_response FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_session_response FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);

CREATE INDEX idx_responses_user_id ON responses(user_id);
CREATE INDEX idx_responses_session_id ON responses(session_id);
CREATE INDEX idx_responses_screen_type ON responses(screen_type);
CREATE INDEX idx_responses_created_at ON responses(created_at);

-- ============= BODY MAP =============

CREATE TABLE body_map_entries (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    session_id INTEGER NOT NULL,
    body_zone VARCHAR(100) NOT NULL,
    sensation_type VARCHAR(100) NOT NULL,
    sensation_intensity INTEGER NOT NULL CHECK (sensation_intensity BETWEEN 1 AND 5),
    selection_order INTEGER,
    time_spent_ms INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_body_map FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_session_body_map FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);

CREATE INDEX idx_body_map_user_id ON body_map_entries(user_id);
CREATE INDEX idx_body_map_session_id ON body_map_entries(session_id);
CREATE INDEX idx_body_map_created_at ON body_map_entries(created_at);

-- ============= BEHAVIOURAL SIGNALS =============

CREATE TABLE behavioural_signals (
    id SERIAL PRIMARY KEY,
    session_id INTEGER NOT NULL,
    signal_type VARCHAR(100) NOT NULL,
    signal_value FLOAT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_session_signal FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);

CREATE INDEX idx_signals_session_id ON behavioural_signals(session_id);
CREATE INDEX idx_signals_type ON behavioural_signals(signal_type);
CREATE INDEX idx_signals_created_at ON behavioural_signals(created_at);

-- ============= CHALLENGES =============

CREATE TABLE challenge_status (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    challenge_id INTEGER NOT NULL,
    accepted BOOLEAN DEFAULT FALSE,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_challenge FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_challenge FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE,
    UNIQUE(user_id, challenge_id)
);

CREATE INDEX idx_challenge_status_user_id ON challenge_status(user_id);

-- ============= SEED DATA FOR PHASE 1 =============

-- Insert Module 3
INSERT INTO modules (module_number, title, description) VALUES
(3, 'Risk vs Reward', 'Understanding decision-making and consequences');

-- Insert Week 19
INSERT INTO weeks (week_number, module_id, title, theme) VALUES
(19, (SELECT id FROM modules WHERE module_number = 3), 'Risk vs Reward', 'Decision-making under pressure');

-- Insert Days for Week 19
INSERT INTO days (week_id, day_number, day_name, focus) VALUES
((SELECT id FROM weeks WHERE week_number = 19), 1, 'Monday', 'Awareness'),
((SELECT id FROM weeks WHERE week_number = 19), 2, 'Tuesday', 'Recognition'),
((SELECT id FROM weeks WHERE week_number = 19), 3, 'Wednesday', 'Conflict'),
((SELECT id FROM weeks WHERE week_number = 19), 4, 'Thursday', 'Real-Life Mapping'),
((SELECT id FROM weeks WHERE week_number = 19), 5, 'Friday', 'Behaviour Action'),
((SELECT id FROM weeks WHERE week_number = 19), 6, 'Saturday', 'Simulation'),
((SELECT id FROM weeks WHERE week_number = 19), 7, 'Sunday', 'Weekly Reflection');

-- Insert Sample Prompts
INSERT INTO prompts (day_id, prompt_text, prompt_type) VALUES
((SELECT id FROM days WHERE week_id = (SELECT id FROM weeks WHERE week_number = 19) AND day_number = 1), 
 'What decision stayed in your mind today?', 'daily'),
((SELECT id FROM days WHERE week_id = (SELECT id FROM weeks WHERE week_number = 19) AND day_number = 2), 
 'When did you feel pressure to make a choice?', 'daily');

-- Insert Sample Scenarios
INSERT INTO scenarios (day_id, scenario_text, options) VALUES
((SELECT id FROM days WHERE week_id = (SELECT id FROM weeks WHERE week_number = 19) AND day_number = 1),
 'Your friends ask you to skip class.',
 '["Go", "Refuse", "Hesitate"]'::jsonb),
((SELECT id FROM days WHERE week_id = (SELECT id FROM weeks WHERE week_number = 19) AND day_number = 2),
 'You see someone being left out. What do you do?',
 '["Join them", "Ignore it", "Tell someone"]'::jsonb);

-- Insert Emotion Structures
INSERT INTO emotion_structures (primary_emotion, sub_emotions) VALUES
('Happy', '["Joyful", "Content", "Excited", "Peaceful"]'::jsonb),
('Sad', '["Lonely", "Disappointed", "Hurt", "Down"]'::jsonb),
('Anxious', '["Restless", "Overwhelmed", "Pressured", "Nervous"]'::jsonb),
('Angry', '["Frustrated", "Irritated", "Upset", "Annoyed"]'::jsonb),
('Confused', '["Uncertain", "Lost", "Conflicted", "Unsure"]'::jsonb),
('Calm', '["Relaxed", "Centered", "Balanced", "At ease"]'::jsonb);

-- Insert Sample Challenges
INSERT INTO challenges (challenge_text, challenge_type, duration_minutes) VALUES
('Pause for 10 seconds before one important decision today.', 'pause', 0),
('Take 3 deep breaths when you feel pressure.', 'breathing', 2),
('Write down one thing you''re grateful for.', 'reflection', 5),
('Notice one moment when you felt calm today.', 'awareness', 0);

-- Insert Sample School
INSERT INTO schools (school_id, name) VALUES
('DEMO001', 'Demo School');

-- Insert Sample Student (password: "student123")
-- Note: You'll need to hash this password properly in your application
INSERT INTO users (school_id, class_name, student_id, password_hash, role) VALUES
('DEMO001', '9A', 'STU001', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5NU7LjqKe6Fla', 'student');

-- ============= VIEWS FOR ANALYTICS =============

-- View for daily completion rates
CREATE OR REPLACE VIEW daily_completion_rates AS
SELECT 
    user_id,
    DATE(started_at) as completion_date,
    COUNT(*) as sessions_started,
    SUM(CASE WHEN is_completed THEN 1 ELSE 0 END) as sessions_completed
FROM sessions
GROUP BY user_id, DATE(started_at);

-- View for emotional trends
CREATE OR REPLACE VIEW emotional_trends AS
SELECT 
    r.user_id,
    DATE(r.created_at) as trend_date,
    r.response_data->>'primary_emotion' as primary_emotion,
    COUNT(*) as emotion_count
FROM responses r
WHERE r.screen_type = 'emotion_check'
GROUP BY r.user_id, DATE(r.created_at), r.response_data->>'primary_emotion';

-- View for body map patterns
CREATE OR REPLACE VIEW body_map_patterns AS
SELECT 
    user_id,
    body_zone,
    sensation_type,
    COUNT(*) as occurrence_count,
    AVG(sensation_intensity) as avg_intensity
FROM body_map_entries
GROUP BY user_id, body_zone, sensation_type;

COMMENT ON TABLE users IS 'Student, facilitator, and admin users';
COMMENT ON TABLE sessions IS 'Daily flow sessions - tracks user progress through daily journey';
COMMENT ON TABLE responses IS 'All user responses to screens - core behavioural data';
COMMENT ON TABLE body_map_entries IS 'Body map interactions - implicit emotional authenticity layer';
COMMENT ON TABLE behavioural_signals IS 'Detected behavioural patterns - rapid taps, hesitation, etc.';
COMMENT ON COLUMN responses.response_time_ms IS 'Time from screen render to response submit';
COMMENT ON COLUMN responses.hesitation_time_ms IS 'Time from screen render to first interaction';
COMMENT ON COLUMN responses.option_change_count IS 'Number of times user changed their answer';
