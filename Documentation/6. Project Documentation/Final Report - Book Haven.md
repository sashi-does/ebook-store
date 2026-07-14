# Book Haven - Project Final Report

**Prepared By:** Diddy Srinivas Puneeth

This document compiles the design specifications, code implementation statuses, and database schemas for the Book Haven online bookstore project.

## 1. Executive Summary
Book Haven is a production-quality e-commerce platform built using the MERN stack. Designed around premium, visual-first glassmorphic components, it offers functional tools for browsing catalog entries, executing secure checkouts, tracking user orders, and providing administrators with full resource management portals.

## 2. Technical Stack and Configuration
- **Backend API**: Node.js & Express.js. Sessions are authenticated using stateless JSON Web Tokens.
- **Database**: Cloud MongoDB Atlas mapping four collections (`Users`, `Books`, `Orders`, and `Reviews`).
- **Frontend SPA**: React.js (v18+) bundled using Vite. Navigation routes utilize React Router DOM v6.

## 3. Database Collection Layouts
- **Users**: Defines customer accounts, access passwords (hashed using Bcrypt), and role specifications (User or Admin).
- **Books**: Contains book catalog fields, prices, stock levels, and average customer ratings.
- **Orders**: Tracks user orders, items, quantities, and statuses (Processing, Shipped, Delivered, Cancelled).
- **Reviews**: Enforces a unique review constraint per book per customer account.
