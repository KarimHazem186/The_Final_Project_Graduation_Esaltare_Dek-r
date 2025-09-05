const express = require('express');
// const { getMyDeliveries } = require('../controllers/deliveryControllers');
const { authMiddleware, isDelivery } = require('../middlewares/authMiddleware');
const { getMyDeliveries, updateDeliveryStatus } = require('../controllers/delivaryControllers');
const router = express.Router();

router.get("/deliveries", authMiddleware, isDelivery, getMyDeliveries);
router.put("/deliveries/status", authMiddleware, isDelivery, updateDeliveryStatus);

module.exports = router;
