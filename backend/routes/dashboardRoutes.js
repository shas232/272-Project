const express = require('express');
const { getDashboardStats } = require('../controllers/dashboardController');


const router = express.Router();

// Route to fetch dashboard stats
router.get('/dashboard-stats', getDashboardStats);



module.exports = router;