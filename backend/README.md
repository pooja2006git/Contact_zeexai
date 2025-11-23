# Flask Contact Form Backend with Resend API

A Flask backend API for handling contact form submissions and sending emails via Resend API.

## Project Structure

```
backend/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── .env                  # Environment variables (create this file)
├── routes/
│   ├── __init__.py
│   └── contact.py        # Contact form route
└── services/
    ├── __init__.py
    └── email_service.py  # Resend email service
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Get Resend API Key

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (or log in if you have one)
3. Navigate to **API Keys** section in your dashboard
4. Click **Create API Key**
5. Give it a name (e.g., "Contact Form Backend")
6. Copy the API key (you'll only see it once!)

**Resend Dashboard:** [https://resend.com/api-keys](https://resend.com/api-keys)

### 3. Configure Environment Variables

Create a `.env` file in the `backend` directory with the following content:

```env
RESEND_API_KEY=re_your_actual_api_key_here
FROM_EMAIL=noreply@yourdomain.dev
```

**Important Notes:**
- Replace `re_your_actual_api_key_here` with your actual Resend API key
- For `FROM_EMAIL`, you have two options:
  - **Production:** Use a verified domain (e.g., `noreply@yourdomain.com`)
  - **Testing:** Use Resend's test domain: `noreply@resend.dev` (works without domain verification)

### 4. Verify Your Domain (Optional for Production)

If you want to send from your own domain:

1. Go to Resend Dashboard → **Domains**
2. Click **Add Domain**
3. Follow the DNS configuration instructions
4. Once verified, use emails from that domain in `FROM_EMAIL`

### 5. Run the Flask Server

```bash
python app.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### POST /contact

Submit a contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "Hello, I have a question..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": "Error message here"
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "ok"
}
```

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:5173` (Vite dev server)

## Testing with cURL

```bash
curl -X POST http://localhost:5000/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message"
  }'
```

## Frontend Integration

The React frontend sends requests to `http://localhost:5000/contact`:

```javascript
async function submitContactForm(data) {
  const res = await fetch("http://localhost:5000/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return await res.json();
}
```

## How Resend Works

1. **No SMTP Configuration:** Resend handles all email delivery
2. **API-Based:** Simple HTTP POST requests to Resend's API
3. **No App Passwords:** Just an API key
4. **Reliable Delivery:** Resend handles email infrastructure
5. **Free Tier:** 3,000 emails/month on free plan

## Troubleshooting

1. **"RESEND_API_KEY must be set" error:**
   - Make sure your `.env` file exists in the `backend` directory
   - Verify the API key is correct (starts with `re_`)

2. **"FROM_EMAIL must be set" error:**
   - Add `FROM_EMAIL` to your `.env` file
   - For testing, use `noreply@resend.dev`

3. **Email not sending:**
   - Check your Resend API key is valid
   - Verify the `FROM_EMAIL` domain is verified (or use `resend.dev` for testing)
   - Check Resend dashboard for delivery logs

4. **CORS errors:**
   - Ensure the frontend is running on `http://localhost:5173`
   - Check that the backend CORS configuration matches your frontend URL

5. **Port already in use:**
   - Change the port in `app.py` from `5000` to another port (e.g., `5001`)
   - Update the frontend fetch URL accordingly

## Resend Resources

- **Website:** [https://resend.com](https://resend.com)
- **API Documentation:** [https://resend.com/docs](https://resend.com/docs)
- **API Keys:** [https://resend.com/api-keys](https://resend.com/api-keys)
- **Dashboard:** [https://resend.com/emails](https://resend.com/emails)
