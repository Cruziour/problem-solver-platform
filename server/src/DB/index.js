import mongoose from 'mongoose';
import { DB_Name } from '../constant.js';

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
