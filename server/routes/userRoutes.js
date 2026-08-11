const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

// Register Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

// Get Current Logged-in User
router.get("/me", protect, getMe);

module.exports = router;
