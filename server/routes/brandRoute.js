// const express = require('express');
// const router = express.Router()
// const {isAdmin, authMiddleware} = require("../middlewares/authMiddleware")
// const brandControllers = require('../controllers/brandControllers');
// const { brandImgResize, uploadBrandPhoto } = require('../middlewares/uploadImages');
// router.post(
//     '/create-brand',
//     uploadBrandPhoto.array('images', 5),
//     brandImgResize,
//     brandControllers.createBrand
//   );
// router.put('/update-brand/:id',authMiddleware,isAdmin,brandControllers.updateBrand);
// router.delete('/delete-brand/:id',authMiddleware,isAdmin,brandControllers.deleteBrand);
// router.get('/get-brand/:id',brandControllers.getBrand);
// router.get('/all-brands',brandControllers.getAllBrand);

// module.exports = router;



const express = require('express');
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const brandControllers = require('../controllers/brandControllers');
const { brandImgResize, uploadBrandPhoto } = require('../middlewares/uploadImages');

// Route to create a brand
router.post(
  '/create-brand',
  authMiddleware,         // Ensure user is authenticated
  isAdmin,
  uploadBrandPhoto.array('images', 5),  // Handle image uploads (limit to 5 images)
  brandImgResize,                       // Resize uploaded images
  brandControllers.createBrand          // Create the brand
);

// Route to update a brand (admin only)
router.put(
  '/update-brand/:id',
  authMiddleware,         // Ensure user is authenticated
  isAdmin,                // Ensure user is an admin
  uploadBrandPhoto.array('images', 5), // Handle image uploads
  // brandImgResize,         // Resize uploaded images
  brandControllers.updateBrand // Update the brand
);


// Route to delete a brand (admin only)
router.delete(
  '/delete-brand/:id',
  authMiddleware,   // Ensure user is authenticated
  isAdmin,          // Ensure user is an admin
  brandControllers.deleteBrand // Delete the brand
);

// Route to get a single brand by ID
router.get(
  '/get-brand/:id',
  brandControllers.getBrand // Fetch the brand by ID
);

// Route to get all brands
router.get(
  '/all-brands',
  brandControllers.getAllBrand // Fetch all brands
);

module.exports = router;
