import express from 'express';
import { addReview, getBookReviews, updateReview, deleteReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addReview);
router.route('/:bookId').get(getBookReviews);
router.route('/:id').put(protect, updateReview).delete(protect, deleteReview);

export default router;
