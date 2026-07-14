import express from 'express';
import {
  placeOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
  getDashboardStats,
  getAllUsers,
  deleteUser,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, placeOrder).get(protect, getMyOrders);
router.route('/all').get(protect, admin, getAllOrders);
router.route('/dashboard').get(protect, admin, getDashboardStats);
router.route('/users').get(protect, admin, getAllUsers);
router.route('/users/:id').delete(protect, admin, deleteUser);
router.route('/:id').get(protect, getOrderById).put(protect, admin, updateOrderStatus);

export default router;
