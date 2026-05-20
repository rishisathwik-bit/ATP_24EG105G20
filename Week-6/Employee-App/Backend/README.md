# Employee App Backend

This directory contains the backend API server for the Employee App.
It is built with Express, Mongoose, and CORS, and exposes CRUD endpoints for employee records.

## Prerequisites

- Node.js 18+ installed
- MongoDB connection string

## Setup

1. Open a terminal inside `Employee-App/Backend`.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file or set the environment variables in your shell:

```bash
DB_URL="your-mongodb-connection-string"
PORT=5000
```

4. Start the server:

```bash
node server.js
```

5. The server will listen on `http://localhost:5000` by default.

## API Endpoints

The backend exposes the following REST endpoints under `/emp-api`:

- `POST /emp-api/emp`
  - Create a new employee
  - Request body must be JSON
- `GET /emp-api/emp`
  - Fetch all employees
- `PUT /emp-api/emp/:id`
  - Update an existing employee by MongoDB `_id`
- `DELETE /emp-api/emp/:id`
  - Delete an employee by MongoDB `_id`

## Employee Schema

The employee model includes:

- `name` (String, required)
- `email` (String, required, unique)
- `mobile` (Number, required)
- `designation` (String, required)
- `companyName` (String, required)

## Notes

- The backend uses `type: module` in `package.json`, so `node server.js` must be run in a Node version that supports ES modules.
- To connect the frontend to this backend locally, update the API base URLs in the frontend components to `http://localhost:5000/emp-api/emp`.
