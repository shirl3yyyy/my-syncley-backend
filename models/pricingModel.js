const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  plan: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Pricing = mongoose.model("Pricing", pricingSchema);

module.exports = Pricing;
