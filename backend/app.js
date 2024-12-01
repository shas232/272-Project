const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/config'); // MongoDB connection setup

// Import routes
const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes = require('./routes/userRoutes');
const travelRoutes = require('./routes/travelRoutes');

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Setup routes
app.use('/api/expenses', expenseRoutes);  // Expense-related routes
app.use('/api/users', userRoutes);        // User-related routes (HR/Employee)

// Use the travel routes
app.use('/api/travel', travelRoutes);


// Export app (for testing or use in server.js)
module.exports = app;
