const express = require('express');
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const couponControllers = require('../controllers/couponControllers');

// Route to create a coupon
router.post(
  '/create-coupon',
  authMiddleware,
  isAdmin,
  couponControllers.createCoupon
);

// Route to update a coupon
router.put(
  '/update-coupon/:id',
  authMiddleware,
  isAdmin,
  couponControllers.updateCoupon
);

// Route to delete a coupon
router.delete(
  '/delete-coupon/:id',
  authMiddleware,
  isAdmin,
  couponControllers.deleteCoupon
);

// Route to get a single coupon
router.get(
  '/get-coupon/:id',
  authMiddleware,
  isAdmin,
  couponControllers.getCoupon
);

// Route to get all coupons
router.get(
  '/all-coupons',
  authMiddleware,
  isAdmin,
  couponControllers.getAllCoupons
);


router.post("/apply-coupon",authMiddleware,couponControllers.applyCoupon);


module.exports = router;
