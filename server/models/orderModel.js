const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        count: Number,
        price: Number,
      },
    ],
    shippingInfo: {
      address: String,
      city: String,
      country: String,
      zipCode: String,
    },
    orderTotal: Number,
    totalAfterDiscount: Number,
    orderBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending', // Default value is 'Pending'
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);



/*
{
  "message": "Order status updated to Shipped",
  "order": {
    "_id": "orderId",
    "status": "Shipped",
    "products": [
      {
        "product": "productId",
        "count": 2,
        "price": 100
      }
    ],
    "orderTotal": 200,
    "orderBy": {
      "_id": "userId",
      "name": "User Name",
      "email": "user@example.com"
    },
    "createdAt": "2025-05-07T12:00:00.000Z",
    "updatedAt": "2025-05-07T12:30:00.000Z"
  }
}

*/


// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema(
//   {
//     products: [
//       {
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: 'Product',
//           required: true,
//         },
//         count: {
//           type: Number,
//           required: true,
//         },
//         price: {
//           type: Number,
//           required: true,
//         },
//       },
//     ],
//     paymentIntent: {
//       id: String,
//       method: String,
//       amount: Number,
//       status: String,
//       created: Date,
//       currency: String,
//     },
//     orderStatus: {
//       type: String,
//       enum: ['Not Processed', 'Processing', 'Dispatched', 'Delivered', 'Cancelled'],
//       default: 'Not Processed',
//     },
//     orderBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     totalAmount: {
//       type: Number,
//       required: true,
//     },
//     shippingAddress: {
//       fullName: String,
//       addressLine1: String,
//       addressLine2: String,
//       city: String,
//       state: String,
//       postalCode: String,
//       country: String,
//       phone: String,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model('Order', orderSchema);



// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema(
//   {
//     products: [
//       {
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: 'Product',
//           required: true,
//         },
//         count: {
//           type: Number,
//           required: true,
//         },
//         price: {
//           type: Number,
//           required: true, // Snapshot of product price at the time of order
//         },
//       },
//     ],
//     orderBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     paymentIntent: {
//       id: String,
//       method: String, // e.g., "Cash on Delivery", "Credit Card"
//       status: String,
//       created: Date,
//       amount: Number,
//       currency: {
//         type: String,
//         default: 'USD',
//       },
//     },
//     shippingAddress: {
//       address: String,
//       city: String,
//       country: String,
//       postalCode: String,
//       phone: String,
//     },
//     orderStatus: {
//       type: String,
//       enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
//       default: 'Pending',
//     },
//     cartTotal: {
//       type: Number,
//       required: true,
//     },
//     totalAfterDiscount: {
//       type: Number,
//     },
//   },
//   {
//     timestamps: true, // createdAt and updatedAt
//   }
// );

// module.exports = mongoose.model('Order', orderSchema);
