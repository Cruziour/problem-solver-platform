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

export const loginService = async (payload) => {
  try {
    const { data } = await axiosInstance.post('/api/v1/user', payload);
    return data;
  } catch (error) {
    console.error('loginService error:', error.response?.data || error.message);
    throw error;
  }
};

export const resendOtpService = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      '/api/v1/user/resend-otp',
      payload,
    );
    return data;
  } catch (error) {
    console.error(
      'resendOtpService error:',
      error.response?.data || error.message,
    );
    throw error;
  }
};
