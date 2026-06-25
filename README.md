# PT. Rayan Smart Kreatif - Web Platform

Premium Digital Agency & Marketplace platform built with Next.js 14, Tailwind CSS v4, Prisma, and NextAuth.js.

## Local Development (SQLite)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment file:
   ```bash
   cp .env.example .env
   # Or just use the default .env with SQLite configuration
   ```

3. Setup Database (SQLite) & Seed:
   ```bash
   npx prisma db push
   node prisma/seed.js
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Access the application:
   - Public: `http://localhost:3000`
   - Admin Panel: `http://localhost:3000/admin` (Login with `admin@rayanweb.id` / `admin123`)

## Production Deployment (PostgreSQL + Docker)

This application is fully containerized and ready for VPS deployment.

1. **Clone the repository on your VPS:**
   ```bash
   git clone git@github.com:mbuzzz/cprayan.git
   cd cprayan
   ```

2. **Prepare Environment Variables:**
   ```bash
   cp .env.production .env
   ```
   *Edit `.env` and set a strong `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`) and your `NEXTAUTH_URL`.*

3. **Switch Prisma Schema to PostgreSQL:**
   Edit `prisma/schema.prisma` and change the provider from `sqlite` to `postgresql`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

4. **Deploy with Docker Compose:**
   ```bash
   docker compose -f docker-compose.prod.yml up -d --build
   ```

5. **Initial Database Setup (First run only):**
   ```bash
   # Run migrations
   docker exec -it rayanweb-app npx prisma migrate deploy
   
   # Seed the database (creates admin user and default settings)
   docker exec -it rayanweb-app node prisma/seed.js
   ```
