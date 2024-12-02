const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Verify these routes
router.get('/pending', expenseController.getPendingExpenses);
router.post('/submit', expenseController.submitExpense);

module.exports = router;
