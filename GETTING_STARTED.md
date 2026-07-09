# 🚀 Smart Foods - Getting Started Guide

Welcome to Smart Foods! This guide shows you exactly what to do next.

---

## ⏱️ Where Do You Want to Go?

### Option 1: Deploy to Production (30-45 minutes) 
**→ Go to [QUICK_DEPLOY.md](QUICK_DEPLOY.md)**

You'll have:
- ✅ Frontend live on Vercel
- ✅ Backend live on Render  
- ✅ Database in the cloud
- ✅ Custom domain option

### Option 2: Run Locally (10 minutes)
**→ See [Local Setup](#local-setup-10-minutes) below**

You'll have:
- ✅ Everything running on your machine
- ✅ Hot reload for development
- ✅ Full access to logs
- ✅ Easy debugging

### Option 3: Understand the Architecture (10 minutes)
**→ Read [ARCHITECTURE.md](ARCHITECTURE.md)**

You'll understand:
- ✅ How the system works
- ✅ Database design
- ✅ Security layers
- ✅ API structure

---

## 🏃 Quick Deploy (Recommended)

### Step 1: Read TL;DR (5 min)
Open [QUICK_DEPLOY.md](QUICK_DEPLOY.md)
- Environment variables needed
- URLs after deployment
- Default credentials
- Troubleshooting

### Step 2: Setup Services (15 min)
Follow [EXTERNAL_SERVICES_SETUP.md](EXTERNAL_SERVICES_SETUP.md)
- [ ] Cloudinary account (5 min)
- [ ] Stripe account (3 min)
- [ ] Gmail app password (5 min)
- [ ] Generate JWT secrets (2 min)

### Step 3: Deploy Backend (15 min)
Follow [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)
- [ ] Create PostgreSQL database (5 min)
- [ ] Create Web Service (5 min)
- [ ] Configure environment variables (3 min)
- [ ] Wait for deployment (2 min)

### Step 4: Deploy Frontend (10 min)
Follow [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)
- [ ] Create Vercel project (3 min)
- [ ] Configure environment (2 min)
- [ ] Deploy (3 min)
- [ ] Verify (2 min)

### Result
```
Frontend: https://smart-foods.vercel.app
Backend:  https://smart-foods-api.onrender.com
Docs:     https://smart-foods-api.onrender.com/api-docs
```

**Total Time**: ~45 minutes | **Cost**: Free

---

## 💻 Local Setup (10 minutes)

### Requirements
- Node.js 18+ ([download](https://nodejs.org))
- Docker ([download](https://docker.com))
- Git ([download](https://git-scm.com))

### Commands

```bash
# 1. Clone the repository (2 min)
git clone <your-repo-url>
cd "rest jo"

# 2. Start database with Docker (2 min)
docker-compose up -d

# 3. Install backend dependencies (2 min)
cd backend
npm install

# 4. Setup database (2 min)
npx prisma generate
npx prisma db push
npm run prisma:seed

# 5. Start backend (terminal 1)
npm run dev
# Backend runs on http://localhost:5000

# 6. Install frontend dependencies (2 min) - Open NEW terminal
cd frontend
npm install

# 7. Start frontend (terminal 2)
npm run dev
# Frontend runs on http://localhost:3000
```

### Access Points
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Swagger Docs**: http://localhost:5000/api-docs
- **Database Studio**: `npx prisma studio`

### Test Login
```
Email: customer@example.com
Password: password123
```

---

## 📖 Read These First

### For Deployment
1. [QUICK_DEPLOY.md](QUICK_DEPLOY.md) - **5 minutes** - TL;DR guide
2. [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - **20 minutes** - Step-by-step
3. [EXTERNAL_SERVICES_SETUP.md](EXTERNAL_SERVICES_SETUP.md) - **15 minutes** - Setup services

### For Backend Deployment
[RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) - Detailed backend instructions

### For Frontend Deployment  
[VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) - Detailed frontend instructions

### For Understanding the System
[ARCHITECTURE.md](ARCHITECTURE.md) - System design and diagrams

---

## 🧪 Running Tests

```bash
cd backend
npm test
```

This runs:
- Unit tests
- Integration tests
- Coverage report
- All test suites in `backend/src/__tests__/`

---

## 🔐 Default Credentials

After running seed script, login with:

| Role | Email | Password |
|------|-------|----------|
| 👨‍💼 Admin | admin@smartfoods.com | password123 |
| 📊 Manager | manager@smartfoods.com | password123 |
| 👨‍🍳 Chef | chef@smartfoods.com | password123 |
| 💳 Cashier | cashier@smartfoods.com | password123 |
| 👤 Customer | customer@example.com | password123 |

---

## 📱 What You Can Do

### As a Customer
- Browse menu with search & filters
- Add items to cart
- Apply coupons
- Checkout and pay
- Make table reservations
- Track order status
- Leave reviews

### As Admin
- Manage products & categories
- Manage orders & reservations
- View analytics
- Manage staff
- Configure settings
- View reports

### As Chef
- View cooking queue
- Update order status
- See order details

### As Manager
- View sales reports
- See customer analytics
- Manage inventory
- View staff performance

---

## 🎯 Common Tasks

### I want to see a live demo
→ Go to [QUICK_DEPLOY.md](QUICK_DEPLOY.md) and follow steps 1-4

### I want to run locally
→ Follow [Local Setup](#local-setup-10-minutes) above

### I want to add my own data
→ Modify [backend/prisma/seed.ts](backend/prisma/seed.ts) and run:
```bash
npm run prisma:seed
```

### I want to change the database
→ Edit [backend/prisma/schema.prisma](backend/prisma/schema.prisma) and run:
```bash
npm run prisma:migrate
```

### I want to create new API routes
→ Add files to:
- `backend/src/routes/yourfeature.routes.ts`
- `backend/src/controllers/yourfeature.controller.ts`

### I want to create new frontend pages
→ Add to `frontend/src/app/` following Next.js App Router structure

---

## 🐛 Something Went Wrong?

### Backend won't start locally
```bash
cd backend
npm install
npm run build
npm start
```

### Frontend won't start locally
```bash
cd frontend
npm install
npm run dev
```

### Database connection error
```bash
docker-compose down
docker-compose up -d
npx prisma db push
```

### Tests failing
```bash
cd backend
npm test -- --no-coverage  # Run without coverage
npm test -- --watch       # Run in watch mode
```

See detailed troubleshooting in:
- [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) → Troubleshooting
- [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) → Troubleshooting
- [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) → Troubleshooting

---

## 📚 Full Documentation

| Document | Topics | Time |
|----------|--------|------|
| [README.md](README.md) | Project overview, tech stack, features | 10 min |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Completion status, what's done | 5 min |
| [QUICK_DEPLOY.md](QUICK_DEPLOY.md) | TL;DR deployment reference | 5 min |
| [ARCHITECTURE.md](ARCHITECTURE.md) | System design, diagrams, data flow | 10 min |
| [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) | Complete step-by-step walkthrough | 20 min |
| [EXTERNAL_SERVICES_SETUP.md](EXTERNAL_SERVICES_SETUP.md) | Cloudinary, Stripe, Gmail setup | 15 min |
| [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) | Backend deployment details | 15 min |
| [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) | Frontend deployment details | 10 min |

---

## ✨ What's Included

### Frontend
- ✅ Next.js 14 with App Router
- ✅ All pages (customer, admin, manager, chef, cashier)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Authentication (login, register)
- ✅ Cart & checkout
- ✅ Order tracking
- ✅ Reservations
- ✅ Reviews & ratings
- ✅ Admin dashboard
- ✅ Analytics

### Backend
- ✅ Express.js REST API
- ✅ 16 API route files
- ✅ 16 controller files
- ✅ JWT authentication
- ✅ Role-based access control
- ✅ Payment processing (Stripe)
- ✅ Email notifications
- ✅ Image uploads (Cloudinary)
- ✅ Comprehensive logging
- ✅ API documentation (Swagger)
- ✅ Tests (Jest + Supertest)

### Database
- ✅ PostgreSQL with Prisma ORM
- ✅ 14+ data models
- ✅ Fully normalized schema
- ✅ Sample seed data
- ✅ Proper relationships

### DevOps
- ✅ Docker & Docker Compose
- ✅ GitHub Actions CI/CD
- ✅ Deployment guides
- ✅ Environment configuration

---

## 🎬 Next Steps

### Right Now (Choose One)

**Option A - Deploy immediately**
1. Open [QUICK_DEPLOY.md](QUICK_DEPLOY.md)
2. Setup external services (Cloudinary, Stripe, Gmail)
3. Deploy to Render (backend) and Vercel (frontend)
4. Done! Live in 45 minutes

**Option B - Run locally first**
1. Follow [Local Setup](#local-setup-10-minutes)
2. Test the application
3. Then decide if you want to deploy

**Option C - Read architecture first**
1. Open [ARCHITECTURE.md](ARCHITECTURE.md)
2. Understand how everything works
3. Then choose Option A or B

---

## 💡 Pro Tips

- **Save credentials**: Write down Cloudinary, Stripe, and Gmail credentials somewhere safe
- **Test locally first**: Always run locally before deploying
- **Use test keys**: Start with Stripe test keys (sk_test_*)
- **Check logs**: Always check Render and Vercel logs if something fails
- **Email can be slow**: Email delivery may take a few minutes
- **Database backups**: Render automatically backs up your database

---

## 🆘 Need Help?

**Deployment issues?**
→ See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) → Troubleshooting

**Backend not working?**
→ See [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) → Troubleshooting

**Frontend not working?**
→ See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) → Troubleshooting

**Service setup questions?**
→ See [EXTERNAL_SERVICES_SETUP.md](EXTERNAL_SERVICES_SETUP.md) → Troubleshooting

---

## 🚀 Let's Go!

### To Deploy Now
**→ Open [QUICK_DEPLOY.md](QUICK_DEPLOY.md)**

### To Run Locally  
**→ Follow [Local Setup](#local-setup-10-minutes) above**

### To Understand First
**→ Read [ARCHITECTURE.md](ARCHITECTURE.md)**

---

**You've got everything you need. Let's ship it! 🎉**
