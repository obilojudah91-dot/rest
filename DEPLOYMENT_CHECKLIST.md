# Smart Foods - Deployment Checklist

This document provides a step-by-step checklist for deploying the Smart Foods Restaurant Management System to Vercel (frontend) and Render (backend).

## Pre-Deployment Checklist

### Code & Repository
- [ ] All code committed and pushed to main branch
- [ ] No environment variables in code (use .env files)
- [ ] `.env.example` updated with all required variables
- [ ] `.gitignore` includes `.env`, `node_modules/`, `dist/`, `coverage/`
- [ ] All tests passing locally (`npm test` in backend)
- [ ] No console errors or warnings in frontend

### Backend Preparation
- [ ] `backend/package.json` has correct `build` and `start` scripts
- [ ] `backend/tsconfig.json` configured correctly
- [ ] `backend/prisma/schema.prisma` matches Render database
- [ ] Environment variables documented
- [ ] Cloudinary credentials obtained
- [ ] Stripe keys obtained (test keys for staging)
- [ ] Email service configured (Gmail with app password)

### Frontend Preparation
- [ ] `frontend/.env.example` has `NEXT_PUBLIC_API_URL`
- [ ] `frontend/next.config.js` configured
- [ ] All API calls point to environment variable API URL
- [ ] No hardcoded API endpoints
- [ ] Build tested locally: `npm run build`

## Deployment Steps

### Part 1: Set Up Render Database (5 minutes)

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub (easier)

2. **Create PostgreSQL Database**
   - Click "New" → "PostgreSQL"
   - Name: `smartfoods-db`
   - Database: `smartfoods`
   - Plan: Free tier (for testing)
   - Region: Choose your region
   - **SAVE** the Internal Database URL

3. **Verify Connection**
   - Note your database credentials:
     - Username (e.g., `smartfoods_user`)
     - Password
     - Host
     - Database name: `smartfoods`

**Expected Result**: Database running and ready

---

### Part 2: Deploy Backend to Render (10-15 minutes)

1. **Push Code to GitHub**
   ```bash
   git add .
   git commit -m "Deploy: Ready for Render"
   git push origin main
   ```

2. **Create Render Web Service**
   - Go to https://render.com/dashboard
   - Click "New" → "Web Service"
   - Connect GitHub repository
   - Select `smart-foods` repository
   - Choose `main` branch

3. **Configure Web Service**
   - **Name**: `smart-foods-api`
   - **Environment**: Node
   - **Region**: Same as database
   - **Build Command**:
     ```
     npm install --prefix backend && npx prisma generate --schema backend/prisma/schema.prisma && npx prisma migrate deploy --schema backend/prisma/schema.prisma
     ```
   - **Start Command**:
     ```
     node backend/dist/server.js
     ```
   - **Plan**: Free tier (for testing)

4. **Add Environment Variables**
   Click "Advanced" → "Environment Variables" and add:
   
   ```
   DATABASE_URL=postgresql://username:password@host:5432/smartfoods
   
   NODE_ENV=production
   
   JWT_SECRET=<generate-using-command-below>
   JWT_REFRESH_SECRET=<generate-using-command-below>
   JWT_EXPIRES_IN=15m
   JWT_REFRESH_EXPIRES_IN=7d
   
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   
   STRIPE_SECRET_KEY=sk_test_your_test_key_here
   
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   EMAIL_FROM=noreply@smartfoods.com
   
   FRONTEND_URL=https://smart-foods.vercel.app
   NEXT_PUBLIC_API_URL=https://smart-foods-api.onrender.com/api
   ```

5. **Generate JWT Secrets**
   Run in your terminal:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   Run twice to get two different secrets for JWT_SECRET and JWT_REFRESH_SECRET

6. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Check logs for errors
   - Note your URL: `https://smart-foods-api.onrender.com`

7. **Verify Backend**
   ```bash
   curl https://smart-foods-api.onrender.com/api-docs
   # Should return Swagger UI HTML
   ```

8. **Seed Database (One-time)**
   - In Render Web Service dashboard, click "Shell"
   - Run:
     ```bash
     npx prisma db seed --schema backend/prisma/schema.prisma
     ```
   - Verify seeding completed

**Expected Result**: Backend running and accessible, database seeded

---

### Part 3: Deploy Frontend to Vercel (5-10 minutes)

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Select `smart-foods` repository
   - Click "Import"

3. **Configure Project**
   - **Framework**: Next.js (auto-detected)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   Click "Environment Variables" and add:
   
   ```
   NEXT_PUBLIC_API_URL=https://smart-foods-api.onrender.com/api
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_test_key_here
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Note your URL: `https://smart-foods.vercel.app`

6. **Test Frontend**
   - Open https://smart-foods.vercel.app
   - Try login with default credentials:
     - Email: `customer@example.com`
     - Password: `password123`

**Expected Result**: Frontend running and connected to backend

---

### Part 4: Final Configuration (5 minutes)

1. **Update Render Backend CORS**
   - Go to Render Web Service → Environment Variables
   - Update `FRONTEND_URL` if different from above
   - Restart service

2. **Test End-to-End**
   - Open https://smart-foods.vercel.app
   - Try browsing menu
   - Try creating order
   - Check admin dashboard

3. **Set Up Custom Domains (Optional)**
   
   **For Backend (Render)**:
   - Go to Web Service → Settings → Domains
   - Add custom domain (e.g., `api.smartfoods.com`)
   - Follow DNS instructions
   
   **For Frontend (Vercel)**:
   - Go to Project → Settings → Domains
   - Add custom domain (e.g., `smartfoods.com`)
   - Follow DNS instructions

---

## Testing Checklist

### Backend API Tests
- [ ] GET `/api-docs` returns Swagger UI
- [ ] POST `/api/auth/register` creates new user
- [ ] POST `/api/auth/login` returns JWT token
- [ ] GET `/api/products` returns products with pagination
- [ ] GET `/api/categories` returns categories
- [ ] POST `/api/orders` creates order (requires auth)
- [ ] POST `/api/reservations` creates reservation (requires auth)

### Frontend Tests
- [ ] Homepage loads and displays menu
- [ ] Can search products
- [ ] Can filter by category
- [ ] Can add product to cart
- [ ] Can view cart
- [ ] Can checkout
- [ ] Can login with credentials
- [ ] Can view order history
- [ ] Admin dashboard accessible
- [ ] Can manage products (admin)

---

## Troubleshooting Guide

### Backend Deployment Issues

#### Build Fails - "prisma migrate deploy failed"
**Solution**: 
- Ensure DATABASE_URL is correct
- Check if database is running
- Manually run migrations in Render Shell:
  ```bash
  npx prisma migrate deploy --schema backend/prisma/schema.prisma
  ```

#### Build Fails - "Cannot find module"
**Solution**:
- Ensure all dependencies in `package.json`
- Check `npm install` output for warnings
- Reinstall: `npm install`

#### Service Won't Start
**Solution**:
- Check logs: Render Dashboard → Logs tab
- Ensure `start` command is: `node backend/dist/server.js`
- Verify dist directory exists after build

### Frontend Deployment Issues

#### Build Fails
**Solution**:
- Run `npm run type-check` locally to catch TypeScript errors
- Ensure `NEXT_PUBLIC_API_URL` is set in environment variables
- Check Vercel build logs for specific errors

#### API Connection Fails
**Solution**:
- Verify `NEXT_PUBLIC_API_URL` is correct
- Ensure backend is running and accessible
- Check browser console for CORS errors
- Verify backend CORS includes Vercel domain

#### 404 Pages
**Solution**:
- Check Next.js page structure in `frontend/src/app/`
- Verify dynamic routes syntax `[id]` not `{id}`
- Redeploy after route changes

### General Issues

#### Port Already in Use (Local)
**Solution**:
```bash
# Find process on port 3000
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows

# Kill process (Mac/Linux)
kill -9 <PID>
```

#### Database Connection Timeout
**Solution**:
- Check PostgreSQL is running
- Verify DATABASE_URL format
- Test connection: `psql <DATABASE_URL>`

---

## Production Checklist (Before Going Live)

- [ ] Switch Stripe keys from test to live
- [ ] Set up email with production domain
- [ ] Update privacy policy and terms
- [ ] Configure analytics/monitoring
- [ ] Set up database backups
- [ ] Test payment processing
- [ ] Test email notifications
- [ ] Review security headers
- [ ] Enable HTTPS (automatic on both platforms)
- [ ] Set up monitoring/alerts

---

## Support & Documentation

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Prisma Docs**: https://prisma.io/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Express Docs**: https://expressjs.com

---

## Next Steps After Deployment

1. Share Vercel frontend URL with team
2. Share Render backend API docs URL: `https://smart-foods-api.onrender.com/api-docs`
3. Monitor logs for errors
4. Gather feedback from testers
5. Plan future enhancements

---

**Estimated Total Deployment Time**: 30-45 minutes

Good luck! 🚀
