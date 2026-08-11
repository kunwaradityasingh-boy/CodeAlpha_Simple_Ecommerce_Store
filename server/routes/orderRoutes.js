const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

// Create Order
router.post("/", protect, createOrder);

// Get Logged-in User Orders
router.get("/myorders", protect, getMyOrders);

// Update Order Status
router.patch("/:id/status", protect, admin, updateOrderStatus);

// Get All Orders
router.get("/", protect, admin, getAllOrders);

// Delete Order
router.delete("/:id", protect, admin, deleteOrder);

module.exports = router;
