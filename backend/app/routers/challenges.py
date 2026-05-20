from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Challenge, ChallengeStatus
from app.schemas import ChallengeStatusCreate, ChallengeStatusUpdate, ChallengeStatusOut
from app.auth import get_current_user

router = APIRouter(prefix="/challenges", tags=["Challenges"])


@router.post("/challenge-status", response_model=ChallengeStatusOut)
def create_challenge_status(
    challenge_data: ChallengeStatusCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Accept or decline a challenge
    
    When a student is presented with a challenge, they can:
    - Accept it (accepted=True)
    - Decline it (accepted=False)
    """
    
    # Verify challenge exists
    challenge = db.query(Challenge).filter(Challenge.id == challenge_data.challenge_id).first()
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge not found")
    
    # Check if user already has this challenge
    existing = db.query(ChallengeStatus).filter(
        ChallengeStatus.user_id == current_user.id,
        ChallengeStatus.challenge_id == challenge_data.challenge_id
    ).first()
    
    if existing:
        # Update existing
        existing.accepted = challenge_data.accepted
        db.commit()
        db.refresh(existing)
        return existing
    
    # Create new challenge status
    db_challenge_status = ChallengeStatus(
        user_id=current_user.id,
        challenge_id=challenge_data.challenge_id,
        accepted=challenge_data.accepted
    )
    
    db.add(db_challenge_status)
    db.commit()
    db.refresh(db_challenge_status)
    
    return db_challenge_status


@router.patch("/challenge-status/{challenge_id}", response_model=ChallengeStatusOut)
def update_challenge_status(
    challenge_id: int,
    update_data: ChallengeStatusUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Mark a challenge as completed
    
    When a student completes their challenge, update the status
    """
    
    challenge_status = db.query(ChallengeStatus).filter(
        ChallengeStatus.user_id == current_user.id,
        ChallengeStatus.challenge_id == challenge_id
    ).first()
    
    if not challenge_status:
        raise HTTPException(status_code=404, detail="Challenge status not found")
    
    if update_data.completed:
        challenge_status.completed = True
        challenge_status.completed_at = db.func.now()
    
    db.commit()
    db.refresh(challenge_status)
    
    return challenge_status


@router.get("/my-challenges", response_model=list[ChallengeStatusOut])
def get_my_challenges(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get all challenges for the current user
    """
    
    challenges = db.query(ChallengeStatus).filter(
        ChallengeStatus.user_id == current_user.id
    ).all()
    
    return challenges
