const Expense = require('../models/Expense');
const aiModel = require('../utils/aiModel'); // AI fraud detection model
const User = require('../models/User'); // Ensure this is imported for user validation

// Handle expense submission
exports.submitExpense = async (req, res) => {
  const { userId, category, amount } = req.body;

  try {
    // Validate if the userId exists in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Submit the expense and trigger AI model to check for anomalies
    const expense = new Expense({ userId, category, amount });
    
    // Run AI model to detect anomalies (e.g., flagging)
    let flagged = false;
    try {
      flagged = await aiModel.detectAnomaly(expense);  // Wrap AI model in a try-catch for specific errors
    } catch (aiError) {
      console.error('AI model error:', aiError);  // Log the error from AI model
    }

    expense.flagged = flagged;
    await expense.save();

    res.status(201).json({ message: 'Expense submitted successfully', expense });
  } catch (error) {
    console.error('Error submitting expense:', error);  // Log the error
    res.status(500).json({ message: 'Error submitting expense', error: error.message });
  }
};

// Get all pending expenses for HR
exports.getPendingExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ status: 'pending' }).populate('userId');
    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error retrieving pending expenses:', error);  // Log the error
    res.status(500).json({ message: 'Error retrieving expenses', error: error.message });
  }
};
