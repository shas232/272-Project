const Travel = require('../models/Travel'); // Travel model
const User = require('../models/User'); // User model
const { analyzeExpense } = require('../utils/openai'); // Adjust the path as necessary

exports.submitTravelExpense = async (req, res) => {
  try {
    const { departureLocation, destination, departureDate, returnDate, transportationType, totalAmount, purpose, receipts, employee } = req.body;

    // Prepare expense data for analysis
    const expenseData = {
      type: 'travel', 
      departureLocation,
      destination,
      departureDate,
      returnDate,
      transportationType,
      totalAmount,
      purpose,
    };

    if (!employee) {
      return res.status(400).json({ message: 'Employee email is required.' });
    }

    // Analyze the expense using the AI function
    const analysis = await analyzeExpense(expenseData);

    const user = await User.findOne({ email: employee });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update the user's history
    const historyItem = {
      id: user.expenses?.history?.length + 1 || 1,
      category: 'Travel',
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

    // Create a new travel expense document with the analysis result
    const newTravel = new Travel({
      departureLocation,
      destination,
      departureDate,
      returnDate,
      transportationType,
      totalAmount,
      purpose,
      receipts,
      analysis, // Save the analysis in the database
      employee
    });

    // Save the travel expense to the database
    const savedTravel = await newTravel.save();

    // Send a success response
    return res.status(201).json({ message: 'Travel expense submitted successfully', data: savedTravel });
  } catch (error) {
    console.error('Error submitting travel expense:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};