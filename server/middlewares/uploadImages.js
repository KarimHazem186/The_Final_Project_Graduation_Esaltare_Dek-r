const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

// Generic function to create disk storage based on folder
const getStorage = (folder) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, `../public/images/${folder}`));
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${folder}-${uniqueSuffix}.jpeg`);
    },
  });

// File filter: allow images only
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) cb(null, true);
  else cb(new Error('Only image files are allowed'), false);
};

// Upload handlers
const uploadBrandPhoto = multer({ storage: getStorage('brands'), fileFilter: multerFilter });
const uploadProductPhoto = multer({ storage: getStorage('products'), fileFilter: multerFilter });
const uploadCategoryPhoto = multer({ storage: getStorage('categories'), fileFilter: multerFilter });
const uploadSubcategoryPhoto = multer({ storage: getStorage('subcategories'), fileFilter: multerFilter });
const uploadPostPhoto = multer({ storage: getStorage('posts'), fileFilter: multerFilter });
const uploadAnnouncementPhoto = multer({ storage: getStorage('announcements'), fileFilter: multerFilter });

// Resize function for both brand and product
const resizeImages = (folder, width, height) => {
  return async (req, res, next) => {
    if (!req.files || req.files.length === 0) return next();

    try {
      req.body.images = [];

      await Promise.all(
        req.files.map(async (file) => {
          const resizedName = `resized-${Date.now()}-${file.filename}`;
          const outputPath = path.join(__dirname, `../public/images/${folder}/${resizedName}`);

          await sharp(file.path)
            .resize(width, height)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(outputPath);

          fs.unlinkSync(file.path); // Remove original

          req.body.images.push({
            public_id: resizedName,
            url: `/images/${folder}/${resizedName}`,
          });
        })
      );

      next();
    } catch (error) {
      return res.status(500).json({ message: `${folder} image processing failed`, error: error.message });
    }
  };
};

// Resize middlewares
const brandImgResize = resizeImages('brands', 300, 300);
const productImgResize = resizeImages('products', 600, 600);
const categoryImgResize = resizeImages('categories', 600, 600);
const subcategoryImgResize = resizeImages('subcategories', 600, 600);
const postImgResize = resizeImages('posts', 600, 600);
const announcementImgResize = resizeImages('announcements', 600, 600);

module.exports = {
  uploadBrandPhoto,
  brandImgResize,
  uploadProductPhoto,
  productImgResize,
  uploadCategoryPhoto,
  categoryImgResize,
  uploadSubcategoryPhoto,
  subcategoryImgResize,
  uploadPostPhoto,
  postImgResize,
  uploadAnnouncementPhoto,
  announcementImgResize,
};


