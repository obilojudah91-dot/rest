# Smart Foods - Architecture & Deployment Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USERS (Web/Mobile)                       │
└─────────────────────┬───────────────────────────────────────────┘
                      │
        ┌─────────────┴──────────────┐
        │                            │
   ┌────▼────┐                 ┌────▼────┐
   │ Vercel  │                 │ Browser │
   │Frontend │                 │Storage  │
   │(Next.js)│                 │(Local)  │
   └────┬────┘                 └─────────┘
        │
        │ HTTP/REST (API Calls)
        │ JWT Token Auth
        │
   ┌────▼──────────────────────────────────┐
   │   Render Backend (Node.js/Express)    │
   │  ┌────────────────────────────────┐  │
   │  │   API Routes & Controllers     │  │
   │  │  • Auth (Login, Register)      │  │
   │  │  • Products (CRUD)             │  │
   │  │  • Orders (Create, Update)     │  │
   │  │  • Reservations                │  │
   │  │  • Payments (Stripe)           │  │
   │  │  • Analytics                   │  │
   │  └────────────────────────────────┘  │
   │  ┌────────────────────────────────┐  │
   │  │   Middleware & Security        │  │
   │  │  • JWT Authentication          │  │
   │  │  • CORS & Helmet               │  │
   │  │  • Rate Limiting               │  │
   │  │  • Input Validation            │  │
   │  └────────────────────────────────┘  │
   └────┬──────────────────────────────────┘
        │
        ├─────────────────┬─────────────────┬─────────────┐
        │                 │                 │             │
   ┌────▼────┐    ┌──────▼──────┐   ┌─────▼─────┐   ┌──▼────┐
   │Render   │    │Cloudinary   │   │Stripe     │   │Gmail   │
   │Database │    │(Images)     │   │(Payments) │   │(Email) │
   │(Postgres)│   │             │   │           │   │        │
   └─────────┘    └─────────────┘   └───────────┘   └────────┘
```

---

## Deployment Architecture

### Production Environment

```
                    User's Browser
                          │
                          │ HTTPS
                          ▼
        ┌─────────────────────────────────────┐
        │  Vercel CDN (Global Edge Locations) │
        │  ┌─────────────────────────────────┐│
        │  │   Smart Foods Frontend          ││
        │  │   (Next.js 14, React 18)        ││
        │  │   URL: smartfoods.vercel.app    ││
        │  └─────────────────────────────────┘│
        └──────────────┬──────────────────────┘
                       │
                       │ HTTP/REST to Backend
                       │
        ┌──────────────▼──────────────────────┐
        │  Render Cloud (Backend Service)     │
        │  ┌────────────────────────────────┐ │
        │  │  Smart Foods API               │ │
        │  │  (Node.js, Express, TypeScript)│ │
        │  │  URL: smartfoods-api.onrender  │ │
        │  │       .com                     │ │
        │  └───┬───────────────────┬────────┘ │
        │      │                   │          │
        │  ┌───▼────┐      ┌──────▼───┐      │
        │  │ Prisma │      │ Winston  │      │
        │  │  ORM   │      │ Logging  │      │
        │  └───┬────┘      └──────────┘      │
        │      │                              │
        └──────┼──────────────────────────────┘
               │
               │ PostgreSQL Connection
               │
        ┌──────▼──────────────────┐
        │  Render PostgreSQL      │
        │  ┌────────────────────┐ │
        │  │  smartfoods-db     │ │
        │  │  (Production Data) │ │
        │  └────────────────────┘ │
        └─────────────────────────┘
```

---

## Data Flow - Order Placement

```
1. User Opens Website
   Browser → Vercel CDN → Serves smartfoods.vercel.app

2. User Browses Menu
   Frontend → Backend API → Database → Returns products list

3. User Adds to Cart
   Local Zustand Store (In-Memory)

4. User Proceeds to Checkout
   Frontend collects: Items, Address, Payment info

5. User Clicks "Place Order"
   Frontend → Backend POST /api/orders
   │
   ├─ Backend validates JWT token
   ├─ Backend validates order data (Zod schema)
   ├─ Backend creates Order record in Database
   ├─ Backend creates OrderItems in Database
   ├─ Backend calls Stripe API for payment
   │  (Stripe charges credit card)
   ├─ Backend creates Payment record
   ├─ Backend sends confirmation email (Gmail)
   ├─ Backend creates notification for admin
   │
   └─ Returns order confirmation to Frontend

6. Frontend Shows Confirmation
   User sees order number and tracking info

7. Chef Gets Notification
   Backend notification system alerts chef
   Chef views order in Chef Dashboard

8. Order Delivered
   Delivery person updates status
   Frontend shows "Delivered" status to customer
   Email sent with delivery confirmation
```

---

## Technology Stack Diagram

### Frontend Stack
```
Next.js 14
├── React 18
├── TypeScript
├── Tailwind CSS (Styling)
├── Framer Motion (Animations)
├── React Hook Form (Forms)
├── Zod (Validation)
├── TanStack Query (Data fetching)
├── Zustand (State management)
└── Lucide React (Icons)
```

### Backend Stack
```
Node.js + Express.js
├── TypeScript (Type safety)
├── Prisma (ORM)
├── PostgreSQL (Database)
├── JWT (Authentication)
├── bcryptjs (Password hashing)
├── Stripe API (Payments)
├── Nodemailer (Emails)
├── Cloudinary API (Images)
├── Winston (Logging)
├── Jest + Supertest (Testing)
└── Swagger/OpenAPI (Documentation)
```

### DevOps & Deployment
```
GitHub
├── Repository hosting
├── GitHub Actions (CI/CD)
├── Version control
└── Pull request workflow

Vercel (Frontend)
├── Automatic deployments
├── Global CDN
├── Serverless functions
└── Environment management

Render (Backend)
├── Container runtime
├── PostgreSQL database
├── Automatic backups
└── Environment management

External Services
├── Cloudinary (Image CDN)
├── Stripe (Payment processing)
└── Gmail (Email service)
```

---

## Database Schema (Simplified)

```
┌─────────────┐      ┌──────────────┐      ┌──────────────┐
│   Users     │◄─────┤  Addresses   │      │   Sessions   │
├─────────────┤      └──────────────┘      └──────────────┘
│ id (PK)     │
│ email       │      ┌──────────────┐      ┌──────────────┐
│ password    │◄─────┤  Orders      │────►│  OrderItems  │
│ role        │      ├──────────────┤      └──────────────┘
│ firstName   │      │ id           │
│ lastName    │      │ userId       │      ┌──────────────┐
│ avatar      │      │ total        │◄─────┤  Payments    │
└─────────────┘      │ status       │      └──────────────┘
       │              │ createdAt    │
       │              └──────────────┘      ┌──────────────┐
       ├──────────────►┌──────────────┐     │  Reviews     │
       │               │ Reservations │     └──────────────┘
       │               └──────────────┘
       │                                    ┌──────────────┐
       ├──────────────►┌──────────────┐     │ Notifications│
       │               │  Favorites   │     └──────────────┘
       │               └──────────────┘
       │
       └──────────────►┌──────────────┐
                       │  Employees   │
                       └──────────────┘
                              │
                              ▼
                       ┌──────────────┐
                       │   Branches   │
                       └──────────────┘

┌──────────────┐      ┌──────────────┐
│  Categories  │◄─────┤   Products   │─────►┌─────────────┐
├──────────────┤      ├──────────────┤      │ Ingredients │
│ id           │      │ id           │      └─────────────┘
│ name         │      │ name         │
│ slug         │      │ price        │      ┌──────────────┐
│ description  │      │ categoryId   │◄─────┤    Coupons   │
└──────────────┘      │ image        │      └──────────────┘
                      │ isAvailable  │
                      │ preparationTime│
                      └──────────────┘

┌──────────────┐      ┌──────────────┐
│   Gallery    │      │   Settings   │
├──────────────┤      ├──────────────┤
│ id           │      │ id           │
│ title        │      │ key          │
│ image        │      │ value        │
│ category     │      │ description  │
└──────────────┘      └──────────────┘
```

---

## API Endpoints Overview

```
Authentication
├── POST   /api/auth/register
├── POST   /api/auth/login
├── POST   /api/auth/refresh
├── POST   /api/auth/logout
└── POST   /api/auth/forgot-password

Users & Profile
├── GET    /api/users/me
├── PUT    /api/users/profile
├── GET    /api/users/:id
└── DELETE /api/users/:id

Products
├── GET    /api/products
├── GET    /api/products/:id
├── POST   /api/products (admin)
├── PUT    /api/products/:id (admin)
└── DELETE /api/products/:id (admin)

Categories
├── GET    /api/categories
├── POST   /api/categories (admin)
└── PUT    /api/categories/:id (admin)

Orders
├── POST   /api/orders
├── GET    /api/orders/:id
├── PUT    /api/orders/:id
├── GET    /api/orders (list)
└── POST   /api/orders/:id/cancel

Reservations
├── POST   /api/reservations
├── GET    /api/reservations
├── GET    /api/reservations/:id
└── PUT    /api/reservations/:id

Payments
├── POST   /api/payments
├── GET    /api/payments/:id
└── POST   /api/payments/:id/refund

Reviews
├── POST   /api/reviews
├── GET    /api/reviews/:productId
└── PUT    /api/reviews/:id

Analytics
├── GET    /api/analytics/sales
├── GET    /api/analytics/orders
└── GET    /api/analytics/customers

Admin
├── GET    /api/admin/users
├── GET    /api/admin/orders
├── GET    /api/admin/analytics
└── POST   /api/admin/settings
```

---

## Security Layers

```
1. Network Layer
   └─ HTTPS/TLS encryption

2. API Layer
   ├─ JWT token authentication
   ├─ CORS validation
   ├─ Rate limiting (express-rate-limit)
   └─ Helmet security headers

3. Validation Layer
   ├─ Zod schema validation
   ├─ Express validator
   └─ Type checking (TypeScript)

4. Database Layer
   ├─ SQL injection prevention (Prisma)
   ├─ Input sanitization
   └─ Encrypted sensitive fields

5. Authentication Layer
   ├─ bcryptjs password hashing
   ├─ JWT token rotation
   ├─ Refresh token rotation
   └─ Role-based access control (RBAC)

6. Logging & Monitoring
   ├─ Winston logging
   ├─ Audit logs
   └─ Error tracking
```

---

## CI/CD Pipeline

```
GitHub Push to main
         │
         ▼
┌──────────────────────┐
│ GitHub Actions CI    │
│ .github/workflows/   │
│  ci.yml              │
└──────────┬───────────┘
           │
     ┌─────┴────────┐
     │              │
  ┌──▼────┐   ┌────▼──┐
  │Backend │   │Frontend│
  │Tests   │   │Check   │
  └──┬─────┘   └────┬───┘
     │              │
  ┌──▼────────────┐ │
  │ Jest Tests    │ │
  │ Supertest     │ │
  │ Coverage      │ │
  └──┬────────────┘ │
     │              │
  ┌──▼────────────┐ │
  │ Prisma DB     │ │
  │ Migrations    │ │
  └──┬────────────┘ │
     │              │
  ┌──▼─────────────────────┐
  │ All Checks Passed ✅    │
  └──┬─────────────────────┘
     │
     ▼
Ready to Deploy to Render & Vercel
```

---

## Performance Metrics

### Target Performance
- **Frontend**: <2s First Contentful Paint (Vercel CDN)
- **API Response**: <200ms average latency
- **Database**: <50ms query response
- **Build Time**: <5 minutes
- **Uptime**: 99.9% availability

### Optimization Strategies
- Edge caching (Vercel)
- Database indexing
- Pagination for large datasets
- Image optimization (Cloudinary)
- Code splitting (Next.js)
- Compression (gzip)
- Redis caching (optional)

---

## Monitoring & Alerts

### What to Monitor
1. **Backend Health**
   - CPU usage
   - Memory usage
   - Database connection pool
   - Error rate

2. **Frontend Performance**
   - Page load time
   - Core Web Vitals
   - Error tracking

3. **Database**
   - Connection count
   - Query performance
   - Disk usage

4. **Third-party Services**
   - Stripe API availability
   - Email delivery rate
   - Image upload success rate

### Alert Thresholds
- High error rate (>5% of requests)
- High latency (>500ms)
- Database unavailable
- Low disk space
- Payment processing failures

---

## Future Scaling

### Phase 1 (MVP - Current)
- Single backend instance on Render
- PostgreSQL database on Render
- Frontend on Vercel
- External services: Stripe, Cloudinary, Gmail

### Phase 2 (Scale)
- Database read replicas for analytics
- Redis caching layer
- Webhook queue system (Redis)
- Background jobs (Bull/Agenda)

### Phase 3 (Advanced)
- Microservices (Orders, Payments, Analytics)
- Kubernetes orchestration
- Multi-region deployment
- Real-time notifications (WebSockets)
- Advanced caching (CloudFlare)

---

## Deployment Comparison

| Aspect | Local | Docker | Vercel/Render |
|--------|-------|--------|--------------|
| **Setup Time** | 15 min | 20 min | 30-45 min |
| **Cost** | Free | Free | Free-7/mo |
| **Uptime** | 99% | 99% | 99.9% |
| **Scaling** | Manual | Manual | Automatic |
| **CDN** | No | No | Yes (Vercel) |
| **Backups** | Manual | Manual | Automatic |
| **SSL/TLS** | Self-signed | Self-signed | Auto |
| **Domain** | localhost | localhost | Custom |

---

## Getting Help

- **[QUICK_DEPLOY.md](QUICK_DEPLOY.md)** - 5-minute TL;DR
- **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Step-by-step guide
- **[EXTERNAL_SERVICES_SETUP.md](EXTERNAL_SERVICES_SETUP.md)** - Service setup guide
- **[RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)** - Backend deployment
- **[VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)** - Frontend deployment
- **Swagger Docs**: `/api-docs` on backend

---

**Ready to deploy? Start with [QUICK_DEPLOY.md](QUICK_DEPLOY.md)** 🚀
