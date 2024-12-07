import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();


const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    
    const conn = await mongoose.connect(mongoURI);
    console.log(`Mongoose Connected! `);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); 
  }
};


export default connectDB;


