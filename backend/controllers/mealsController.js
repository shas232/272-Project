const Meals = require('../models/Meals'); // Meals model
const { analyzeExpense } = require('../utils/openai'); // Adjust the path if necessary

exports.submitMealsExpense = async (req, res) => {
  try {
    const { restaurantName, date, numberOfAttendees, attendeeNames, mealType, totalAmount, purpose, receipts } = req.body;

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
    });

    // Save the meal expense to the database
    const savedMeal = await newMeal.save();

    // Send a success response
    return res.status(201).json({ message: 'Meal expense submitted successfully', data: savedMeal });
  } catch (error) {
    console.error('Error submitting meal expense:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
