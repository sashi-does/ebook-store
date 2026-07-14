# Solution Architecture & Database Schemas

## Database Schema Structure

### Users Schema
- `name`: String (Required, trimmed)
- `email`: String (Required, unique, lowercase, validated email format)
- `password`: String (Required, minlength 6)
- `role`: String (Enum: 'User', 'Admin', Default: 'User')
- `address`: String (Default: empty string)
- `phone`: String (Default: empty string)
- `timestamps`: Automatic (`createdAt`, `updatedAt`)

### Books Schema
- `title`: String (Required, indexed)
- `author`: String (Required, indexed)
- `genre`: String (Required, indexed)
- `description`: String (Required)
- `ISBN`: String (Required, unique)
- `price`: Number (Required, min 0)
- `stock`: Number (Required, min 0, default 10)
- `rating`: Number (Default 0, min 0, max 5)
- `image`: String (Default placeholder image)
- `timestamps`: Automatic

### Orders Schema
- `userId`: ObjectId (References `User` model)
- `books`: Array of embedded documents:
  - `bookId`: ObjectId (References `Book` model)
  - `title`: String
  - `price`: Number
  - `quantity`: Number
- `totalPrice`: Number (Required, min 0)
- `paymentStatus`: String (Enum: 'Pending', 'Completed', 'Failed')
- `orderStatus`: String (Enum: 'Processing', 'Shipped', 'Delivered', 'Cancelled')
- `shippingAddress`: String (Required)
- `timestamps`: Automatic

### Reviews Schema
- `userId`: ObjectId (References `User` model)
- `bookId`: ObjectId (References `Book` model)
- `rating`: Number (Required, 1 to 5)
- `review`: String (Required)
- **Unique Constraint**: Compound index `{ userId: 1, bookId: 1 }` prevents duplicate user reviews.
