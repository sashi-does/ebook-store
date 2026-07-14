# UAT Execution & Report Submission

## 1. Execution Log

### UAT Case 1: End-to-End Customer Purchase
- **Steps**:
  1. Register a new customer account.
  2. Navigate to the catalog page, search for "1984", and add it to the cart.
  3. Go to the cart, update the quantity to 2, and verify that the subtotal is calculated correctly.
  4. Proceed to checkout, fill in the shipping details, and place the order.
- **Expected Outcome**: The order should be successfully created, the cart should be cleared, and *1984*'s stock level should decrease by 2 in the database.
- **UAT Status**: **PASS**

### UAT Case 2: Out of Stock Check
- **Steps**:
  1. Add a book with only 1 remaining unit to the cart.
  2. In a separate tab, log in as Admin and change the book's stock to 0.
  3. Return to the customer tab and try to check out.
- **Expected Outcome**: The checkout should fail, showing a clear error message that the stock level is insufficient.
- **UAT Status**: **PASS**

### UAT Case 3: Admin Status Updates
- **Steps**:
  1. Log in as an Admin and navigate to the order management page.
  2. Find the customer order from UAT Case 1.
  3. Click **Ship**, and then click **Deliver**.
- **Expected Outcome**: The order status should update from "Processing" to "Shipped" and finally to "Delivered", reflecting immediately in both the Admin list and the Customer's order history.
- **UAT Status**: **PASS**
