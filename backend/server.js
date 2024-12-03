const app = require('./app');  // Import the app configuration from app.js
const cors = require('cors');
// const connectDB = require('./config/config');
// Environment variable for the port, defaulting to 5000
// connectDB();
const PORT = 5008;
// app.use(cors());
app.use(cors());

const express = require('express');
const travelRoutes = require('./routes/travelRoutes');
const accommodationRoutes= require('./routes/accommodationRoutes');
const officeSuppliesRoutes = require('./routes/officeSuppliesRoutes');
const mealsRoutes = require('./routes/mealsRoutes');
const trainingRoutes= require('./routes/trainingRoutes')
const User = require("../backend/models/User");


app.use(express.json()); // For parsing JSON requests
app.use('/api/travel', travelRoutes);
app.use('/api/accommodation', accommodationRoutes);
app.use('/api/officeSupplies', officeSuppliesRoutes);
app.use('/api/meals', mealsRoutes);
app.use('/api/training', trainingRoutes);

app.get("/api/expenses/:email", async (req, res) => {
  const { email } = req.params;
  console.log("hello-s------->",email)
  res.setHeader("Content-Type", "application/json"); 
  try {
    const user = await User.findOne({ email: email });
    if (user && user.expenses) {
      // res.setHeader("Content-Type", "application/json"); // Explicitly set JSON content type
      return res.json({ success: true, expenses: user.expenses.history });
    }
    res.status(404).json({ success: false, message: "User or expenses not found" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
});



// Function to log all active routes
const logRoutes = (app) => {
  const paths = [];
  app._router.stack.forEach((middleware) => {
    if (middleware.route) { // Only look for actual routes
      const method = Object.keys(middleware.route.methods)[0].toUpperCase();
      const path = middleware.route.path;
      paths.push(`${method} ${path}`);
    }
  });
  console.log("Active routes:");
  paths.forEach(path => console.log(path));
};
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
