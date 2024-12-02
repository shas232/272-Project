const Training = require('../models/Training'); // Training model
const { analyzeExpense } = require('../utils/openai'); // Adjust the path as necessary

exports.submitTraining = async (req, res) => {
  try {
    const { courseTitle, providerName, startDate, endDate, amount, trainingType, businessPurpose, receiptFiles } = req.body;

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
