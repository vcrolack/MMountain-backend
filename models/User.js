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
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['superuser', 'maintainer', 'client'],
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
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    sparse: true
  },
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
