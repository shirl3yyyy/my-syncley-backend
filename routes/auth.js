const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Sign in
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashed, role });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ token, user: { id: newUser._id, name: newUser.name, role: newUser.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login 
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.password) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Google Login
router.post('/google-login', async (req, res) => {
  const { email, googleId, name, picture } = req.body;

  if (!email || !googleId) {
    return res.status(400).json({ message: 'Missing Google credentials' });
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      user = new User({
        name,
        email,
        googleId,
        profileImage: picture,
        role: 'client', // or default role like 'freelancer' if needed
      });
      await user.save();
    } else if (!user.googleId) {
      // Link Google ID if not already set
      user.googleId = googleId;
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (err) {
    console.error('Google login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


/* router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    message: 'Protected route access granted',
    user: req.user,
  });
}); */


router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
