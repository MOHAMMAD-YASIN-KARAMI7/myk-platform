from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.routes.auth import get_current_admin
from app.models import Project
from app.schemas import ProjectCreate, ProjectUpdate, ProjectResponse

router = APIRouter(prefix="/projects", tags=["Projects"])


@router.get("", response_model=List[ProjectResponse])
def read_projects(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """List all projects (Public)"""
    return db.query(Project).offset(skip).limit(limit).all()


@router.get("/{slug}", response_model=ProjectResponse)
def read_project(slug: str, db: Session = Depends(get_db)):
    """Retrieve a specific project by slug (Public)"""
    project = db.query(Project).filter(Project.slug == slug).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.post("", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
def create_project(
    project_in: ProjectCreate,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    """Create a new project (Admin only)"""
    # Check if slug exists
    project_exists = db.query(Project).filter(Project.slug == project_in.slug).first()
    if project_exists:
        raise HTTPException(status_code=400, detail="Project slug already exists")

    db_project = Project(**project_in.model_dump())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


@router.put("/{id}", response_model=ProjectResponse)
def update_project(
    id: int,
    project_in: ProjectUpdate,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    """Update an existing project (Admin only)"""
    db_project = db.query(Project).filter(Project.id == id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")

    update_data = project_in.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_project, key, value)

    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(
    id: int,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    """Delete a project (Admin only)"""
    db_project = db.query(Project).filter(Project.id == id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")

    db.delete(db_project)
    db.commit()
    return None
