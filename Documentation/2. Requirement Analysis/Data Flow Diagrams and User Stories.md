# Data Flow Diagrams and User Stories

## Data Flow Diagram (DFD - Level 1)

```
[ User Browser ] --(Credentials)--> [ Auth API Router ] --(Verify/Hash)--> [ User Collection ]
[ User Browser ] --(Search Query)--> [ Books API Router ] --(Index Match)--> [ Books Collection ]
[ User Browser ] --(Order Payload)--> [ Order API Router ] --(Decrement Stock)--> [ Orders Collection ]
```

## User Stories

### User Story 1: Book Discovery
* **As a** regular visitor,
* **I want to** filter books by genre and sort by rating,
* **So that** I can easily find the most highly-rated literature in my favorite category.

### User Story 2: Secure Checkout
* **As an** authenticated reader,
* **I want to** place an order with my saved address details,
* **So that** I can complete my purchase quickly without re-typing information.

### User Story 3: Admin Catalog Management
* **As an** administrator,
* **I want to** edit book details and adjust stock levels directly,
* **So that** my inventory stays aligned with current availability.
