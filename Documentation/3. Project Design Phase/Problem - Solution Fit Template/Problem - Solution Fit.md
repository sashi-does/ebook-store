# Problem-Solution Fit Matrix

This document maps identified bookstore business problems to specific technical solutions implemented in Book Haven.

| Identified Business Problem | Proposed Technical Solution | Fit Validation |
| :--- | :--- | :--- |
| **Catalog Friction**: Shoppers abandon standard e-commerce pages quickly. | **Glassmorphic Theme**: A modern visual design utilizing dark/light theme options, responsive grids, and clean hover animations. | Verified: Users experience a visually engaging, modern browsing interface. |
| **Out-of-Stock Checkout Errors**: Users complete checkouts for items that have run out of stock during their session. | **Atomic Pre-Checkout Check**: Backend validation decrements inventory counts on the server immediately before finalizing an order. | Verified: Out-of-stock purchases are prevented, returning a clear error to the user. |
| **Stale Catalog Scores**: Book ratings do not update dynamically after customer reviews are posted. | **Dynamic Review Triggers**: Book rating averages are dynamically recalculated and saved on the book object upon review submissions. | Verified: Book cards and detail views display up-to-date star ratings immediately. |
