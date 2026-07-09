# Smart Foods - Restaurant Management System

A comprehensive full-stack restaurant management system with customer ordering, reservations, and role-based dashboards for admin, chef, cashier, and manager roles.

## Tech Stack

### Frontend
- **Next.js 14** (App Router) - React framework with server-side rendering
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **TanStack Query** - Data fetching and caching
- **Zustand** - State management
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **Prisma ORM** - Database ORM
- **PostgreSQL** - Relational database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Stripe** - Payment processing
- **Nodemailer** - Email service
- **Cloudinary** - Image storage
- **Winston** - Logging
- **Swagger/OpenAPI** - API documentation

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **GitHub Actions** - CI/CD pipeline
- **Nginx** - Reverse proxy

## Features

### Customer Features
- Browse menu with categories and filters
- Search products by name or description
- Add items to cart with quantity management
- Apply coupon codes for discounts
- Create and manage orders (delivery/pickup)
- Make table reservations
- Track order status in real-time
- Manage user profile and addresses
- Leave product reviews
- View order history
- Favorite products

### Admin Features
- User management (view, update, deactivate)
- Product management (CRUD operations)
- Category management
- Order management (view all, update status)
- Payment processing and refunds
- Reservation management
- Coupon code management
- Inventory management
- Gallery management
- System settings
- Analytics dashboard (sales, orders, customers)
- Branch management
- Employee management

### Chef Features
- View cooking queue
- Update order status
- View order details

### Cashier Features
- Point of Sale (POS) system
- Process in-person orders
- Handle payments

### Manager Features
- Sales reports
- Order analytics
- Customer analytics
- Product performance
- Staff management
- Inventory oversight

## Project Structure

```
rest jo/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema
│   │   └── seed.ts             # Database seed script
│   ├── src/
│   │   ├── controllers/        # Route controllers
│   │   ├── middleware/         # Express middleware
│   │   ├── routes/            # API routes
│   │   ├── utils/             # Utility functions
│   │   └── server.ts          # Express server entry
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── jest.config.js
├── frontend/
│   ├── src/
│   │   ├── app/               # Next.js App Router pages
│   │   ├── components/        # React components
│   │   ├── lib/               # Utility functions
│   │   └── store/             # Zustand stores
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── next.config.js
│   └── Dockerfile
├── docker-compose.yml         # Docker services
├── .env.example               # Environment variables template
├── .gitignore
└── README.md
```

## 📚 Documentation

### Quick Links
| Document | Time | Purpose |
|----------|------|---------|
| [QUICK_DEPLOY.md](QUICK_DEPLOY.md) | 5 min | TL;DR deployment reference |
| [ARCHITECTURE.md](ARCHITECTURE.md) | 10 min | System design and diagrams |
| [EXTERNAL_SERVICES_SETUP.md](EXTERNAL_SERVICES_SETUP.md) | 30 min | Setup Cloudinary, Stripe, Gmail |
| [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) | 45 min | Complete deployment walkthrough |
| [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) | 20 min | Backend deployment details |
| [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) | 15 min | Frontend deployment details |

## Quick Start

### 🚀 Deploy to Vercel & Render (Production)

1. **Read** [QUICK_DEPLOY.md](QUICK_DEPLOY.md)
2. **Setup external services** with [EXTERNAL_SERVICES_SETUP.md](EXTERNAL_SERVICES_SETUP.md)
3. **Deploy backend** following [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)
4. **Deploy frontend** following [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)
5. **Use checklist** in [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)

**Estimated time**: 30-45 minutes | **Cost**: Free tier available

### 🏃 Local Development

1. **Install** dependencies (see [Installation](#installation))
2. **Run** with Docker or npm scripts
3. **Test** with `npm test` in backend

**Estimated time**: 15 minutes | **Cost**: Free

---

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Docker and Docker Compose (optional)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd "rest jo"
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

4. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/smartfoods"

# JWT
JWT_SECRET="your-jwt-secret"
JWT_REFRESH_SECRET="your-refresh-secret"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Stripe
STRIPE_SECRET_KEY="your-stripe-secret"
STRIPE_PUBLISHABLE_KEY="your-stripe-publishable"

# Email
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
EMAIL_FROM="noreply@smartfoods.com"

# Redis
REDIS_URL="redis://localhost:6379"

# Frontend
FRONTEND_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
```

5. **Set up the database**
```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

### Running the Application

#### Development Mode

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

#### Production Mode with Docker

1. **Build and start all services**
```bash
docker-compose up -d
```

2. **View logs**
```bash
docker-compose logs -f
```

3. **Stop services**
```bash
docker-compose down
```

## API Documentation

Once the backend is running, access the Swagger documentation at:
```
http://localhost:5000/api-docs
```

## Database Schema

The application uses Prisma with PostgreSQL. Key models include:

- **User** - Customer and staff accounts
- **Product** - Menu items
- **Category** - Product categories
- **Order** - Customer orders
- **OrderItem** - Items in an order
- **Payment** - Payment transactions
- **Reservation** - Table reservations
- **Review** - Product reviews
- **Ingredient** - Inventory items
- **Coupon** - Discount codes
- **Notification** - User notifications
- **Branch** - Restaurant locations
- **Employee** - Staff information
- **Gallery** - Image gallery
- **Settings** - System configuration

## Authentication

The system uses JWT (JSON Web Tokens) for authentication:

1. **Login**: Returns access token (15min) and refresh token (7d)
2. **Token Refresh**: Use refresh token to get new access token
3. **Protected Routes**: Include access token in Authorization header
4. **Role-Based Access**: Middleware checks user roles for authorization

## Default Users

After running the seed script, these users are available:

| Role | Email | Password |
|------|-------|----------|
| Administrator | admin@smartfoods.com | password123 |
| Manager | manager@smartfoods.com | password123 |
| Chef | chef@smartfoods.com | password123 |
| Cashier | cashier@smartfoods.com | password123 |
| Customer | customer@example.com | password123 |

## Testing

```bash
# Backend unit and integration tests
cd backend
npm test
```

Frontend tests are not configured yet.

## Deployment

### Quick Links
- **[Render Backend Deployment Guide](RENDER_DEPLOYMENT.md)** - Deploy backend to Render with PostgreSQL
- **[Vercel Frontend Deployment Guide](VERCEL_DEPLOYMENT.md)** - Deploy frontend to Vercel

### Render Backend Deployment

For detailed instructions, see [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md).

Quick summary:
1. Create PostgreSQL database on Render
2. Create Web Service on Render
3. Connect GitHub repository
4. Configure environment variables (JWT_SECRET, DATABASE_URL, email, Stripe, Cloudinary keys)
5. Set build command: `npm install --prefix backend && npx prisma generate --schema backend/prisma/schema.prisma && npx prisma migrate deploy --schema backend/prisma/schema.prisma`
6. Set start command: `node backend/dist/server.js`
7. Deploy and seed database

**Result**: Backend available at `https://smart-foods-api.onrender.com`

### Vercel Frontend Deployment

For detailed instructions, see [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md).

Quick summary:
1. Create Vercel project
2. Select `frontend` as root directory
3. Set environment variable `NEXT_PUBLIC_API_URL` to your Render backend URL
4. Deploy (automatic on every push to main)
5. Update `FRONTEND_URL` on Render to your Vercel domain

**Result**: Frontend available at `https://smart-foods.vercel.app`

### Local Docker Deployment
```bash
docker-compose up -d
```

This runs both backend and frontend with PostgreSQL locally.

## Security Features

- Helmet.js for HTTP headers
- CORS configuration
- Rate limiting
- Input validation with express-validator
- Password hashing with bcrypt
- JWT token authentication
- Role-based access control (RBAC)
- SQL injection prevention via Prisma
- XSS protection
- CSRF protection

## Performance Optimization

- Database indexing
- Pagination for large datasets
- Image optimization with Next.js
- Lazy loading
- Caching with Redis
- Compression with gzip
- CDN for static assets

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@smartfoods.com or open an issue in the repository.
