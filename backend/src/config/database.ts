import mongoose from 'mongoose';

export const connectToDatabase = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookquotes';

    await mongoose.connect(mongoUri);

    console.log('✅ Connected to MongoDB successfully');

    // Handle connection events
    mongoose.connection.on('error', (error) => {
      console.error('❌ MongoDB connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('📡 MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('📡 MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    throw error;
  }
};