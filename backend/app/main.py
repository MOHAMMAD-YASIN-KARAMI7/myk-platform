import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import init_db, SessionLocal
from app.routes import auth, projects, articles, messages, agent
from app.models import User
from app.core.security import PasswordSecurity

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initializes database tables and default administrator on startup using modern Lifespan handler"""
    logger.info("Initializing database and schemas...")
    init_db()

    db = SessionLocal()
    try:
        # Check if default admin user exists
        admin = db.query(User).filter(User.email == settings.SUPER_ADMIN_EMAIL).first()
        if not admin:
            logger.info("Creating default Super Admin user with forced password change...")
            admin_user = User(
                email=settings.SUPER_ADMIN_EMAIL,
                username=settings.SUPER_ADMIN_USERNAME,
                full_name=settings.ADMIN_NAME,
                hashed_password=PasswordSecurity.hash_password(settings.SUPER_ADMIN_PASSWORD),
                role="Super Admin",
                needs_password_change=True,  # Mandatory password change on first login!
                is_active=True,
                is_admin=True,
                is_verified=True,
                bio="Super Admin, AI Engineer, Python Developer, Entrepreneur"
            )
            db.add(admin_user)
            db.commit()
            logger.info("✅ Super Admin user created successfully on startup with forced password change enabled.")
        else:
            # Upgrade existing admin to Super Admin role for correctness
            if admin.role != "Super Admin":
                admin.role = "Super Admin"
                admin.is_admin = True
                db.commit()
                logger.info("✅ Upgraded default admin to Super Admin.")
            else:
                logger.info("✅ Super Admin user already exists.")
    except Exception as e:
        logger.error(f"Error checking default admin: {str(e)}")
        db.rollback()
    finally:
        db.close()

    yield
    # Shutdown logic (if any) can be placed here


# Create FastAPI instance using modern lifespan
app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    redoc_url=f"{settings.API_V1_STR}/redoc",
    lifespan=lifespan
)

# Secure CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact domain
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)


# Core Route Health Check
@app.get("/", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "project": settings.PROJECT_NAME,
        "version": "1.0.0"
    }


# Include Routers
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(projects.router, prefix=settings.API_V1_STR)
app.include_router(articles.router, prefix=settings.API_V1_STR)
app.include_router(messages.router, prefix=settings.API_V1_STR)
app.include_router(agent.router, prefix=settings.API_V1_STR)
