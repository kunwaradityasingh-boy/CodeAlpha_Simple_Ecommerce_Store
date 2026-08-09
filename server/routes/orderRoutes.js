const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  createOrder,
  getMyOrders,
  getAllOrders,
} = require("../controllers/orderController");

// Create Order
router.post("/", protect, createOrder);

// Get Logged-in User Orders
router.get("/myorders", protect, getMyOrders);

// Get All Orders
router.get("/", protect, getAllOrders);

module.exports = router;
