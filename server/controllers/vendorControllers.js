const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const getMyProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ vendorId: req.user._id });
    res.json(products);
});




const addProduct = asyncHandler(async (req, res) => {
    const { productName, price, description } = req.body;
  
    const newProduct = await Product.create({
      productName,
      price,
      description,
      vendorId: req.user._id,
    });
  
    res.status(201).json(newProduct);
  });
  
  const createProduct = asyncHandler(async (req, res) => {
    const { productName, brandName, price, description, category, subCategory } = req.body;
  
    // التأكد من أن البائع لديه اشتراك صالح
    const vendor = await Vendor.findById(req.user._id);
    if (!vendor || !vendor.subscriptionStatus || new Date() > vendor.subscriptionExpiresAt) {
      throw new Error("You must have an active subscription to upload products.");
    }
  
    const product = new Product({
      vendorId: req.user._id,
      productName,
      brandName,
      price,
      description,
      category,
      subCategory,
      images: req.files ? req.files.map(file => file.path) : [] // في حال رفع صور
    });
  
    await product.save();
    res.status(201).json(product);
  });
  
  

  const getVendorWithProducts = async (vendorId) => {
    try {
      const vendor = await Vendor.findById(vendorId).populate("products").exec();
      return vendor; // Vendor object with populated product data
    } catch (error) {
      console.error("Error fetching vendor data:", error);
      throw new Error("Unable to fetch vendor data");
    }
  };
  
  const getVendorWithProducts2 = async (vendorId) => {
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      throw new Error("Vendor not found");
    }
    await vendor.populateProducts(); // Populating the vendor's products
    return vendor;
  };
  


  const getVendorDetails = async (vendorId) => {
    const vendor = await Vendor.findById(vendorId);
    await vendor.populateProducts(); // This will populate the vendor's products
    return vendor;
  };
  


module.exports = { getMyProducts,  addProduct,createProduct,getVendorWithProducts};


/*
const asyncHandler = require("express-async-handler");
const Vendor = require("../models/vendorModel");
const Product = require("../models/productModel");

// Get all vendors (with populated product details)
const getAllVendors = asyncHandler(async (req, res) => {
  const vendors = await Vendor.find().populate("products").exec();
  res.json(vendors);
});

// Get a specific vendor (with product details)
const getVendorById = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findById(req.params.id).populate("products").exec();
  if (!vendor) {
    res.status(404);
    throw new Error("Vendor not found");
  }
  res.json(vendor);
});

// Create a new vendor (Only for admins)
const createVendor = asyncHandler(async (req, res) => {
  const { companyName, brandName, subscriptionStatus } = req.body;
  const vendor = new Vendor({
    companyName,
    brandName,
    subscriptionStatus,
    user: req.user._id, // Assumes vendor is linked to a user
  });

  const createdVendor = await vendor.save();
  res.status(201).json(createdVendor);
});

// Update vendor subscription status (Admin only)
const updateVendorSubscription = asyncHandler(async (req, res) => {
  const { subscriptionStatus, subscriptionExpiresAt } = req.body;
  const vendor = await Vendor.findById(req.params.id);
  
  if (!vendor) {
    res.status(404);
    throw new Error("Vendor not found");
  }
  
  vendor.subscriptionStatus = subscriptionStatus;
  vendor.subscriptionExpiresAt = subscriptionExpiresAt || null; // Can be left null if subscription is canceled
  await vendor.save();
  
  res.json(vendor);
});

// Update vendor product status (e.g., approval)
const updateProductStatus = asyncHandler(async (req, res) => {
  const { productId, status } = req.body; // Expected status: 'approved', 'rejected'
  
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  product.status = status;
  await product.save();

  res.json(product);
});

module.exports = {
  getAllVendors,
  getVendorById,
  createVendor,
  updateVendorSubscription,
  updateProductStatus,
};


*/

/*
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const Vendor = require("../models/vendorModel");

const createProduct = asyncHandler(async (req, res) => {
  const { productName, brandName, price, description, category, subCategory } = req.body;

  // التأكد من أن البائع لديه اشتراك صالح
  const vendor = await Vendor.findById(req.user._id);
  if (!vendor || !vendor.subscriptionStatus || new Date() > vendor.subscriptionExpiresAt) {
    throw new Error("You must have an active subscription to upload products.");
  }

  const product = new Product({
    vendorId: req.user._id,
    productName,
    brandName,
    price,
    description,
    category,
    subCategory,
    images: req.files ? req.files.map(file => file.path) : [] // في حال رفع صور
  });

  await product.save();
  res.status(201).json(product);
});

module.exports = { createProduct };


*/
