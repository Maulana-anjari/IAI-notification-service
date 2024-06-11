import mongoose from 'mongoose';

const connectDB = async (callback) => {
  try {
    await mongoose.connect(process.env.URL_MONGODB);
    console.log('MongoDB connected');
    callback();
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1)
  }
};

export default connectDB;
