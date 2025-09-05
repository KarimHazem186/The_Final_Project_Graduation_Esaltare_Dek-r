const subcategoryModel = require("../models/subcategoryModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

// Create a new SubCategory
const createSubcategory = asyncHandler(async (req, res) => {
    const { subcategoryName, priority, description, status, categoryId } = req.body;

    // Validate required fields
    if (!subcategoryName || !priority || !description || !categoryId) {
        return res.status(400).json({
            message: "Please provide subcategoryName, priority, description, and categoryId.",
        });
    }

    try {
        const subcategoryExists = await subcategoryModel.findOne({ subcategoryName });
        if (subcategoryExists) {
            return res.status(409).json({ message: "SubCategory name already exists." });
        }

        // If there are images in the request (uploaded via multer), save them after resizing
        const images = req.body.images || [];

        // Create subcategory document
        const newSubcategory = await subcategoryModel.create({
            subcategoryName,
            categoryId,
            priority,
            description,
            status: status || 'Active',
            images: images.length > 0 ? images : [],
        });

        res.status(201).json(newSubcategory);
    } catch (error) {
        res.status(500).json({
            message: "Error creating subcategory.",
            error: error.message,
        });
    }
});

// Update SubCategory
// const updateSubcategory = asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     validateMongoDbId(id); // Validate MongoDB ObjectId

//     try {
//         // Find the subcategory in the database
//         const subcategory = await subcategoryModel.findById(id);
//         if (!subcategory) {
//             return res.status(404).json({ message: 'SubCategory not found.' });
//         }

//         // If there are new images in the request, resize and process them
//         if (req.files && req.files.length > 0) {
//             const updatedImages = [];

//             // Process each image (resize, store paths, etc.)
//             await Promise.all(
//                 req.files.map(async (file) => {
//                     const resizedName = `resized-${Date.now()}-${file.filename}`;
//                     const outputPath = path.join(__dirname, `../public/images/subcategories/${resizedName}`);

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
//                         url: `/images/subcategories/${resizedName}`,
//                     });
//                 })
//             );

//             // Optionally, delete old images
//             if (subcategory.images && subcategory.images.length > 0) {
//                 await Promise.all(
//                     subcategory.images.map(async (img) => {
//                         const filePath = path.join(__dirname, `../public/images/subcategories/${img.public_id}`);
//                         try {
//                             await fs.promises.unlink(filePath); // Delete the old image file
//                         } catch (err) {
//                             console.error(`Error deleting old image: ${err.message}`);
//                         }
//                     })
//                 );
//             }

//             // Update the subcategory with new image(s)
//             subcategory.images = updatedImages;
//         }

//         // Update other fields of the subcategory
//         const updatedSubcategory = await subcategoryModel.findByIdAndUpdate(
//             id,
//             {
//                 ...req.body, // Update fields from the request
//                 images: subcategory.images, // Attach processed images
//             },
//             { new: true }
//         );

//         return res.status(200).json(updatedSubcategory); // Return the updated subcategory
//     } catch (error) {
//         return res.status(500).json({
//             message: 'Error updating subcategory',
//             error: error.message,
//         });
//     }
// });


const updateSubcategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id); // Validate MongoDB ObjectId

    try {
        const subcategory = await subcategoryModel.findById(id);
        if (!subcategory) {
            return res.status(404).json({ message: 'SubCategory not found.' });
        }

        // Parse oldImages from req.body (as JSON string)
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
                    const outputPath = path.join(__dirname, `../public/images/subcategories/${resizedName}`);

                    await sharp(file.path)
                        .resize(600, 600)
                        .toFormat('jpeg')
                        .jpeg({ quality: 90 })
                        .toFile(outputPath);

                    // Delete original file
                    fs.unlink(file.path, (err) => {
                        if (err) {
                            console.error(`Error deleting original file: ${err.message}`);
                        }
                    });

                    newImages.push({
                        public_id: resizedName,
                        url: `/images/subcategories/${resizedName}`,
                    });
                })
            );
        }

        // Delete removed old images
        const removedOldImages = subcategory.images.filter(
            (img) => !oldImages.some((old) => old.public_id === img.public_id)
        );

        await Promise.all(
            removedOldImages.map(async (img) => {
                const filePath = path.join(__dirname, `../public/images/subcategories/${img.public_id}`);
                try {
                    await fs.promises.unlink(filePath);
                } catch (err) {
                    console.error(`Error deleting old image: ${err.message}`);
                }
            })
        );

        // Combine old and new images
        const finalImages = [...oldImages, ...newImages];

        // Update the subcategory with the combined images and other fields
        const updatedSubcategory = await subcategoryModel.findByIdAndUpdate(
            id,
            {
                ...req.body,
                images: finalImages,
            },
            { new: true }
        );

        return res.status(200).json(updatedSubcategory);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error updating subcategory',
            error: error.message,
        });
    }
});



// Delete SubCategory
const deleteSubcategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id); // Validate MongoDB ObjectId

    try {
        const subcategory = await subcategoryModel.findById(id);
        if (!subcategory) {
            return res.status(404).json({ message: "SubCategory not found." });
        }

        // Optionally, delete images associated with the subcategory
        if (subcategory.images && subcategory.images.length > 0) {
            await Promise.all(
                subcategory.images.map(async (img) => {
                    const filePath = path.join(__dirname, `../public/images/subcategories/${img.public_id}`);
                    try {
                        await fs.promises.unlink(filePath); // Remove image from disk
                    } catch (err) {
                        console.error(`Error deleting image: ${err.message}`);
                    }
                })
            );
        }

        // Delete the subcategory from the database
        const deletedSubcategory = await subcategoryModel.findByIdAndDelete(id);
        res.status(200).json({ message: "SubCategory deleted successfully.", deletedSubcategory });
    } catch (error) {
        res.status(500).json({ message: "Error deleting subcategory.", error: error.message });
    }
});

// Get a Single SubCategory
const getSubcategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id); // Validate MongoDB ObjectId

    try {
        const subcategory = await subcategoryModel.findById(id)
        .populate("categoryId", "categoryName");
        if (!subcategory) {
            return res.status(404).json({ message: "SubCategory not found." });
        }
        res.status(200).json(subcategory); // Return the found subcategory
    } catch (error) {
        res.status(500).json({ message: "Error fetching subcategory.", error: error.message });
    }
});

// Get All SubCategories
const getAllSubcategories = asyncHandler(async (req, res) => {
    try {
        const subcategories = await subcategoryModel.find()
        .populate("categoryId", "categoryName");
        res.status(200).json(subcategories); // Return the list of all subcategories
    } catch (error) {
        res.status(500).json({ message: "Error fetching subcategories.", error: error.message });
    }
});

module.exports = {
    createSubcategory,
    updateSubcategory,
    deleteSubcategory,
    getSubcategory,
    getAllSubcategories,
};
