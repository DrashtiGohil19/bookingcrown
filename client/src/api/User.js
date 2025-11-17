import axiosInstance from "../services/axiosInstance/AxiosInstance"
import Notification from "../utilities/Notification"
import getApiBaseUrl from "../services/axiosInstance/getApiBaseUrl"

const baseUrl = getApiBaseUrl()

export const getUserData = async () => {
    try {
        const response = await axiosInstance.get(baseUrl + "/getUserData")
        return response.data.data
    } catch (error) {
        return error
    }
}

export const updateUserData = async (formData) => {
    try {
        const response = await axiosInstance.put(baseUrl + "/updateUserDetails", formData)
        if (response.data) {
            Notification.success(response.data.message)
        }
        return response.data.data
    } catch (error) {
        Notification.error(error.response.data.message)
        return error
    }
}

export const updateUserBType = async (formData, id) => {
    try {
        const response = await axiosInstance.put(baseUrl + "/updateUserBType/" + id, formData)
        if (response.data) {
            Notification.success(response.data.message)
        }
        return response.data.data
    } catch (error) {
        Notification.error(error.response.data.message)
        return error
    }
}