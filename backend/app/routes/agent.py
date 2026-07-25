from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.routes.auth import get_current_admin
from app.models import GeminiKey, AgentLog
from app.schemas import (
    GeminiKeyCreate, GeminiKeyResponse,
    AgentExecutionRequest, AgentExecutionResponse, AgentLogResponse
)
from app.core.security import KeyEncryption
from app.services.gemini import GeminiAgentService

router = APIRouter(prefix="/agent", tags=["AI Admin Agent"])


# Gemini API Keys Management (Admin only)
@router.post("/keys", response_model=GeminiKeyResponse, status_code=status.HTTP_201_CREATED)
def add_gemini_key(key_in: GeminiKeyCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    """Add a new Gemini API Key (Admin only) - Encrypts the key value securely"""
    encrypted_val = KeyEncryption.encrypt(key_in.key_value)

    # Check if key already exists
    key_exists = db.query(GeminiKey).filter(GeminiKey.key_value == encrypted_val).first()
    if key_exists:
        raise HTTPException(status_code=400, detail="Gemini key value already added")

    db_key = GeminiKey(
        key_value=encrypted_val,
        name=key_in.name,
        is_active=key_in.is_active
    )
    db.add(db_key)
    db.commit()
    db.refresh(db_key)

    # Mask value before returning schema
    db_key.key_value = "AIzaSy..." + key_in.key_value[-4:] if len(key_in.key_value) > 4 else "AIzaSy..."
    return db_key


@router.get("/keys", response_model=List[GeminiKeyResponse])
def list_gemini_keys(db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    """List all configured Gemini API Keys (Admin only) - Masks decrypted keys for response safety"""
    keys_list = db.query(GeminiKey).order_by(GeminiKey.created_at.desc()).all()

    # Mask the key values so they are never exposed over the API
    for k in keys_list:
        decrypted = KeyEncryption.decrypt(k.key_value)
        k.key_value = "AIzaSy..." + decrypted[-4:] if len(decrypted) > 4 else "AIzaSy..."

    return keys_list


@router.delete("/keys/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_gemini_key(id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    """Delete a Gemini API Key (Admin only)"""
    db_key = db.query(GeminiKey).filter(GeminiKey.id == id).first()
    if not db_key:
        raise HTTPException(status_code=404, detail="Gemini key not found")

    db.delete(db_key)
    db.commit()
    return None


# Agent execution endpoint
@router.post("/execute", response_model=AgentExecutionResponse)
def execute_agent_tool(
    request: AgentExecutionRequest,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    """
    Executes any of the 10 core administrative agent tools (Admin only).
    """
    # Verify tool name is valid
    valid_tools = [
        "translate", "generate_article", "analyze_sentiment", "seo_optimizer",
        "categorize_content", "build_curriculum", "research_helper",
        "book_summarizer", "transcript_synthesizer", "dashboard_analytics"
    ]
    if request.tool_used not in valid_tools:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid tool_used. Must be one of: {', '.join(valid_tools)}"
        )

    result_data = GeminiAgentService.execute_tool(
        db=db,
        tool_name=request.tool_used,
        prompt_input=request.prompt,
        context=request.context_data
    )
    return result_data


# Agent Execution Logs (Admin only)
@router.get("/logs", response_model=List[AgentLogResponse])
def get_agent_logs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    """Get AI Agent execution logs (Admin only)"""
    return db.query(AgentLog).order_by(AgentLog.created_at.desc()).offset(skip).limit(limit).all()
