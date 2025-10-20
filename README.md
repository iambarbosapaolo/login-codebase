# MERN + Next.js Auth Starter

Structure:
- backend/  -> Express + MongoDB API (routes: /api/auth)
- frontend/ -> Next.js + Tailwind UI (login page + protected homepage)

Quick start (locally):
1. Start MongoDB (e.g. mongod)
2. Backend:
   - cd backend
   - copy .env.example to .env and fill values
   - npm install
   - npm run dev
3. Frontend:
   - cd frontend
   - npm install
   - npm run dev
4. Open http://localhost:3000 and test the login. Use /api/auth/register to create a user or register via API client.