import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/user.route.js";
import connectCloudinary from "./config/cloudinary.js";

const app = express();
dotenv.config();

connectDB();
connectCloudinary();

const allowedOrigins = [
  "http://localhost:3000", // Local development
  "https://ai-trip-planner-fullstack.vercel.app", // Deployed frontend
];

// CORS Configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow origin
      } else {
        callback(new Error("Not allowed by CORS")); // Block origin
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies and credentials
  })
);

// Enable preflight requests
app.options("*", cors());

app.use(express.json());

// Routes
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API IS WORKING");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("Server is listening on port", port);
});
