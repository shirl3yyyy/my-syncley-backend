const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: Number,
  category: String,
  image: String,
  rating: Number
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
