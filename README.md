
## Overview

The BLOG-APP is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application developed during Week 7. 
The application demonstrates complete frontend-backend integration with secure authentication, role-based authorization, article management, and cloud deployment.

This project was built to understand real-world full-stack application development, REST API architecture, JWT authentication, state management, and deployment workflows.


# Project Objectives

The main objectives of this project are:

- Build a complete MERN stack application
- Implement secure authentication and authorization
- Create RESTful APIs
- Manage frontend and backend communication
- Handle CRUD operations
- Deploy applications to cloud platforms
- Understand debugging in production environments

---

## Topics Covered

- Frontend and Backend Integration
- REST API Consumption
- Axios for HTTP Requests
- Authentication Flow
- Protected Routes
- Zustand State Management
- Error Handling
- Full Stack Debugging

---

## Technologies Used

### Frontend
- React.js
- Vite
- Axios
- React Router DOM
- Zustand
- Bootstrap

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Mongoose


# Application Architecture

```text
Frontend (React + Vite)
        ↓
Axios API Requests
        ↓
Backend (Node.js + Express)
        ↓
Authentication Middleware
        ↓
MongoDB Database
```

---


# Core Features

# 1. Authentication System

The application uses JWT (JSON Web Token) authentication for secure login sessions.

## Features

- User Registration
- User Login
- Password Encryption
- Token Generation
- Token Verification
- Session Persistence

---

## Registration Workflow

1. User enters registration details
2. Password is encrypted using bcryptjs
3. User data stored in MongoDB
4. Success response returned

---

## Login Workflow

1. User enters credentials
2. Backend validates user
3. JWT token generated
4. Token sent to frontend
5. Frontend stores token
6. Protected routes become accessible

---

