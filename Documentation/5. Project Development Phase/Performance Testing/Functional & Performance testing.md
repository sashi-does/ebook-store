# Functional & Performance Testing Document

This document outlines the testing strategies used to verify Book Haven's features and overall performance.

## 1. Functional Verification Plan

### User Authentication Tests
- **Test User Registration**: Register a new user and verify that database records store the password as an encrypted hash.
- **Duplicate Registration Check**: Attempt to register a user with an existing email and verify that the API returns a `400 Bad Request` status code.
- **Login Session Control**: Log in and verify that the server sends a valid JSON Web Token in both the HTTP cookie and the JSON response payload.

### Catalog Search & Filter Tests
- **Keyword Match**: Search for "Mockingbird" and verify that the query correctly returns *To Kill a Mockingbird*.
- **Multi-Attribute Filter**: Filter by "Genre: Fiction" and "Price Max: $15" and verify that only matching books are returned.
- **Sort Logic**: Sort by "Price Low to High" and verify that book lists are returned in ascending order.

## 2. API Endpoint Testing Suite
We verified all backend API endpoints using manual curl requests and automated execution validation:
- `POST /api/auth/register` (Verify user credentials creation)
- `POST /api/auth/login` (Verify authentication response)
- `GET /api/books` (Verify search, sort, and pagination query params)
- `POST /api/orders` (Verify inventory updates and order creation)
