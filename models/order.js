const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const { productSchema } = require('./product');

const { Schema } = mongoose;

const orderSchema = new Schema({
  orderNumber: {
    type: String,
    default: uuidv4,
    required: true,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: null,
    required: false,
  },
  deletedAt: {
    type: Date,
    default: null,
    required: false,
  },
  total: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  products: {
    type: [productSchema],
    required: true,
  },
});

module.exports = mongoose.model('Order', orderSchema);
