const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { getAllVendors, updateVendorApproval } = require("../controllers/adminVendorController");

// GET all vendors
router.get("/vendors", protect, adminOnly, getAllVendors);

// PATCH approve/reject vendor
router.patch("/vendors/:id/approval", protect, adminOnly, updateVendorApproval);

module.exports = router;
