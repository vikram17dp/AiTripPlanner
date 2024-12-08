import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  location: { type: String, required: true },
  noOfDays: { type: Number, required: true },
  budget: { type: String, required: true },
  People: { type: String, required: true },
  aiResponse: { type: String },
  imageUrl: {
    type: String,
    default: "https://www.example.com/default-trip-image.jpg", 
  },
  createdAt: { type: Date, default: Date.now },
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
