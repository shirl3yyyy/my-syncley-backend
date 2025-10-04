const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: false, // ✅ not required for Google users
  },

  googleId: {
    type: String,
    unique: true,
    sparse: true, // ✅ allows multiple nulls
  },

  profileImage: {
    type: String, // ✅ store Google avatar
  },

  role: {
    type: String,
    enum: ['admin', 'client', 'freelancer'],
    default: 'client',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
