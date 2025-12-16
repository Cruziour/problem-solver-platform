import { ApiError } from './index.js';
import axios from 'axios';

export const sendOTPEmail = async (toEmail, subjectContent, htmlContent) => {
  try {
    const relayUrl = process.env.RELAY_SERVER_URL;

    if (!relayUrl) {
      throw new ApiError(500, 'Relay server URL is not configured.');
    }

    const res = await axios.post(`${relayUrl}/send-mail`, {
      to: toEmail,
      subject: subjectContent,
      html: htmlContent,
    });

    if (res.data.success) {
      return { success: true };
    } else {
      throw new ApiError(500, res.data.error || 'Failed to send OTP via Relay');
    }
  } catch (error) {
    console.error(
      '❌ email sending failed:',
      error.response?.data || error.message,
    );
    throw new ApiError(500, 'Failed to send email. Please try again later.');
  }
};
