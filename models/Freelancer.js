// models/Freelancer.js
const mongoose = require('mongoose');

const FreelancerSchema = new mongoose.Schema({
  name: String,
  role: String,
  rating: Number,
  skills: [String],
  img: String,
});

module.exports = mongoose.model('Freelancer', FreelancerSchema);
