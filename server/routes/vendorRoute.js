const express = require('express');
const { getMyProducts, addProduct,createProduct } = require('../controllers/vendorControllers');
const { authMiddleware, isVendor } = require('../middlewares/authMiddleware');
const { checkSubscription } = require('../middlewares/checkSubscription');
// const { authMiddleware, isVendor } = require('../middleware/authMiddleware');
const router = express.Router();

router.get("/products", authMiddleware, isVendor, getMyProducts);
router.post("/products", authMiddleware, isVendor, addProduct);
router.post("/upload-product", authMiddleware, isVendor, checkSubscription, createProduct);

module.exports = router;


/*
const express = require('express');
const router = express.Router();
const { authMiddleware, isAdmin, isVendor } = require('../middleware/authMiddleware');
const {
  getAllVendors,
  getVendorById,
  createVendor,
  updateVendorSubscription,
  updateProductStatus,
} = require('../controllers/vendorController');

// Admin routes for vendor management
router.get('/', authMiddleware, isAdmin, getAllVendors); // Get all vendors
router.get('/:id', authMiddleware, isAdmin, getVendorById); // Get vendor by ID

router.post('/', authMiddleware, isAdmin, createVendor); // Admin can create new vendor

// Admin can update vendor subscription status
router.put('/:id/subscription', authMiddleware, isAdmin, updateVendorSubscription);

// Vendor can update the status of their products
router.put('/product-status', authMiddleware, isVendor, updateProductStatus);

module.exports = router;

*/
