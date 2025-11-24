"""
Models package initialization
"""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .job_application import JobApplication

__all__ = ['db', 'JobApplication']

