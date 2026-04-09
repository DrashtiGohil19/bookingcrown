import axios from 'axios';
import Notification from '../utilities/Notification';

const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const submitContactForm = async (payload) => {
  try {
    const response = await axios.post(`${baseUrl}/contact`, payload);
    if (response.data?.success) {
      Notification.success(response.data.message);
    }
    return response.data;
  } catch (error) {
    const message = error?.response?.data?.message || 'Unable to send your message right now.';
    Notification.error(message);
    throw error;
  }
};
