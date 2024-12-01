const Travel = require('../models/Travel'); // Travel model
const { analyzeExpense } = require('../utils/openai'); // Adjust the path as necessary

exports.submitTravelExpense = async (req, res) => {
  try {
    const { departureLocation, destination, departureDate, returnDate, transportationType, totalAmount, purpose, receipts } = req.body;

    // Prepare expense data for analysis
    const expenseData = {
      type: 'travel', // Ensure this matches the case in the analyzeExpense function
      departureLocation,
      destination,
      departureDate,
      returnDate,
      transportationType,
      totalAmount,
      purpose,
    };

    // Analyze the expense using the AI function
    const analysis = await analyzeExpense(expenseData);

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
