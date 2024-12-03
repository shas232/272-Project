const Accommodation = require('../models/Accommodation'); // Accommodation model
const User = require('../models/User'); // User model
const { analyzeExpense } = require('../utils/openai'); // OpenAI analysis function

exports.submitAccommodationExpense = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      location,
      checkIn,
      checkOut,
      accommodationType,
      hotelName,
      numberOfGuests,
      totalAmount,
      purpose,
      receipts,
      employee,
    } = req.body;

    // Check if the required fields are provided
    if (!employee) {
      return res.status(400).json({ message: 'Employee email is required.' });
    }

    // Prepare expense data for analysis
    const expenseData = {
      type: 'accommodation',
      location,
      checkIn,
      checkOut,
      accommodationType,
      hotelName,
      numberOfGuests,
      totalAmount,
      purpose,
    };

    // Analyze the expense using the AI function
    const analysis = await analyzeExpense(expenseData);

    // Find the user based on the `employee` email
    const user = await User.findOne({ email: employee });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update the user's history
    const historyItem = {
      id: user.expenses?.history?.length + 1 || 1,
      category: 'Accommodation',
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

    // Create a new accommodation expense document
    const newAccommodation = new Accommodation({
      location,
      checkIn,
      checkOut,
      accommodationType,
      hotelName,
      numberOfGuests,
      totalAmount,
      purpose,
      receipts,
      analysis,
      employee, // Save employee email
    });

    // Save the accommodation expense
    const savedAccommodation = await newAccommodation.save();

    // Send a success response
    return res.status(201).json({
      message: 'Accommodation expense submitted successfully.',
      data: savedAccommodation,
    });
  } catch (error) {
    console.error('Error submitting accommodation expense:', error);
    return res.status(500).json({ message: 'Server error.', error: error.message });
  }
};
