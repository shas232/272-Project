const Meals = require('../models/Meals'); // Meals model
const User = require('../models/User'); // User model
const { analyzeExpense } = require('../utils/openai'); // Adjust the path if necessary

exports.submitMealsExpense = async (req, res) => {
  try {
    const { restaurantName, date, numberOfAttendees, attendeeNames, mealType, totalAmount, purpose, receipts, employee } = req.body;

    if (!employee) {
      return res.status(400).json({ message: 'Employee email is required.' });
    }

    // Prepare expense data for analysis
    const expenseData = {
      type: 'meals', // Ensure this matches the case in the analyzeExpense function
      restaurantName,
      date,
      numberOfAttendees,
      attendeeNames,
      mealType,
      totalAmount,
      purpose,
    };

    // Analyze the expense using the AI function (if needed for validation, fraud detection, etc.)
    const analysis = await analyzeExpense(expenseData);

    const user = await User.findOne({ email: employee });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update the user's history
    const historyItem = {
      id: user.expenses?.history?.length + 1 || 1,
      category: 'Dining',
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

    // Create a new meal expense document with the analysis result
    const newMeal = new Meals({
      restaurantName,
      date,
      numberOfAttendees,
      attendeeNames,
      mealType,
      totalAmount,
      purpose,
      receipts,
      analysis, // Save the analysis result in the database
      employee
    });

    // Save the meal expense to the database
    const savedMeal = await newMeal.save();

    // Send a success response
    return res.status(201).json({
      message: 'Dining expense submitted successfully.',
      data: savedMeal,
    });
  } catch (error) {
    console.error('Error submitting dining expense:', error);
    return res.status(500).json({ message: 'Server error.', error: error.message });
  }
};
