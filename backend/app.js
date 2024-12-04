const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const connectDB = require('./config/config'); // MongoDB connection setup

// Import routes
const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes = require('./routes/userRoutes');
const travelRoutes = require('./routes/travelRoutes');
const accommodationRoutes = require('./routes/accommodationRoutes'); // Accommodation routes
const officeSuppliesRoutes = require('./routes/officeSuppliesRoutes');
const mealsRoutes = require('./routes/mealsRoutes');
const trainingRoutes = require('./routes/trainingRoutes');

const app = express();


// Middleware setup
// app.use(cors());
app.use(
    cors({
      origin: "http://3.90.114.66:5173", // Replace with your frontend URL
    })
  );
  
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Setup routes
app.use('/api/expenses', expenseRoutes);  // Expense-related routes
app.use('/api/users', userRoutes);        // User-related routes (HR/Employee)

// Use the travel routes
app.use('/api/travel', travelRoutes);
app.use('/api/officeSupplies', officeSuppliesRoutes);
app.use('/api/training', trainingRoutes);

app.use('/api/meals', mealsRoutes);
// Use the accommodation routes
app.use('/api/accommodation', accommodationRoutes); // Accommodation-related routes

// Export app (for testing or use in server.js)
module.exports = app;

