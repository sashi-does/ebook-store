# Solution Requirements Document

## Functional Requirements
1. **User Identity Services**:
   - Secure password storage utilizing `bcryptjs` hashing.
   - Stateless JWT creation and validation on all restricted routes.
   - Profile management with support for custom shipping addresses.

2. **Catalog Services**:
   - Live query searching on titles and authors.
   - Filters for genre, minimum ratings, and price ranges.
   - Interactive review posting, editing, and deletion.

3. **Cart & Orders**:
   - Local storage synchronization for shopping carts.
   - Real-time stock availability verification prior to final order creation.
   - Customer order histories and tracking capabilities.

4. **Administration**:
   - Live analytics: Total revenue, total orders, catalog inventory count, and active users.
   - Catalog management: Add, edit, or delete books.
   - Order management: Update statuses to "Shipped" or "Delivered".
   - User account moderation.
