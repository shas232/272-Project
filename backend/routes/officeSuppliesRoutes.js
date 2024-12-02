const express = require('express');
const router = express.Router();
const officeSuppliesController = require('../controllers/officeSuppliesController'); // Controller file

// POST route for submitting office supplies expense
router.post('/submit', officeSuppliesController.submitOfficeSuppliesExpense);

module.exports = router;
