const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
    isFraudulent: { type: Boolean, required: true },
    explanation: { type: String, required: true },
  });

const travelSchema = new mongoose.Schema({
  departureLocation: { type: String, required: true },
  destination: { type: String, required: true },
  departureDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  transportationType: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  purpose: { type: String, required: true },
  receipts: { type: [String], default: [] }, // Store file paths or URLs for receipts
  analysis: { type: analysisSchema, default: { isFraudulent: false, explanation: 'Not analyzed yet' } },
});

const Travel = mongoose.model('Travel', travelSchema);
module.exports = Travel;
