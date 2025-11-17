import axiosInstance from "../services/axiosInstance/AxiosInstance"
import axios from "axios"
import Notification from "../utilities/Notification"
import getApiBaseUrl from "../services/axiosInstance/getApiBaseUrl"

// Create a new lead (public - no auth required)
export const createLead = async (formData) => {
    // Build API URL using helper (supports env, runtime override, same-origin, localhost)
    const baseUrl = getApiBaseUrl();
    const url = baseUrl + "/create-lead";

    try {
        // Clean phone number - remove any spaces, dashes, or special characters
        const cleanedFormData = {
            ...formData,
            phone: formData.phone ? formData.phone.replace(/\D/g, '') : '' // Remove all non-digit characters
        };

        // Request prepared; removing verbose console logs for production cleanliness

        // Use regular axios for public endpoint (no auth token needed)
        const response = await axios.post(url, cleanedFormData, {
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 10000 // 10 second timeout
        })

        if (response.data && response.data.success) {
            Notification.success(response.data.message)
        }
        return response.data
    } catch (error) {
        console.error('Lead submission error:', error);
        console.error('Error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            url: error.config?.url
        });

        // Default user-facing message
        let errorMessage = 'Failed to submit your message. Please try again.';

        if (error.response) {
            // Server responded with error
            // If server returned HTML (e.g., static index.html), warn about backend not reachable
            const respData = error.response.data;
            if (typeof respData === 'string' && respData.includes('<!doctype html')) {
                errorMessage = 'Backend not available at this URL. Ensure the backend is deployed and REACT_APP_BACKEND_URL is set.';
            } else {
                errorMessage = respData?.message || `Server error: ${error.response.status}`;
            }
        } else if (error.request) {
            // Request was made but no response received
            // Likely network error or backend down
            errorMessage = 'Unable to contact backend. Please check your network or backend configuration.';
        } else if (error.message) {
            // Error in request setup
            errorMessage = error.message;
        }

        Notification.error(errorMessage);
        throw error; // Re-throw so the component can handle it
    }
}

// Get all leads (admin only)
export const getAllLeads = async () => {
    try {
        const response = await axiosInstance.get('/leads')
        return response.data
    } catch (error) {
        Notification.error(error.response?.data?.message || 'Failed to fetch leads')
        return error
    }
}

// Get single lead by ID (admin only)
export const getLeadById = async (id) => {
    try {
        const response = await axiosInstance.get(`/leads/${id}`)
        return response.data
    } catch (error) {
        Notification.error(error.response?.data?.message || 'Failed to fetch lead')
        return error
    }
}

// Update lead status (admin only)
export const updateLeadStatus = async (id, formData) => {
    try {
        const response = await axiosInstance.put(`/leads/${id}/status`, formData)
        if (response.data.success) {
            Notification.success(response.data.message)
        }
        return response.data
    } catch (error) {
        Notification.error(error.response?.data?.message || 'Failed to update lead status')
        return error
    }
}

// Delete lead (admin only)
export const deleteLead = async (id) => {
    try {
        const response = await axiosInstance.delete(`/leads/${id}`)
        if (response.data.success) {
            Notification.success(response.data.message)
        }
        return response.data
    } catch (error) {
        Notification.error(error.response?.data?.message || 'Failed to delete lead')
        return error
    }
}

