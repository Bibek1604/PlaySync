const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  // If no URI or placeholder values are present, skip connecting in non-production.
  if (!uri || uri.includes('<') || uri.includes('password') || uri.includes('yourpassword')) {
    console.warn('MongoDB URI not set or looks like a placeholder. Skipping DB connection.');
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    // In production we should fail fast; in development, don't exit so the server can run.
    if (process.env.NODE_ENV === 'production') process.exit(1);
  }
};

module.exports = connectDB;
