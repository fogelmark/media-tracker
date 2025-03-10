import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || '';

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log('Already connected to the database.');
    return;
  }

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Successfully connected to MongoDB.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error((error as Error).message);
  }
};
