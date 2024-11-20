const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Define routes for expense-related operations
router.post('/submit', expenseController.submitExpense);  // For submitting an expense
router.get('/pending', expenseController.getPendingExpenses);  // For HR to view pending claims

module.exports = router;
