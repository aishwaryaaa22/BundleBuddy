
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  }
});

// Location based search ke liye index zaroori hai
userSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', userSchema);