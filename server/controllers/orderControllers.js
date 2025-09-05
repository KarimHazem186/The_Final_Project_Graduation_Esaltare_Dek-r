const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');
const User = require('../models/userModel'); // assuming you have a User model

// Create Order from Cart
const createOrder = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user is authenticated
    const { paymentIntent, shippingAddress } = req.body;

    // 1. Get user's cart
    const cart = await Cart.findOne({ orderBy: userId }).populate('products.product');
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // 2. Build products array for order (snapshot)
    const orderProducts = cart.products.map((item) => ({
      product: item.product._id,
      count: item.count,
      price: item.price, // from cart snapshot
    }));

    // 3. Create new order
    const newOrder = new Order({
      products: orderProducts,
      orderBy: userId,
      paymentIntent: {
        id: paymentIntent?.id || `cash_${Date.now()}`,
        method: paymentIntent?.method || 'Cash on Delivery',
        status: paymentIntent?.status || 'Not Paid',
        amount: paymentIntent?.amount || cart.totalAfterDiscount || cart.cartTotal,
        created: new Date(),
      },
      shippingAddress,
      cartTotal: cart.cartTotal,
      totalAfterDiscount: cart.totalAfterDiscount || undefined,
    });

    await newOrder.save();

    // 4. Optionally: clear the cart after order
    await Cart.findOneAndDelete({ orderBy: userId });

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ message: 'Failed to create order', error: err.message });
  }
};


// Get orders for the current user
const getUserOrders = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const orders = await Order.find({ orderBy: userId })
        .populate('products.product', 'productName price images') // show product info
        .sort('-createdAt'); // latest first
  
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching user orders:', error);
      res.status(500).json({ message: 'Failed to get orders' });
    }
  };
  


  const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find()
        .populate('orderBy', 'name email')
        .populate('products.product', 'productName price images');
  
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching all orders:', error);
      res.status(500).json({ message: 'Failed to retrieve orders' });
    }
  };
  

  const getOrderById = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id)
        .populate('orderBy', 'name email')
        .populate('products.product', 'productName price images');
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Make sure the user owns the order or is admin
      if (order.orderBy._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to view this order' });
      }
  
      res.status(200).json(order);
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({ message: 'Failed to retrieve order' });
    }
  };
  


  const updateOrderStatus = async (req, res) => {
    const { status } = req.body;
  
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }
  
    try {
      const order = await Order.findById(req.params.id);
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Check if the order already has the same status
      if (order.status === status) {
        return res.status(400).json({ message: 'Order already has this status' });
      }
  
      // Update the order status
      order.status = status;
  
      // Save the updated order
      await order.save();
  
      res.status(200).json({
        message: `Order status updated to ${status}`,
        order,
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ message: 'Failed to update order status' });
    }
  };
  

module.exports = { createOrder, getUserOrders, getOrderById,getAllOrders,updateOrderStatus };
