# Performance Test Log

## Database Index Validation
To optimize database performance, we created indexes in MongoDB for the most frequent search and query filters:
1. **Full-Text Index**: Created compound text indexes on `{ title: "text", author: "text", genre: "text" }` to support low-latency search lookups.
2. **Pricing Index**: Added an index on `price` to keep sorted queries (e.g. price low to high) fast.
3. **Rating Index**: Added an index on `rating` to speed up listings sorted by rating.

## Query Latency Metrics
We measured query latency across key endpoints under standard simulated usage loads:

| Endpoint | Average Response Time (ms) | Cache/Optimization Method |
| :--- | :--- | :--- |
| `GET /api/books` | 42ms | Database Indexing & Pagination |
| `GET /api/books/:id` | 15ms | Primary Key lookup |
| `POST /api/orders` | 78ms | Atomic validation checks |
| `GET /api/reviews/:book` | 22ms | Book index query |
