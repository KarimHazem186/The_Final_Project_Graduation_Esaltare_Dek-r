const categoryModel = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

// Create a new Category
const createCategory = asyncHandler(async (req, res) => {
    const { categoryName, priority, description, status } = req.body;

    // Validate required fields
    if (!categoryName || !priority || !description) {
        return res.status(400).json({
            message: "Please provide categoryName, priority, and description.",
        });
    }

    try {
        const categoryExists = await categoryModel.findOne({ categoryName });
        if (categoryExists) {
            return res.status(409).json({ message: "Category name already exists." });
        }

        // If there are images in the request (uploaded via multer), save them after resizing
        const images = req.body.images || [];

        // Create category document
        const newCategory = await categoryModel.create({
            categoryName,
            priority,
            description,
            status: status || 'Active',
            images: images.length > 0 ? images : [],
        });

        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({
            message: "Error creating category.",
            error: error.message,
        });
    }
});

// Update Category
// const updateCategory = asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     validateMongoDbId(id); // Validate MongoDB ObjectId

//     try {
//         // Find the category in the database
//         const category = await categoryModel.findById(id);
//         if (!category) {
//             return res.status(404).json({ message: 'Category not found.' });
//         }

//         // If there are new images in the request, resize and process them
//         if (req.files && req.files.length > 0) {
//             const updatedImages = [];

//             // Process each image (resize, store paths, etc.)
//             await Promise.all(
//                 req.files.map(async (file) => {
//                     const resizedName = `resized-${Date.now()}-${file.filename}`;
//                     const outputPath = path.join(__dirname, `../public/images/categories/${resizedName}`);

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
//                         url: `/images/categories/${resizedName}`,
//                     });
//                 })
//             );

//             // Optionally, delete old images
//             if (category.images && category.images.length > 0) {
//                 await Promise.all(
//                     category.images.map(async (img) => {
//                         const filePath = path.join(__dirname, `../public/images/categories/${img.public_id}`);
//                         try {
//                             await fs.promises.unlink(filePath); // Delete the old image file
//                         } catch (err) {
//                             console.error(`Error deleting old image: ${err.message}`);
//                         }
//                     })
//                 );
//             }

//             // Update the category with new image(s)
//             category.images = updatedImages;
//         }

//         // Update other fields of the category
//         const updatedCategory = await categoryModel.findByIdAndUpdate(
//             id,
//             {
//                 ...req.body, // Update fields from the request
//                 images: category.images, // Attach processed images
//             },
//             { new: true }
//         );

//         return res.status(200).json(updatedCategory); // Return the updated category
//     } catch (error) {
//         return res.status(500).json({
//             message: 'Error updating category',
//             error: error.message,
//         });
//     }
// });

const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id); // Validate MongoDB ObjectId

    try {
        const category = await categoryModel.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found.' });
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
                    const outputPath = path.join(__dirname, `../public/images/categories/${resizedName}`);

                    // Resize and process image with sharp
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
                        url: `/images/categories/${resizedName}`,
                    });
                })
            );
        }

        // Delete removed old images
        const removedOldImages = category.images.filter(
            (img) => !oldImages.some((old) => old.public_id === img.public_id)
        );

        await Promise.all(
            removedOldImages.map(async (img) => {
                const filePath = path.join(__dirname, `../public/images/categories/${img.public_id}`);
                try {
                    await fs.promises.unlink(filePath); // Delete the old image file
                } catch (err) {
                    console.error(`Error deleting old image: ${err.message}`);
                }
            })
        );

        // Combine remaining old images and newly uploaded ones
        const finalImages = [...oldImages, ...newImages];

        // Update the category with the new images and other data
        const updatedCategory = await categoryModel.findByIdAndUpdate(
            id,
            {
                ...req.body,  // Update other fields from the request body
                images: finalImages,  // Attach updated images list
            },
            { new: true }
        );

        return res.status(200).json(updatedCategory); // Return the updated category
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({
            message: 'Error updating category',
            error: error.message,
        });
    }
});


// Delete Category
const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id); // Validate MongoDB ObjectId

    try {
        const category = await categoryModel.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found." });
        }

        // Optionally, delete images associated with the category
        if (category.images && category.images.length > 0) {
            await Promise.all(
                category.images.map(async (img) => {
                    const filePath = path.join(__dirname, `../public/images/categories/${img.public_id}`);
                    try {
                        await fs.promises.unlink(filePath); // Remove image from disk
                    } catch (err) {
                        console.error(`Error deleting image: ${err.message}`);
                    }
                })
            );
        }

        // Delete the category from the database
        const deletedCategory = await categoryModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Category deleted successfully.", deletedCategory });
    } catch (error) {
        res.status(500).json({ message: "Error deleting category.", error: error.message });
    }
});

// Get a Single Category
const getCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id); // Validate MongoDB ObjectId

    try {
        const category = await categoryModel.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found." });
        }
        res.status(200).json(category); // Return the found category
    } catch (error) {
        res.status(500).json({ message: "Error fetching category.", error: error.message });
    }
});

// Get All Categories
const getAllCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await categoryModel.find();
        res.status(200).json(categories); // Return the list of all categories
    } catch (error) {
        res.status(500).json({ message: "Error fetching categories.", error: error.message });
    }
});

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategories,
};
