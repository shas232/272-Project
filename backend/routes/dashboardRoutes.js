const express = require('express');
const { getDashboardStats } = require('../controllers/dashboardController');
const {getMonthlyExpenseStats} = require('../controllers/dashboardController');
const {getMonthlyFraudStats} = require("../controllers/dashboardController");
const {getMonthlyFraudStatsByCategory} = require("../controllers/dashboardController")
const User = require('../models/User');


const router = express.Router();

// Route to fetch dashboard stats
router.get('/dashboard-stats', getDashboardStats);
router.get('/getMonthlyExpenseStats',getMonthlyExpenseStats );
router.get('/getMonthlyFraudStats',getMonthlyFraudStats);
router.get('/monthly-fraud-category', getMonthlyFraudStatsByCategory);
router.get('/users', async (req, res) => {
    try {
      // const users = await User.find(); // Fetch all users
      const users = await User.find({ role: { $ne: 'hr' } });
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });


module.exports = router;