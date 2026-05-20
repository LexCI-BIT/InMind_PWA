from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Dict, Any
import uuid
from app.database import get_db
from app.models import User, Session as SessionModel, Week, Day, Prompt, Scenario, EmotionStructure
from app.schemas import (
    DailyFlowRequest, DailyFlowResponse, CurrentWeekResponse, 
    CurrentDayResponse, ContextWarmupScreen, EnergyCheckScreen,
    EmotionCheckScreen, BodyMapScreen, PromptScreen, ScenarioScreen,
    ScreenMetadata
)
from app.auth import get_current_user

router = APIRouter(prefix="/flow", tags=["Flow Engine"])


# Flow sequence for Phase 1
FLOW_SEQUENCE = [
    "context_warmup",
    "energy_check",
    "emotion_check",
    "body_map",
    "daily_prompt",
    "scenario",
    "reflection",
    "insight",
    "challenge",
    "completion"
]


@router.post("/daily-flow", response_model=DailyFlowResponse)
def get_daily_flow(
    request: DailyFlowRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    MOST IMPORTANT ENDPOINT
    
    Returns the next screen in the daily flow.
    Backend controls what screen comes next.
    
    Flow:
    1. If no session_id, create new session and return first screen
    2. If session_id exists, determine next screen based on progress
    3. Return screen payload with all necessary data
    """
    
    # Get or create session
    if request.session_id:
        session = db.query(SessionModel).filter(
            SessionModel.session_id == request.session_id,
            SessionModel.user_id == current_user.id
        ).first()
        
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
    else:
        # Create new session for today
        # For Phase 1, we're using Week 19 (Module 3)
        week = db.query(Week).filter(Week.week_number == 19).first()
        if not week:
            raise HTTPException(status_code=500, detail="Week 19 not configured")
        
        # Determine current day (simplified - you can add logic for actual day tracking)
        day = db.query(Day).filter(
            Day.week_id == week.id,
            Day.day_number == 1  # Start with Monday
        ).first()
        
        if not day:
            raise HTTPException(status_code=500, detail="Day not configured")
        
        session = SessionModel(
            user_id=current_user.id,
            session_id=str(uuid.uuid4()),
            week_id=week.id,
            day_id=day.id,
            current_screen="context_warmup"
        )
        db.add(session)
        db.commit()
        db.refresh(session)
    
    # Determine next screen
    current_screen_index = FLOW_SEQUENCE.index(session.current_screen) if session.current_screen else 0
    
    # Check if flow is complete
    if current_screen_index >= len(FLOW_SEQUENCE):
        session.is_completed = True
        db.commit()
        return DailyFlowResponse(
            session_id=session.session_id,
            screen={"screen_type": "completion", "message": "Daily flow completed"},
            is_complete=True
        )
    
    # Get current screen type
    screen_type = FLOW_SEQUENCE[current_screen_index]
    
    # Build screen payload based on type
    screen_data = build_screen_payload(screen_type, session, db)
    
    return DailyFlowResponse(
        session_id=session.session_id,
        screen=screen_data,
        is_complete=False
    )


def build_screen_payload(screen_type: str, session: SessionModel, db: Session) -> Dict[str, Any]:
    """
    Build the screen payload based on screen type
    This is where backend controls what content to show
    """
    
    metadata = ScreenMetadata(
        week=session.week_id,
        module=3,  # Phase 1 uses Module 3
        day=session.day_id,
        screen_order=FLOW_SEQUENCE.index(screen_type)
    )
    
    if screen_type == "context_warmup":
        return ContextWarmupScreen(
            options=["At School", "At Home", "With Friends", "Alone", "Travelling"],
            metadata=metadata
        ).model_dump()
    
    elif screen_type == "energy_check":
        return EnergyCheckScreen(
            labels={
                "0": "Exhausted",
                "25": "Low",
                "50": "Neutral",
                "75": "Energized",
                "100": "Overstimulated"
            },
            metadata=metadata
        ).model_dump()
    
    elif screen_type == "emotion_check":
        # Fetch emotion structure from database
        emotions = db.query(EmotionStructure).all()
        emotion_options = [
            {"primary_emotion": e.primary_emotion, "sub_emotions": e.sub_emotions}
            for e in emotions
        ]
        
        return EmotionCheckScreen(
            emotions=emotion_options,
            metadata=metadata
        ).model_dump()
    
    elif screen_type == "body_map":
        return BodyMapScreen(
            body_zones=[
                {"zone": "Head", "sensations": ["Tight", "Heavy", "Warm", "Buzzy", "Numb", "Relaxed", "Nothing"]},
                {"zone": "Chest", "sensations": ["Tight", "Heavy", "Warm", "Buzzy", "Numb", "Relaxed", "Nothing"]},
                {"zone": "Stomach", "sensations": ["Tight", "Heavy", "Warm", "Buzzy", "Numb", "Relaxed", "Nothing"]},
                {"zone": "Throat", "sensations": ["Tight", "Heavy", "Warm", "Buzzy", "Numb", "Relaxed", "Nothing"]},
                {"zone": "Shoulders", "sensations": ["Tight", "Heavy", "Warm", "Buzzy", "Numb", "Relaxed", "Nothing"]},
                {"zone": "Hands", "sensations": ["Tight", "Heavy", "Warm", "Buzzy", "Numb", "Relaxed", "Nothing"]},
                {"zone": "Legs", "sensations": ["Tight", "Heavy", "Warm", "Buzzy", "Numb", "Relaxed", "Nothing"]}
            ],
            intensity_scale={"min": 1, "max": 5},
            metadata=metadata
        ).model_dump()
    
    elif screen_type == "daily_prompt":
        # Fetch prompt from database for current day
        day = db.query(Day).filter(Day.id == session.day_id).first()
        prompt = db.query(Prompt).filter(Prompt.day_id == day.id).first()
        
        if prompt:
            return PromptScreen(
                prompt_text=prompt.prompt_text,
                quick_select_options=prompt.quick_select_options,
                metadata=metadata
            ).model_dump()
        else:
            # Fallback prompt
            return PromptScreen(
                prompt_text="What decision stayed in your mind today?",
                metadata=metadata
            ).model_dump()
    
    elif screen_type == "scenario":
        # Fetch scenario from database for current day
        day = db.query(Day).filter(Day.id == session.day_id).first()
        scenario = db.query(Scenario).filter(Scenario.day_id == day.id).first()
        
        if scenario:
            return ScenarioScreen(
                title="Decision Point",
                scenario=scenario.scenario_text,
                options=scenario.options,
                metadata=metadata
            ).model_dump()
        else:
            # Fallback scenario
            return ScenarioScreen(
                title="Decision Point",
                scenario="Your friends ask you to skip class.",
                options=["Go", "Refuse", "Hesitate"],
                metadata=metadata
            ).model_dump()
    
    # Add more screen types as needed
    return {"screen_type": screen_type, "metadata": metadata.model_dump()}


@router.get("/current-week", response_model=CurrentWeekResponse)
def get_current_week(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get the current week for the user
    For Phase 1, this returns Week 19
    """
    week = db.query(Week).filter(Week.week_number == 19).first()
    
    if not week:
        raise HTTPException(status_code=404, detail="Week not found")
    
    return CurrentWeekResponse(
        week_number=week.week_number,
        module_number=week.module.module_number,
        title=week.title,
        theme=week.theme
    )


@router.get("/current-day", response_model=CurrentDayResponse)
def get_current_day(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get the current day for the user
    This should be enhanced with logic to track actual day progression
    """
    # For now, return Monday (day 1)
    week = db.query(Week).filter(Week.week_number == 19).first()
    day = db.query(Day).filter(
        Day.week_id == week.id,
        Day.day_number == 1
    ).first()
    
    if not day:
        raise HTTPException(status_code=404, detail="Day not found")
    
    return CurrentDayResponse(
        day_number=day.day_number,
        day_name=day.day_name,
        focus=day.focus,
        week_number=week.week_number
    )
