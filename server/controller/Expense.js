const Bookings = require("../model/Bookings");
const Expense = require("../model/Expense");

exports.addExpense = async (req, res) => {
    const userId = req.user.id
    const { date, description, amount } = req.body;

    try {
        if (!date || !description || !amount) {
            return res.status(400).json({ message: 'Date, description, and amount fields are required.' });
        }

        let expense = new Expense({ date, description, amount, userId });

        await expense.save();
        res.status(200).json({ success: true, message: 'Expense detail added successfully.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error', error: err });
    }
};

exports.getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ message: 'Server error', error: err });
    }
};

exports.getExpenseById = async (req, res) => {
    const { id } = req.params;

    try {
        const expense = await Expense.findById(id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found.' });
        }

        res.status(200).json(expense);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ message: 'Server error', error: err });
    }
};

exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    const { date, description, amount } = req.body;

    try {
        if (!date || !description || !amount) {
            return res.status(400).json({ message: 'Date, description, and amount fields are required.' });
        }

        const updatedExpense = await Expense.findByIdAndUpdate(
            id,
            { date, description, amount },
            { new: true }
        );

        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found.' });
        }

        res.status(200).json({ success: true, message: 'Expense updated successfully.', data: updatedExpense });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ message: 'Server error', error: err });
    }
};

exports.getAllIncomeAndExpenses = async (req, res) => {
    try {
        const userId = req.user.id;

        const currentDate = new Date();
        const month = req.query.month ? new Date(req.query.month) : currentDate;
        const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
        const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

        const allBooking = await Bookings.find({
            userId: userId,
            payment: "paid",
            date: { $gte: startOfMonth, $lte: endOfMonth }
        });

        const totalIncome = allBooking.reduce((total, booking) => total + booking.amount, 0);

        const allExpenses = await Expense.find({
            userId,
            date: { $gte: startOfMonth, $lte: endOfMonth }
        });
        const totalExpense = allExpenses.reduce((total, expense) => total + expense.amount, 0);

        const profitOrLoss = totalIncome - totalExpense;

        res.status(200).json({
            success: true,
            message: `Income and Expense data for ${month.toLocaleDateString('en', { year: 'numeric', month: 'long' })} retrieved successfully.`,
            incomeData: {
                data: allBooking,
                totalIncome: totalIncome,
            },
            expenseData: {
                data: allExpenses,
                totalExpense: totalExpense,
            },
            profitOrLoss: profitOrLoss,
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "An error occurred while creating expense data", error: error });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const { expenseId } = req.params
        const expense = await Expense.findByIdAndDelete(expenseId)
        if (!expense) {
            return res.status(404).json({ success: false, message: 'Expense not found.' });
        }
        res.status(200).json({ success: true, message: 'Expense detail deleted successfully.' });
    } catch (error) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error', error: err, success: false, });
    }
}