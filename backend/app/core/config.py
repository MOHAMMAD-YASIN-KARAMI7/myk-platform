import os
from pydantic_settings import BaseSettings
from pydantic import ConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "MYK Platform"
    API_V1_STR: str = "/api/v1"

    # Environment
    DEBUG: bool = True
    JWT_SECRET: str = "super-secret-key-replace-in-production-mohammad-yasin"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30

    # Database
    DATABASE_URL: str = "sqlite:///./myk_platform.db"

    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"

    # SMTP
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = "mohammadyasinkarami196@gmail.com"
    SMTP_PASSWORD: str = "temporary_password_or_app_password"
    SMTP_FROM: str = "mohammadyasinkarami196@gmail.com"

    # Super Admin Configuration (Strictly from Environment Variables with NO hardcoded fallbacks)
    SUPER_ADMIN_EMAIL: str = os.getenv("SUPER_ADMIN_EMAIL") or ""
    SUPER_ADMIN_USERNAME: str = os.getenv("SUPER_ADMIN_USERNAME") or "mohammad_yasin"
    SUPER_ADMIN_PASSWORD: str = os.getenv("SUPER_ADMIN_PASSWORD") or ""
    ADMIN_NAME: str = "Mohammad Yasin Karami"

    model_config = ConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="ignore"
    )


settings = Settings()

# Validate that Super Admin credentials are provided on production/startup
if not settings.SUPER_ADMIN_EMAIL or not settings.SUPER_ADMIN_PASSWORD:
    raise ValueError(
        "CRITICAL SECURITY CONFIGURATION ERROR: \n"
        "SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD must be configured "
        "in your environment variables or .env file before launching the production server. "
        "Hardcoded fallbacks are completely forbidden."
    )
