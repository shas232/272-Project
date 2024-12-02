const OfficeSupplies = require('../models/OfficeSupplies'); // Office Supplies model
const { analyzeExpense } = require('../utils/openai'); // Adjust the path as necessary

exports.submitOfficeSuppliesExpense = async (req, res) => {
  try {
    const { itemName, quantity, unitPrice, vendor, purchaseDate, department, purpose, receipts } = req.body;

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
