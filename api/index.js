import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/user.route.js";

const app = express();
app.use(express.json());
dotenv.config();
connectDB();
connectCloudinary();

const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/user", userRouter);

app.get('/',(req,res)=>{
    res.send('API IS WORKING')
})
app.listen(port,()=>{
    console.log("server is listing on",port);
    
})