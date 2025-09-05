const express = require('express');
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const categoryControllers = require('../controllers/categoryControllers');
const { categoryImgResize, uploadCategoryPhoto } = require('../middlewares/uploadImages');

// Route to create a category
router.post(
  '/create-category',
  authMiddleware,         // Ensure user is authenticated
  isAdmin,
  uploadCategoryPhoto.array('images', 5),  // Handle image uploads (limit to 5 images)
  categoryImgResize,                       // Resize uploaded images
  categoryControllers.createCategory       // Create the category
);

// Route to update a category (admin only)
router.put(
  '/update-category/:id',
  authMiddleware,         // Ensure user is authenticated
  isAdmin,                // Ensure user is an admin
  uploadCategoryPhoto.array('images', 5), // Handle image uploads
  // categoryImgResize,         // Resize uploaded images
  categoryControllers.updateCategory // Update the category
);

// Route to delete a category (admin only)
router.delete(
  '/delete-category/:id',
  authMiddleware,   // Ensure user is authenticated
  isAdmin,          // Ensure user is an admin
  categoryControllers.deleteCategory // Delete the category
);

// Route to get a single category by ID
router.get(
  '/get-category/:id',
  categoryControllers.getCategory // Fetch the category by ID
);

// Route to get all categories
router.get(
  '/all-categories',
  categoryControllers.getAllCategories // Fetch all categories
);

module.exports = router;
