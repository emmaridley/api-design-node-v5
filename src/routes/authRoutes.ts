import { Router } from "express";

const router = Router();

router.post("/register", (req, res) => {
  // Handle user registration
  res.status(201).json({ message: "User registered successfully" });
});

router.post("/login", (req, res) => {
  // Handle user login
  res.status(200).json({ message: "User logged in successfully" });
});

export default router;
