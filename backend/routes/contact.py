from flask import Blueprint, request, jsonify
from services.email_service import send_email
import traceback

contact_bp = Blueprint('contact', __name__)


@contact_bp.route('/contact', methods=['POST'])
def contact():
    """
    Handle contact form submission.
    
    Expected JSON body:
    {
        "name": "string",
        "email": "string",
        "subject": "string",
        "message": "string"
    }
    
    Returns:
        JSON response with success status and message
    """
    try:
        # Get JSON data from request
        data = request.get_json()
        
        # Validate that data exists
        if not data:
            return jsonify({
                "success": False,
                "error": "No data provided"
            }), 400
        
        # Extract and validate fields
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        subject = data.get('subject', '').strip()
        message = data.get('message', '').strip()
        
        # Validate that all fields are provided and not empty
        if not name:
            return jsonify({
                "success": False,
                "error": "Name is required"
            }), 400
        
        if not email:
            return jsonify({
                "success": False,
                "error": "Email is required"
            }), 400
        
        if not subject:
            return jsonify({
                "success": False,
                "error": "Subject is required"
            }), 400
        
        if not message:
            return jsonify({
                "success": False,
                "error": "Message is required"
            }), 400
        
        # Basic email format validation
        if '@' not in email or '.' not in email.split('@')[1]:
            return jsonify({
                "success": False,
                "error": "Invalid email format"
            }), 400
        
        # Send email
        try:
            # Send email to the user's email address
            send_email(
                to_email=email,
                subject=subject,
                message_body=message,
                sender_name=name
            )
            
            return jsonify({
                "success": True,
                "message": "Email sent successfully"
            }), 200
        
        except ValueError as e:
            # Email configuration error
            print(f"ValueError: {str(e)}")
            print(traceback.format_exc())
            return jsonify({
                "success": False,
                "error": str(e)
            }), 500
        
        except Exception as e:
            # Email sending error
            print(f"Email sending error: {str(e)}")
            print(traceback.format_exc())
            return jsonify({
                "success": False,
                "error": f"Failed to send email: {str(e)}"
            }), 500
    
    except Exception as e:
        # General error handling
        print(f"General error: {str(e)}")
        print(traceback.format_exc())
        return jsonify({
            "success": False,
            "error": f"An error occurred: {str(e)}"
        }), 500

