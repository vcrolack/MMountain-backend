const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  orderNumber: {
    type: Number,
    default: () => Math.floor(Math.random() * 1000000), // Genera un número aleatorio
    required: true,
    unique: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  address: {
    type: Schema.Types.ObjectId,
    ref: 'Customer.address',
    required: true
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: 'Customer.state',
    required: true
  },
  region: {
    type: Schema.Types.ObjectId,
    ref: 'Customer.region',
    required: true
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }]
});

module.exports = mongoose.model('Order', orderSchema);
