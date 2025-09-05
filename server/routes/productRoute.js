const express = require('express');
const router = express.Router();
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const productControllers = require('../controllers/productControllers');
const { uploadProductPhoto, productImgResize } = require('../middlewares/uploadImages');

// Route to create a product
router.post(
  '/create-product',
  authMiddleware,
  isAdmin,
  uploadProductPhoto.array('images', 5), // Upload up to 5 images
  productImgResize,                      // Resize product images
  productControllers.createProduct
);

// Route to update a product
router.put(
  '/update-product/:id',
  authMiddleware,
  isAdmin,
  uploadProductPhoto.array('images', 5),
  // productImgResize, // Optional: add if needed
  productControllers.updateProduct
);

// Route to delete a product
router.delete(
  '/delete-product/:id',
  authMiddleware,
  isAdmin,
  productControllers.deleteProduct
);

// Route to get a single product by ID
router.get(
  '/get-product/:id',
  productControllers.getProduct
);

// Route to get all products
router.get(
  '/all-products',
  productControllers.getAllProducts
);


router.get('/new-arrivals', productControllers.getNewArrivals);


module.exports = router;
