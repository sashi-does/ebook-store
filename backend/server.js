import dotenv from 'dotenv';
import connectDB from './config/db.js';
import app from './app.js';

// Configuration
dotenv.config();
const PORT = process.env.PORT || 5001;

// Init DB & Launch Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server launched in ${process.env.NODE_ENV} on port ${PORT}`);
  });
});
