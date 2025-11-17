import axios from "axios"
import Notification from "../utilities/Notification"
import getApiBaseUrl from "../services/axiosInstance/getApiBaseUrl"

const baseUrl = getApiBaseUrl()

export const createPlanData = async (values, id) => {
    try {
        const response = await axios.post(baseUrl + "/createPlan/" + id, values)
        if (response.data.success) {
            Notification.success(response.data.message)
        }
        return response.data.plan
    } catch (error) {
        Notification.error(error.response?.data?.error || error.message)
        return error
    }
}