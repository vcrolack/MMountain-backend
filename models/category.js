const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['mountain biking', 'rock climbing', 'hiking', 'mountain running', 'trekking', 'skiing', 'snowboarding', 'snowshoeing', 'ice climbing', 'yoga', 'pilates', 'HIIT', 'bodyweight training', 'natación', 'surf', 'kayak', 'buceo'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['fácil', 'intermedio', 'difícil'],
    required: true
  },
  risk: {
    type: String,
    enum: ['bajo', 'moderado', 'alto'],
    required: true
  },
  season: {
    type: String,
    enum: ['primavera', 'verano', 'otoño', 'invierno'],
    required: true
  },
  places: {
    type: String,
    enum: ['montaña', 'agua', 'nieve', 'casa'],
    required: true
  },
  img: {
    type: String,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: null
  },
  deleted_at: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model('Category', categorySchema);
