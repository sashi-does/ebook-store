import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    rating: {
      type: Number,
      required: [true, 'Please rate from 1 to 5 stars'],
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: [true, 'Review text is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent user from leaving duplicate reviews on the same book
reviewSchema.index({ userId: 1, bookId: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);
export default Review;
