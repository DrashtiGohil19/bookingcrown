const express = require('express');
const { addExpense, getAllExpenses, getExpenseById, updateExpense, getAllIncomeAndExpenses, deleteExpense } = require('../controller/Expense');
const VerifyToken = require('../middlewere/VerifyToken');
const router = express.Router();

router.post('/add-expense', VerifyToken, addExpense);
router.get('/all-expense', VerifyToken, getAllExpenses);
router.get('/get-expense/:id', VerifyToken, getExpenseById);
router.put('/update-expense/:id', VerifyToken, updateExpense);
router.get('/all-income-expense', VerifyToken, getAllIncomeAndExpenses)
router.delete('/delete-expense/:expenseId', VerifyToken, deleteExpense)

module.exports = router;
