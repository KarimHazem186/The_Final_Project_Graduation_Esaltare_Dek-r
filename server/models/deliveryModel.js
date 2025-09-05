const mongoose = require('mongoose');
const userSchema = require('./userModel').schema;

const deliverySchema = new mongoose.Schema({
  ...userSchema.obj,
  vehicleNumber: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('DeliveryMan', deliverySchema);
