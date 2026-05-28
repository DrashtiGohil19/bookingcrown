import axios from "axios"
import Notification from "../utilities/Notification"

const baseUrl = process.env.REACT_APP_BACKEND_URL + "/api"

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