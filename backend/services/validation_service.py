"""
Validation service - matches Django serializer validation logic
"""
import re
import os
from werkzeug.utils import secure_filename
from config import Config


# Experience choices matching Django model
EXPERIENCE_CHOICES = [
    ('0-1 years', '0-1 years'),
    ('1-3 years', '1-3 years'),
    ('3-5 years', '3-5 years'),
    ('5+ years', '5+ years'),
]


class ValidationService:
    """Validation service matching Django serializer logic"""
    
    @staticmethod
    def validate_email(email):
        """Validate email format - matches Django serializer"""
        if not email:
            return None, "This field is required."
        
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_regex, email):
            return None, "Enter a valid email address."
        
        return email, None
    
    @staticmethod
    def validate_mobile(mobile):
        """Validate mobile number - matches Django serializer"""
        if not mobile:
            return None, "This field is required."
        
        if not mobile.isdigit():
            return None, "Mobile number must contain only digits."
        
        if len(mobile) != 10:
            return None, "Mobile number must be exactly 10 digits."
        
        return mobile, None
    
    @staticmethod
    def validate_resume(file):
        """Validate resume file - matches Django serializer"""
        if not file:
            return None, "This field is required."
        
        # Check file size (max 1MB)
        max_size = 1 * 1024 * 1024  # 1MB in bytes
        file.seek(0, os.SEEK_END)
        file_size = file.tell()
        file.seek(0)  # Reset file pointer
        
        if file_size > max_size:
            return None, "Resume file size must not exceed 1MB."
        
        # Check file extension
        filename = secure_filename(file.filename)
        if not filename:
            return None, "Invalid file name."
        
        file_ext = filename.rsplit('.', 1)[1].lower() if '.' in filename else ''
        if file_ext not in Config.ALLOWED_EXTENSIONS:
            return None, f"File extension not allowed. Allowed extensions: {', '.join(Config.ALLOWED_EXTENSIONS)}"
        
        return file, None
    
    @staticmethod
    def validate_experience(experience):
        """Validate experience choice"""
        valid_choices = [choice[0] for choice in EXPERIENCE_CHOICES]
        if experience not in valid_choices:
            return None, f"Invalid choice. Must be one of: {', '.join(valid_choices)}"
        return experience, None

