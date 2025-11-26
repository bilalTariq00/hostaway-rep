import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load .env.local first, then .env
dotenv.config({ path: '.env.local' });
dotenv.config();

const MONGO_DB_URI = process.env.MONGO_DB_URI;

if (!MONGO_DB_URI) {
  console.error('❌ MONGO_DB_URI is not defined in environment variables');
  process.exit(1);
}

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log('✅ MongoDB already connected');
    return;
  }

  try {
    const conn = await mongoose.connect(MONGO_DB_URI, {
      // These options are recommended for newer versions of MongoDB
      // Remove if using older MongoDB versions
    });

    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
      isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
      isConnected = false;
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
      isConnected = true;
    });

  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    isConnected = false;
    // Don't exit process in production, let it retry
    if (process.env.NODE_ENV === 'development') {
      process.exit(1);
    }
  }
};

export default connectDB;

