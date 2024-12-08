import express from "express";
import saveTrip from "../controllers/tripController"; // Import the controller function

const router = express.Router();

router.post("/save-trip", saveTrip);

export default router;
