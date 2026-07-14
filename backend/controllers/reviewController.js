import Review from '../models/Review.js';
import Book from '../models/Book.js';

// @desc    Add review for a book
// @route   POST /api/reviews
// @access  Private
export const addReview = async (req, res, next) => {
  const { bookId, rating, review } = req.body;

  try {
    if (!rating || !review) {
      res.status(400);
      throw new Error('Rating and review text are required');
    }

    const book = await Book.findById(bookId);
    if (!book) {
      res.status(404);
      throw new Error('Book not found');
    }

    // Check if review already exists
    const reviewExists = await Review.findOne({ userId: req.user._id, bookId });
    if (reviewExists) {
      res.status(400);
      throw new Error('You have already reviewed this book');
    }

    const newReview = await Review.create({
      userId: req.user._id,
      bookId,
      rating: Number(rating),
      review,
    });

    // Update book aggregate rating
    const reviews = await Review.find({ bookId });
    book.rating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
    await book.save();

    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
};

// @desc    Get reviews for a book
// @route   GET /api/reviews/:bookId
// @access  Public
export const getBookReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
export const updateReview = async (req, res, next) => {
  const { rating, review } = req.body;

  try {
    const reviewObj = await Review.findById(req.params.id);

    if (reviewObj) {
      if (reviewObj.userId.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('Not authorized to edit this review');
      }

      reviewObj.rating = rating !== undefined ? Number(rating) : reviewObj.rating;
      reviewObj.review = review || reviewObj.review;

      const updatedReview = await reviewObj.save();

      // Recalculate book average rating
      const book = await Book.findById(reviewObj.bookId);
      if (book) {
        const reviews = await Review.find({ bookId: reviewObj.bookId });
        book.rating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
        await book.save();
      }

      res.json(updatedReview);
    } else {
      res.status(404);
      throw new Error('Review not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
export const deleteReview = async (req, res, next) => {
  try {
    const reviewObj = await Review.findById(req.params.id);

    if (reviewObj) {
      if (reviewObj.userId.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
        res.status(403);
        throw new Error('Not authorized to delete this review');
      }

      await Review.deleteOne({ _id: reviewObj._id });

      // Recalculate book average rating
      const book = await Book.findById(reviewObj.bookId);
      if (book) {
        const reviews = await Review.find({ bookId: reviewObj.bookId });
        book.rating = reviews.length > 0 ? reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length : 0;
        await book.save();
      }

      res.json({ message: 'Review successfully deleted' });
    } else {
      res.status(404);
      throw new Error('Review not found');
    }
  } catch (error) {
    next(error);
  }
};
