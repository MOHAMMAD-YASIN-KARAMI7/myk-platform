from datetime import datetime
from typing import List, Optional, Any, Dict
from pydantic import BaseModel, EmailStr, Field, ConfigDict


# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None
    role: Optional[str] = "User"
    needs_password_change: Optional[bool] = False
    bio: Optional[str] = None
    avatar_url: Optional[str] = None


class UserCreate(UserBase):
    password: str


class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    full_name: Optional[str] = None
    password: Optional[str] = None
    role: Optional[str] = None
    needs_password_change: Optional[bool] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None


class UserResponse(UserBase):
    id: int
    is_active: bool
    is_admin: bool
    is_verified: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# Auth Token Schemas
class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class TokenPayload(BaseModel):
    sub: Optional[str] = None
    type: Optional[str] = None


# Project Schemas
class ProjectBase(BaseModel):
    title: str
    description: str
    cover_image: Optional[str] = None
    technologies: List[str] = Field(default_factory=list)
    status: str = "In Development"
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    gallery: List[str] = Field(default_factory=list)
    timeline: List[Dict[str, Any]] = Field(default_factory=list)


class ProjectCreate(ProjectBase):
    slug: str


class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    cover_image: Optional[str] = None
    technologies: Optional[List[str]] = None
    status: Optional[str] = None
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    gallery: Optional[List[str]] = None
    timeline: Optional[List[Dict[str, Any]]] = None


class ProjectResponse(ProjectBase):
    id: int
    slug: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


# Article Schemas
class ArticleBase(BaseModel):
    title: str
    content: str
    excerpt: Optional[str] = None
    cover_image: Optional[str] = None
    category: str
    tags: List[str] = Field(default_factory=list)
    reading_time: int = 0
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    is_published: bool = False


class ArticleCreate(ArticleBase):
    slug: str


class ArticleUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    cover_image: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    reading_time: Optional[int] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    is_published: Optional[bool] = None


class ArticleResponse(ArticleBase):
    id: int
    slug: str
    views: int
    published_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


# Course Schemas
class CourseBase(BaseModel):
    title: str
    overview: str
    cover_image: Optional[str] = None
    level: str = "Beginner"
    duration: str
    instructor: str = "Mohammad Yasin Karami"
    curriculum: List[Dict[str, Any]] = Field(default_factory=list)
    projects: List[Any] = Field(default_factory=list)
    faq: List[Dict[str, Any]] = Field(default_factory=list)
    reviews: List[Dict[str, Any]] = Field(default_factory=list)
    price: str = "Free"


class CourseCreate(CourseBase):
    slug: str


class CourseResponse(CourseBase):
    id: int
    slug: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


# Book Schemas
class BookBase(BaseModel):
    title: str
    cover_image: Optional[str] = None
    description: str
    preview_content: Optional[str] = None
    pdf_url: Optional[str] = None
    price: str = "Free"


class BookCreate(BookBase):
    slug: str


class BookResponse(BookBase):
    id: int
    slug: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


# Conference Schemas
class ConferenceBase(BaseModel):
    title: str
    location: str
    event_date: datetime
    description: str
    images: List[str] = Field(default_factory=list)
    slides_url: Optional[str] = None
    video_url: Optional[str] = None


class ConferenceCreate(ConferenceBase):
    slug: str


class ConferenceResponse(ConferenceBase):
    id: int
    slug: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


# Message Schemas
class MessageBase(BaseModel):
    name: str
    email: EmailStr
    subject: str
    content: str


class MessageCreate(MessageBase):
    pass


class MessageResponse(MessageBase):
    id: int
    is_read: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# Gemini Key Schemas
class GeminiKeyBase(BaseModel):
    name: Optional[str] = "Gemini Key"
    is_active: bool = True


class GeminiKeyCreate(GeminiKeyBase):
    key_value: str


class GeminiKeyResponse(GeminiKeyBase):
    id: int
    used_count: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# Agent Request/Response Schemas
class AgentExecutionRequest(BaseModel):
    tool_used: str  # one of the 10 capabilities
    prompt: str
    context_data: Optional[Dict[str, Any]] = Field(default_factory=dict)


class AgentExecutionResponse(BaseModel):
    tool_used: str
    prompt: str
    result: str
    execution_time_ms: int
    status: str
    error_message: Optional[str] = None
    timestamp: datetime


class AgentLogResponse(BaseModel):
    id: int
    tool_used: str
    prompt: str
    response_preview: Optional[str] = None
    status: str
    error_message: Optional[str] = None
    execution_time_ms: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
