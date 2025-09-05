const couponModel = require("../models/couponModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const couponUsageModel = require("../models/couponUsageModel");

// Create Coupon
// const createCoupon = asyncHandler(async (req, res) => {
//   // console.log(req.body) 
//   const { code, type, discountValue, usageLimit, isRegisteredOnly, priority, status, startDate, endDate } = req.body;

//   if (!code || !type || !discountValue || !usageLimit || !priority || !startDate || !endDate) {
//     return res.status(400).json({ message: "Please provide all required fields." });
//   }

//   const existingCoupon = await couponModel.findOne({ code });
//   if (existingCoupon) {
//     return res.status(409).json({ message: "Coupon code already exists." });
//   }

//   const newCoupon = await couponModel.create({
//     code,
//     type,
//     discountValue,
//     usageLimit,
//     isRegisteredOnly,
//     priority,
//     status,
//     startDate,
//     endDate,
//   });

//   res.status(201).json(newCoupon);
// });

const createCoupon = asyncHandler(async (req, res) => {
  const { code, type, discountValue, usageLimit, isRegisteredOnly, priority, status, startDate, endDate } = req.body;

  if (!code || !type || (!discountValue && type !== 'freeShipping') || !usageLimit || !priority || !startDate || !endDate) {
    return res.status(400).json({ message: "Please provide all required fields." });
  }

  const existingCoupon = await couponModel.findOne({ code });
  if (existingCoupon) {
    return res.status(409).json({ message: "Coupon code already exists." });
  }

  const couponData = {
    code,
    type,
    usageLimit,
    isRegisteredOnly,
    priority,
    status,
    startDate,
    endDate,
  };

  if (type !== 'freeShipping') {
    couponData.discountValue = discountValue;
  }

  const newCoupon = await couponModel.create(couponData);

  res.status(201).json(newCoupon);
});


// Update Coupon

const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  // جلب الكوبون الحالي
  const existingCoupon = await couponModel.findById(id);
  if (!existingCoupon) {
    return res.status(404).json({ message: "Coupon not found." });
  }

  // النوع الجديد المرسل
  const newType = req.body.type;

  // إذا تم تغيير النوع إلى freeShipping
  if (newType === 'freeShipping') {
    // حذف discountValue إن وجد
    if (existingCoupon.discountValue) {
      await couponModel.updateOne({ _id: id }, { $unset: { discountValue: "" } });
    }
    delete req.body.discountValue;
  }

  // إذا تم تغيير النوع إلى fixed أو percentage، تأكد من وجود discountValue
  if ((newType === 'fixed' || newType === 'percentage') && !req.body.discountValue) {
    return res.status(400).json({
      message: "discountValue is required for fixed or percentage coupon types.",
    });
  }

  // التحديث النهائي
  const updatedCoupon = await couponModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedCoupon);
});


// const updateCoupon = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongoDbId(id);

//   // استرجاع الكوبون الحالي من قاعدة البيانات
//   const existingCoupon = await couponModel.findById(id);

//   // إذا كان النوع 'freeShipping' وتمت إضافة discountValue، نقوم بحذفها فقط إذا كانت موجودة في الكوبون السابق
//   if (req.body.type === 'freeShipping') {
//     if (existingCoupon && existingCoupon.discountValue) {
//       // تخزين القيمة السابقة إذا كنت بحاجة إليها
//       req.body.previousDiscountValue = existingCoupon.discountValue; 
//     }
//     delete req.body.discountValue; // حذف discountValue إذا كان النوع 'freeShipping'
//   }

//   // إذا كان النوع قد تغير إلى 'fixed' أو 'percentage'، نتحقق من وجود discountValue
//   if ((req.body.type === 'fixed' || req.body.type === 'percentage') && !req.body.discountValue) {
//     return res.status(400).json({ message: "Discount value is required for 'fixed' or 'percentage' coupon types." });
//   }

//   // إذا تم تعديل النوع من 'freeShipping' إلى 'fixed' أو 'percentage'، نحتاج لإضافة discountValue مرة أخرى
//   if (req.body.type !== 'freeShipping' && !req.body.discountValue) {
//     if (existingCoupon && (existingCoupon.type === 'fixed' || existingCoupon.type === 'percentage')) {
//       req.body.discountValue = existingCoupon.discountValue; // إعادة استخدام القيمة القديمة إذا كانت موجودة
//     }
//   }

//   // تحديث الكوبون في قاعدة البيانات
//   const updatedCoupon = await couponModel.findByIdAndUpdate(id, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   if (!updatedCoupon) {
//     return res.status(404).json({ message: "Coupon not found." });
//   }

//   // إرجاع الكوبون المحدث
//   res.status(200).json(updatedCoupon);
// });


// const updateCoupon = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongoDbId(id);

//   const updatedCoupon = await couponModel.findByIdAndUpdate(id, req.body, {
//     new: true,
//   });

//   if (!updatedCoupon) {
//     return res.status(404).json({ message: "Coupon not found." });
//   }

//   res.status(200).json(updatedCoupon);
// });

// const updateCoupon = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongoDbId(id);

//   if (req.body.type === 'freeShipping') {
//     delete req.body.discountValue;
//   }

//   const updatedCoupon = await couponModel.findByIdAndUpdate(id, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   if (!updatedCoupon) {
//     return res.status(404).json({ message: "Coupon not found." });
//   }

//   res.status(200).json(updatedCoupon);
// });


// const updateCoupon = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongoDbId(id);

//   // إذا كان النوع 'freeShipping'، نحذف discountValue
//   if (req.body.type === 'freeShipping') {
//     delete req.body.discountValue;
//   }

//   // إذا كان النوع قد تغير إلى 'fixed' أو 'percentage'، نتحقق إذا كان discountValue موجودًا
//   if ((req.body.type === 'fixed' || req.body.type === 'percentage') && !req.body.discountValue) {
//     return res.status(400).json({ message: "Discount value is required for 'fixed' or 'percentage' coupon types." });
//   }

//   // إذا تم تعديل النوع من 'freeShipping' إلى 'fixed' أو 'percentage'، نحتاج لإضافة discountValue مرة أخرى
//   if (req.body.type !== 'freeShipping' && !req.body.discountValue) {
//     const existingCoupon = await couponModel.findById(id);
//     if (existingCoupon && (existingCoupon.type === 'fixed' || existingCoupon.type === 'percentage')) {
//       req.body.discountValue = existingCoupon.discountValue; // إعادة استخدام القيمة القديمة إذا كانت موجودة
//     }
//   }

//   // تحديث الكوبون في قاعدة البيانات
//   const updatedCoupon = await couponModel.findByIdAndUpdate(id, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   if (!updatedCoupon) {
//     return res.status(404).json({ message: "Coupon not found." });
//   }

//   // إرجاع الكوبون المحدث
//   res.status(200).json(updatedCoupon);
// });


// Delete Coupon
const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const deletedCoupon = await couponModel.findByIdAndDelete(id);
  if (!deletedCoupon) {
    return res.status(404).json({ message: "Coupon not found." });
  }

  res.status(200).json({ message: "Coupon deleted successfully.", deletedCoupon });
});

// Get Single Coupon
const getCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const coupon = await couponModel.findById(id);
  if (!coupon) {
    return res.status(404).json({ message: "Coupon not found." });
  }

  res.status(200).json(coupon);
});

// Get All Coupons
const getAllCoupons = asyncHandler(async (req, res) => {
  const coupons = await couponModel.find();
  res.status(200).json(coupons);
});


// Apply Coupon
// const applyCoupon = asyncHandler(async (req, res) => {
//   const { couponCode, userId, cartTotal } = req.body;

//   // Check if the coupon exists
//   const coupon = await couponModel.findOne({ code: couponCode });
//   if (!coupon) {
//     return res.status(404).json({ message: "Coupon not found." });
//   }

//   // Check if coupon is within the valid date range
//   const currentDate = new Date();
//   if (currentDate < coupon.startDate || currentDate > coupon.endDate) {
//     return res.status(400).json({ message: "Coupon has expired." });
//   }

//   // Check if the usage limit has been reached
//   if (coupon.usageLimit <= 0) {
//     return res.status(400).json({ message: "Coupon usage limit reached." });
//   }

//   // Check if the user has already used this coupon
//   const userUsedCoupon = await couponUsageModel.findOne({ couponId: coupon._id, userId });
//   if (userUsedCoupon) {
//     return res.status(400).json({ message: "You have already used this coupon." });
//   }

//   // Apply coupon discount to the cart
//   let discount = 0;
//   if (coupon.type === "percentage") {
//     discount = (coupon.discountValue / 100) * cartTotal;
//   } else if (coupon.type === "fixed") {
//     discount = coupon.discountValue;
//   }

//   // Reduce the usage limit by 1
//   coupon.usageLimit -= 1;
//   await coupon.save();

//   // Record coupon usage
//   await couponUsageModel.create({
//     couponId: coupon._id,
//     userId,
//   });

//   // Return the applied discount and remaining usage limit
//   res.status(200).json({
//     message: "Coupon applied successfully!",
//     discount,
//     remainingUsage: coupon.usageLimit,
//   });
// });

const applyCoupon = asyncHandler(async (req, res) => {
  const { couponCode, cartTotal } = req.body;
  const userId = req.user._id;
  const total = parseFloat(cartTotal);

  // Check if the coupon exists
  const coupon = await couponModel.findOne({ code: couponCode });
  if (!coupon) {
    return res.status(404).json({ message: "Coupon not found." });
  }

  // Check validity dates
  const currentDate = new Date();
  if (currentDate < coupon.startDate || currentDate > coupon.endDate) {
    return res.status(400).json({ message: "Coupon has expired." });
  }

  // Check usage limit
  if (coupon.usageLimit <= 0) {
    return res.status(400).json({ message: "Coupon usage limit reached." });
  }

  // Check if the user already used it
  const alreadyUsed = await couponUsageModel.findOne({
    couponId: coupon._id,
    userId,
  });

  if (alreadyUsed) {
    return res.status(400).json({ message: "You have already used this coupon." });
  }

  // Calculate discount
  let discount = 0;
  if (coupon.type === "percentage") {
    discount = (coupon.discountValue / 100) * total;
  } else if (coupon.type === "fixed") {
    discount = Math.min(coupon.discountValue, total);
  } else if (coupon.type === "freeShipping") {
    discount = 0; // Let shipping logic handle this
  }

  // Update usage limit
  coupon.usageLimit -= 1;
  await coupon.save();

  // Record usage
  await couponUsageModel.create({ couponId: coupon._id, userId });

  // Respond
  res.status(200).json({
    message: "Coupon applied successfully!",
    discount,
    remainingUsage: coupon.usageLimit,
  });
});


/*
const applyCoupon = asyncHandler(async (req, res) => {
  const { couponCode, cartTotal } = req.body;
  const userId = req.user._id;
  const total = parseFloat(cartTotal);

  // Check if the coupon exists
  const coupon = await couponModel.findOne({ code: couponCode });
  if (!coupon) {
    return res.status(404).json({ message: "Coupon not found." });
  }

  // Check validity dates
  const currentDate = new Date();
  if (currentDate < coupon.startDate) {
    return res.status(400).json({ message: `Coupon not valid yet. Valid from ${coupon.startDate}.` });
  }
  if (currentDate > coupon.endDate) {
    return res.status(400).json({ message: "Coupon has expired." });
  }

  // Check usage limit
  if (coupon.usageLimit <= 0) {
    return res.status(400).json({ message: "Coupon usage limit reached." });
  }

  // Check if the user already used it
  const alreadyUsed = await couponUsageModel.findOne({
    couponId: coupon._id,
    userId,
  });

  if (alreadyUsed) {
    return res.status(400).json({ message: "You have already used this coupon." });
  }

  // Calculate discount
  let discount = 0;
  if (coupon.type === "percentage") {
    discount = (coupon.discountValue / 100) * total;
  } else if (coupon.type === "fixed") {
    discount = Math.min(coupon.discountValue, total);
  } else if (coupon.type === "freeShipping") {
    // Shipping handled separately
    discount = 0;
  }

  // Update usage limit and save coupon
  coupon.usageLimit -= 1;
  await coupon.save();

  // Record usage
  await couponUsageModel.create({ couponId: coupon._id, userId });

  // Apply discount to cart
  const cart = await Cart.findOne({ orderBy: userId });
  if (!cart) {
    return res.status(404).json({ message: "Cart not found." });
  }

  cart.totalAfterDiscount = total - discount;
  cart.appliedCoupon = couponCode;

  if (coupon.type === "freeShipping") {
    cart.freeShipping = true; // Optional, handle this flag in the shipping logic
  }

  await cart.save();

  res.status(200).json({
    message: "Coupon applied successfully!",
    discount,
    remainingUsage: coupon.usageLimit,
    totalAfterDiscount: cart.totalAfterDiscount,
  });
});

*/


module.exports = {
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getCoupon,
  getAllCoupons,
  applyCoupon,
};


