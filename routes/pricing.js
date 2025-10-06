const express = require("express");
const PricingModel = require("../models/PricingModel");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, plan } = req.body;

    const newPricing = new PricingModel({ name, email, phone, plan });
    await newPricing.save();

    res.json({ message: "✅ Data saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Server error" });
  }
});

module.exports = router;
