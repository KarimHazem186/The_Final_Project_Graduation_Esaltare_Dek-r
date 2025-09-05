const postModel = require("../models/postModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

// Create a new Post
const createPost = asyncHandler(async (req, res) => {
    const { postTitle, priority, description, status } = req.body;

    // Validate required fields
    if (!postTitle || !priority || !description) {
        return res.status(400).json({
            message: "Please provide postTitle, priority, and description.",
        });
    }

    try {
        const postExists = await postModel.findOne({ postTitle });
        if (postExists) {
            return res.status(409).json({ message: "Post title already exists." });
        }

        // If there are images in the request (uploaded via multer), save them after resizing
        const images = req.body.images || [];

        // Create post document
        const newPost = await postModel.create({
            postTitle,
            priority,
            description,
            status: status || 'Active',
            images: images.length > 0 ? images : [],
        });

        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({
            message: "Error creating post.",
            error: error.message,
        });
    }
});

// Update Post
// const updatePost = asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     validateMongoDbId(id); // Validate MongoDB ObjectId

//     try {
//         // Find the post in the database
//         const post = await postModel.findById(id);
//         if (!post) {
//             return res.status(404).json({ message: 'Post not found.' });
//         }

//         // If there are new images in the request, resize and process them
//         if (req.files && req.files.length > 0) {
//             const updatedImages = [];

//             // Process each image (resize, store paths, etc.)
//             await Promise.all(
//                 req.files.map(async (file) => {
//                     const resizedName = `resized-${Date.now()}-${file.filename}`;
//                     const outputPath = path.join(__dirname, `../public/images/posts/${resizedName}`);

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
//                         url: `/images/posts/${resizedName}`,
//                     });
//                 })
//             );

//             // Optionally, delete old images
//             if (post.images && post.images.length > 0) {
//                 await Promise.all(
//                     post.images.map(async (img) => {
//                         const filePath = path.join(__dirname, `../public/images/posts/${img.public_id}`);
//                         try {
//                             await fs.promises.unlink(filePath); // Delete the old image file
//                         } catch (err) {
//                             console.error(`Error deleting old image: ${err.message}`);
//                         }
//                     })
//                 );
//             }

//             // Update the post with new image(s)
//             post.images = updatedImages;
//         }

//         // Update other fields of the post
//         const updatedPost = await postModel.findByIdAndUpdate(
//             id,
//             {
//                 ...req.body, // Update fields from the request
//                 images: post.images, // Attach processed images
//             },
//             { new: true }
//         );

//         return res.status(200).json(updatedPost); // Return the updated post
//     } catch (error) {
//         return res.status(500).json({
//             message: 'Error updating post',
//             error: error.message,
//         });
//     }
// });

// Update Post
const updatePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id); // Validate MongoDB ObjectId
  
    try {
      // Find the post by ID
      const post = await postModel.findById(id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
      }
  
      // Parse old images coming as JSON string (if any)
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
            const outputPath = path.join(__dirname, `../public/images/posts/${resizedName}`);
  
            // Resize the image using sharp and save to the specified path
            await sharp(file.path)
              .resize(600, 600)
              .toFormat('jpeg')
              .jpeg({ quality: 90 })
              .toFile(outputPath);
  
            // Delete the original uploaded file after resizing
            fs.unlink(file.path, (err) => {
              if (err) console.error(`Error deleting original file: ${err.message}`);
            });
  
            // Add the resized image to the newImages array
            newImages.push({
              public_id: resizedName,
              url: `/images/posts/${resizedName}`,
            });
          })
        );
      }
  
      // Delete removed old images
      const removedOldImages = post.images.filter(
        (img) => !oldImages.some((old) => old.public_id === img.public_id)
      );
  
      await Promise.all(
        removedOldImages.map(async (img) => {
          const filePath = path.join(__dirname, `../public/images/posts/${img.public_id}`);
          try {
            await fs.promises.unlink(filePath); // Delete old image from the server
          } catch (err) {
            console.error(`Error deleting old image: ${err.message}`);
          }
        })
      );
  
      // Combine remaining old images with new images
      const finalImages = [...oldImages, ...newImages];
  
      // Update the post in the database
      const updatedPost = await postModel.findByIdAndUpdate(
        id,
        {
          ...req.body, // Update other fields from the request body
          images: finalImages, // Attach the final images (old + new)
        },
        { new: true } // Return the updated post
      );
  
      // Return the updated post data as response
      return res.status(200).json(updatedPost);
    } catch (error) {
      return res.status(500).json({
        message: 'Error updating post',
        error: error.message,
      });
    }
  });
  

// Delete Post
const deletePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id); // Validate MongoDB ObjectId

    try {
        const post = await postModel.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        // Optionally, delete images associated with the post
        if (post.images && post.images.length > 0) {
            await Promise.all(
                post.images.map(async (img) => {
                    const filePath = path.join(__dirname, `../public/images/posts/${img.public_id}`);
                    try {
                        await fs.promises.unlink(filePath); // Remove image from disk
                    } catch (err) {
                        console.error(`Error deleting image: ${err.message}`);
                    }
                })
            );
        }

        // Delete the post from the database
        const deletedPost = await postModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Post deleted successfully.", deletedPost });
    } catch (error) {
        res.status(500).json({ message: "Error deleting post.", error: error.message });
    }
});

// Get a Single Post
const getPost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id); // Validate MongoDB ObjectId

    try {
        const post = await postModel.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }
        res.status(200).json(post); // Return the found post
    } catch (error) {
        res.status(500).json({ message: "Error fetching post.", error: error.message });
    }
});

// Get All Posts
const getAllPosts = asyncHandler(async (req, res) => {
    try {
        const posts = await postModel.find();
        res.status(200).json(posts); // Return the list of all posts
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts.", error: error.message });
    }
});

module.exports = {
    createPost,
    updatePost,
    deletePost,
    getPost,
    getAllPosts,
};
