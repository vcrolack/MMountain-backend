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
  state: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
  },
  region: {
    type: String,
    minlength: 2,
    maxlength:50,
    required: true,
  },
  zip: {
    type: String,
    minlength: 4,
    maxlength:15,
    required: true,
  },
  houseOrDept: {
    type: String,
    minlength: 1,
    maxlength: 15,
    required: true,
  },
  numberDept: {
    type: String,
    minlength: 1,
    maxlength: 15,
    required: true,
  },
  products: {
    type: [Schema.Types.ObjectId],
    required: true,
  },

});

module.exports = mongoose.model('Order', orderSchema);
