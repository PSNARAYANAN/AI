# IronFuel - AI-Powered Fitness App

IronFuel is a mobile-first fitness application designed for weight loss and muscle gain. It uses Gemini AI for food scanning and label analysis.

## Features
- **Custom Auth**: Secure email/password login with JWT.
- **Onboarding**: Personalized goals and TDEE-based tracking.
- **Gym Library**: 60+ exercises with filters and detailed instructions.
- **AI Food Scanner**: Identify food and estimate macros from photos.
- **AI Label Scanner**: Analyze nutrition labels and get a health score.
- **Dashboard**: Track daily calories and macros.

## Tech Stack
- **Frontend**: React, Vite, TailwindCSS, Recharts, TanStack Query.
- **Backend**: Node.js, Express, Prisma ORM.
- **Database**: PostgreSQL.
- **AI**: Google Gemini 1.5 Flash.

## Setup Instructions

### Backend
1. Navigate to `/backend`.
2. Install dependencies: `npm install`.
3. Create a `.env` file based on `.env.example`.
4. Run Prisma migrations: `npx prisma migrate dev`.
5. Seed the database: `npm run seed`.
6. Start the server: `npm run dev`.

### Frontend
1. Navigate to `/frontend`.
2. Install dependencies: `npm install`.
3. Create a `.env` file based on `.env.example`.
4. Start the app: `npm run dev`.

## Environment Variables

### Backend (`/backend/.env`)
```
DATABASE_URL="postgresql://user:pass@host:port/db"
JWT_SECRET="your_secret"
GEMINI_API_KEY="your_gemini_api_key"
FRONTEND_URL="http://localhost:5173"
PORT=3000
```

### Frontend (`/frontend/.env`)
```
VITE_API_URL="http://localhost:3000/api"
```
