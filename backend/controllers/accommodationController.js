const Accommodation = require('../models/Accommodation'); // Accommodation model
const { analyzeExpense } = require('../utils/openai'); // Adjust the path to your OpenAI analysis function

exports.submitAccommodationExpense = async (req, res) => {
  try {
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
    } = req.body;

    // Prepare expense data for analysis
    const expenseData = {
      type: 'accommodation', // Ensure this matches the case in the analyzeExpense function
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

    // Create a new accommodation expense document with the analysis result
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
      analysis, // Save the analysis in the database
    });

    // Save the accommodation expense to the database
    const savedAccommodation = await newAccommodation.save();

    // Send a success response
    return res.status(201).json({ message: 'Accommodation expense submitted successfully', data: savedAccommodation });
  } catch (error) {
    console.error('Error submitting accommodation expense:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
