"""
Initial admin user creation script
"""

from app.models import User
from app.core.database import SessionLocal, init_db
from app.core.security import PasswordSecurity
import logging

logger = logging.getLogger(__name__)


def create_admin_user():
    """Create initial admin user"""
    init_db()
    
    db = SessionLocal()
    
    try:
        # Check if admin already exists
        admin = db.query(User).filter(
            User.email == "mohammadyasinkarami196@gmail.com"
        ).first()
        
        if admin:
            logger.info("✅ Admin user already exists")
            return
        
        # Create admin user
        admin_user = User(
            email="mohammadyasinkarami196@gmail.com",
            username="mohammad_yasin",
            full_name="Mohammad Yasin Karami",
            hashed_password=PasswordSecurity.hash_password("mohammad9095"),
            is_active=True,
            is_admin=True,
            is_verified=True,
            bio="AI Engineer, Python Developer, Entrepreneur"
        )
        
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        
        logger.info(f"✅ Admin user created successfully!")
        logger.info(f"   Email: mohammadyasinkarami196@gmail.com")
        logger.info(f"   Password: mohammad9095")
        
    except Exception as e:
        logger.error(f"❌ Error creating admin user: {str(e)}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    create_admin_user()
