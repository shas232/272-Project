const Training = require('../models/Training'); // Training model
const User = require('../models/User'); // User model
const { analyzeExpense } = require('../utils/openai'); // Adjust the path as necessary


exports.submitTraining = async (req, res) => {
  try {
    const { courseTitle, providerName, startDate, endDate, amount, trainingType, businessPurpose, receiptFiles, employee } = req.body;

    // Prepare training data for analysis
    const trainingData = {
      type: 'training', // Ensure this matches the case in the analyzeExpense function
      courseName: courseTitle, // updated to match model field
      provider: providerName,  // updated to match model field
      startDate,
      endDate,
      totalAmount: amount, // updated to match model field
      trainingType: trainingType,  // updated to match model field
      purpose: businessPurpose, // updated to match model field
    };

    // Analyze the training data using the AI function
    const analysis = await analyzeExpense(trainingData);

    const user = await User.findOne({ email: employee });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update the user's history
    const historyItem = {
      id: user.expenses?.history?.length + 1 || 1,
      category: 'Professional Training',
      date: new Date().toISOString().split('T')[0], // ISO format date
      amount: amount.toString(), // Ensure it's a string
      status: analysis.isFraudulent ? 'Flagged' : 'Approved',
    };

    // Initialize expenses if it doesn't exist
    if (!user.expenses) {
      user.expenses = { history: [] };
    }
    user.expenses.history.push(historyItem);

    // Save the updated user document
    await user.save();

    // Create a new training document with the analysis result
    const newTraining = new Training({
      courseTitle,  // updated to match model field
      providerName,  // updated to match model field
      startDate,
      endDate,
      amount,  // updated to match model field
      trainingType,  // updated to match model field
      businessPurpose,  // updated to match model field
      receiptFiles,  // updated to match model field
      analysis: {
        isFraudulent: analysis.isFraudulent,
        explanation: analysis.explanation,
      }, // Save the analysis in the database
      employee
    });

    // Save the training data to the database
    const savedTraining = await newTraining.save();

    // Send a success response
    return res.status(201).json({ message: 'Training submitted successfully', data: savedTraining });
  } catch (error) {
    console.error('Error submitting training data:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
