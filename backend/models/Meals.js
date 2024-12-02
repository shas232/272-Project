const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  isFraudulent: { type: Boolean, required: true },
  explanation: { type: String, required: true },
});

const mealsSchema = new mongoose.Schema({
  restaurantName: { type: String, required: true },
  date: { type: Date, required: true },
  numberOfAttendees: { type: Number, required: true },
  attendeeNames: { type: String, required: true },
  mealType: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  purpose: { type: String, required: true },
  receipts: { type: [String], default: [] }, // Store file paths or URLs for receipts
  analysis: { type: analysisSchema, default: { isFraudulent: false, explanation: 'Not analyzed yet' } },
});

const Meals = mongoose.model('Meals', mealsSchema);
module.exports = Meals;
