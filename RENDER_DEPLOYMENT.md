# Smart Foods - Render Backend Deployment Guide

This guide walks you through deploying the Smart Foods backend to Render.

## Prerequisites

- Render account (free at https://render.com)
- GitHub repository with Smart Foods code
- PostgreSQL database (Render provides free tier)
- Backend environment variables configured

## Step 1: Prepare Your Backend

### 1.1 Build Script Configuration

Ensure `backend/package.json` has build and start scripts:

```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "dev": "nodemon src/server.ts",
    "prisma:migrate": "prisma migrate deploy",
    "prisma:seed": "ts-node prisma/seed.ts"
  }
}
```

### 1.2 Create `.env.render` (for reference only)

```env
# Database (Render will provide)
DATABASE_URL=postgresql://user:password@host:5432/smartfoods

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Stripe
STRIPE_SECRET_KEY=sk_live_YOUR_KEY_HERE

# Email (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@smartfoods.com

# Redis (optional, for caching)
REDIS_URL=redis://localhost:6379

# Frontend
FRONTEND_URL=https://smart-foods.vercel.app
NEXT_PUBLIC_API_URL=https://smart-foods-api.onrender.com/api
```

## Step 2: Create PostgreSQL Database on Render

1. Go to [render.com/dashboard](https://render.com/dashboard)
2. Click **"New"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `smartfoods-db`
   - **Database**: `smartfoods`
   - **User**: `smartfoods_user`
   - **Region**: Choose your region
   - **Plan**: Free (for testing) or Starter ($7/month for production)

4. Wait for database to be created
5. Copy the **Internal Database URL** (you'll need it for the backend service)
   - Format: `postgresql://user:password@host:5432/database`

## Step 3: Create Backend Service on Render

1. Go to [render.com/dashboard](https://render.com/dashboard)
2. Click **"New"** → **"Web Service"**
3. Select your GitHub repository
4. Configure:
   - **Name**: `smart-foods-api`
   - **Environment**: `Node`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Build Command**: `npm install --prefix backend && npx prisma generate --schema backend/prisma/schema.prisma && npx prisma migrate deploy --schema backend/prisma/schema.prisma`
   - **Start Command**: `node backend/dist/server.js`
   - **Plan**: Free (for testing) or Starter ($7/month for production)

## Step 4: Configure Environment Variables

In the Render Web Service **Environment** tab, add:

```
DATABASE_URL=postgresql://user:password@host:5432/smartfoods

JWT_SECRET=your-super-secret-jwt-key-min-32-chars-you-generate
JWT_REFRESH_SECRET=your-super-secret-refresh-key-you-generate
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret

STRIPE_SECRET_KEY=sk_live_your_stripe_key

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
EMAIL_FROM=noreply@smartfoods.com

REDIS_URL=redis://localhost:6379

FRONTEND_URL=https://smart-foods.vercel.app
NEXT_PUBLIC_API_URL=https://smart-foods-api.onrender.com/api

NODE_ENV=production
```

## Step 5: Generate Secrets

Generate strong keys for JWT:

```bash
# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate JWT_REFRESH_SECRET  
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy these values to Render environment variables.

## Step 6: Deploy

1. Click **"Deploy"** button in Render
2. Monitor deployment in **Logs** tab
3. Wait for build and startup to complete
4. You'll see a message like: "Live on https://smart-foods-api.onrender.com"

## Step 7: Verify Deployment

1. Check if API is running:
```bash
curl https://smart-foods-api.onrender.com/api-docs
```

2. You should see Swagger documentation

3. Test a health endpoint:
```bash
curl https://smart-foods-api.onrender.com/api/health
```

## Step 8: Seed Database (One-time Setup)

After first deployment succeeds, run seed via Render Shell:

1. Go to Web Service dashboard
2. Click **"Shell"** tab
3. Run:
```bash
npx prisma db seed --schema backend/prisma/schema.prisma
```

4. Verify data was seeded:
```bash
npx prisma studio --schema backend/prisma/schema.prisma
```

## Important Configuration Files

### backend/package.json Adjustments

If not present, ensure these scripts exist:

```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "prisma:migrate": "prisma migrate deploy",
    "prisma:generate": "prisma generate"
  }
}
```

### backend/tsconfig.json

Ensure compilation targets Node.js 18+:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Environment Variables for External Services

### Cloudinary Setup
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get Cloud Name, API Key, and API Secret from dashboard
3. Add to Render environment variables

### Stripe Setup
1. Get Secret Key from [stripe.com/dashboard](https://stripe.com/dashboard)
2. Use test keys first (sk_test_...)
3. Switch to live keys (sk_live_...) for production

### Gmail App Password
1. Enable 2FA on Google Account
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Generate app password for "Mail" and "Windows"
4. Use this password in EMAIL_PASSWORD variable

## Database Backup

Render provides automatic backups. To manually backup:

1. Go to PostgreSQL instance dashboard
2. Click **"Backups"** tab
3. Click **"Backup Now"**

## Troubleshooting

### Build Failures
- Check **Logs** tab for error messages
- Ensure `backend/package.json` has all dependencies
- Verify build command is correct

### Database Connection Error
- Verify DATABASE_URL is correct
- Ensure PostgreSQL instance is running
- Check if IP is whitelisted (Render allows all by default)

### Migrations Failed
- Manually run migrations via Shell:
```bash
npx prisma migrate deploy --schema backend/prisma/schema.prisma
```

### Seed Script Failed
- Run manually via Shell:
```bash
npx prisma db seed --schema backend/prisma/schema.prisma
```

### CORS Errors
- Update `FRONTEND_URL` in backend environment variables
- Restart the service

## Monitoring

### View Logs
- Real-time logs in **Logs** tab
- Historical logs available for 24 hours (free) or 7 days (paid)

### Set Up Alerts
- Go to **Settings** → **Alerts**
- Configure email notifications for deployment failures

## Automatic Deployments

Render automatically redeploys when you push to `main` branch. To disable:
1. Go to **Settings** → **Repository**
2. Uncheck **"Auto-deploy"**

## Production Checklist

- [ ] Database backups configured
- [ ] JWT secrets are strong and unique
- [ ] Cloudinary credentials set
- [ ] Stripe keys configured (live keys for production)
- [ ] Email service configured
- [ ] CORS whitelist includes Vercel frontend domain
- [ ] Database migrations run successfully
- [ ] Database seeded with initial data
- [ ] Swagger docs accessible
- [ ] Health endpoint responds
- [ ] Logs monitored for errors
- [ ] Frontend points to correct backend URL

## Support

- Render Docs: https://render.com/docs
- Express.js Docs: https://expressjs.com
- Prisma Docs: https://prisma.io/docs
