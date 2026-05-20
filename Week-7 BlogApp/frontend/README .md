# Blog App Frontend

React + Vite frontend for the Blog App. The UI supports public browsing, registration, login, role-based protected pages, author article management, and admin dashboards.

## Features
- React 19 with Vite
- Tailwind CSS integration
- React Router v7 with protected routes
- Axios-based backend API integration
- Role-specific pages for `USER`, `AUTHOR`, and `ADMIN`
- Toast notifications with `react-hot-toast`

## Setup
1. Open a terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open the URL shown in the terminal, usually `http://localhost:5173`.

## Configuration
- The frontend uses `src/config.js` to determine the backend API base URL.
- It defaults to `http://localhost:4000` if `VITE_API_URL` is not set.
- To override the API host, create a `.env` file in `frontend` with:
  ```env
  VITE_API_URL=http://localhost:<backend-port>
  ```

## Recommended Local Setup
- Run the backend server first.
- Use `http://localhost:5173` to access the frontend.
- Ensure the backend CORS configuration allows the frontend origin.

## Run Scripts
- `npm run dev` — start Vite dev server
- `npm run build` — build production assets
- `npm run preview` — preview build output locally
- `npm run lint` — run ESLint checks
