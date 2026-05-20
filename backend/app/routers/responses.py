from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Response, BodyMapEntry, BehaviouralSignal, Session as SessionModel
from app.schemas import (
    ResponseCreate, ResponseOut, BodyMapEntryCreate, BodyMapEntryOut,
    BehaviouralSignalCreate, BehaviouralSignalOut
)
from app.auth import get_current_user

router = APIRouter(prefix="/responses", tags=["Responses"])


@router.post("/response", response_model=ResponseOut)
def submit_response(
    response_data: ResponseCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Submit a response for any screen type
    
    Captures:
    - screen_type (context_warmup, energy_check, etc.)
    - response_data (the actual answer/selection)
    - response_time_ms (time taken to respond)
    - hesitation_time_ms (time before first interaction)
    - option_change_count (how many times answer was changed)
    """
    
    # Verify session exists and belongs to user
    session = db.query(SessionModel).filter(
        SessionModel.session_id == response_data.session_id,
        SessionModel.user_id == current_user.id
    ).first()
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # Create response
    db_response = Response(
        user_id=current_user.id,
        session_id=session.id,
        screen_type=response_data.screen_type,
        response_data=response_data.response_data,
        response_time_ms=response_data.response_time_ms,
        hesitation_time_ms=response_data.hesitation_time_ms,
        option_change_count=response_data.option_change_count
    )
    
    db.add(db_response)
    
    # Update session current_screen to next screen
    # This will be used by flow engine to determine next screen
    from app.routers.flow import FLOW_SEQUENCE
    current_index = FLOW_SEQUENCE.index(response_data.screen_type)
    if current_index + 1 < len(FLOW_SEQUENCE):
        session.current_screen = FLOW_SEQUENCE[current_index + 1]
    else:
        session.is_completed = True
        session.completed_at = db.func.now()
    
    # Analyze behavioural signals
    analyze_and_store_signals(response_data, session.id, db)
    
    db.commit()
    db.refresh(db_response)
    
    return db_response


@router.post("/body-map", response_model=BodyMapEntryOut)
def submit_body_map(
    body_map_data: BodyMapEntryCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Submit body map entry
    
    MOST IMPORTANT SCREEN for emotional authenticity
    
    Captures:
    - body_zone (Head, Chest, Stomach, etc.)
    - sensation_type (Tight, Heavy, Warm, etc.)
    - sensation_intensity (1-5)
    - selection_order (order of zone selection)
    - time_spent_ms (time spent on this zone)
    """
    
    # Verify session
    session = db.query(SessionModel).filter(
        SessionModel.session_id == body_map_data.session_id,
        SessionModel.user_id == current_user.id
    ).first()
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # Create body map entry
    db_entry = BodyMapEntry(
        user_id=current_user.id,
        session_id=session.id,
        body_zone=body_map_data.body_zone,
        sensation_type=body_map_data.sensation_type,
        sensation_intensity=body_map_data.sensation_intensity,
        selection_order=body_map_data.selection_order,
        time_spent_ms=body_map_data.time_spent_ms
    )
    
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    
    return db_entry


def analyze_and_store_signals(response_data: ResponseCreate, session_id: int, db: Session):
    """
    Analyze response data and store behavioural signals
    
    Detects:
    - Rapid tapping (response_time < 2000ms)
    - High hesitation (hesitation_time > 5000ms)
    - Indecisiveness (option_change_count > 2)
    - Distraction (response_time > 20000ms)
    """
    
    signals = []
    
    # Rapid tap detection
    if response_data.response_time_ms and response_data.response_time_ms < 2000:
        signals.append(BehaviouralSignal(
            session_id=session_id,
            signal_type="rapid_tap",
            signal_value=response_data.response_time_ms,
            metadata={"screen_type": response_data.screen_type}
        ))
    
    # High hesitation detection
    if response_data.hesitation_time_ms and response_data.hesitation_time_ms > 5000:
        signals.append(BehaviouralSignal(
            session_id=session_id,
            signal_type="high_hesitation",
            signal_value=response_data.hesitation_time_ms,
            metadata={"screen_type": response_data.screen_type}
        ))
    
    # Indecisiveness detection
    if response_data.option_change_count and response_data.option_change_count > 2:
        signals.append(BehaviouralSignal(
            session_id=session_id,
            signal_type="indecisiveness",
            signal_value=response_data.option_change_count,
            metadata={"screen_type": response_data.screen_type}
        ))
    
    # Distraction detection
    if response_data.response_time_ms and response_data.response_time_ms > 20000:
        signals.append(BehaviouralSignal(
            session_id=session_id,
            signal_type="distraction",
            signal_value=response_data.response_time_ms,
            metadata={"screen_type": response_data.screen_type}
        ))
    
    # Store all signals
    for signal in signals:
        db.add(signal)
