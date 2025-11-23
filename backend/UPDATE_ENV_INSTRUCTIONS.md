# ✅ Update Your .env File

Your `.env` file already exists! You just need to add your Resend API key.

## Quick Steps:

1. **Open the `.env` file** in the `backend` directory

2. **Update it with your Resend API key:**

```env
RESEND_API_KEY=re_your_actual_api_key_here
FROM_EMAIL=noreply@resend.dev
```

3. **Replace `re_your_actual_api_key_here`** with your actual Resend API key

## Get Your Resend API Key:

1. Go to: **https://resend.com/api-keys**
2. Click **"Create API Key"**
3. Give it a name (e.g., "Contact Form")
4. **Copy the key** (starts with `re_`)
5. Paste it in your `.env` file

## Example .env File:

```env
RESEND_API_KEY=re_abc123xyz789
FROM_EMAIL=noreply@resend.dev
```

## After Updating:

1. Save the `.env` file
2. Run your Flask server:
   ```bash
   cd backend
   python app.py
   ```

That's it! Your backend is ready to send emails via Resend! 🚀

