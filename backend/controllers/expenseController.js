const Expense = require('../models/Expense');
const User = require('../models/User'); // User model

// Controller to get pending expenses
exports.getPendingExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ status: 'pending' });
        res.status(200).json(expenses);
    } catch (error) {
        console.error('Error fetching pending expenses:', error);
        res.status(500).json({ message: 'Failed to fetch pending expenses' });
    }
};

// Controller to submit expense
exports.submitExpense = async (req, res) => {
    try {
        const { userId, category, amount } = req.body;

        const newExpense = new Expense({
            userId,
            category,
            amount,
        });

        const savedExpense = await newExpense.save();
        res.status(201).json({ message: 'Expense submitted successfully', data: savedExpense });
    } catch (error) {
        console.error('Error submitting expense:', error);
        res.status(500).json({ message: 'Failed to submit expense' });
    }
};
