# MYK Platform - Backend Documentation

## Setup

### Prerequisites
- Python 3.11+
- PostgreSQL 15+
- Redis 7+

### Installation

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/myk_db
JWT_SECRET=your-secret-key
DEBUG=true
```

### Running the Backend

```bash
# Development
uvicorn app.main:app --reload

# Production
gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app
```

## API Documentation

- **OpenAPI Docs**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc

## Database

### Migrations

```bash
# Create migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh token

### Projects
- `GET /api/v1/projects` - Get all projects
- `GET /api/v1/projects/{id}` - Get project
- `POST /api/v1/projects` - Create project (Admin)
- `PUT /api/v1/projects/{id}` - Update project (Admin)
- `DELETE /api/v1/projects/{id}` - Delete project (Admin)

### Articles
- `GET /api/v1/articles` - Get all articles
- `GET /api/v1/articles/{id}` - Get article
- `POST /api/v1/articles` - Create article (Admin)
- `PUT /api/v1/articles/{id}` - Update article (Admin)
- `DELETE /api/v1/articles/{id}` - Delete article (Admin)

### Messages
- `GET /api/v1/messages` - Get all messages (Admin)
- `GET /api/v1/messages/{id}` - Get message (Admin)
- `POST /api/v1/messages` - Create message
- `PATCH /api/v1/messages/{id}/mark-as-read` - Mark as read (Admin)
- `DELETE /api/v1/messages/{id}` - Delete message (Admin)
