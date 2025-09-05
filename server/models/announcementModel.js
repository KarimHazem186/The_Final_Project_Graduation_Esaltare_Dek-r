const mongoose = require('mongoose');

// Declare the Schema of the Announcement model
const announcementSchema = new mongoose.Schema(
  {
    announcementTitle: {
      type: String,
      required: true,
      unique: true, // If you want to make sure the title is unique
    },
    percentage: {
      type: Number,
      required: true,
      min: 0, // Ensure percentage is within the 0-100 range
      max: 100,
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
    status: {
      type: String,
      enum: ['Active', 'InActive'],
      default: 'Active',
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Export the model
module.exports = mongoose.model('Announcement', announcementSchema);
