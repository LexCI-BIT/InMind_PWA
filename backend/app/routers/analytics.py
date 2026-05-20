from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from app.database import get_db
from app.models import User, Response, BodyMapEntry, Session as SessionModel
from app.schemas import CompletionStatusResponse, StudentAnalytics, EmotionalTrend, EngagementMetrics
from app.auth import get_current_user

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/completion-status", response_model=CompletionStatusResponse)
def get_completion_status(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get completion status for the current user
    
    Returns:
    - is_completed: Whether today's flow is completed
    - completion_percentage: Overall completion rate
    - streak_count: Current streak
    - last_completed_at: Last completion timestamp
    """
    
    # Check if today's session is completed
    today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    today_session = db.query(SessionModel).filter(
        SessionModel.user_id == current_user.id,
        SessionModel.started_at >= today_start,
        SessionModel.is_completed == True
    ).first()
    
    # Calculate completion percentage (last 7 days)
    week_ago = datetime.utcnow() - timedelta(days=7)
    total_days = 7
    completed_days = db.query(func.count(func.distinct(func.date(SessionModel.started_at)))).filter(
        SessionModel.user_id == current_user.id,
        SessionModel.started_at >= week_ago,
        SessionModel.is_completed == True
    ).scalar()
    
    completion_percentage = int((completed_days / total_days) * 100) if completed_days else 0
    
    # Calculate streak
    streak_count = calculate_streak(current_user.id, db)
    
    # Get last completed session
    last_completed = db.query(SessionModel).filter(
        SessionModel.user_id == current_user.id,
        SessionModel.is_completed == True
    ).order_by(SessionModel.completed_at.desc()).first()
    
    return CompletionStatusResponse(
        is_completed=today_session is not None,
        completion_percentage=completion_percentage,
        streak_count=streak_count,
        last_completed_at=last_completed.completed_at if last_completed else None
    )


@router.get("/student-analytics", response_model=StudentAnalytics)
def get_student_analytics(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get comprehensive analytics for the student
    
    Phase 1 basic analytics:
    - Emotional trends (last 7 days)
    - Engagement metrics
    - Body map patterns
    - Flatline detection
    """
    
    # Get emotional trends (last 7 days)
    week_ago = datetime.utcnow() - timedelta(days=7)
    emotional_responses = db.query(Response).filter(
        Response.user_id == current_user.id,
        Response.screen_type == "emotion_check",
        Response.created_at >= week_ago
    ).all()
    
    emotional_trends = []
    for response in emotional_responses:
        emotional_trends.append(EmotionalTrend(
            date=response.created_at.strftime("%Y-%m-%d"),
            primary_emotion=response.response_data.get("primary_emotion", "Unknown"),
            energy_level=None  # Can be enhanced to include energy data
        ))
    
    # Calculate engagement metrics
    total_sessions = db.query(SessionModel).filter(
        SessionModel.user_id == current_user.id,
        SessionModel.started_at >= week_ago
    ).count()
    
    completed_sessions = db.query(SessionModel).filter(
        SessionModel.user_id == current_user.id,
        SessionModel.started_at >= week_ago,
        SessionModel.is_completed == True
    ).count()
    
    daily_completion_rate = (completed_sessions / 7) * 100 if total_sessions > 0 else 0
    
    # Calculate average session duration
    avg_duration = db.query(
        func.avg(
            func.extract('epoch', SessionModel.completed_at - SessionModel.started_at)
        )
    ).filter(
        SessionModel.user_id == current_user.id,
        SessionModel.is_completed == True,
        SessionModel.started_at >= week_ago
    ).scalar()
    
    avg_duration_minutes = (avg_duration / 60) if avg_duration else 0
    
    # Calculate interaction depth score (simplified)
    total_responses = db.query(Response).filter(
        Response.user_id == current_user.id,
        Response.created_at >= week_ago
    ).count()
    
    interaction_depth_score = min((total_responses / 70) * 100, 100)  # 70 = 7 days * 10 screens
    
    streak_count = calculate_streak(current_user.id, db)
    
    engagement_metrics = EngagementMetrics(
        daily_completion_rate=daily_completion_rate,
        average_session_duration_minutes=avg_duration_minutes,
        interaction_depth_score=interaction_depth_score,
        streak_count=streak_count
    )
    
    # Get body map patterns
    body_map_entries = db.query(
        BodyMapEntry.body_zone,
        func.count(BodyMapEntry.id).label('count')
    ).filter(
        BodyMapEntry.user_id == current_user.id,
        BodyMapEntry.created_at >= week_ago
    ).group_by(BodyMapEntry.body_zone).all()
    
    body_map_patterns = {entry.body_zone: entry.count for entry in body_map_entries}
    
    # Flatline detection (same emotion for 5+ consecutive days)
    flatline_detected = detect_flatline(current_user.id, db)
    
    return StudentAnalytics(
        emotional_trends=emotional_trends,
        engagement_metrics=engagement_metrics,
        body_map_patterns=body_map_patterns,
        flatline_detected=flatline_detected
    )


def calculate_streak(user_id: int, db: Session) -> int:
    """
    Calculate current streak of consecutive completed days
    """
    # Get all completed sessions ordered by date
    sessions = db.query(
        func.date(SessionModel.started_at).label('date')
    ).filter(
        SessionModel.user_id == user_id,
        SessionModel.is_completed == True
    ).distinct().order_by(func.date(SessionModel.started_at).desc()).all()
    
    if not sessions:
        return 0
    
    streak = 0
    current_date = datetime.utcnow().date()
    
    for session in sessions:
        session_date = session.date
        
        # Check if this session is consecutive
        if session_date == current_date or session_date == current_date - timedelta(days=streak):
            streak += 1
            current_date = session_date
        else:
            break
    
    return streak


def detect_flatline(user_id: int, db: Session) -> bool:
    """
    Detect if user is showing flatline behaviour
    (same emotion for 5+ consecutive days)
    """
    # Get last 5 emotional responses
    responses = db.query(Response).filter(
        Response.user_id == user_id,
        Response.screen_type == "emotion_check"
    ).order_by(Response.created_at.desc()).limit(5).all()
    
    if len(responses) < 5:
        return False
    
    # Check if all emotions are the same
    emotions = [r.response_data.get("primary_emotion") for r in responses]
    return len(set(emotions)) == 1
