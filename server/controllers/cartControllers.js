const Cart = require('../models/cartModel');
const Product = require('../models/productModel');


/*
const Coupon = require('../models/couponModel');
const addToCart = async (req, res) => {
  const { products, couponCode } = req.body;
  const userId = req.user._id;

  try {
    await Cart.findOneAndDelete({ orderBy: userId });

    let cartProducts = [];
    let cartTotal = 0;

    for (let item of products) {
      const product = await Product.findById(item.product);
      if (!product) throw new Error('Product not found');

      cartProducts.push({
        product: product._id,
        count: item.count,
        price: product.price,
      });

      cartTotal += product.price * item.count;
    }

    let totalAfterDiscount = undefined;

    if (couponCode) {
      const coupon = await Coupon.findOne({
        code: couponCode,
        status: 'active',
        startDate: { $lte: new Date() },
        endDate: { $gte: new Date() },
      });

      if (!coupon) {
        return res.status(400).json({ error: 'Invalid or expired coupon' });
      }

      // Apply discount based on coupon type
      if (coupon.type === 'percentage') {
        totalAfterDiscount = cartTotal - (cartTotal * coupon.discountValue) / 100;
      } else if (coupon.type === 'fixed') {
        totalAfterDiscount = cartTotal - coupon.discountValue;
      } else {
        totalAfterDiscount = cartTotal;
      }

      // Prevent negative total
      if (totalAfterDiscount < 0) totalAfterDiscount = 0;
    }

    const newCart = await new Cart({
      products: cartProducts,
      cartTotal,
      totalAfterDiscount,
      orderBy: userId,
    }).save();

    res.json(newCart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

*/


const addToCart = async (req, res) => {
  const { products } = req.body;
  const userId = req.user._id;

//   [
//     { product: "productId1", count: 2 },
//     { product: "productId2", count: 1 }
//   ]
  

  try {
    // Remove previous cart if exists
    await Cart.findOneAndDelete({ orderBy: userId });

    let cartProducts = [];
    let cartTotal = 0;

    for (let item of products) {
      const product = await Product.findById(item.product);
      if (!product) throw new Error('Product not found');

      cartProducts.push({
        product: product._id,
        count: item.count,
        price: product.price,
      });

      cartTotal += product.price * item.count;
    }

    const newCart = await new Cart({
      products: cartProducts,
      cartTotal,
      orderBy: userId,
    }).save();

    res.json(newCart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ orderBy: req.user._id }).populate('products.product', 'productName price');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const removeItemFromCart = async (req, res) => {
    const { productId } = req.params; // the product ID to be removed
    const userId = req.user._id;
  
    try {
      const cart = await Cart.findOne({ orderBy: userId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      // Remove the product from the cart
      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );
  
      if (productIndex !== -1) {
        cart.products.splice(productIndex, 1); // Remove the product
      }
  
      // Recalculate the cart total
      cart.cartTotal = cart.products.reduce((total, item) => total + item.price * item.count, 0);
  
      // Save the updated cart
      await cart.save();
  
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

const emptyCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const deletedCart = await Cart.findOneAndDelete({ orderBy: userId });
    res.json({ message: 'Cart emptied', deletedCart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*
// 5. Applying a Coupon to the Cart
// If you want to apply a coupon to the cart (which affects the total cost):

const applyCoupon = async (req, res) => {
  const { couponCode } = req.body;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ orderBy: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const coupon = await Coupon.findOne({ code: couponCode });

    if (!coupon || coupon.status !== 'Active') {
      return res.status(400).json({ message: 'Invalid or inactive coupon' });
    }

    const currentDate = new Date();
    if (currentDate < coupon.startDate || currentDate > coupon.endDate) {
      return res.status(400).json({ message: 'Coupon has expired' });
    }

    // Apply the discount
    let discount = 0;
    if (coupon.type === 'percentage') {
      discount = (coupon.discountValue / 100) * cart.cartTotal;
    } else if (coupon.type === 'fixed') {
      discount = Math.min(coupon.discountValue, cart.cartTotal);
    }

    // Update cart with the applied coupon and discounted total
    cart.appliedCoupon = couponCode;
    cart.totalAfterDiscount = cart.cartTotal - discount;

    await cart.save();

    res.json({
      message: 'Coupon applied successfully',
      discount,
      totalAfterDiscount: cart.totalAfterDiscount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

*/


module.exports = {
  addToCart,
  getUserCart,
  removeItemFromCart,
  emptyCart,
};



