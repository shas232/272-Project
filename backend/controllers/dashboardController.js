const User = require('../models/User'); // User model
// const Travel = require('../models/Travel'); // Travel model

exports.getDashboardStats = async (req, res) => {
  try {
    // Fetch all users to calculate active employees
    const users = await User.find({});
    const activeEmployees = users.length;
    console.log(activeEmployees);

    // Calculate total expenses and flagged transactions
    let totalExpenses = 0;
    let flaggedTransactions = 0;
    console.log(totalExpenses);

    for (const user of users) {
      if (user.expenses?.history) {
        user.expenses.history.forEach((expense) => {
          // Sum up total expenses
          totalExpenses += parseFloat(expense.amount || 0);
          console.log(totalExpenses);

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



// exports.getMonthlyExpenseStats = async (req, res) => {
//   console.log("entered api");
//   try {
//     // Fetch all users and their expense history
//     const users = await User.find({});
//     console.log("entered try");
//     // Create a map to aggregate data by month
//     const monthlyData = {};

//     // Iterate over each user's expense history
//     users.forEach((user) => {
//       user.expenses?.history.forEach((expense) => {
//         // Parse the date to extract the month and year
//         const date = new Date(expense.date);
//         const month = date.toLocaleString('default', { month: 'short' });
//         const year = date.getFullYear();
//         const key = `${month} ${year}`;

//         // Initialize the month entry if not already present
//         if (!monthlyData[key]) {
//           monthlyData[key] = {
//             Approved: 0,
//             Flagged: 0,
//           };
//         }

//         // Increment counts based on expense status
//         if (expense.status === 'Approved') {
//           monthlyData[key].Approved += 1;
//         } else if (expense.status === 'Flagged') {
//           monthlyData[key].Flagged += 1;
//         }
//       });
//     });

//     // Convert the data into an array for frontend chart consumption
//     const chartData = Object.keys(monthlyData).map((key) => ({
//       name: key,
//       ...monthlyData[key],
//     }));
//     console.log("sending data");
//     // Respond with the chart data
//     res.status(200).json({ chartData });
//   } catch (error) {
//     console.error('Error fetching monthly expense stats:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };


exports.getMonthlyExpenseStats = async (req, res) => {
  console.log("entered api");
  try {
    const users = await User.find({});
    console.log("entered try");

    const monthlyData = {};

    users.forEach((user) => {
      user.expenses?.history.forEach((expense) => {
        const date = new Date(expense.date);
        if (isNaN(date)) {
          console.error('Invalid date:', expense.date); // Log invalid date
          return; // Skip invalid dates
        }

        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        const key = `${month} ${year}`;

        if (!monthlyData[key]) {
          monthlyData[key] = { Approved: 0, Flagged: 0 };
        }

        if (expense.status === 'Approved') {
          monthlyData[key].Approved += 1;
        } else if (expense.status === 'Flagged') {
          monthlyData[key].Flagged += 1;
        }
      });
    });

    const chartData = Object.keys(monthlyData).map((key) => ({
      name: key,
      Approved: monthlyData[key].Approved || 0,
      Flagged: monthlyData[key].Flagged || 0,
    }));

    console.log("sending data");
    res.status(200).json({ chartData });
  } catch (error) {
    console.error('Error fetching monthly expense stats:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};




exports.getMonthlyFraudStats = async (req, res) => {
  try {
    const users = await User.find({});
    const monthlyFraudData = {};

    users.forEach((user) => {
      user.expenses?.history.forEach((expense) => {
        const date = new Date(expense.date);
        if (isNaN(date)) {
          console.error('Invalid date:', expense.date);
          return;
        }

        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        const key = `${month} ${year}`;

        if (!monthlyFraudData[key]) {
          monthlyFraudData[key] = { fraudCount: 0 };
        }

        if (expense.status === 'Flagged') {
          monthlyFraudData[key].fraudCount += 1;
        }
      });
    });

    // Prepare sorted chart data
    const chartData = Object.keys(monthlyFraudData)
      .map((key) => {
        const [month, year] = key.split(' ');
        const date = new Date(`${month} 1, ${year}`); // Use first of the month for sorting
        return {
          name: key,
          fraudCount: monthlyFraudData[key].fraudCount,
          date: date.toISOString(), // Include ISO date for sorting
        };
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by the actual date

    res.status(200).json({ chartData });
  } catch (error) {
    console.error('Error fetching monthly fraud stats:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};





//Controller function for fetching fraud stats by month and category
exports.getMonthlyFraudStatsByCategory = async (req, res) => {
  try {
    const users = await User.find({});
    const monthlyFraudDataByCategory = {};

    users.forEach((user) => {
      user.expenses?.history.forEach((expense) => {
        const date = new Date(expense.date);
        if (isNaN(date)) {
          console.error('Invalid date:', expense.date);
          return;
        }

        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        const key = `${month} ${year}`;

        if (!monthlyFraudDataByCategory[key]) {
          monthlyFraudDataByCategory[key] = {};
        }

        if (expense.status === 'Flagged') { // Assuming fraud is marked as "Flagged"
          // Initialize category if not already present
          if (!monthlyFraudDataByCategory[key][expense.category]) {
            monthlyFraudDataByCategory[key][expense.category] = 0;
          }
          // Increment fraud count for the specific category
          monthlyFraudDataByCategory[key][expense.category] += 1;
        }
      });
    });

    // Transform the data into an array of objects for frontend consumption
    const chartData = Object.keys(monthlyFraudDataByCategory).map((key) => {
      const categories = monthlyFraudDataByCategory[key];
      return {
        month: key,
        ...categories, // Add categories dynamically
      };
    });
    console.log(monthlyFraudDataByCategory);
console.log(chartData);


    res.status(200).json({ chartData });
  } catch (error) {
    console.error('Error fetching monthly fraud stats by category:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
