# Flask Backend for Job Applications

This is a Flask backend for handling job applications, converted from Django REST Framework.

## Setup

1. **Activate the virtual environment:**
   ```bash
   cd backend
   .\venv\Scripts\Activate.ps1  # Windows PowerShell
   # or
   .\venv\Scripts\activate.bat  # Windows CMD
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the development server:**
   ```bash
   python app.py
   ```

The server will run on `http://127.0.0.1:8000/`

## API Endpoints

### POST /api/applications/

Submit a new job application.

**Request Body (multipart/form-data):**
- `full_name` (string, required): Full name of the applicant
- `email` (string, required): Valid email address
- `mobile` (string, required): Exactly 10 digits
- `position` (string, required): Job position title
- `experience` (string, required): One of: '0-1 years', '1-3 years', '3-5 years', '5+ years'
- `resume` (file, required): Resume file (max 1MB)

**Success Response (201):**
```json
{
  "success": true,
  "message": "Application submitted successfully.",
  "data": {
    "id": 1,
    "full_name": "John Doe",
    "email": "john@example.com",
    "mobile": "1234567890",
    "position": "Software Engineer",
    "experience": "1-3 years",
    "resume": "/media/resumes/resume.pdf",
    "created_at": "2024-01-01T12:00:00Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": {
    "email": ["Enter a valid email address."],
    "mobile": ["Mobile number must be exactly 10 digits."],
    "resume": ["Resume file size must not exceed 1MB."]
  }
}
```

## Validation Rules

- **Email**: Must be a valid email format
- **Mobile**: Must be exactly 10 digits (numbers only)
- **Resume**: Maximum file size of 1MB, allowed extensions: pdf, doc, docx

## File Structure

```
backend/
├── app.py                 # Flask application entry point
├── config.py              # Configuration settings
├── models/                # SQLAlchemy models
│   ├── __init__.py
│   └── job_application.py
├── routes/                # API routes
│   ├── __init__.py
│   └── applications.py
├── services/              # Business logic services
│   ├── __init__.py
│   └── validation_service.py
├── media/                 # Uploaded files (resumes/)
├── db.sqlite3             # SQLite database (shared with Django)
└── requirements.txt       # Python dependencies
```

## CORS Configuration

CORS is enabled for the following origins:
- http://localhost:5173 (Vite default)
- http://localhost:3000 (React default)
- http://127.0.0.1:5173
- http://127.0.0.1:3000

To add more origins, update `CORS_ORIGINS` in `config.py`.

## Database

The Flask backend uses the same SQLite database (`db.sqlite3`) as the Django backend. The SQLAlchemy models are configured to work with the existing Django table structure.
