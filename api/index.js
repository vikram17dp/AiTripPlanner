import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/user.route.js";
import connectCloudinary from './config/cloudinary.js'

const app = express();
app.use(express.json());
dotenv.config();
connectDB();
connectCloudinary();

const port = process.env.PORT || 4000;

app.use(cors({
    origin: [
      "http://localhost:3000",
      "https://ai-trip-planner-fullstack.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization"
    ],
  }));


app.use("/api/user", userRouter);

app.get('/',(req,res)=>{
    res.send('API IS WORKING')
})

app.listen(port,()=>{
    console.log("server is listing on",port);
})

