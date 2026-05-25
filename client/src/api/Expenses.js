import axiosInstance from "../services/axiosInstance/AxiosInstance"
import Notification from "../utilities/Notification"

export const AddExpenses = async (expensesData) => {
    try {
        const response = await axiosInstance.post("/add-expense", expensesData)
        if (response.data.success) {
            Notification.success(response.data.message)
        }
        return response.data
    } catch (error) {
        console.log(error)
        Notification.error(error.response.data.message)
        return error
    }
}

export const UpdateExpense = async (id, expenseData) => {
    try {
        const response = await axiosInstance.put(`/update-expense/${id}`, expenseData)
        if (response.data.success) {
            Notification.success(response.data.message)
        }
        return response.data
    } catch (error) {
        console.log(error)
        Notification.error(error.response.data.message)
        return error
    }
}

export const DeleteExpense = async (id) => {
    try {
        const response = await axiosInstance.delete(`/delete-expense/${id}`)
        if (response.data.success) {
            Notification.success(response.data.message)
        }
        return response.data
    } catch (error) {
        console.log(error)
        Notification.error(error.response.data.message)
        return error
    }
}