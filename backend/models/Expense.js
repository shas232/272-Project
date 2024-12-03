const mongoose = require('mongoose');
const { Schema } = mongoose;
const Cookies = require("js-cookie");

/**
 * @typedef {Object} IExpense
 * @property {string} userId - The ID of the user
 * @property {string} category - The category of the expense
 * @property {number} amount - The amount of the expense
 * @property {string} [status] - The status of the expense (optional)
 * @property {boolean} [flagged] - Whether the expense is flagged (optional)
 */

// Define the Mongoose schema
const ExpenseSchema = new Schema({
  userId: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  flagged: { type: Boolean, default: false },
  employee: { type: String, required: true },
});

// Export the model
const Expense = mongoose.model('Expense', ExpenseSchema);
module.exports = Expense;
