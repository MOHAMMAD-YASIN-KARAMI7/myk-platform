from typing import List
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.routes.auth import get_current_admin, get_current_user
from app.models import User, Article
from app.schemas import ArticleCreate, ArticleUpdate, ArticleResponse

router = APIRouter(prefix="/articles", tags=["Articles"])


@router.get("", response_model=List[ArticleResponse])
def read_articles(
    skip: int = 0,
    limit: int = 100,
    category: str = None,
    tag: str = None,
    db: Session = Depends(get_db)
):
    """List published articles (Public)"""
    query = db.query(Article).filter(Article.is_published == True)

    if category:
        query = query.filter(Article.category == category)

    articles = query.offset(skip).limit(limit).all()

    # Simple tag filter in Python (flexible for SQLite/Postgres)
    if tag:
        articles = [a for a in articles if tag in a.tags]

    return articles


@router.get("/admin", response_model=List[ArticleResponse])
def read_all_articles_admin(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    """List all articles including drafts (Admin only)"""
    return db.query(Article).offset(skip).limit(limit).all()


@router.get("/{slug}", response_model=ArticleResponse)
def read_article(slug: str, db: Session = Depends(get_db)):
    """Retrieve a specific article by slug and increment views (Public)"""
    article = db.query(Article).filter(Article.slug == slug).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")

    # Increment view counter
    article.views += 1
    db.add(article)
    db.commit()
    db.refresh(article)
    return article


@router.post("", response_model=ArticleResponse, status_code=status.HTTP_201_CREATED)
def create_article(
    article_in: ArticleCreate,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    """Create a new article (Admin only)"""
    # Check if slug exists
    article_exists = db.query(Article).filter(Article.slug == article_in.slug).first()
    if article_exists:
        raise HTTPException(status_code=400, detail="Article slug already exists")

    db_article = Article(**article_in.model_dump())
    if db_article.is_published and not db_article.published_at:
        db_article.published_at = datetime.utcnow()

    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    return db_article


@router.put("/{id}", response_model=ArticleResponse)
def update_article(
    id: int,
    article_in: ArticleUpdate,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    """Update an existing article (Admin only)"""
    db_article = db.query(Article).filter(Article.id == id).first()
    if not db_article:
        raise HTTPException(status_code=404, detail="Article not found")

    update_data = article_in.model_dump(exclude_unset=True)

    # Handle published date logic
    if "is_published" in update_data:
        if update_data["is_published"] and not db_article.is_published:
            db_article.published_at = datetime.utcnow()
        elif not update_data["is_published"]:
            db_article.published_at = None

    for key, value in update_data.items():
        setattr(db_article, key, value)

    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    return db_article


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_article(
    id: int,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    """Delete an article (Admin only)"""
    db_article = db.query(Article).filter(Article.id == id).first()
    if not db_article:
        raise HTTPException(status_code=404, detail="Article not found")

    db.delete(db_article)
    db.commit()
    return None
