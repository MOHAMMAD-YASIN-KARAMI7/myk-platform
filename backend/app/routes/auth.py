from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import PasswordSecurity, create_access_token, create_refresh_token, verify_token
from app.core.config import settings
from app.models import User
from app.schemas import UserCreate, UserResponse, Token, UserUpdate

router = APIRouter(prefix="/auth", tags=["Authentication"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)) -> User:
    """Dependency to retrieve the current logged-in user from JWT"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    email = verify_token(token)
    if email is None:
        raise credentials_exception

    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception

    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")

    return user


def get_current_admin(current_user: User = Depends(get_current_user)) -> User:
    """Dependency to verify the current user is an admin or super admin with active password verification"""
    if not current_user.is_admin and current_user.role != "Super Admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="The user does not have enough privileges"
        )

    # BACKEND SECURITY ENFORCEMENT: Block admin tools if a password update is required!
    if current_user.needs_password_change:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Force Password Change Required: You must update your password before executing any administrative operations."
        )

    return current_user


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    """Register a new user (with dynamic admin assignment if matches SUPER_ADMIN_EMAIL)"""
    # Check if email or username already exists
    user_exists = db.query(User).filter(
        (User.email == user_in.email) | (User.username == user_in.username)
    ).first()

    if user_exists:
        raise HTTPException(
            status_code=400,
            detail="A user with this email or username already exists."
        )

    # Auto-super-admin if matches config
    is_admin = False
    role = "User"
    needs_pass_change = False
    if user_in.email == settings.SUPER_ADMIN_EMAIL:
        is_admin = True
        role = "Super Admin"
        needs_pass_change = True

    hashed_pwd = PasswordSecurity.hash_password(user_in.password)
    db_user = User(
        email=user_in.email,
        username=user_in.username,
        full_name=user_in.full_name,
        hashed_password=hashed_pwd,
        role=role,
        is_admin=is_admin,
        is_active=True,
        is_verified=is_admin,
        needs_password_change=needs_pass_change
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@router.post("/login", response_model=Token)
def login(user_credentials: UserCreate, db: Session = Depends(get_db)):
    """Login endpoint using username/email and password"""
    user = db.query(User).filter(
        (User.email == user_credentials.email) | (User.username == user_credentials.email)
    ).first()

    if not user or not PasswordSecurity.verify_password(user_credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password"
        )

    access_token = create_access_token(subject=user.email)
    refresh_token = create_refresh_token(subject=user.email)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }


@router.get("/me", response_model=UserResponse)
def read_user_me(current_user: User = Depends(get_current_user)):
    """Retrieve the current logged-in user profile"""
    return current_user


@router.put("/me", response_model=UserResponse)
def update_user_me(
    user_in: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update current user profile and clear needs_password_change flag if password is changed"""
    if user_in.email and user_in.email != current_user.email:
        email_exists = db.query(User).filter(User.email == user_in.email).first()
        if email_exists:
            raise HTTPException(status_code=400, detail="Email already in use")
        current_user.email = user_in.email

    if user_in.username and user_in.username != current_user.username:
        username_exists = db.query(User).filter(User.username == user_in.username).first()
        if username_exists:
            raise HTTPException(status_code=400, detail="Username already in use")
        current_user.username = user_in.username

    if user_in.full_name is not None:
        current_user.full_name = user_in.full_name

    if user_in.bio is not None:
        current_user.bio = user_in.bio

    if user_in.avatar_url is not None:
        current_user.avatar_url = user_in.avatar_url

    if user_in.password:
        current_user.hashed_password = PasswordSecurity.hash_password(user_in.password)
        # Clear the mandatory change flag upon password modification!
        current_user.needs_password_change = False

    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    return current_user
