const mongoose = require('mongoose');

// Define the schema for storing analysis information from OpenAI
const analysisSchema = new mongoose.Schema({
  isFraudulent: { type: Boolean, required: true },
  explanation: { type: String, required: true },
});

// Define the schema for storing accommodation expense details
const accommodationSchema = new mongoose.Schema({
  location: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  accommodationType: { type: String, required: true },
  hotelName: { type: String, required: true },
  numberOfGuests: { type: Number, required: true, min: 1 },
  totalAmount: { type: Number, required: true, min: 0 },
  purpose: { type: String, required: true },
  receipts: { type: [String], default: [] }, // Store file paths or URLs for receipts
  analysis: { type: analysisSchema, default: { isFraudulent: false, explanation: 'Not analyzed yet' } },
});

const Accommodation = mongoose.model('Accommodation', accommodationSchema);

module.exports = Accommodation;
