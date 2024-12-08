import Trip from "../models/Trip";
const saveTrip = async (req, res) => {
  try {
    const { userEmail, destination, days, budget, persons, aiResponse } = req.body;

   
    if (!userEmail || !destination || !days || !budget || !persons || !aiResponse) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTrip = new Trip({
      userEmail,
      location: destination,
      noOfDays: days,
      budget,
      People: persons,
      aiResponse,
    });

    await newTrip.save();

    return res.status(201).json({ message: "Trip saved successfully.", trip: newTrip });
  } catch (error) {
    console.error("Error saving trip:", error);
    return res.status(500).json({ message: "Failed to save trip. Please try again." });
  }
};

export default saveTrip;
