const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  dimensions: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  material: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  img: {
    type: String,
    default: null
  },
  fabricant: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  deleted_at: {
    type: Date,
    default: null
  },
  recommended_age: {
    type: String,
    required: true
  },
  recommended_genre: {
    type: String,
    enum: ['niño', 'niña', 'hombre', 'mujer'],
    required: true
  }
});

productSchema.pre('save', function(next) {
  let now = Date.now();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

module.exports = mongoose.model('product', productSchema);
