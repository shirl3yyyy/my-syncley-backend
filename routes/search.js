const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

router.get("/", async (req, res) => {
  try {
    const { category, query } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (query) filter.title = { $regex: query, $options: "i" };

    const results = await Project.find(filter)
      .select("title description price image rating")
      .limit(30);

    res.json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
