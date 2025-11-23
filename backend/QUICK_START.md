# Quick Start - Resend Backend

## 1. Get Resend API Key

Visit: **https://resend.com/api-keys**

1. Sign up/login at [resend.com](https://resend.com)
2. Go to API Keys section
3. Create a new API key
4. Copy it (starts with `re_`)

## 2. Install & Setup

```bash
cd backend
pip install -r requirements.txt
```

## 3. Create .env File

Create `backend/.env`:

```env
RESEND_API_KEY=re_your_actual_key_here
FROM_EMAIL=noreply@resend.dev
```

**For testing:** Use `noreply@resend.dev` (no verification needed)

**For production:** Use your verified domain email

## 4. Run Server

```bash
python app.py
```

Server runs on `http://localhost:5000`

## 5. Test

```bash
curl -X POST http://localhost:5000/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Hello"}'
```

## Frontend

Your React form already calls `http://localhost:5000/contact` - just start both servers!

---

**Resend Dashboard:** https://resend.com/emails  
**API Docs:** https://resend.com/docs

