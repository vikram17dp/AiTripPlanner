import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/user.route.js";
import connectCloudinary from './config/cloudinary.js'

const app = express();
dotenv.config();
connectDB();
connectCloudinary();

const allowedOrigins = [
  "http://localhost:3000",
  "https://ai-trip-planner-fullstack.vercel.app"
];

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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

// Body parser middleware
app.use(express.json());

// Routes
app.use("/api/user", userRouter);

app.get('/', (req, res) => {
  res.send('API IS WORKING')
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("Server is listening on port", port);
});

