const express = require('express');
const router = express.Router();
const accommodationController = require('../controllers/accommodationController'); // Controller file

// POST route for submitting accommodation expense
router.post('/submit', accommodationController.submitAccommodationExpense);

module.exports = router;
