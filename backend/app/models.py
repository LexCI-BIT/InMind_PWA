from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Boolean, JSON, Float, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import enum


class UserRole(str, enum.Enum):
    STUDENT = "student"
    FACILITATOR = "facilitator"
    ADMIN = "admin"


class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(String, nullable=False, index=True)
    class_name = Column(String, nullable=False)
    student_id = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.STUDENT)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    sessions = relationship("Session", back_populates="user")
    responses = relationship("Response", back_populates="user")
    body_map_entries = relationship("BodyMapEntry", back_populates="user")
    challenges = relationship("ChallengeStatus", back_populates="user")


class School(Base):
    __tablename__ = "schools"
    
    id = Column(Integer, primary_key=True, index=True)
    school_id = Column(String, unique=True, nullable=False, index=True)
    name = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Module(Base):
    __tablename__ = "modules"
    
    id = Column(Integer, primary_key=True, index=True)
    module_number = Column(Integer, nullable=False, unique=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    weeks = relationship("Week", back_populates="module")


class Week(Base):
    __tablename__ = "weeks"
    
    id = Column(Integer, primary_key=True, index=True)
    week_number = Column(Integer, nullable=False, unique=True)
    module_id = Column(Integer, ForeignKey("modules.id"))
    title = Column(String, nullable=False)
    theme = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    module = relationship("Module", back_populates="weeks")
    days = relationship("Day", back_populates="week")


class Day(Base):
    __tablename__ = "days"
    
    id = Column(Integer, primary_key=True, index=True)
    week_id = Column(Integer, ForeignKey("weeks.id"))
    day_number = Column(Integer, nullable=False)  # 1-7 (Monday-Sunday)
    day_name = Column(String, nullable=False)  # Monday, Tuesday, etc.
    focus = Column(String)  # Awareness, Recognition, etc.
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    week = relationship("Week", back_populates="days")
    prompts = relationship("Prompt", back_populates="day")
    scenarios = relationship("Scenario", back_populates="day")


class Prompt(Base):
    __tablename__ = "prompts"
    
    id = Column(Integer, primary_key=True, index=True)
    day_id = Column(Integer, ForeignKey("days.id"))
    prompt_text = Column(Text, nullable=False)
    prompt_type = Column(String)  # daily, reflection, etc.
    quick_select_options = Column(JSON)  # Optional quick answers
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    day = relationship("Day", back_populates="prompts")


class Scenario(Base):
    __tablename__ = "scenarios"
    
    id = Column(Integer, primary_key=True, index=True)
    day_id = Column(Integer, ForeignKey("days.id"))
    scenario_text = Column(Text, nullable=False)
    options = Column(JSON, nullable=False)  # List of decision options
    metadata = Column(JSON)  # Additional scenario data
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    day = relationship("Day", back_populates="scenarios")


class Insight(Base):
    __tablename__ = "insights"
    
    id = Column(Integer, primary_key=True, index=True)
    insight_text = Column(Text, nullable=False)
    category = Column(String)  # emotional, behavioural, etc.
    trigger_conditions = Column(JSON)  # Conditions for showing this insight
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Challenge(Base):
    __tablename__ = "challenges"
    
    id = Column(Integer, primary_key=True, index=True)
    challenge_text = Column(Text, nullable=False)
    challenge_type = Column(String)  # pause, reflect, action, etc.
    duration_minutes = Column(Integer)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Session(Base):
    __tablename__ = "sessions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    session_id = Column(String, unique=True, nullable=False, index=True)
    week_id = Column(Integer, ForeignKey("weeks.id"))
    day_id = Column(Integer, ForeignKey("days.id"))
    started_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True), nullable=True)
    current_screen = Column(String)
    is_completed = Column(Boolean, default=False)
    
    # Relationships
    user = relationship("User", back_populates="sessions")
    responses = relationship("Response", back_populates="session")
    behavioural_signals = relationship("BehaviouralSignal", back_populates="session")


class Response(Base):
    __tablename__ = "responses"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    session_id = Column(Integer, ForeignKey("sessions.id"))
    screen_type = Column(String, nullable=False)  # context_warmup, energy_check, etc.
    response_data = Column(JSON, nullable=False)
    response_time_ms = Column(Integer)
    hesitation_time_ms = Column(Integer)
    option_change_count = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="responses")
    session = relationship("Session", back_populates="responses")


class BodyMapEntry(Base):
    __tablename__ = "body_map_entries"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    session_id = Column(Integer, ForeignKey("sessions.id"))
    body_zone = Column(String, nullable=False)  # head, chest, stomach, etc.
    sensation_type = Column(String, nullable=False)  # tight, heavy, warm, etc.
    sensation_intensity = Column(Integer, nullable=False)  # 1-5
    selection_order = Column(Integer)
    time_spent_ms = Column(Integer)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="body_map_entries")


class BehaviouralSignal(Base):
    __tablename__ = "behavioural_signals"
    
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("sessions.id"))
    signal_type = Column(String, nullable=False)  # rapid_tap, hesitation, etc.
    signal_value = Column(Float)
    metadata = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    session = relationship("Session", back_populates="behavioural_signals")


class ChallengeStatus(Base):
    __tablename__ = "challenge_status"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    challenge_id = Column(Integer, ForeignKey("challenges.id"))
    accepted = Column(Boolean, default=False)
    completed = Column(Boolean, default=False)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="challenges")


class EmotionStructure(Base):
    __tablename__ = "emotion_structures"
    
    id = Column(Integer, primary_key=True, index=True)
    primary_emotion = Column(String, nullable=False)
    sub_emotions = Column(JSON, nullable=False)  # List of sub-emotions
    created_at = Column(DateTime(timezone=True), server_default=func.now())
