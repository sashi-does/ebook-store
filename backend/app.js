import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

// Express Setup
const app = express();

// Custom Cookie parser helper since we use import ES module
import parser from 'cookie-parser';

app.use(cors({
  origin: true, // Allow frontend origin
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(parser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/', (req, res) => {
  res.send('Book Haven Bookstore API is running...');
});

// Fallback Middleware
app.use(notFound);
app.use(errorHandler);

export default app;
