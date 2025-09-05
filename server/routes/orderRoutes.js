const express = require('express');
const router = express.Router();
const { createOrder,getAllOrders, getUserOrders, getOrderById,updateOrderStatus  } = require('../controllers/orderControllers');
const {  authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

// Create order (from cart)
router.post('/create', authMiddleware, createOrder);
router.get('/admin/all-orders',authMiddleware ,isAdmin, getAllOrders);
router.get('/admin/order/:id',authMiddleware ,isAdmin, getUserOrders);
router.get('/:id', authMiddleware, getOrderById);
router.put('/admin/order/:id/status', authMiddleware, isAdmin, updateOrderStatus);

module.exports = router;



// POST /api/orders/create
// Authorization: Bearer <token>
// Body:
// {
//   "paymentIntent": {
//     "id": "pay_123456",
//     "method": "Credit Card",
//     "status": "Paid",
//     "amount": 300
//   },
//   "shippingAddress": "Cairo, Egypt"
// }
