import os
import html
import requests
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
# Get the backend directory (parent of services directory)
backend_dir = Path(__file__).parent.parent
env_path = backend_dir / '.env'
load_dotenv(dotenv_path=env_path)

RESEND_API_URL = "https://api.resend.com/emails"


def send_email(to_email, subject, message_body, sender_name="Contact Form"):
    """
    Send an email using Resend API.
    
    Args:
        to_email (str): Recipient email address
        subject (str): Email subject
        message_body (str): Email message body (plain text)
        sender_name (str): Name of the sender (default: "Contact Form")
    
    Returns:
        bool: True if email sent successfully, False otherwise
    
    Raises:
        Exception: If email sending fails
    """
    # Get Resend configuration from environment variables
    resend_api_key = os.getenv('RESEND_API_KEY')
    from_email = os.getenv('FROM_EMAIL')
    test_email = os.getenv('TEST_EMAIL')  # Optional: account owner email for testing
    
    # Validate that Resend credentials are set
    if not resend_api_key:
        raise ValueError("RESEND_API_KEY must be set in .env file")
    
    if not from_email:
        raise ValueError("FROM_EMAIL must be set in .env file")
    
    # Handle test mode vs production mode
    # If using test domain (@resend.dev), Resend only allows sending to account owner
    # If using verified domain, can send to any recipient
    actual_to_email = to_email
    is_test_mode = from_email.endswith('@resend.dev')
    
    if is_test_mode:
        # In test mode, must send to account owner's email
        if test_email:
            actual_to_email = test_email
            # Include original recipient in message body for reference
            message_body = f"Original Recipient: {to_email}\n\n{message_body}"
        else:
            # If no TEST_EMAIL set, this will fail with 403
            # But we'll let it fail with a clear error message
            pass
    # If not test mode (using verified domain), send to actual recipient
    
    # Create HTML email content
    # Escape HTML and convert newlines to <br> tags
    escaped_message = html.escape(message_body).replace('\n', '<br>')
    
    html_message = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body {{
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }}
            .content {{
                background-color: #f9f9f9;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 5px;
            }}
            .message {{
                background-color: white;
                padding: 15px;
                border-left: 4px solid #4F46E5;
                margin-top: 10px;
                white-space: pre-wrap;
            }}
        </style>
    </head>
    <body>
        <div class="content">
            <h2>Hello {html.escape(sender_name)},</h2>
            <p>Thank you for contacting us. We have received your message:</p>
            <div class="message">
                {escaped_message}
            </div>
            <p>We will get back to you soon!</p>
        </div>
    </body>
    </html>
    """
    
    # Prepare request payload
    payload = {
        "from": from_email,
        "to": actual_to_email,
        "subject": subject,
        "html": html_message
    }
    
    # Prepare headers
    headers = {
        "Authorization": f"Bearer {resend_api_key}",
        "Content-Type": "application/json"
    }
    
    # Send email via Resend API
    try:
        response = requests.post(RESEND_API_URL, json=payload, headers=headers)
        
        # Check if request was successful
        if response.status_code == 200 or response.status_code == 201:
            return True
        else:
            # Try to get error message from response
            try:
                error_data = response.json()
                error_message = error_data.get('message', error_data.get('error', f'HTTP {response.status_code}'))
                # Include full error details if available
                if 'errors' in error_data:
                    error_message += f" - {error_data['errors']}"
            except:
                error_message = f'HTTP {response.status_code}: {response.text[:200]}'
            raise Exception(f"Resend API error: {error_message}")
    
    except requests.exceptions.RequestException as e:
        raise Exception(f"Failed to send email: {str(e)}")
