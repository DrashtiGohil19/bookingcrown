import Notification from "../utilities/Notification"
import axiosInstance from "../services/axiosInstance/AxiosInstance"
import axios from "axios"

const baseUrl = process.env.REACT_APP_BACKEND_URL + "/api"

export const CreateBooking = async (bookingData) => {
    try {
        const response = await axiosInstance.post("/createBooking", bookingData)
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

export const getBookingById = async (id) => {
    try {
        const response = await axios.get(baseUrl + "/getSingleBooking/" + id)
        return response.data.bookings
    } catch (error) {
        return error
    }
}

export const UpdateBooking = async (bookingData, id) => {
    try {
        const response = await axiosInstance.put("/updateBooking/" + id, bookingData)
        if (response.data.success) {
            Notification.success(response.data.message)
        }
        return response.data
    } catch (error) {
        Notification.error(error.response.data.message || error)
        return error
    }
}

export const DeleteBooking = async (id) => {
    try {
        const response = await axiosInstance.delete("/deleteBooking/" + id)
        if (response.data.success) {
            Notification.success(response.data.message)
        }
        return response.data
    } catch (error) {
        Notification.error(error.response.data.message)
        return error
    }
}

export const CancelBooking = async (id) => {
    try {
        const response = await axiosInstance.put("/cancelBooking/" + id)
        if (response.data.success) {
            Notification.success(response.data.message)
        }
        return response.data
    } catch (error) {
        Notification.error(error.response.data.message)
        return error
    }
}