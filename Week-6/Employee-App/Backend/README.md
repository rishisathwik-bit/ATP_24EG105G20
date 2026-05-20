# Blog App Backend

Express + MongoDB backend for the Blog App. This service exposes role-based APIs for users, authors, and admins, and supports secure authentication, Cloudinary image uploads, and cookie-based JWT sessions.

## Features
- User registration and login
- JWT authentication stored in secure cookies
- Role-based access for `USER`, `AUTHOR`, and `ADMIN`
- Cloudinary profile image uploads via `multer`
- MongoDB data persistence with Mongoose
- CORS configuration for frontend clients

## Tech Stack
- Node.js (ES modules)
- Express 5
- MongoDB / Mongoose
- bcryptjs
- jsonwebtoken
- multer
- cloudinary
- dotenv

## Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `Backend` with:
   ```env
   PORT=5000
   DB_URL=<mongodb-connection-string>
   SECRET_KEY=<jwt-secret>
   CLOUDINARY_CLOUD_NAME=<cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<cloudinary-api-key>
   CLOUDINARY_API_SECRET=<cloudinary-api-secret>
   ```
4. Run the backend server:
   ```bash
   npm run dev
   ```
5. The server will start on the port defined in `PORT`.

## API Endpoints
- `POST /auth/users` — register a new user or author
- `POST /auth/login` — login and receive cookie-based JWT
- `GET /auth/logout` — clear auth cookie
- `GET /auth/check-auth` — verify current user session
- `PUT /auth/password` — change password
- `USE /user-api` — user-specific routes
- `USE /author-api` — author-specific routes
- `USE /admin-api` — admin-specific routes

## Environment Notes
- CORS is configured to allow `http://localhost:5173`, `http://localhost:5174`, and Vercel app origins.
- The backend uses `process.env.SECRET_KEY` to sign JWT tokens.
- Cloudinary uploads require valid Cloudinary credentials.

## Run Scripts
- `npm run dev` — run with `.env` variables
- `npm start` — start the server with `node server.js`
