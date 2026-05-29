import axiosInstance from "../services/axiosInstance/AxiosInstance"
import Notification from "../utilities/Notification"

export const createPlanData = async (values, id) => {
    try {
        const response = await axiosInstance.post("/createPlan/" + id, values)
        if (response.data.success) {
            Notification.success(response.data.message)
        }
        return response.data.plan
    } catch (error) {
        Notification.error(error.response?.data?.error || error.message)
        return error
    }
}