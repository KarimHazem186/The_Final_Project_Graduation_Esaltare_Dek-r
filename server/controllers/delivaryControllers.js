const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

// جلب الطلبات المخصصة للمندوب
const getMyDeliveries = asyncHandler(async (req, res) => {
  const orders = await Order.find({ deliveryManId: req.user._id });
  res.status(200).json(orders);
});

// تحديث حالة التوصيل (مثلاً: تم التسليم)
const updateDeliveryStatus = asyncHandler(async (req, res) => {
  const { orderId, status } = req.body;

  const order = await Order.findById(orderId);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  if (order.deliveryManId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to update this order");
  }

  order.status = status;
  await order.save();

  res.status(200).json(order);
});

module.exports = {
  getMyDeliveries,
  updateDeliveryStatus,
};
