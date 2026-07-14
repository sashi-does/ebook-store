import app from '../app.js';
import connectDB from '../config/db.js';

let cachedConnection = null;

export default async (req, res) => {
  if (!cachedConnection) {
    cachedConnection = await connectDB();
  }
  await cachedConnection;
  return app(req, res);
};
