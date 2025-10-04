const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');
const freelancersRoute = require('./routes/freelancers');
const profileRoute = require('./routes/profile');

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',  
  credentials: true
}));


app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/freelancers', freelancersRoute);
app.use('/api/profile', profileRoute);

app.get("/", (req, res) => {
  res.send("API is running...");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
