"""
JobApplication model - matches Django model structure
"""
from datetime import datetime
from . import db


class JobApplication(db.Model):
    """Job Application model matching Django structure"""
    __tablename__ = 'jobapplications_jobapplication'
    
    EXPERIENCE_CHOICES = [
        ('0-1 years', '0-1 years'),
        ('1-3 years', '1-3 years'),
        ('3-5 years', '3-5 years'),
        ('5+ years', '5+ years'),
    ]
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    full_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(254), nullable=False)
    mobile = db.Column(db.String(10), nullable=False)
    position = db.Column(db.String(255), nullable=False)
    experience = db.Column(db.String(20), nullable=False)
    resume = db.Column(db.String(100), nullable=False)  # File path
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    
    def __repr__(self):
        return f"<JobApplication {self.full_name} - {self.position}>"
    
    def to_dict(self):
        """Convert model to dictionary matching Django serializer format"""
        return {
            'id': self.id,
            'full_name': self.full_name,
            'email': self.email,
            'mobile': self.mobile,
            'position': self.position,
            'experience': self.experience,
            'resume': f"/media/{self.resume}" if self.resume else None,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

