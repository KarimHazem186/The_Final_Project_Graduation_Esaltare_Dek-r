const express = require('express');
const { addToCart, getUserCart, emptyCart } = require('../controllers/cartController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add-to-cart', authMiddleware, addToCart);
router.get('/get-cart', authMiddleware, getUserCart);
router.delete('/empty-cart', authMiddleware, emptyCart);

module.exports = router;
