const mongoose = require('mongoose');
const slugify = require('slugify');

// Declare the Schema of the Product model
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      // unique: true,
      index: true,
    },
    slug: {
      type: String,
    //   required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    priority: {
      type: Number,
      required: true,
      // default: 1, // You can set default priority if needed
    },
    subcategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0, // Default to 0 if no products have been sold yet
    },
    // newArrival: {
    //     type: Boolean,
    //     default: false
    // },  
    status: {
      type: String,
      enum: ['Active', 'InActive'], // Enum to restrict status to Active/Inactive
      default: 'Active', // Default value is 'Active'
    },

  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);


// Automatically generate the slug before saving
productSchema.pre('save', function (next) {
    // Generate a slug based on the productName
    if (this.productName) {
      this.slug = slugify(this.productName, { lower: true, strict: true });
    }
    next();
});
  

// Export the model
module.exports = mongoose.model('Product', productSchema);
