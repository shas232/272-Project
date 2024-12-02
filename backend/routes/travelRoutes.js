const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travelController'); // Controller file

// POST route for submitting travel expense
router.post('/submit', travelController.submitTravelExpense);

module.exports = router;
