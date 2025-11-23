#!/usr/bin/env python3
"""
Helper script to create .env file for Resend API configuration.
Run this script and follow the prompts.
"""

import os

def create_env_file():
    print("=" * 60)
    print("Resend API Configuration Setup")
    print("=" * 60)
    print()
    
    # Check if .env already exists
    if os.path.exists('.env'):
        response = input(".env file already exists. Overwrite? (y/n): ").strip().lower()
        if response != 'y':
            print("Cancelled.")
            return
    
    print("To get your Resend API key:")
    print("1. Go to https://resend.com")
    print("2. Sign up or log in")
    print("3. Navigate to API Keys: https://resend.com/api-keys")
    print("4. Click 'Create API Key'")
    print("5. Copy the API key (starts with 're_')")
    print()
    
    # Get API key from user
    api_key = input("Enter your Resend API key: ").strip()
    
    if not api_key:
        print("Error: API key cannot be empty!")
        return
    
    if not api_key.startswith('re_'):
        print("Warning: Resend API keys usually start with 're_'. Continue anyway? (y/n): ", end='')
        if input().strip().lower() != 'y':
            return
    
    # Get FROM_EMAIL
    print()
    print("For FROM_EMAIL:")
    print("- Testing: Use 'noreply@resend.dev' (no verification needed)")
    print("- Production: Use your verified domain (e.g., 'noreply@yourdomain.com')")
    print()
    
    from_email = input("Enter FROM_EMAIL (default: noreply@resend.dev): ").strip()
    if not from_email:
        from_email = "noreply@resend.dev"
    
    # Create .env file content
    env_content = f"""# Resend API Configuration
# Generated automatically - do not commit to version control

RESEND_API_KEY={api_key}
FROM_EMAIL={from_email}
"""
    
    # Write to .env file
    try:
        with open('.env', 'w') as f:
            f.write(env_content)
        print()
        print("✅ .env file created successfully!")
        print()
        print("Next steps:")
        print("1. Verify your .env file contains the correct values")
        print("2. Run: python app.py")
        print()
    except Exception as e:
        print(f"❌ Error creating .env file: {e}")

if __name__ == '__main__':
    create_env_file()

