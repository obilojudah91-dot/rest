# Smart Foods - Quick Deployment Reference

## TL;DR - Deploy in 3 Steps

### 1. Prepare Backend for Render
```bash
cd backend
npm run build
# Verify dist/ folder is created
```

### 2. Create Render Backend Service
- Render Dashboard → New → Web Service
- Select GitHub repo → `main` branch
- Root: `/backend` (let Render auto-detect)
- **Build Command**: 
  ```
  npm install --prefix backend && npx prisma generate --schema backend/prisma/schema.prisma && npx prisma migrate deploy --schema backend/prisma/schema.prisma
  ```
- **Start Command**: 
  ```
  node backend/dist/server.js
  ```
- Add Environment Variables (see below)
- Click Deploy

### 3. Create Vercel Frontend Service
- Vercel Dashboard → Add Project
- Select GitHub repo
- Root Directory: `frontend`
- Add Environment Variables:
  - `NEXT_PUBLIC_API_URL=https://smart-foods-api.onrender.com/api`
- Click Deploy

---

## Environment Variables

### Backend (Render) - Must Add All

```env
# Database (from Render PostgreSQL)
DATABASE_URL=postgresql://user:pass@host:5432/smartfoods

# JWT (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET=your-32-char-hex-string
JWT_REFRESH_SECRET=another-32-char-hex-string
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Node Environment
NODE_ENV=production

# Cloudinary (sign up at cloudinary.com)
CLOUDINARY_CLOUD_NAME=your-cloud
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret

# Stripe (from stripe.com dashboard, use test keys first)
STRIPE_SECRET_KEY=sk_test_your_key_here

# Email (Gmail with app password)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password-from-google
EMAIL_FROM=noreply@smartfoods.com

# Frontend URL
FRONTEND_URL=https://smart-foods.vercel.app
NEXT_PUBLIC_API_URL=https://smart-foods-api.onrender.com/api
```

### Frontend (Vercel) - Must Add

```env
NEXT_PUBLIC_API_URL=https://smart-foods-api.onrender.com/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

---

## URLs After Deployment

| Service | URL |
|---------|-----|
| Frontend | https://smart-foods.vercel.app |
| Backend API | https://smart-foods-api.onrender.com |
| API Docs | https://smart-foods-api.onrender.com/api-docs |
| Swagger UI | https://smart-foods-api.onrender.com/api-docs |

---

## Default Test Credentials

After seeding database (run in Render Shell):
```bash
npx prisma db seed --schema backend/prisma/schema.prisma
```

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@smartfoods.com | password123 |
| Manager | manager@smartfoods.com | password123 |
| Chef | chef@smartfoods.com | password123 |
| Cashier | cashier@smartfoods.com | password123 |
| Customer | customer@example.com | password123 |

---

## Verification Steps

### Test Backend
```bash
# Swagger docs should load
curl https://smart-foods-api.onrender.com/api-docs

# Try login
curl -X POST https://smart-foods-api.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"customer@example.com","password":"password123"}'
```

### Test Frontend
- Open https://smart-foods.vercel.app
- Should see homepage with menu
- Try login with customer credentials
- Browse products, add to cart, checkout

---

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Backend build fails | Check logs: Render → Logs tab |
| Frontend won't connect | Verify `NEXT_PUBLIC_API_URL` set in Vercel |
| Database empty | Run seed in Render Shell: `npx prisma db seed --schema backend/prisma/schema.prisma` |
| CORS errors | Check `FRONTEND_URL` in Render env vars |
| Port in use locally | Kill: `lsof -i :5000` then `kill -9 <PID>` |

---

## File Reference

- **[RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)** - Detailed backend deployment
- **[VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)** - Detailed frontend deployment  
- **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Complete step-by-step checklist

---

## Support

Need help? Check these:
1. Render Logs: Dashboard → Web Service → Logs
2. Vercel Logs: Dashboard → Deployments → Click deployment
3. Render Docs: https://render.com/docs
4. Vercel Docs: https://vercel.com/docs

---

**Ready? Start with RENDER_DEPLOYMENT.md or VERCEL_DEPLOYMENT.md** ✅
