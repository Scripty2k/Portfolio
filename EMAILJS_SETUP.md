# EmailJS Setup Guide

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (since you're using amalrahimli06@gmail.com)
4. Follow the instructions to connect your Gmail account
5. Note the **Service ID** that gets generated

## Step 3: Create Email Template
1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Use this template content:

**Subject:** New Contact Form Message: {{subject}}

**Body:**
```
Hello Amal,

You have received a new message from your portfolio contact form:

From: {{from_name}} ({{from_email}})
Company: {{company}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio website contact form.
```

4. Note the **Template ID** that gets generated

## Step 4: Get Public Key
1. Go to "Account" in the dashboard
2. Find your **Public Key** (also called User ID)

## Step 5: Update Environment Variables
Update the `.env` file in your project root with your actual values:

```
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

## Step 6: Test the Form
1. Save the .env file
2. Restart your development server (`npm run dev`)
3. Fill out and submit the contact form
4. Check your email (amalrahimli06@gmail.com) for the message

## Template Parameters Used
The form sends these parameters to your email template:
- `from_name`: Person's name
- `from_email`: Person's email
- `company`: Their company (optional)
- `subject`: Message subject
- `message`: Their message
- `to_email`: Your email (amalrahimli06@gmail.com)

## Free Tier Limits
- 200 emails per month
- EmailJS branding in emails
- Basic templates

## Security Note
The public key is safe to expose in frontend code - it's designed for client-side use.