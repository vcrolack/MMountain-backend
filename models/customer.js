const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  address: {
    address: {
      type: String,
      minlength: 5,
      maxlength: 70,
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
  },
  birthdate: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['masculino', 'femenino'],
    required: true,
  },
  phone: {
    type: String,
    match: /^[0-9]{9}$/,
    required: true,
  },
  sports: {
    mountainSports: {
      type: [String],
      enum: [
        'mountain biking',
        'rock climbing',
        'hiking',
        'trail running',
        'trekking',
      ],
      default: null,
    },
    snowSports: {
      type: [String],
      enum: ['skiing', 'snowboarding', 'snowshoeing', 'ice climbing'],
      default: null,
    },
    inhouseSports: {
      type: [String],
      enum: ['yoga', 'pilates', 'HIIT', 'bodyweight training'],
      default: null,
    },
    waterSports: {
      type: [String],
      enum: ['natación', 'surf', 'kayak', 'buceo'],
      default: null,
    },
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
});

CustomerSchema.pre('save', function(next) { // Este metodo es un middleware de Mongoose que se
  let now = Date.now(); // ejecuta antes de guardar un documento. En este caso, se utiliza
  this.updated_at = now; // para actualizar los campos created_at y updated_at automáticamente.
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

module.exports = mongoose.model('Customer', CustomerSchema);
