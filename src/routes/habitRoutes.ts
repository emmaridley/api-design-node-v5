import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  // Get all habits
    res.status(200).json({ message: "Get all habits" });
});

router.get("/:id", (req, res) => {
  // Get a single habit by ID
  res.status(200).json({ message: `Get habit with ID: ${req.params.id}` });
});

router.post("/", (req, res) => {
  // Create a new habit
    res.status(201).json({ message: "Habit created successfully" });
});

router.delete("/:id", (req, res) => {
  // Delete a habit by ID
  res.status(200).json({ message: `Habit with ID: ${req.params.id} deleted successfully` });
});

router.post("/:id/complete", (req, res) => {
    // Mark a habit as complete
    res.status(200).json({ message: `Habit with ID: ${req.params.id} marked as complete` });
});

export default router;
