const mongoose = require('mongoose');

// Declare the Schema of the SubCategory model
const subcategorySchema = new mongoose.Schema(
  {
    subcategoryName: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    images: [
      {
        public_id: String,
        url: String,
      }
    ],
    priority: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Active', 'InActive'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
module.exports = mongoose.model('SubCategory', subcategorySchema);
