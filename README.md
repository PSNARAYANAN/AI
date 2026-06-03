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

## How to Use IronFuel

### 1. Registration & Onboarding
- Open the app and click **Register**.
- After creating an account, you'll be redirected to the **Onboarding** screen.
- Enter your current weight, target weight, height, age, and activity level.
- Select your goal: **Lose Weight** or **Gain Muscle**. This will customize your calorie targets and exercise recommendations.

### 2. Dashboard
- View your daily calorie progress and macro breakdown (Protein, Carbs, Fat).
- Track your **Weight Progress** over time via the interactive line chart.
- Check your **Streak** to stay motivated!

### 3. Food Scanning
- Click **Scan Food** on the dashboard.
- Upload or take a photo of your meal.
- The AI will identify the food and estimate its nutritional value.
- Click **Log Meal** to add it to your daily total.

### 4. Label Analysis
- Click **Scan Label** to analyze a product's nutrition facts.
- Upload a photo of the label.
- View the **Health Score (0-100)** and personalized advice based on your fitness goal.

### 5. Exercise Library
- Navigate to the **Exercises** tab.
- Filter by muscle group (e.g., Chest, Legs, Core).
- Click **View Exercise** to see detailed instructions, common mistakes, and recommended sets/reps.
- Click **Save to My Workout** to keep track of your favorite movements.

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
