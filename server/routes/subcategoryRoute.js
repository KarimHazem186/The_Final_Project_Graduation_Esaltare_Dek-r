const express = require('express');
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const subcategoryControllers = require('../controllers/subcategoryControllers');
const { subcategoryImgResize, uploadSubcategoryPhoto } = require('../middlewares/uploadImages');
// Route to create a subcategory
router.post(
  '/create-subcategory',
  authMiddleware,            // Ensure user is authenticated
  isAdmin,                   // Ensure user is an admin
  uploadSubcategoryPhoto.array('images', 5), // Handle image uploads (limit to 5 images)
  subcategoryImgResize,      // Resize uploaded images
  subcategoryControllers.createSubcategory // Create the subcategory
);

// Route to update a subcategory (admin only)
router.put(
  '/update-subcategory/:id',
  authMiddleware,            // Ensure user is authenticated
  isAdmin,                   // Ensure user is an admin
  uploadSubcategoryPhoto.array('images', 5), // Handle image uploads
  // subcategoryImgResize,    // Resize uploaded images
  subcategoryControllers.updateSubcategory // Update the subcategory
);

// Route to delete a subcategory (admin only)
router.delete(
  '/delete-subcategory/:id',
  authMiddleware,            // Ensure user is authenticated
  isAdmin,                   // Ensure user is an admin
  subcategoryControllers.deleteSubcategory // Delete the subcategory
);

// Route to get a single subcategory by ID
router.get(
  '/get-subcategory/:id',
  subcategoryControllers.getSubcategory // Fetch the subcategory by ID
);

// Route to get all subcategories
router.get(
  '/all-subcategories',
  subcategoryControllers.getAllSubcategories // Fetch all subcategories
);

module.exports = router;
