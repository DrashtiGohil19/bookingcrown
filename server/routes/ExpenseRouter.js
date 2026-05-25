const express = require('express');
const { addExpense, getAllExpenses, getExpenseById, updateExpense, deleteExpense, getAllIncomeAndExpenses } = require('../controller/Expense');
const VerifyToken = require('../middlewere/VerifyToken');
const router = express.Router();

router.post('/add-expense', VerifyToken, addExpense);
router.get('/all-expense', VerifyToken, getAllExpenses);
router.get('/get-expense/:id', VerifyToken, getExpenseById);
router.put('/update-expense/:id', VerifyToken, updateExpense);
router.delete('/delete-expense/:id', VerifyToken, deleteExpense);
router.get('/all-income-expense', VerifyToken, getAllIncomeAndExpenses)

module.exports = router;
