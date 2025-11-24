"""
Flask configuration
"""
import os
from pathlib import Path

# Build paths
BASE_DIR = Path(__file__).resolve().parent


class Config:
    """Base configuration"""
    # Secret key (keeping Django's secret key for consistency)
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'django-insecure-ix0k1f%0cujp*x_h@x!ht0it9y#s0+hh9mi-q_vqvv65$wjs1m'
    
    # Debug mode
    DEBUG = os.environ.get('DEBUG', 'True').lower() == 'true'
    
    # Database configuration (SQLite - same as Django)
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or f'sqlite:///{BASE_DIR / "db.sqlite3"}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # File upload configuration
    MAX_CONTENT_LENGTH = 1 * 1024 * 1024  # 1MB max file size
    UPLOAD_FOLDER = BASE_DIR / 'media' / 'resumes'
    MEDIA_URL = '/media/'
    MEDIA_ROOT = BASE_DIR / 'media'
    
    # CORS configuration (same as Django)
    CORS_ORIGINS = [
        "http://localhost:5173",  # Vite default port
        "http://localhost:3000",  # React default port
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ]
    
    # Allowed file extensions
    ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx'}

