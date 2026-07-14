import app from '../backend/app.js';
import connectDB from '../backend/config/db.js';

let cachedConnection = null;

export default async (req, res) => {
  if (!cachedConnection) {
    cachedConnection = connectDB();
  }
  await cachedConnection;
  return app(req, res);
};
