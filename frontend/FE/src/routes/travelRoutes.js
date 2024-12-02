const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travelController');

// POST route for submitting a travel expense
router.post('/submit', travelController.submitTravelExpense);

module.exports = router;
