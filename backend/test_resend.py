#!/usr/bin/env python3
"""
Test script to verify Resend API configuration and connection.
Run this to debug email sending issues.
"""

import os
from dotenv import load_dotenv
from pathlib import Path
import requests

# Load environment variables
backend_dir = Path(__file__).parent
env_path = backend_dir / '.env'
load_dotenv(dotenv_path=env_path)

RESEND_API_URL = "https://api.resend.com/emails"

def test_resend_config():
    print("=" * 60)
    print("Resend API Configuration Test")
    print("=" * 60)
    print()
    
    # Check environment variables
    resend_api_key = os.getenv('RESEND_API_KEY')
    from_email = os.getenv('FROM_EMAIL')
    
    print("1. Environment Variables:")
    print(f"   RESEND_API_KEY: {'SET' if resend_api_key else 'NOT SET'}")
    if resend_api_key:
        # Show first 10 chars for security
        print(f"   API Key (first 10 chars): {resend_api_key[:10]}...")
        if not resend_api_key.startswith('re_'):
            print("   ⚠️  WARNING: API key should start with 're_'")
    print(f"   FROM_EMAIL: {from_email or 'NOT SET'}")
    print()
    
    if not resend_api_key:
        print("ERROR: RESEND_API_KEY is not set in .env file")
        return False
    
    if not from_email:
        print("ERROR: FROM_EMAIL is not set in .env file")
        return False
    
    # Test API connection
    print("2. Testing Resend API Connection...")
    print()
    
    test_payload = {
        "from": from_email,
        "to": "test@example.com",  # Test email (won't actually send)
        "subject": "Test Email",
        "html": "<p>This is a test email</p>"
    }
    
    headers = {
        "Authorization": f"Bearer {resend_api_key}",
        "Content-Type": "application/json"
    }
    
    try:
        print("   Sending test request to Resend API...")
        response = requests.post(RESEND_API_URL, json=test_payload, headers=headers, timeout=10)
        
        print(f"   Status Code: {response.status_code}")
        print()
        
        if response.status_code == 200 or response.status_code == 201:
            print("SUCCESS: API connection is working!")
            response_data = response.json()
            print(f"   Response: {response_data}")
            return True
        else:
            print(f"ERROR: API returned status {response.status_code}")
            try:
                error_data = response.json()
                print(f"   Error Message: {error_data.get('message', 'Unknown error')}")
                if 'errors' in error_data:
                    print(f"   Errors: {error_data['errors']}")
                print(f"   Full Response: {error_data}")
            except:
                print(f"   Response Text: {response.text[:500]}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"ERROR: Failed to connect to Resend API")
        print(f"   Error: {str(e)}")
        return False

if __name__ == '__main__':
    success = test_resend_config()
    print()
    if success:
        print("SUCCESS: Configuration looks good! Your backend should work now.")
    else:
        print("ERROR: Please fix the errors above and try again.")
        print()
        print("Common issues:")
        print("1. Invalid API key - Get a new one from https://resend.com/api-keys")
        print("2. FROM_EMAIL not verified - Use noreply@resend.dev for testing")
        print("3. Network issues - Check your internet connection")

