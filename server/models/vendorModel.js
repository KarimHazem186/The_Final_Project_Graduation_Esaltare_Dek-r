const vendorSchema = new mongoose.Schema(
    {
      ...userSchema.obj,
      companyName: { type: String, required: true },
      subscriptionStatus: { type: Boolean, default: false },
      subscriptionExpiresAt: { type: Date },
      products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
      brandName: { type: String, required: true },
  
      // 👇 Add this for admin approval
      approvalStatus: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
      },
    },
    {
      timestamps: true,
    }
  );
  

// const mongoose = require("mongoose");
// const userSchema = require("./userModel").schema;

// const vendorSchema = new mongoose.Schema({
//   ...userSchema.obj,
//   companyName: { type: String, required: true },
//   subscriptionStatus: { type: Boolean, default: false }, // لتحديد ما إذا كان البائع مشترك
//   subscriptionExpiresAt: { type: Date }, // تاريخ انتهاء الاشتراك
//   products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
// });

// module.exports = mongoose.model("Vendor", vendorSchema);

/*
const mongoose = require("mongoose");
const userSchema = require("./userModel").schema;

const vendorSchema = new mongoose.Schema({
  ...userSchema.obj, // Inheriting fields from userSchema
  companyName: { type: String, required: true },
  subscriptionStatus: { type: Boolean, default: false }, // Whether the vendor is subscribed
  subscriptionExpiresAt: { type: Date }, // Subscription expiration date
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // Referencing products uploaded by the vendor
  brandName: { type: String, required: true }, // Assuming each vendor has a brand
  // You can add other vendor-specific details here if necessary
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt timestamps
});

// If you need to populate product details when fetching a vendor, you can add a method to handle it
vendorSchema.methods.populateProducts = function() {
  return this.populate("products"); // Populates the products array field with product details
};

module.exports = mongoose.model("Vendor", vendorSchema);


*/



/*

const mongoose = require("mongoose");
const userSchema = require("./userModel").schema;

const vendorSchema = new mongoose.Schema(
  {
    ...userSchema.obj, // Inheriting fields from userSchema
    companyName: { type: String, required: true },
    subscriptionStatus: { type: Boolean, default: false }, // Whether the vendor is subscribed
    subscriptionExpiresAt: { type: Date }, // Subscription expiration date
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // Referencing products uploaded by the vendor
    brandName: { type: String, required: true }, // Assuming each vendor has a brand
    // You can add other vendor-specific details here if necessary
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

// Populate product details when fetching vendor information
vendorSchema.methods.populateProducts = function () {
  return this.populate("products"); // Populates the products array field with product details
};

// Method to check if the vendor's subscription is valid
vendorSchema.methods.isSubscriptionValid = function () {
  return this.subscriptionStatus && this.subscriptionExpiresAt > new Date();
};

module.exports = mongoose.model("Vendor", vendorSchema);

*/