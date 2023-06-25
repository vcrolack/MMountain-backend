const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    address: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    region: {
      type: String,
      required: true
    },
    zip: {
      type: String,
      required: true
    },
    houseOrDept: {
      type: String,
      required: true
    },
    numberDept: {
      type: String,
      required: true
    }
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['superuser', 'maintainer', 'client'],
    default: 'client'
  },
  birthdate: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['masculino', 'femenino', 'otro'],
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
    default: Date.now
  },
  deleted_at: {
    type: Date,
    default: null
  },
  sports: {
    mountainSports: {
      type: [String],
      enum: ['mountain biking', 'rock climbing', 'hiking', 'trail running', 'trekking'],
      default: undefined
    },
    snowSports: {
      type: [String],
      enum: ['skiing', 'snowboarding', 'snowshoeing', 'ice climbing'],
      default: undefined
    },
    inhouseSports: {
      type: [String],
      enum: ['yoga', 'pilates', 'HIIT', 'bodyweight training'],
      default: undefined
    },
    watersports: {
      type: [String],
      enum: ['natación', 'surf', 'kayak', 'buceo'],
      default: undefined
    }
  }
});

UserSchema.pre('save', function(next) { // Este metodo es un middleware de Mongoose que se
  let now = Date.now(); // ejecuta antes de guardar un documento. En este caso, se utiliza
  this.updated_at = now; // para actualizar los campos created_at y updated_at automáticamente.
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);
