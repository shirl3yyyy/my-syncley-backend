// routes/freelancers.js
const express = require('express');
const router = express.Router();
const Freelancer = require('../models/Freelancer');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/profile
router.get('/me', authMiddleware, async (req, res) => {
  try {
    // req.user.id comes from your decoded JWT
    const user = await User.findById(req.user.id).select('-password'); // exclude password

    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
