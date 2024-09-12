import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosInstance/AxiosInstance';

const baseUrl = process.env.REACT_APP_BACKEND_URL + "/api";

export const fetchIncomeAndExpenses = createAsyncThunk(
    'expense/fetchIncomeAndExpenses',
    async ({ month = null }) => {
        const queryParam = month ? `?month=${month}` : '';
        const response = await axiosInstance.get(`${baseUrl}/all-income-expense${queryParam}`);
        return response.data;
    }
);

const ExpenseSlice = createSlice({
    name: 'expense',
    initialState: {
        incomeData: [],
        expenseData: [],
        totalIncome: 0,
        totalExpense: 0,
        profitOrLoss: 0,
        status: 'idle',
        error: null,
    },
    reducers: {
        resetExpenseData: (state) => {
            state.incomeData = [];
            state.expenseData = [];
            state.totalIncome = 0;
            state.totalExpense = 0;
            state.profitOrLoss = 0;
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Income and Expense data
            .addCase(fetchIncomeAndExpenses.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchIncomeAndExpenses.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.incomeData = action.payload.incomeData.data;
                state.expenseData = action.payload.expenseData.data;
                state.totalIncome = action.payload.incomeData.totalIncome;
                state.totalExpense = action.payload.expenseData.totalExpense;
                state.profitOrLoss = action.payload.profitOrLoss;
            })
            .addCase(fetchIncomeAndExpenses.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { resetExpenseData } = ExpenseSlice.actions;
export default ExpenseSlice.reducer;
