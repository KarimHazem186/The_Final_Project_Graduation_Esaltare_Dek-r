const productModel = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const slugify = require("slugify");

// CREATE PRODUCT
const createProduct = asyncHandler(async (req, res) => {
  const { productName, description/*, slug*/, length, width, height, price, priority, subcategoryId, quantity, status } = req.body;

  if (!productName || !subcategoryId || !price || !priority) {
    return res.status(400).json({ message: "Required fields: productName, subcategoryId, price, priority" });
  }

  const existing = await productModel.findOne({ productName });
  if (existing) return res.status(409).json({ message: "Product already exists." });

  const images = req.body.images || [];

  const newProduct = await productModel.create({
    productName,
    // slug,
    description,
    length,
    width,
    height,
    price,
    priority,
    subcategoryId,
    quantity: quantity || 0,
    sold: 0,
    status: status || "Active",
    images: images.length > 0 ? images : [],
  });

  res.status(201).json(newProduct);
});

// UPDATE PRODUCT
// const updateProduct = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongoDbId(id);

//   const product = await productModel.findById(id);
//   if (!product) return res.status(404).json({ message: "Product not found" });

//   if (req.body.productName) {
//     req.body.slug = slugify(req.body.productName, { lower: true, strict: true });
//   }
  

//   if (req.files && req.files.length > 0) {
//     const updatedImages = [];

//     await Promise.all(req.files.map(async (file) => {
//       const resizedName = `resized-${Date.now()}-${file.filename}`;
//       const outputPath = path.join(__dirname, `../public/images/products/${resizedName}`);

//       await sharp(file.path)
//         .resize(600, 600)
//         .toFormat('jpeg')
//         .jpeg({ quality: 90 })
//         .toFile(outputPath);

//       fs.unlink(file.path, () => {});
//       updatedImages.push({ public_id: resizedName, url: `/images/products/${resizedName}` });
//     }));

//     // Delete old images
//     if (product.images && product.images.length > 0) {
//       await Promise.all(product.images.map(async (img) => {
//         const filePath = path.join(__dirname, `../public/images/products/${img.public_id}`);
//         try {
//           await fs.promises.unlink(filePath);
//         } catch {}
//       }));
//     }

//     product.images = updatedImages;
//   }

//   const updatedProduct = await productModel.findByIdAndUpdate(
//     id,
//     {
//       ...req.body,
//       images: product.images,
//     },
//     { new: true }
//   );

//   res.status(200).json(updatedProduct);
// });


const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Parse old images from JSON string
    let oldImages = [];
    if (req.body.oldImages) {
      try {
        oldImages = JSON.parse(req.body.oldImages);
      } catch (err) {
        return res.status(400).json({ message: 'Invalid oldImages format.' });
      }
    }

    // Process newly uploaded images
    const newImages = [];
    if (req.files && req.files.length > 0) {
      await Promise.all(
        req.files.map(async (file) => {
          const resizedName = `resized-${Date.now()}-${file.filename}`;
          const outputPath = path.join(__dirname, `../public/images/products/${resizedName}`);

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
            url: `/images/products/${resizedName}`,
          });
        })
      );
    }

    // Identify removed old images
    const removedImages = product.images.filter(
      (img) => !oldImages.some((old) => old.public_id === img.public_id)
    );

    // Delete removed images from disk
    await Promise.all(
      removedImages.map(async (img) => {
        const filePath = path.join(__dirname, `../public/images/products/${img.public_id}`);
        try {
          await fs.promises.unlink(filePath);
        } catch (err) {
          console.error(`Error deleting old image: ${err.message}`);
        }
      })
    );

    // Combine remaining old + new images
    const finalImages = [...oldImages, ...newImages];

    // Generate slug if productName changed
    if (req.body.productName) {
      req.body.slug = slugify(req.body.productName, { lower: true, strict: true });
    }

    // Update the product
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      {
        ...req.body,
        images: finalImages,
      },
      { new: true }
    );

    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({
      message: 'Error updating product',
      error: error.message,
    });
  }
});



// DELETE PRODUCT
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const product = await productModel.findById(id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  if (product.images && product.images.length > 0) {
    await Promise.all(product.images.map(async (img) => {
      const filePath = path.join(__dirname, `../public/images/products/${img.public_id}`);
      try {
        await fs.promises.unlink(filePath);
      } catch {}
    }));
  }

  const deletedProduct = await productModel.findByIdAndDelete(id);
  res.status(200).json({ message: "Product deleted successfully.", deletedProduct });
});

// // GET SINGLE PRODUCT
// const getProduct = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongoDbId(id);

//   const product = await productModel.findById(id).populate("subcategoryId", "subcategoryName");
//   if (!product) return res.status(404).json({ message: "Product not found" });

//   res.status(200).json(product);
// });


const getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
  
    const product = await productModel.findById(id)
    .populate({
        path: 'subcategoryId',
        select: 'subcategoryName categoryId',
        populate: {
          path: 'categoryId',
          select: 'categoryName'
        }
      })
      
    //   .populate({
    //     path: 'subcategoryId',
    //     populate: { path: 'categoryId', select: 'categoryName' }
    //   });
  
    if (!product) return res.status(404).json({ message: 'Product not found.' });
  
    const createdAt = new Date(product.createdAt);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
    const isNewArrival = createdAt >= thirtyDaysAgo;
  
    const productWithNewArrival = {
      ...product.toObject(), 
      isNewArrival,
    };
  
    res.status(200).json(productWithNewArrival);
  });
  


// // GET ALL PRODUCTS
// const getAllProducts = asyncHandler(async (req, res) => {
//   try {
//     const products = await productModel.find().populate("subcategoryId", "subcategoryName");
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching products", error: error.message });
//   }
// });


const getAllProducts = asyncHandler(async (req, res) => {
    const products = await productModel.find()
    //   .populate({
    //     path: 'subcategoryId',
    //     populate: { path: 'categoryId', select: 'categoryName' }
    //   })
    .populate({
        path: 'subcategoryId',
        select: 'subcategoryName categoryId',
        populate: {
          path: 'categoryId',
          select: 'categoryName'
        }
      })
      
      .sort({ createdAt: -1 });
  
    // إضافة حقل isNewArrival تلقائيًا
    const productsWithNewArrival = products.map(product => {
      const createdAt = new Date(product.createdAt);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
      const isNewArrival = createdAt >= thirtyDaysAgo;
  
      return {
        ...product.toObject(), 
        isNewArrival, 
      };
    });
  
    res.status(200).json(productsWithNewArrival);
  });




const getNewArrivals = asyncHandler(async (req, res) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
    const newArrivals = await productModel.find({
      createdAt: { $gte: thirtyDaysAgo }
    })
      .sort({ createdAt: -1 })
      .populate({
        path: 'subcategoryId',
        select: 'subcategoryName categoryId',
        populate: {
          path: 'categoryId',
          select: 'categoryName'
        }
      })
   
    //   .populate({
    //     path: 'subcategoryId',
    //     populate: { path: 'categoryId', select: 'categoryName' }
    //   });
  
    res.status(200).json(newArrivals);
});
  



module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
  getNewArrivals
};
