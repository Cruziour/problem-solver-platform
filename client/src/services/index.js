import axiosInstance from '../api/axiosInstance';

// Public Routes
export const registerUserAndSendOtpService = async (payload) => {
  try {
    const { data } = await axiosInstance.post('/api/v1/user/signup', payload);
    return data;
  } catch (error) {
    console.error(
      'registerUserAndSendOtpService error:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

// Public Routes
export const validateOtpService = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      '/api/v1/user/validateOtp',
      payload,
    );
    return data;
  } catch (error) {
    console.error(
      'validateOtpService error:',
      error.response?.data || error.message,
    );
    throw error;
  }
};
