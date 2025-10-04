const express = require('express');
const router = express.Router();
const Job = require('../models/Jobs');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    const newJob = new Job({
      title,
      description,
      postedBy: req.user.id,
    });

    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'name email role');
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name email role');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;