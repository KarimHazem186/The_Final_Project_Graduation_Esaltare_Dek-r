const mongoose = require('mongoose');

const couponUsageSchema = new mongoose.Schema(
    {
      couponId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coupon",
        required: true,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      usedAt: {
        type: Date,
        default: Date.now,
      },
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("CouponUsage", couponUsageSchema);
  