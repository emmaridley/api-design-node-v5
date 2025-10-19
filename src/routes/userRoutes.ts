import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  // Get all users
  res.status(200).json({ message: "Get all users" });
});

router.get("/:id", (req, res) => {
  // Get a single user by ID
  res.status(200).json({ message: `Get user with ID: ${req.params.id}` });
});

router.post("/", (req, res) => {
  // Create a new user
  res.status(201).json({ message: "User created successfully" });
});

router.delete("/:id", (req, res) => {
  // Delete a user by ID
  res.status(200).json({ message: `User with ID: ${req.params.id} deleted successfully` });
});

router.put("/:id", (req, res) => {
  // Update a user by ID
  res.status(200).json({ message: `User with ID: ${req.params.id} updated successfully` });
});

export default router;
