const mongoose = require('mongoose');
const Cookies = require("js-cookie");

// Define the schema for the Training model
const trainingSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
    required: true,
  },
  providerName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  trainingType: {
    type: String,
    required: true,
  },
  businessPurpose: {
    type: String,
    required: true,
  },
  receiptFiles: {
    type: [String],  // Assuming files are stored as an array of file paths or URLs
    required: false, // Optional field
  },
  analysis: {
    isFraudulent: {
      type: Boolean,
      required: true,
    },
    explanation: {
      type: String,
      required: true,
    },
  },
  employee: { type: String, required: true },
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

// Create and export the model
const Training = mongoose.model('Training', trainingSchema);
module.exports = Training;
