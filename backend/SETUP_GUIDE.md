# Quick Setup Guide - Resend API

## Step 1: Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

## Step 2: Get Resend API Key

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (or log in)
3. Navigate to **API Keys** in your dashboard: [https://resend.com/api-keys](https://resend.com/api-keys)
4. Click **Create API Key**
5. Give it a name (e.g., "Contact Form")
6. **Copy the API key immediately** (you'll only see it once!)

## Step 3: Create .env File

Create a `.env` file in the `backend` directory:

```env
RESEND_API_KEY=re_your_actual_api_key_here
FROM_EMAIL=noreply@resend.dev
```

**Notes:**
- Replace `re_your_actual_api_key_here` with your actual Resend API key
- For testing, use `noreply@resend.dev` (no domain verification needed)
- For production, use your own verified domain (e.g., `noreply@yourdomain.com`)

## Step 4: Run the Server

```bash
python app.py
```

The server will start on `http://localhost:5000`

## Step 5: Test the API

```bash
curl -X POST http://localhost:5000/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test",
    "message": "Hello"
  }'
```

## Frontend Integration

The React frontend is already configured to call `http://localhost:5000/contact`. Just make sure:

1. Backend is running on port 5000
2. Frontend is running on port 5173 (Vite default)
3. Your `.env` file is configured correctly

## Troubleshooting

- **"RESEND_API_KEY must be set"**: Make sure your `.env` file exists and has the correct key
- **Email not sending**: Check your API key is valid and `FROM_EMAIL` is correct
- **CORS errors**: Ensure frontend is on `http://localhost:5173`
- **Import errors**: Make sure you're running `python app.py` from the `backend` directory
