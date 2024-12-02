const express = require('express');
const router = express.Router();
const mealsController = require('../controllers/mealsController'); // Controller file

// POST route for submitting meals expense
router.post('/submit', mealsController.submitMealsExpense);

module.exports = router;
