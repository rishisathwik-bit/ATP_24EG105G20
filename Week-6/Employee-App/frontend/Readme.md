# Employee App Frontend

This directory contains the React frontend for the Employee App. It is built with Vite, React 19, Tailwind CSS, React Router, React Hook Form, and Zustand.

## Features

- Create new employees
- List existing employees
- View individual employee details
- Edit employee details
- Delete employees

## Prerequisites

- Node.js 18+ installed
- `npm` available

## Setup

1. Open a terminal inside `Employee-App/frontend`.
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the local URL shown by Vite, typically `http://localhost:5173`.

## Available Scripts

- `npm run dev` — start the development server
- `npm run build` — build the production assets
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint on the frontend source

## Application Routes

The frontend uses React Router and exposes these routes:

- `/` — Home page
- `/create-emp` — Create employee form
- `/list` — Employee list page
- `/employee` — View employee details
- `/edit-emp` — Edit employee page

## Backend Connection

The frontend currently points to a deployed backend URL at `https://employee-reactapp.onrender.com/emp-api/emp`.

To use a local backend instead, update the API URLs in the following files:

- `src/components/CreateEmp.jsx`
- `src/components/ListOfEmps.jsx`
- `src/components/EditEmployee.jsx`

Change the base URL to:

```text
http://localhost:5000/emp-api/emp
```

## Notes

- The frontend expects JSON responses from the backend.
- If you are running the backend locally, make sure it is started before using the app.
