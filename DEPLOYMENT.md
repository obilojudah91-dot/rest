# Deployment Guide

This guide will help you deploy Smart Foods to Vercel (frontend) and Render (backend).

## Prerequisites

- GitHub repository: https://github.com/obilojudah91-dot/rest
- Render account (free tier available)
- Vercel account (free tier available)

## Step 1: Deploy Backend on Render

### 1.1 Create PostgreSQL Database

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New** → **PostgreSQL**
3. Name: `smart-foods-db`
4. Database: `smartfoods`
4. User: `smartfoods_user`
5. Region: Choose closest to your users
6. Plan: Free
7. Click **Create Database**

### 1.2 Deploy Backend Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New** → **Web Service**
3. Connect your GitHub repository: `obilojudah91-dot/rest`
4. Configure:
   - **Name**: `smart-foods-backend`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install --include=dev`
   - **Start Command**: `npm start`
5. Click **Advanced** → **Add Environment Variable**:
   - `NODE_ENV` = `production`
   - `PORT` = `10000`
   - `FRONTEND_URL` = `https://rest-frontend.vercel.app`
   - `DATABASE_URL` = (select from database dropdown)
   - `JWT_SECRET` = (generate a strong random string)
   - `JWT_REFRESH_SECRET` = (generate a different strong random string)
6. Add optional environment variables:
   - `CLOUDINARY_CLOUD_NAME` = (your Cloudinary cloud name)
   - `CLOUDINARY_API_KEY` = (your Cloudinary API key)
   - `CLOUDINARY_API_SECRET` = (your Cloudinary API secret)
   - `STRIPE_SECRET_KEY` = (your Stripe secret key)
   - `STRIPE_WEBHOOK_SECRET` = (your Stripe webhook secret)
   - `EMAIL_HOST` = `smtp.gmail.com`
   - `EMAIL_PORT` = `587`
   - `EMAIL_USER` = (your Gmail address)
   - `EMAIL_PASSWORD` = (your Gmail app password)
   - `EMAIL_FROM` = `noreply@smartfoods.com`
7. Click **Deploy Web Service**

### 1.3 Run Database Migrations

After deployment, you need to run Prisma migrations:

1. Go to your backend service on Render
2. Click **Shell** (top right)
3. Run:
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

### 1.4 Note Your Backend URL

After deployment, Render will provide a URL like:
`https://smart-foods-backend.onrender.com`

**Copy this URL** - you'll need it for the frontend deployment.

## Step 2: Deploy Frontend on Vercel

### 2.1 Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import your GitHub repository: `obilojudah91-dot/rest`
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Project Name**: `rest-frontend` (or your preferred name)
5. Click **Environment Variables**:
   - `NEXT_PUBLIC_API_URL` = `https://smart-foods-backend.onrender.com/api`
6. Click **Deploy**

### 2.2 Update Render CORS

After Vercel deployment:

1. Go to your Render backend service
2. Click **Environment** tab
3. Update `FRONTEND_URL` to your actual Vercel domain:
   - `https://rest-frontend.vercel.app` (or your actual domain)
4. Click **Save Changes**
5. Render will automatically redeploy

## Step 3: Verify Deployment

### 3.1 Check Backend

1. Visit your backend URL: `https://smart-foods-backend.onrender.com/health`
2. Should return: `{"status":"ok","timestamp":"..."}`

### 3.2 Check API Docs

1. Visit: `https://smart-foods-backend.onrender.com/api-docs`
2. You should see Swagger API documentation

### 3.3 Check Frontend

1. Visit your Vercel URL: `https://rest-frontend.vercel.app`
2. The homepage should load
3. Try navigating to menu, cart, login pages

## Step 4: Configure Optional Services

### 4.1 Cloudinary (for image uploads)

1. Sign up at [Cloudinary](https://cloudinary.com)
2. Get your API credentials from dashboard
3. Add to Render environment variables:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

### 4.2 Stripe (for payments)

1. Sign up at [Stripe](https://stripe.com)
2. Get your API keys from dashboard
3. Add to Render environment variables:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET` (for webhooks)

### 4.3 Email (for notifications)

1. Create a Gmail account
2. Enable 2-factor authentication
3. Generate an app password
4. Add to Render environment variables:
   - `EMAIL_HOST` = `smtp.gmail.com`
   - `EMAIL_PORT` = `587`
   - `EMAIL_USER` = (your Gmail)
   - `EMAIL_PASSWORD` = (your app password)
   - `EMAIL_FROM` = `noreply@smartfoods.com`

## Troubleshooting

### Backend fails to start

- Check Render logs for errors
- Ensure all environment variables are set
- Verify DATABASE_URL is correct
- Check if migrations ran successfully

### Frontend can't connect to backend

- Verify NEXT_PUBLIC_API_URL is correct
- Check if backend is running
- Verify CORS settings (FRONTEND_URL on Render)
- Check browser console for errors

### Database connection issues

- Verify DATABASE_URL format
- Check if PostgreSQL database is running
- Ensure database user has correct permissions

### Build failures

- Check build logs for specific errors
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility

## Default Login Credentials

After deployment with seed data:

**Admin:**
- Email: `admin@smartfoods.com`
- Password: `admin123`

**Chef:**
- Email: `chef@smartfoods.com`
- Password: `chef123`

**Cashier:**
- Email: `cashier@smartfoods.com`
- Password: `cashier123`

**Manager:**
- Email: `manager@smartfoods.com`
- Password: `manager123`

## Monitoring

### Render Monitoring
- Go to Render dashboard
- View metrics, logs, and deployment history
- Set up alerts for errors

### Vercel Monitoring
- Go to Vercel dashboard
- View analytics, logs, and deployments
- Set up custom domains

## Support

For issues:
- Check Render and Vercel logs
- Review this deployment guide
- Check the main README.md
