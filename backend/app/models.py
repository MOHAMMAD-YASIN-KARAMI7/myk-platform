from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, JSON, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=True)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="User")  # e.g., "Super Admin", "Admin", "User"
    needs_password_change = Column(Boolean, default=False)  # Enforce change on first login
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    is_verified = Column(Boolean, default=False)
    bio = Column(Text, nullable=True)
    avatar_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text, nullable=False)
    cover_image = Column(String, nullable=True)
    technologies = Column(JSON, default=list)  # List of tech stack strings
    status = Column(String, default="In Development")  # e.g., "Completed", "In Development"
    github_url = Column(String, nullable=True)
    demo_url = Column(String, nullable=True)
    gallery = Column(JSON, default=list)  # List of image URLs
    timeline = Column(JSON, default=list)  # List of milestone dicts: {"date": "...", "title": "...", "description": "..."}
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Article(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    content = Column(Text, nullable=False)
    excerpt = Column(Text, nullable=True)
    cover_image = Column(String, nullable=True)
    category = Column(String, nullable=False)
    tags = Column(JSON, default=list)  # List of tags
    reading_time = Column(Integer, default=0)  # in minutes
    views = Column(Integer, default=0)
    seo_title = Column(String, nullable=True)
    seo_description = Column(String, nullable=True)
    is_published = Column(Boolean, default=False)
    published_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    overview = Column(Text, nullable=False)
    cover_image = Column(String, nullable=True)
    level = Column(String, default="Beginner")  # e.g., Beginner, Intermediate, Advanced
    duration = Column(String, nullable=False)  # e.g., "12 Hours"
    instructor = Column(String, default="Mohammad Yasin Karami")
    curriculum = Column(JSON, default=list)  # List of modules: [{"title": "...", "lessons": ["...", ...]}]
    projects = Column(JSON, default=list)  # List of course projects
    faq = Column(JSON, default=list)  # List of FAQs: [{"question": "...", "answer": "..."}]
    reviews = Column(JSON, default=list)  # List of reviews: [{"user": "...", "rating": 5, "comment": "..."}]
    price = Column(String, default="Free")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    cover_image = Column(String, nullable=True)
    description = Column(Text, nullable=False)
    preview_content = Column(Text, nullable=True)
    pdf_url = Column(String, nullable=True)
    price = Column(String, default="Free")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Conference(Base):
    __tablename__ = "conferences"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    location = Column(String, nullable=False)
    event_date = Column(DateTime, nullable=False)
    description = Column(Text, nullable=False)
    images = Column(JSON, default=list)  # List of image URLs
    slides_url = Column(String, nullable=True)
    video_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class GeminiKey(Base):
    """Dynamic rotating Gemini API Keys configured by the Admin (Encrypted in DB)"""
    __tablename__ = "gemini_keys"

    id = Column(Integer, primary_key=True, index=True)
    key_value = Column(String, nullable=False, unique=True)  # Will be stored as encrypted cipher
    name = Column(String, default="Gemini Key")
    is_active = Column(Boolean, default=True)
    used_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)


class AgentLog(Base):
    """Execution log for the Admin AI Agent"""
    __tablename__ = "agent_logs"

    id = Column(Integer, primary_key=True, index=True)
    tool_used = Column(String, nullable=False)  # e.g., "translate", "seo_optimizer", "generate_article"
    prompt = Column(Text, nullable=False)
    response_preview = Column(Text, nullable=True)
    status = Column(String, default="Success")  # "Success" or "Failed"
    error_message = Column(Text, nullable=True)
    execution_time_ms = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
