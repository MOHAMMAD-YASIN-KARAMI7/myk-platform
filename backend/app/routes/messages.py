from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.routes.auth import get_current_admin
from app.models import Message
from app.schemas import MessageCreate, MessageResponse
from app.core.notifications import NotificationQueue

router = APIRouter(prefix="/messages", tags=["Messages"])


@router.post("", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
def create_message(message_in: MessageCreate, db: Session = Depends(get_db)):
    """Create a new contact message (Public)"""
    db_message = Message(**message_in.model_dump())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)

    # Send Notification through Queue
    try:
        NotificationQueue.add("new_message", {
            "name": db_message.name,
            "email": db_message.email,
            "subject": db_message.subject,
            "content": db_message.content
        })
        # Process the queue asynchronously
        NotificationQueue.process_all()
    except Exception as e:
        # Don't fail the API request if notification system has configuration gaps
        pass

    return db_message


@router.get("", response_model=List[MessageResponse])
def read_messages(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    """List all contact messages (Admin only)"""
    return db.query(Message).order_by(Message.created_at.desc()).offset(skip).limit(limit).all()


@router.patch("/{id}/mark-as-read", response_model=MessageResponse)
def mark_message_as_read(id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    """Mark a message as read (Admin only)"""
    message = db.query(Message).filter(Message.id == id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")

    message.is_read = True
    db.add(message)
    db.commit()
    db.refresh(message)
    return message


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_message(id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    """Delete a contact message (Admin only)"""
    message = db.query(Message).filter(Message.id == id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")

    db.delete(message)
    db.commit()
    return None
