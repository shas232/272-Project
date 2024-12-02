const app = require('./app');  // Import the app configuration from app.js
const cors = require('cors');
// Environment variable for the port, defaulting to 5000

const PORT = 5008;
app.use(cors());

const express = require('express');
const travelRoutes = require('./routes/travelRoutes');
const accommodationRoutes= require('./routes/accommodationRoutes');
const officeSuppliesRoutes = require('./routes/officeSuppliesRoutes');
const mealsRoutes = require('./routes/mealsRoutes');
const trainingRoutes= require('./routes/trainingRoutes')


app.use(express.json()); // For parsing JSON requests
app.use('/api/travel', travelRoutes);
app.use('/api/accommodation', accommodationRoutes);
app.use('/api/officeSupplies', officeSuppliesRoutes);
app.use('/api/meals', mealsRoutes);
app.use('/api/training', trainingRoutes);



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
