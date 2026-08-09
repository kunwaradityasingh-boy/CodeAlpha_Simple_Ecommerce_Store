const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Get All Products
router.get("/", getProducts);

// Get Product by ID
router.get("/:id", getProductById);

// Create Product
router.post("/", protect, createProduct);

// Update Product
router.put("/:id", protect, updateProduct);

// Delete Product
router.delete("/:id", protect, deleteProduct);

module.exports = router;
