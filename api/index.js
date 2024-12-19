import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/user.route.js";
import connectCloudinary from './config/cloudinary.js'

const app = express();
dotenv.config();

// Move CORS before any middleware or route handlers
app.use(cors({
  origin: ["http://localhost:3000", "https://ai-trip-planner-fullstack.vercel.app"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: true,
  optionsSuccessStatus: 204
}));

// Add OPTIONS handling for preflight requests
app.options('*', cors());

app.use(express.json());
connectDB();
connectCloudinary();

// Routes
app.use("/api/user", userRouter);

app.get('/', (req, res) => {
  res.send('API IS WORKING')
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("Server is listening on port", port);
});

// Export for Vercel
export default app;

