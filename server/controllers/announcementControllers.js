const announcementModel = require("../models/announcementModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

// Create a new Announcement
const createAnnouncement = asyncHandler(async (req, res) => {
    const { announcementTitle, percentage, priority, status } = req.body;

    // Validate required fields
    if (!announcementTitle || percentage === undefined || !priority) {
        return res.status(400).json({
            message: "Please provide announcementTitle, percentage, priority.",
        });
    }

    try {
        const announcementExists = await announcementModel.findOne({ announcementTitle });
        if (announcementExists) {
            return res.status(409).json({ message: "Announcement title already exists." });
        }

        // If there are images in the request (uploaded via multer), save them after resizing
        const images = req.body.images || [];

        // Create announcement document
        const newAnnouncement = await announcementModel.create({
            announcementTitle,
            percentage ,
            priority,
            status: status || 'Active',
            images: images.length > 0 ? images : [],
        });

        res.status(201).json(newAnnouncement);
    } catch (error) {
        res.status(500).json({
            message: "Error creating announcement.",
            error: error.message,
        });
    }
});

// Update Announcement
// const updateAnnouncement = asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     validateMongoDbId(id); // Validate MongoDB ObjectId

//     try {
//         // Find the announcement in the database
//         const announcement = await announcementModel.findById(id);
//         if (!announcement) {
//             return res.status(404).json({ message: 'Announcement not found.' });
//         }

//         // If there are new images in the request, resize and process them
//         if (req.files && req.files.length > 0) {
//             const updatedImages = [];

//             // Process each image (resize, store paths, etc.)
//             await Promise.all(
//                 req.files.map(async (file) => {
//                     const resizedName = `resized-${Date.now()}-${file.filename}`;
//                     const outputPath = path.join(__dirname, `../public/images/announcements/${resizedName}`);

//                     // Process image resizing with sharp
//                     await sharp(file.path)
//                         .resize(600, 600)
//                         .toFormat('jpeg')
//                         .jpeg({ quality: 90 })
//                         .toFile(outputPath);

//                     // After resizing, delete the original file from temporary storage
//                     fs.unlink(file.path, (err) => {
//                         if (err) {
//                             console.error(`Error deleting original file: ${err.message}`);
//                         }
//                     });

//                     updatedImages.push({
//                         public_id: resizedName,
//                         url: `/images/announcements/${resizedName}`,
//                     });
//                 })
//             );

//             // Optionally, delete old images
//             if (announcement.images && announcement.images.length > 0) {
//                 await Promise.all(
//                     announcement.images.map(async (img) => {
//                         const filePath = path.join(__dirname, `../public/images/announcements/${img.public_id}`);
//                         try {
//                             await fs.promises.unlink(filePath); // Delete the old image file
//                         } catch (err) {
//                             console.error(`Error deleting old image: ${err.message}`);
//                         }
//                     })
//                 );
//             }

//             // Update the announcement with new image(s)
//             announcement.images = updatedImages;
//         }

//         // Update other fields of the announcement
//         const updatedAnnouncement = await announcementModel.findByIdAndUpdate(
//             id,
//             {
//                 ...req.body, // Update fields from the request
//                 images: announcement.images, // Attach processed images
//             },
//             { new: true }
//         );

//         return res.status(200).json(updatedAnnouncement); // Return the updated announcement
//     } catch (error) {
//         return res.status(500).json({
//             message: 'Error updating announcement',
//             error: error.message,
//         });
//     }
// });

const updateAnnouncement = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
  
    try {
      const announcement = await announcementModel.findById(id);
      if (!announcement) {
        return res.status(404).json({ message: 'Announcement not found.' });
      }
  
      // Parse old images from JSON string (if provided)
      let oldImages = [];
      if (req.body.oldImages) {
        try {
          oldImages = JSON.parse(req.body.oldImages);
        } catch (err) {
          return res.status(400).json({ message: 'Invalid oldImages format.' });
        }
      }
  
      // Process new uploaded images
      const newImages = [];
      if (req.files && req.files.length > 0) {
        await Promise.all(
          req.files.map(async (file) => {
            const resizedName = `resized-${Date.now()}-${file.filename}`;
            const outputPath = path.join(__dirname, `../public/images/announcements/${resizedName}`);
  
            await sharp(file.path)
              .resize(600, 600)
              .toFormat('jpeg')
              .jpeg({ quality: 90 })
              .toFile(outputPath);
  
            fs.unlink(file.path, (err) => {
              if (err) console.error(`Error deleting original file: ${err.message}`);
            });
  
            newImages.push({
              public_id: resizedName,
              url: `/images/announcements/${resizedName}`,
            });
          })
        );
      }
  
      // Delete removed old images
      const removedOldImages = announcement.images.filter(
        (img) => !oldImages.some((old) => old.public_id === img.public_id)
      );
  
      await Promise.all(
        removedOldImages.map(async (img) => {
          const filePath = path.join(__dirname, `../public/images/announcements/${img.public_id}`);
          try {
            await fs.promises.unlink(filePath);
          } catch (err) {
            console.error(`Error deleting old image: ${err.message}`);
          }
        })
      );
  
      // Combine old and new images
      const finalImages = [...oldImages, ...newImages];
  
      // Update announcement
      const updatedAnnouncement = await announcementModel.findByIdAndUpdate(
        id,
        {
          ...req.body,
          images: finalImages,
        },
        { new: true }
      );
  
      return res.status(200).json(updatedAnnouncement);
    } catch (error) {
      return res.status(500).json({
        message: 'Error updating announcement',
        error: error.message,
      });
    }
  });
  

// Delete Announcement
const deleteAnnouncement = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id); // Validate MongoDB ObjectId

    try {
        const announcement = await announcementModel.findById(id);
        if (!announcement) {
            return res.status(404).json({ message: "Announcement not found." });
        }

        // Optionally, delete images associated with the announcement
        if (announcement.images && announcement.images.length > 0) {
            await Promise.all(
                announcement.images.map(async (img) => {
                    const filePath = path.join(__dirname, `../public/images/announcements/${img.public_id}`);
                    try {
                        await fs.promises.unlink(filePath); // Remove image from disk
                    } catch (err) {
                        console.error(`Error deleting image: ${err.message}`);
                    }
                })
            );
        }

        // Delete the announcement from the database
        const deletedAnnouncement = await announcementModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Announcement deleted successfully.", deletedAnnouncement });
    } catch (error) {
        res.status(500).json({ message: "Error deleting announcement.", error: error.message });
    }
});

// Get a Single Announcement
const getAnnouncement = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id); // Validate MongoDB ObjectId

    try {
        const announcement = await announcementModel.findById(id);
        if (!announcement) {
            return res.status(404).json({ message: "Announcement not found." });
        }
        res.status(200).json(announcement); // Return the found announcement
    } catch (error) {
        res.status(500).json({ message: "Error fetching announcement.", error: error.message });
    }
});

// Get All Announcements
const getAllAnnouncements = asyncHandler(async (req, res) => {
    try {
        const announcements = await announcementModel.find();
        res.status(200).json(announcements); // Return the list of all announcements
    } catch (error) {
        res.status(500).json({ message: "Error fetching announcements.", error: error.message });
    }
});

module.exports = {
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    getAnnouncement,
    getAllAnnouncements,
};

