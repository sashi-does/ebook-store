# Book Haven - Full Stack MERN Bookstore

Book Haven is a production-quality, full-stack online bookstore application built using the MERN stack (MongoDB, Express, React, Node.js). It features premium, visual-first glassmorphic UI components, robust authentication/authorization, and comprehensive catalog and order management.

---

## Demo Video

[![Book Haven Walkthrough Video](https://img.shields.io/badge/Demo%20Video-Play-red?style=for-the-badge&logo=youtube)](https://youtu.be/gPRYjQPGLZs)

---

## Table of Contents
1. [Demo Video](#demo-video)
2. [Key Features](#key-features)
3. [Technology Stack](#technology-stack)
4. [Project Directory Structure](#project-directory-structure)
5. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Environment Variables Configuration](#environment-variables-configuration)
   - [Installation](#installation)
   - [Seeding Data](#seeding-data)
   - [Running the Application](#running-the-application)
6. [Database Schema Overview](#database-schema-overview)
7. [API Endpoints](#api-endpoints)

---

## Key Features
- **User Authentication & Authorization:** Stateless JWT authentication with role-based access control (User and Admin).
- **Responsive Catalog Management:** Dynamic browsing, search, and filtering of catalog entries.
- **Glassmorphic UI Design:** A beautiful and premium look featuring glassmorphic designs, responsive grids, and modern layout structures.
- **Shopping Cart & Checkout:** Seamless add-to-cart operations, checkout processing, and real-time validation.
- **Order Tracking:** Customers can view history and track order statuses, while admins can manage order states.
- **Review System:** Customers can leave ratings and comments on books (enforced unique constraint per book per customer account).
- **Admin Dashboard:** Full CRUD management portal for books, users, and orders.

---

## Technology Stack
- **Frontend:** React.js (v18+), Vite, React Router DOM, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Object modeling via Mongoose)
- **Security:** Hashed passwords using bcryptjs, JWT for auth, Cookie-Parser for secure session management

---

## Project Directory Structure

```text
ebook-store/
├── backend/                  # Express API Server
│   ├── config/               # Database configurations
│   ├── controllers/          # Request handler functions
│   ├── middleware/           # Authentication and error middlewares
│   ├── models/               # Mongoose schemas (User, Book, Order, Review)
│   ├── routes/               # API endpoint route definitions
│   ├── utils/                # Helper utilities & data seeding script
│   ├── server.js             # Server entrypoint
│   └── app.js                # Express app setup
├── frontend/                 # React SPA (Vite)
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # Authentication and Cart contexts
│   │   ├── pages/            # Application views (Dashboard, Cart, Catalog, etc.)
│   │   ├── App.jsx           # Main routing and App component
│   │   └── main.jsx          # Vite React entrypoint
│   └── vite.config.js        # Vite configurations
└── Documentation/            # Project specification phases & reports
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or a local MongoDB database

### Environment Variables Configuration

Create a `.env` file inside the `backend` directory matching the following configuration options:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_signing_secret
NODE_ENV=development
```

### Installation

To install all dependencies for the workspace, backend, and frontend at once, run:

```bash
npm run install-all
```

Alternatively, you can install them separately:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### Seeding Data
To populate the database with mock books and an admin/user account for testing, run the seed script from the backend directory:

```bash
cd backend
npm run seed
```

### Running the Application

To launch both the backend server and the frontend client concurrently, run the following command from the root workspace directory:

```bash
npm run dev
```

- **Backend server** runs on [http://localhost:5001](http://localhost:5001)
- **Frontend application** runs on [http://localhost:5173](http://localhost:5173) (or next available port)

---

## Database Schema Overview
- **Users:** Handles customer profiles, bcrypt-hashed passwords, and role flags (`User` vs `Admin`).
- **Books:** Contains catalog properties (title, author, price, inventory levels, ratings).
- **Orders:** Maps customer accounts to items purchased, pricing totals, and delivery progress status (`Processing`, `Shipped`, `Delivered`, `Cancelled`).
- **Reviews:** Enforces scoring scale (1–5) and includes comments, with a unique key index ensuring only one review per book per user.

---

## Deployment

This project is configured to deploy the frontend and backend separately on Vercel.

### 1. Backend Deployment (Vercel Serverless)
- Create a new project on Vercel and import your repository.
- Under **Project Settings**, change the **Root Directory** to `backend`.
- Add the following **Environment Variables**:
  - `MONGO_URI`: Your MongoDB connection string.
  - `JWT_SECRET`: Secret key for JWT signing.
  - `NODE_ENV`: `production`
- Vercel automatically deploys the entrypoint `/api` (configured via [vercel.json](file:///Users/sashi/Downloads/ebook-store-main/backend/vercel.json)) as a Serverless Function.

### 2. Frontend Deployment (Vercel Static/SPA)
- Create another new project on Vercel and import your repository.
- Under **Project Settings**, change the **Root Directory** to `frontend`.
- Add the following **Environment Variables**:
  - `VITE_API_BASE_URL`: The URL of your deployed backend (e.g. `https://ebook-store-backend-xi.vercel.app`).
- Deploy the project. The configuration in [frontend/vercel.json](file:///Users/sashi/Downloads/ebook-store-main/frontend/vercel.json) handles client-side React Router rewrites automatically.

