const brandModel = require("../models/brandModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

// Create a new Brand
const createBrand = asyncHandler(async (req, res) => {
    const { brandName, priority, description, status } = req.body;

    // Validate required fields
    if (!brandName || !priority || !description) {
        return res.status(400).json({
            message: "Please provide brandName, priority, and description.",
        });
    }

    try {
        const brandExists = await brandModel.findOne({ brandName });
        if (brandExists) {
            return res.status(409).json({ message: "Brand name already exists." });
        }

        // If there are images in the request (uploaded via multer), save them after resizing
        const images = req.body.images || [];

        // Create brand document
        const newBrand = await brandModel.create({
            brandName,
            priority,
            description,
            status: status || 'Active',
            images: images.length > 0 ? images : [],
        });

        res.status(201).json(newBrand);
    } catch (error) {
        res.status(500).json({
            message: "Error creating brand.",
            error: error.message,
        });
    }
});


const updateBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
  
    try {
      const brand = await brandModel.findById(id);
      if (!brand) {
        return res.status(404).json({ message: 'Brand not found.' });
      }
  
      // Parse old images coming as JSON string
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
            const outputPath = path.join(__dirname, `../public/images/brands/${resizedName}`);
  
            await sharp(file.path)
              .resize(300, 300)
              .toFormat('jpeg')
              .jpeg({ quality: 90 })
              .toFile(outputPath);
  
            // Delete original
            fs.unlink(file.path, (err) => {
              if (err) console.error(`Error deleting original file: ${err.message}`);
            });
  
            newImages.push({
              public_id: resizedName,
              url: `/images/brands/${resizedName}`,
            });
          })
        );
      }
  
      // Delete removed old images
      const removedOldImages = brand.images.filter(
        (img) => !oldImages.some((old) => old.public_id === img.public_id)
      );
  
      await Promise.all(
        removedOldImages.map(async (img) => {
          const filePath = path.join(__dirname, `../public/images/brands/${img.public_id}`);
          try {
            await fs.promises.unlink(filePath);
          } catch (err) {
            console.error(`Error deleting old image: ${err.message}`);
          }
        })
      );
  
      // Combine remaining old + new images
      const finalImages = [...oldImages, ...newImages];
  
      // Update brand
      const updatedBrand = await brandModel.findByIdAndUpdate(
        id,
        {
          ...req.body,
          images: finalImages,
        },
        { new: true }
      );
  
      return res.status(200).json(updatedBrand);
    } catch (error) {
      return res.status(500).json({
        message: 'Error updating brand',
        error: error.message,
      });
    }
  });
  

const deleteBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id); // Validate MongoDB ObjectId

    try {
        const brand = await brandModel.findById(id);
        if (!brand) {
            return res.status(404).json({ message: "Brand not found." });
        }

        // Optionally, delete images associated with the brand
        if (brand.images && brand.images.length > 0) {
            await Promise.all(
                brand.images.map(async (img) => {
                    const filePath = path.join(__dirname, `../public/images/brands/${img.public_id}`);
                    try {
                        await fs.promises.unlink(filePath); // Remove image from disk
                    } catch (err) {
                        console.error(`Error deleting image: ${err.message}`);
                    }
                })
            );
        }

        // Delete the brand from the database
        const deletedBrand = await brandModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Brand deleted successfully.", deletedBrand });
    } catch (error) {
        res.status(500).json({ message: "Error deleting brand.", error: error.message });
    }
});

// Get a Single Brand
const getBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id); // Validate MongoDB ObjectId

    try {
        const brand = await brandModel.findById(id);
        if (!brand) {
            return res.status(404).json({ message: "Brand not found." });
        }
        res.status(200).json(brand); // Return the found brand
    } catch (error) {
        res.status(500).json({ message: "Error fetching brand.", error: error.message });
    }
});

// Get All Brands
const getAllBrand = asyncHandler(async (req, res) => {
    try {
        const brands = await brandModel.find();
        res.status(200).json(brands); // Return the list of all brands
    } catch (error) {
        res.status(500).json({ message: "Error fetching brands.", error: error.message });
    }
});

module.exports = {
    createBrand,
    updateBrand,
    deleteBrand,
    getBrand,
    getAllBrand,
};
