const mongoose = require('mongoose');

// Define schema for history items
const historySchema = new mongoose.Schema({
  id: { type: Number, required: false }, // Unique ID for the expense
  category: { type: String, required: true }, // Expense category
  date: { type: String, required: true }, // Store date as string (ISO format preferred)
  amount: { type: String, required: true }, // Amount as string
  currency: { type: String, required: true, default: 'USD' }, // Currency with default
  status: {
    type: String,
    required: true, // Valid statuses
  },
});

// Define schema for user
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['employee', 'hr'], required: true },
  password: { type: String, required: true },
  expenses: {
    history: { type: [historySchema], default: [] }, // Array of history items
  },
});

module.exports = mongoose.model('User', UserSchema);
