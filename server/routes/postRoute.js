const express = require('express');
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const postControllers = require('../controllers/postControllers');
const { postImgResize, uploadPostPhoto } = require('../middlewares/uploadImages');

// Route to create a post
router.post(
  '/create-post',
  authMiddleware,         // Ensure user is authenticated
  isAdmin,                // Ensure user is an admin
  uploadPostPhoto.array('images', 5),  // Handle image uploads (limit to 5 images)
  postImgResize,                       // Resize uploaded images
  postControllers.createPost           // Create the post
);

// Route to update a post (admin only)
router.put(
  '/update-post/:id',
  authMiddleware,         // Ensure user is authenticated
  isAdmin,                // Ensure user is an admin
  uploadPostPhoto.array('images', 5), // Handle image uploads
  postControllers.updatePost // Update the post
);

// Route to delete a post (admin only)
router.delete(
  '/delete-post/:id',
  authMiddleware,   // Ensure user is authenticated
  isAdmin,          // Ensure user is an admin
  postControllers.deletePost // Delete the post
);

// Route to get a single post by ID
router.get(
  '/get-post/:id',
  postControllers.getPost // Fetch the post by ID
);

// Route to get all posts
router.get(
  '/all-posts',
  postControllers.getAllPosts // Fetch all posts
);

module.exports = router;
