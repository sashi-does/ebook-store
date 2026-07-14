# User Acceptance Testing - Functional Specification Document (FSD)

This document defines the functional boundaries and criteria required for the User Acceptance Testing (UAT) sign-off.

## 1. Acceptance Criteria

### User Identity Services
- Passwords must be hashed in the database and never stored in plain text.
- Protected pages (Checkout, Orders, Profile, Admin Dashboard) must redirect unauthenticated users back to the Login page.

### Cart & Checkout
- Cart item counts must update automatically in the navbar.
- Shoppers must not be allowed to add more units of a book to their cart than are currently available in stock.

### Reviews System
- Users must only be allowed to submit one review per book.
- Posting, updating, or deleting a review must immediately trigger a recalculation of the book's average rating.

### Admin Dashboard
- The dashboard must display real-time analytics KPIs: Revenue, Total Orders, Active Users, and Catalog Inventory count.
- Admins must have full CRUD capabilities for books in the catalog.
- Admins must be able to delete users or update order statuses.
