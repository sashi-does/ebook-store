import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // Read the JWT from the cookie or Authorization header
  if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');
      if (!req.user) {
        res.status(401);
        return next(new Error('Not authorized, user not found'));
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      next(new Error('Not authorized, token validation failed'));
    }
  } else {
    res.status(401);
    next(new Error('Not authorized, no session token provided'));
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(403);
    next(new Error('Forbidden: Admin access required'));
  }
};
