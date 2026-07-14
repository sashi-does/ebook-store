# Define Problem Statements

## Problem Statement 1: Generic E-Commerce UI Fatigue
* **Context**: Most book e-commerce websites use standardized, generic templates with standard white pages and blue buttons.
* **Problem**: Customers lack engagement, leading to high exit rates on catalogs and poor average session lengths.
* **Solution**: Implement a premium, visually engaging **Glassmorphic** design utilizing depth-based backdrop filters, custom color presets, and rich hover animations.

## Problem Statement 2: Data Discrepancy & Bad Order Execution
* **Context**: E-commerce platforms frequently accept checkouts for items that have recently gone out of stock.
* **Problem**: This creates transactional overhead, cancellation requirements, and customer dissatisfaction.
* **Solution**: Establish strict atomic inventory validation on the backend order creation controller, verifying stock counts against the database immediately before finalizing orders.

## Problem Statement 3: Review Integrity and Dynamic Score Updates
* **Context**: Star ratings are often updated asynchronously or statically calculated, leaving stale values on product listings.
* **Problem**: Shoppers see mismatched averages, eroding platform trust.
* **Solution**: Build automated review triggers recalculating book average ratings synchronously on every review submission or deletion.
