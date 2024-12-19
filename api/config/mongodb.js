import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();


const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    
    const conn = await mongoose.connect(mongoURI,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 10000,
    });
    console.log(`Mongoose Connected! `);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); 
  }
};


export default connectDB;


