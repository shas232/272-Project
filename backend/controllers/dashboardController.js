const User = require('../models/User'); // User model
const Travel = require('../models/Travel'); // Travel model

exports.getDashboardStats = async (req, res) => {
  try {
    // Fetch all users to calculate active employees
    const users = await User.find({});
    const activeEmployees = users.length;

    // Calculate total expenses and flagged transactions
    let totalExpenses = 0;
    let flaggedTransactions = 0;

    for (const user of users) {
      if (user.expenses?.history) {
        user.expenses.history.forEach((expense) => {
          // Sum up total expenses
          totalExpenses += parseFloat(expense.amount || 0);

          // Count flagged transactions
          if (expense.status === 'Flagged') {
            flaggedTransactions++;
          }
        });
      }
    }

    // Send the stats as a response
    res.status(200).json({
      stats: {
        totalExpenses: `$${totalExpenses.toLocaleString()}`, // Format as a currency
        flaggedTransactions,
        activeEmployees,
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
