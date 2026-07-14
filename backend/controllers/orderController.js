import Order from '../models/Order.js';
import Book from '../models/Book.js';
import User from '../models/User.js';

// @desc    Place a new order
// @route   POST /api/orders
// @access  Private
export const placeOrder = async (req, res, next) => {
  const { orderItems, shippingAddress, totalPrice } = req.body;

  try {
    if (!orderItems || orderItems.length === 0) {
      res.status(400);
      throw new Error('No items in the order');
    }

    // Double check inventory and update stock
    for (const item of orderItems) {
      const book = await Book.findById(item.bookId);
      if (!book) {
        res.status(404);
        throw new Error(`Book with ID ${item.bookId} not found`);
      }
      if (book.stock < item.quantity) {
        res.status(400);
        throw new Error(`Insufficient stock for "${book.title}". Available: ${book.stock}`);
      }
      // Decrement stock
      book.stock -= item.quantity;
      await book.save();
    }

    const order = new Order({
      userId: req.user._id,
      books: orderItems,
      totalPrice,
      shippingAddress,
      paymentStatus: 'Completed', // Simulating successful immediate checkouts
      orderStatus: 'Processing',
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user's orders
// @route   GET /api/orders
// @access  Private
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Get order details by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId', 'name email');

    if (order) {
      // Allow only the owner or an admin to access the order details
      if (order.userId._id.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
        res.status(403);
        throw new Error('Not authorized to view this order');
      }
      res.json(order);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private/Admin
export const updateOrderStatus = async (req, res, next) => {
  const { orderStatus, paymentStatus } = req.body;

  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.orderStatus = orderStatus || order.orderStatus;
      order.paymentStatus = paymentStatus || order.paymentStatus;

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (Admin only)
// @route   GET /api/orders/all
// @access  Private/Admin
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard metrics (Admin only)
// @route   GET /api/orders/dashboard
// @access  Private/Admin
export const getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'User' });
    const totalBooks = await Book.countDocuments({});
    const totalOrders = await Order.countDocuments({});
    
    // Revenue calculator
    const revenueData = await Order.aggregate([
      { $match: { paymentStatus: 'Completed' } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);
    const revenue = revenueData.length > 0 ? revenueData[0].total : 0;

    const recentOrders = await Order.find({})
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalUsers,
      totalBooks,
      totalOrders,
      revenue,
      recentOrders,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users (Admin only)
// @route   GET /api/orders/users
// @access  Private/Admin
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user (Admin only)
// @route   DELETE /api/orders/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.role === 'Admin') {
        res.status(400);
        throw new Error('Administrator users cannot be deleted');
      }
      await User.deleteOne({ _id: user._id });
      res.json({ message: 'User successfully deleted' });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};
