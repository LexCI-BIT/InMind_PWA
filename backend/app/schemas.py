from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum


# ============= AUTH SCHEMAS =============

class UserRole(str, Enum):
    STUDENT = "student"
    FACILITATOR = "facilitator"
    ADMIN = "admin"


class LoginRequest(BaseModel):
    school_id: str
    class_name: str
    student_id: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: int
    role: UserRole


# ============= FLOW SCHEMAS =============

class ScreenMetadata(BaseModel):
    week: int
    module: int
    day: int
    screen_order: int


class ContextWarmupScreen(BaseModel):
    screen_type: str = "context_warmup"
    title: str = "Where are you right now?"
    options: List[str]
    metadata: ScreenMetadata


class EnergyCheckScreen(BaseModel):
    screen_type: str = "energy_check"
    title: str = "How's your energy level?"
    scale_min: int = 0
    scale_max: int = 100
    labels: Dict[str, str]
    metadata: ScreenMetadata


class EmotionOption(BaseModel):
    primary_emotion: str
    sub_emotions: List[str]


class EmotionCheckScreen(BaseModel):
    screen_type: str = "emotion_check"
    title: str = "How are you feeling?"
    emotions: List[EmotionOption]
    metadata: ScreenMetadata


class BodyZone(BaseModel):
    zone: str
    sensations: List[str]


class BodyMapScreen(BaseModel):
    screen_type: str = "body_map"
    title: str = "Where do you feel it in your body?"
    body_zones: List[BodyZone]
    intensity_scale: Dict[str, int]
    metadata: ScreenMetadata


class PromptScreen(BaseModel):
    screen_type: str = "daily_prompt"
    prompt_text: str
    quick_select_options: Optional[List[str]] = None
    allow_text_input: bool = True
    metadata: ScreenMetadata


class ScenarioScreen(BaseModel):
    screen_type: str = "scenario"
    title: str
    scenario: str
    options: List[str]
    metadata: ScreenMetadata


class ReflectionScreen(BaseModel):
    screen_type: str = "reflection"
    question: str
    options: Optional[List[str]] = None
    allow_text_input: bool = True
    metadata: ScreenMetadata


class InsightScreen(BaseModel):
    screen_type: str = "insight"
    insight_text: str
    category: str
    metadata: ScreenMetadata


class ChallengeScreen(BaseModel):
    screen_type: str = "challenge"
    challenge_id: int
    challenge_text: str
    challenge_type: str
    duration_minutes: Optional[int] = None
    metadata: ScreenMetadata


class CompletionScreen(BaseModel):
    screen_type: str = "completion"
    streak_count: int
    progress_percentage: int
    encouragement_text: str
    metadata: ScreenMetadata


# ============= RESPONSE SCHEMAS =============

class ResponseBase(BaseModel):
    screen_type: str
    response_data: Dict[str, Any]
    response_time_ms: Optional[int] = None
    hesitation_time_ms: Optional[int] = None
    option_change_count: Optional[int] = 0


class ResponseCreate(ResponseBase):
    session_id: str


class ResponseOut(ResponseBase):
    id: int
    user_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True


class BodyMapEntryCreate(BaseModel):
    session_id: str
    body_zone: str
    sensation_type: str
    sensation_intensity: int = Field(ge=1, le=5)
    selection_order: Optional[int] = None
    time_spent_ms: Optional[int] = None


class BodyMapEntryOut(BaseModel):
    id: int
    body_zone: str
    sensation_type: str
    sensation_intensity: int
    created_at: datetime
    
    class Config:
        from_attributes = True


# ============= SESSION SCHEMAS =============

class SessionCreate(BaseModel):
    week_id: int
    day_id: int


class SessionOut(BaseModel):
    id: int
    session_id: str
    week_id: int
    day_id: int
    started_at: datetime
    completed_at: Optional[datetime] = None
    current_screen: Optional[str] = None
    is_completed: bool
    
    class Config:
        from_attributes = True


# ============= CHALLENGE SCHEMAS =============

class ChallengeStatusCreate(BaseModel):
    challenge_id: int
    accepted: bool


class ChallengeStatusUpdate(BaseModel):
    completed: bool


class ChallengeStatusOut(BaseModel):
    id: int
    challenge_id: int
    accepted: bool
    completed: bool
    completed_at: Optional[datetime] = None
    created_at: datetime
    
    class Config:
        from_attributes = True


# ============= FLOW CONTROL SCHEMAS =============

class DailyFlowRequest(BaseModel):
    """Request to get the next screen in the daily flow"""
    session_id: Optional[str] = None


class DailyFlowResponse(BaseModel):
    """Response containing the next screen to render"""
    session_id: str
    screen: Dict[str, Any]  # Can be any screen type
    is_complete: bool = False


class CurrentWeekResponse(BaseModel):
    week_number: int
    module_number: int
    title: str
    theme: Optional[str] = None


class CurrentDayResponse(BaseModel):
    day_number: int
    day_name: str
    focus: Optional[str] = None
    week_number: int


class CompletionStatusResponse(BaseModel):
    is_completed: bool
    completion_percentage: int
    streak_count: int
    last_completed_at: Optional[datetime] = None


# ============= BEHAVIOURAL SIGNAL SCHEMAS =============

class BehaviouralSignalCreate(BaseModel):
    session_id: str
    signal_type: str
    signal_value: Optional[float] = None
    metadata: Optional[Dict[str, Any]] = None


class BehaviouralSignalOut(BaseModel):
    id: int
    signal_type: str
    signal_value: Optional[float] = None
    metadata: Optional[Dict[str, Any]] = None
    created_at: datetime
    
    class Config:
        from_attributes = True


# ============= ANALYTICS SCHEMAS =============

class EmotionalTrend(BaseModel):
    date: str
    primary_emotion: str
    energy_level: Optional[int] = None


class EngagementMetrics(BaseModel):
    daily_completion_rate: float
    average_session_duration_minutes: float
    interaction_depth_score: float
    streak_count: int


class StudentAnalytics(BaseModel):
    emotional_trends: List[EmotionalTrend]
    engagement_metrics: EngagementMetrics
    body_map_patterns: Dict[str, int]
    flatline_detected: bool
