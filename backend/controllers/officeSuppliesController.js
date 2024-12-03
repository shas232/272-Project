const OfficeSupplies = require('../models/OfficeSupplies'); // Office Supplies model
const User = require('../models/User'); // User model
const { analyzeExpense } = require('../utils/openai'); // Adjust the path as necessary

exports.submitOfficeSuppliesExpense = async (req, res) => {
  try {
    const { itemName, quantity, unitPrice, vendor, purchaseDate, department, purpose, receipts, employee } = req.body;

    // Prepare expense data for analysis
    const expenseData = {
      type: 'officeSupplies', // Ensure this matches the case in the analyzeExpense function
      itemName,
      quantity,
      unitPrice,
      vendor,
      purchaseDate,
      department,
      purpose,
    };

    // Analyze the expense using the AI function
    const analysis = await analyzeExpense(expenseData);

    const user = await User.findOne({ email: employee });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update the user's history
    const historyItem = {
      id: user.expenses?.history?.length + 1 || 1,
      category: 'Office Supplies',
      date: new Date().toISOString().split('T')[0], // ISO format date
      amount: totalAmount.toString(), // Ensure it's a string
      status: analysis.isFraudulent ? 'Flagged' : 'Approved',
    };

    // Initialize expenses if it doesn't exist
    if (!user.expenses) {
      user.expenses = { history: [] };
    }
    user.expenses.history.push(historyItem);

    // Save the updated user document
    await user.save();

    // Create a new office supplies expense document with the analysis result
    const newOfficeSupplies = new OfficeSupplies({
      itemName,
      quantity,
      unitPrice,
      vendor,
      purchaseDate,
      department,
      purpose,
      receipts,
      analysis, // Save the analysis in the database
      employee
    });

    // Save the office supplies expense to the database
    const savedOfficeSupplies = await newOfficeSupplies.save();

    // Send a success response
    return res.status(201).json({ message: 'Office supplies expense submitted successfully', data: savedOfficeSupplies });
  } catch (error) {
    console.error('Error submitting office supplies expense:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
