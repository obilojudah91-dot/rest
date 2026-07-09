# Smart Foods - Vercel Frontend Deployment Guide

This guide walks you through deploying the Smart Foods frontend to Vercel.

## Prerequisites

- Vercel account (free at https://vercel.com)
- GitHub repository with the Smart Foods code
- Frontend environment variables configured

## Step 1: Prepare Your GitHub Repository

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit: Smart Foods Restaurant Management System"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/smart-foods.git
git push -u origin main
```

2. Ensure your repository is public or you have Vercel Pro/Team for private repos.

## Step 2: Create Vercel Project

### Option A: Via Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Select your GitHub repository **smart-foods**
4. Configure the project:
   - **Framework**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### Option B: Via Vercel CLI

```bash
npm i -g vercel
vercel login
cd frontend
vercel
```

## Step 3: Configure Environment Variables

In the Vercel Dashboard for your project:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables:

```
NEXT_PUBLIC_API_URL=https://smart-foods-api.onrender.com/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_KEY_HERE
```

**Note**: Replace `https://smart-foods-api.onrender.com` with your actual Render backend URL after deploying the backend.

## Step 4: Deploy

### Automatic Deployment
- Once configured, every push to the `main` branch triggers automatic deployment

### Manual Deployment
```bash
cd frontend
vercel --prod
```

## Step 5: Verify Deployment

1. Your frontend will be available at: `https://smart-foods.vercel.app` (or your custom domain)
2. Check **Deployments** tab in Vercel Dashboard
3. Click the deployment to view logs

## Troubleshooting

### Build Fails
- Check build logs in Vercel Dashboard
- Ensure `frontend/package.json` has all dependencies
- Verify environment variables are set

### 404 Errors
- Ensure Next.js routing in `frontend/src/app/` is correct
- Check `next.config.js` settings

### API Connection Issues
- Verify `NEXT_PUBLIC_API_URL` points to your Render backend
- Ensure backend CORS allows Vercel domain
- Add to backend `FRONTEND_URL` environment variable

## Custom Domain

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (5-30 minutes)

## Performance Optimization

Vercel automatically provides:
- **Edge Functions** for API routes
- **Image Optimization** via Next.js Image component
- **Automatic Code Splitting**
- **CDN Distribution** across 280+ global edge locations

## Environment Variables Reference

For production, ensure these are set in Vercel:

| Variable | Value | Required |
|----------|-------|----------|
| NEXT_PUBLIC_API_URL | Backend API URL | Yes |
| NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY | Stripe publishable key | Yes |

## Rollback

To rollback to a previous deployment:
1. Go to **Deployments** in Vercel Dashboard
2. Find the deployment you want to restore
3. Click the three dots → **Promote to Production**

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
