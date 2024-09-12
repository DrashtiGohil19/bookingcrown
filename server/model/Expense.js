const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, require: true },
    description: { type: String, require: true },
    amount: { type: Number, require: true }
}, { timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);
