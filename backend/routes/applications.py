"""
Applications routes - matches Django API endpoints
"""
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from datetime import datetime
import os
from pathlib import Path

from models import db
from models.job_application import JobApplication
from services.validation_service import ValidationService
from config import Config

applications_bp = Blueprint('applications', __name__)


def map_experience_value(value):
    """
    Map frontend experience values to Django format.
    Frontend sends: '0', '1', '2', '3+'
    Django expects: '0-1 years', '1-3 years', '3-5 years', '5+ years'
    """
    mapping = {
        '0': '0-1 years',
        '1': '1-3 years',
        '2': '3-5 years',
        '3+': '5+ years',
    }
    # If already in Django format, return as is
    if value in ['0-1 years', '1-3 years', '3-5 years', '5+ years']:
        return value
    # Otherwise, map from frontend format
    return mapping.get(value, value)


@applications_bp.route('/check-data', methods=['GET'])
def get_all_applications():
    """
    Get all job applications from the database.
    GET /api/check-data
    Returns all rows in JSON format for Postman testing.
    """
    try:
        # Query all applications, ordered by created_at descending (matching Django model ordering)
        applications = JobApplication.query.order_by(JobApplication.created_at.desc()).all()
        
        # Convert all applications to dictionaries
        applications_data = [app.to_dict() for app in applications]
        
        return jsonify({
            'success': True,
            'count': len(applications_data),
            'data': applications_data
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Error retrieving applications.',
            'error': str(e)
        }), 500


@applications_bp.route('/applications/', methods=['POST'])
def create_application():
    """
    Create a new job application.
    POST /api/applications/
    Matches Django view exactly
    """
    errors = {}
    
    # Get form data - handle both snake_case (Django) and camelCase (frontend)
    full_name = request.form.get('full_name') or request.form.get('fullName', '').strip()
    email = request.form.get('email', '').strip()
    # Handle both 'mobile' (Django) and 'phone' (frontend)
    mobile = request.form.get('mobile') or request.form.get('phone', '').strip()
    position = request.form.get('position', '').strip()
    experience = request.form.get('experience', '').strip()
    resume_file = request.files.get('resume')
    
    # Validate required fields
    if not full_name:
        errors['full_name'] = ["This field is required."]
    
    if not position:
        errors['position'] = ["This field is required."]
    
    # Validate email
    email, email_error = ValidationService.validate_email(email)
    if email_error:
        errors['email'] = [email_error]
    
    # Validate mobile
    mobile, mobile_error = ValidationService.validate_mobile(mobile)
    if mobile_error:
        errors['mobile'] = [mobile_error]
    
    # Map experience value from frontend format to Django format
    experience = map_experience_value(experience)
    
    # Validate experience
    experience, exp_error = ValidationService.validate_experience(experience)
    if exp_error:
        errors['experience'] = [exp_error]
    
    # Validate resume file
    resume_file, resume_error = ValidationService.validate_resume(resume_file)
    if resume_error:
        errors['resume'] = [resume_error]
    
    # If there are validation errors, return them
    if errors:
        return jsonify({
            'success': False,
            'message': 'Validation failed.',
            'errors': errors
        }), 400
    
    # Save file
    file_path = None
    resume_path = None
    
    try:
        # Ensure upload directory exists
        upload_dir = Path(Config.UPLOAD_FOLDER)
        upload_dir.mkdir(parents=True, exist_ok=True)
        
        # Generate unique filename
        filename = secure_filename(resume_file.filename)
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S_%f')
        name, ext = os.path.splitext(filename)
        unique_filename = f"{name}_{timestamp}{ext}"
        file_path = upload_dir / unique_filename
        
        # Save file
        resume_file.save(str(file_path))
        
        # Store relative path (matching Django's upload_to='resumes/')
        resume_path = f"resumes/{unique_filename}"
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Error saving file.',
            'errors': {'resume': [str(e)]}
        }), 400
    
    # Create application record
    try:
        application = JobApplication(
            full_name=full_name,
            email=email,
            mobile=mobile,
            position=position,
            experience=experience,
            resume=resume_path,
            created_at=datetime.utcnow()
        )
        
        db.session.add(application)
        db.session.commit()
        
        # Return success response matching Django format
        return jsonify({
            'success': True,
            'message': 'Application submitted successfully.',
            'data': application.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        # Clean up uploaded file on error
        if file_path and file_path.exists():
            file_path.unlink()
        
        return jsonify({
            'success': False,
            'message': 'Error creating application.',
            'errors': {'non_field_errors': [str(e)]}
        }), 500

