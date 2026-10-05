# VEDBUS Backend API

Production-ready REST API for the **VEDBUS** luxury bus ticketing and spiritual/domestic travel platform. Built with **Express 5**, **TypeScript**, **Prisma ORM**, **PostgreSQL**, and a resilient **Two-Phase Seat Locking Engine** (Redis with automatic in-memory fallback).

---

## 🌟 Key Architecture Features

- **Express 5.2.1 LTS**: Native async error handling with zero promise leak vulnerabilities.
- **TypeScript**: Strictly typed API codebase with zero emit errors.
- **Two-Phase Seat Locking**: Prevents the classic "seat race condition" using atomic Redis `SET NX EX 600` locks, seamlessly backed by an in-memory TTL map if Redis is not provisioned.
- **Dual Compatibility Envelope**: All endpoints return clean `{ success, message, data }` envelopes while preserving legacy/unwrapped properties (`routes`, `packages`, `trips`, `booking`) so both customer frontend and admin panels work seamlessly.
- **Role-Based Security**: Gatekeeper middleware (`authenticateJWT` + `isAdmin`) protecting all administrative functions under `/api/admin/*`.
- **Production Hardened**: `helmet` security headers, `cors` whitelisting, `compression`, `express-rate-limit`, and robust graceful shutdown handlers for `SIGINT` / `SIGTERM`.

---

## 📁 Project Structure

```
BACKEND/
├── prisma/
│   └── schema.prisma         # Database schema & relations (PostgreSQL)
├── src/
│   ├── middleware/
│   │   └── auth.ts           # authenticateJWT & isAdmin middlewares
│   ├── routes/
│   │   ├── admin/            # Admin sub-routes (/api/admin/*)
│   │   │   ├── analytics.ts
│   │   │   ├── bookings.ts
│   │   │   ├── dashboard.ts
│   │   │   ├── fleet.ts
│   │   │   ├── index.ts      # Unified admin router mounting & auth gate
│   │   │   ├── offers.ts
│   │   │   ├── packageBookings.ts
│   │   │   ├── packages.ts
│   │   │   ├── routes.ts
│   │   │   ├── support.ts
│   │   │   ├── trips.ts
│   │   │   └── users.ts
│   │   ├── auth.ts           # /api/auth (register, login, refresh, logout)
│   │   ├── bookings.ts       # /api/bookings (hold, release, seats, book, history)
│   │   ├── buses.ts          # /api/buses (trips search, route lookup)
│   │   ├── homepage.ts       # /api/homepage (aggregated catalog data)
│   │   ├── offers.ts         # /api/offers (promo codes & discounts)
│   │   ├── packages.ts       # /api/packages (spiritual, domestic, international)
│   │   ├── support.ts        # /api/support (ticket submissions & status)
│   │   ├── tracking.ts       # /api/tracking (bus GPS & route milestones)
│   │   └── users.ts          # /api/users (profile & booking history)
│   ├── utils/
│   │   ├── prisma.ts         # Singleton Prisma client instance
│   │   ├── response.ts       # Standardized response envelopes (sendSuccess, sendError)
│   │   └── seatLock.ts       # Two-phase seat locking engine (Redis + In-Memory)
│   ├── seed.ts               # Database seeder (admin, users, buses, routes, packages)
│   └── server.ts             # Main application entry point & lifecycle manager
├── .env.example
├── package.json
└── tsconfig.json
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: `v20.x` or higher
- **PostgreSQL**: `v14.x` or higher
- **Redis** (optional): `v6.x` or higher (falls back to memory if absent)

### 2. Environment Setup
Copy `.env.example` to `.env` in the `BACKEND` directory:

```bash
cp .env.example .env
```

Configure your `.env` variables:
```ini
NODE_ENV=development
PORT=5000

# PostgreSQL Connection
DATABASE_URL="postgresql://postgres:password@localhost:5432/vedbus?schema=public"

# JWT Secrets (min 64 chars in production)
JWT_ACCESS_SECRET=your_super_secret_access_key_min_64_chars_here
JWT_REFRESH_SECRET=your_super_secret_refresh_key_min_64_chars_here
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# CORS Allowed Origins
FRONTEND_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# Optional Redis Distributed Cache & Locks
REDIS_URL=redis://localhost:6379
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Database Setup & Seeding
Push the Prisma schema to your database and generate the Prisma Client:
```bash
npx prisma generate
npx prisma db push
```

Run the seed script to populate test data (Admin, Users, 5 Bus Routes, 5 Luxury Fleet Buses, 12 Tour Packages, Promo Offers):
```bash
npm run seed
```

### 5. Start Development Server
```bash
npm run dev
```
The server will start on `http://localhost:5000` with hot-reloading via `tsx watch`.

### 6. Production Build & Execution
```bash
npm run build
npm start
```

---

## 🔒 The Concurrency Seat Locking Engine

To prevent two users from booking the same seat simultaneously:

### 1. Temporary Hold (`POST /api/bookings/hold`)
- Client generates or receives a `lockHolderId` (e.g. session UUID or user ID).
- Calls `POST /api/bookings/hold` with `{ tripId, seatIds: ["U1", "U2"], lockHolderId }`.
- Backend executes atomic lock creation:
  - **With Redis**: Executes `SET seat_lock:{tripId}:{seatId} {lockHolderId} NX EX 600` via a multi pipeline.
  - **Without Redis**: Stores in an in-memory lock registry with a 600-second `setTimeout`.
- If any seat is already locked by another user, the entire operation is rolled back and returns `409 Conflict`.

### 2. Real-Time Seat Map (`GET /api/bookings/seats?tripId=...`)
- Queries the PostgreSQL database for all `CONFIRMED` or `PENDING` bookings for the trip.
- Concurrently queries the Seat Locking Engine for active holds.
- Returns a merged list:
  ```json
  {
    "bookedSeats": ["L1", "L2"],
    "heldSeats": ["U1"]
  }
  ```

### 3. Booking Confirmation (`POST /api/bookings`)
- Verifies that the client providing `lockHolderId` holds valid locks for all requested seats.
- Runs a PostgreSQL transaction:
  - Re-verifies no conflicting `CONFIRMED` booking exists.
  - Inserts booking and passenger records.
- On transaction commit, releases the temporary locks immediately (`releaseSeats`).
- If checkout is abandoned, the locks automatically self-expire after 10 minutes with zero background cron jobs needed.

---

## 📡 API Endpoints Overview

### Health Check
- `GET /health` — Returns server uptime and real-time database connection status.

### Authentication (`/api/auth`)
- `POST /register` — Register a new customer.
- `POST /login` — Login user or admin, returns `accessToken` and `refreshToken`.
- `POST /refresh` — Refresh expired access token.
- `POST /logout` — Invalidate user session.
- `POST /forgot-password` — Password reset trigger.

### Bookings & Seats (`/api/bookings`)
- `POST /hold` — Lock seats for 10 minutes during checkout.
- `POST /release` — Release held seats manually on checkout exit.
- `GET /seats?tripId=...` — Real-time merged map of booked and held seats.
- `POST /` — Finalize booking (requires hold verification or atomic lock).
- `GET /my-bookings` — Customer's personal bookings list (Authenticated).
- `GET /:id` — Detailed booking itinerary and ticket information.

### Catalog & Search
- `GET /api/buses/routes` — Search available trips by origin, destination, and date.
- `GET /api/buses/routes/:id` — Single route details with stop points.
- `GET /api/packages` — Luxury travel packages (Spiritual, Domestic, International).
- `GET /api/packages/:slug` — Single package itinerary details.
- `GET /api/homepage/data` — Bundled payload for homepage (offers, featured routes, packages).
- `GET /api/offers` — Active promo codes and discounts.
- `GET /api/tracking/:pnr` — Live bus tracking progress and status.

### Admin Portal (`/api/admin/*`)
*Guarded by `authenticateJWT` + `isAdmin` (requires `role: ADMIN` in JWT)*

- `GET /dashboard` — High-level KPI metrics, 30-day revenue chart, recent bookings.
- `GET /users`, `GET /users/:id`, `PATCH /users/:id/status`, `DELETE /users/:id` — User dossier & management.
- `GET /bookings`, `PATCH /bookings/:id/status`, `DELETE /bookings/:id` — Bus reservations control.
- `GET /package-bookings`, `PATCH /package-bookings/:id/status` — Holiday packages reservations.
- `GET /trips`, `POST /trips`, `PATCH /trips/:id`, `DELETE /trips/:id` — Schedule and pricing management.
- `GET /fleet`, `POST /fleet`, `PATCH /fleet/:id`, `DELETE /fleet/:id` — Bus inventory and maintenance.
- `GET /routes`, `POST /routes`, `PATCH /routes/:id`, `DELETE /routes/:id` — Intercity transit lines.
- `GET /packages`, `POST /packages`, `PATCH /packages/:id`, `DELETE /packages/:id` — Tour packages catalog.
- `GET /offers`, `POST /offers`, `PATCH /offers/:id`, `DELETE /offers/:id` — Promo campaigns.
- `GET /support`, `PATCH /support/:id` — Customer support desk tickets.
- `GET /analytics` — Revenue breakdown, occupancy analytics, top route performance.

---

## 🔑 Default Seed Credentials

After running `npm run seed`:

- **Admin Portal**:
  - URL: `http://localhost:3001`
  - Email: `admin@vedbus.com`
  - Password: `Password@123`
- **Customer Account**:
  - URL: `http://localhost:3000`
  - Email: `rahul.sharma@example.com`
  - Password: `Password@123`
