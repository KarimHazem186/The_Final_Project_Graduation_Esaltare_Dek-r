const express = require('express');
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const announcementControllers = require('../controllers/announcementControllers');
const { announcementImgResize, uploadAnnouncementPhoto } = require('../middlewares/uploadImages');

// Route to create an announcement
router.post(
  '/create-announcement',
  authMiddleware,              // Ensure user is authenticated
  isAdmin,                     // Ensure user is an admin
  uploadAnnouncementPhoto.array('images', 5),  // Handle image uploads (limit to 5 images)
  announcementImgResize,       // Resize uploaded images
  announcementControllers.createAnnouncement  // Create the announcement
);

// Route to update an announcement (admin only)
router.put(
  '/update-announcement/:id',
  authMiddleware,              // Ensure user is authenticated
  isAdmin,                     // Ensure user is an admin
  uploadAnnouncementPhoto.array('images', 5),  // Handle image uploads
  announcementControllers.updateAnnouncement  // Update the announcement
);

// Route to delete an announcement (admin only)
router.delete(
  '/delete-announcement/:id',
  authMiddleware,              // Ensure user is authenticated
  isAdmin,                     // Ensure user is an admin
  announcementControllers.deleteAnnouncement  // Delete the announcement
);

// Route to get a single announcement by ID
router.get(
  '/get-announcement/:id',
  announcementControllers.getAnnouncement  // Fetch the announcement by ID
);

// Route to get all announcements
router.get(
  '/all-announcements',
  announcementControllers.getAllAnnouncements  // Fetch all announcements
);

module.exports = router;
