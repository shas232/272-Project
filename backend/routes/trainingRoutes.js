const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/trainingController'); // Controller file
const cookieParser = require("cookie-parser");

// POST route for submitting training data
router.post('/submit', trainingController.submitTraining);

module.exports = router;
