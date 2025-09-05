const asyncHandler = require("express-async-handler");
const Vendor = require("../models/vendorModel");

const checkSubscription = asyncHandler(async (req, res, next) => {
  const vendor = await Vendor.findById(req.user._id);
  if (!vendor || !vendor.subscriptionStatus || new Date() > vendor.subscriptionExpiresAt) {
    throw new Error("You must have an active subscription to upload products.");
  }
  next();
});

module.exports = { checkSubscription };


/*
const vendor = await Vendor.findById(vendorId);
if (!vendor.isSubscriptionValid()) {
  return res.status(400).json({ message: "Subscription expired!" });
}

*/