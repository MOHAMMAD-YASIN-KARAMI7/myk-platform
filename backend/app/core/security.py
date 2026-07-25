import base64
import hashlib
from datetime import datetime, timedelta
from typing import Any, Union
from jose import jwt, JWTError
from passlib.context import CryptContext
from cryptography.fernet import Fernet
from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class PasswordSecurity:
    """Helper for password hashing and verification"""

    @staticmethod
    def hash_password(password: str) -> str:
        return pwd_context.hash(password)

    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        return pwd_context.verify(plain_password, hashed_password)


class KeyEncryption:
    """Symmetric encryption for sensitive credentials like API Keys"""

    _fernet: Fernet = None

    @classmethod
    def _get_fernet(cls) -> Fernet:
        if cls._fernet is None:
            # Derive a secure 32-byte key from JWT_SECRET
            secret_hash = hashlib.sha256(settings.JWT_SECRET.encode()).digest()
            fernet_key = base64.urlsafe_b64encode(secret_hash)
            cls._fernet = Fernet(fernet_key)
        return cls._fernet

    @classmethod
    def encrypt(cls, plain_text: str) -> str:
        """Encrypt plain text to secure base64 string"""
        if not plain_text:
            return ""
        fernet = cls._get_fernet()
        return fernet.encrypt(plain_text.encode()).decode()

    @classmethod
    def decrypt(cls, encrypted_text: str) -> str:
        """Decrypt secure base64 string back to plain text"""
        if not encrypted_text:
            return ""
        try:
            fernet = cls._get_fernet()
            return fernet.decrypt(encrypted_text.encode()).decode()
        except Exception:
            return "DECRYPTION_FAILED"


def create_access_token(subject: Union[str, Any], expires_delta: timedelta = None) -> str:
    """Generate a JWT access token"""
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode = {"exp": expire, "sub": str(subject), "type": "access"}
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt


def create_refresh_token(subject: Union[str, Any], expires_delta: timedelta = None) -> str:
    """Generate a JWT refresh token"""
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)

    to_encode = {"exp": expire, "sub": str(subject), "type": "refresh"}
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt


def verify_token(token: str) -> Union[str, None]:
    """Verify JWT token and extract the subject"""
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        token_type = payload.get("type")
        if token_type != "access":
            return None
        token_data = payload.get("sub")
        if token_data is None:
            return None
        return token_data
    except JWTError:
        return None
