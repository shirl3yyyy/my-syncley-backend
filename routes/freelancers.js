// routes/freelancers.js
const express = require('express');
const router = express.Router();
const Freelancer = require('../models/Freelancer');

// GET /api/freelancers
router.get('/', async (req, res) => {
  try {
    const freelancers = await Freelancer.find();
    res.json(freelancers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
