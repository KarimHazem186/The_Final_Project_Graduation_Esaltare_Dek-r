const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var brandSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    images:[
        {
            public_id: String,
            url: String,
        }
    ],
    priority: {
      type: Number,
      required: true,
    //   default: 1, // You can set default priority if needed
    },
    description: {
      type: String,
      required: true,
    },
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

// Export the model
module.exports = mongoose.model('Brand', brandSchema);
