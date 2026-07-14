import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide book title'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Please provide author'],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, 'Please provide genre'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide description'],
    },
    ISBN: {
      type: String,
      required: [true, 'Please provide ISBN'],
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please provide price'],
      min: [0, 'Price must be positive'],
    },
    stock: {
      type: Number,
      required: [true, 'Please provide stock level'],
      min: [0, 'Stock cannot be negative'],
      default: 10,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster search and filtering
bookSchema.index({ title: 'text', author: 'text', genre: 'text' });
bookSchema.index({ price: 1 });
bookSchema.index({ rating: -1 });

const Book = mongoose.model('Book', bookSchema);
export default Book;
