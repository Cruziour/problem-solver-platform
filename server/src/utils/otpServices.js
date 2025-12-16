import crypto from 'crypto';
import dotenv from 'dotenv';
import { sendOTPEmail } from './sendOtpMail.js';
import { otpTemplate } from './template/OtpTemplate.js';

dotenv.config();
const HASH_SECRET = process.env.HASH_SECRET;

if (
  !HASH_SECRET ||
  typeof HASH_SECRET !== 'string' ||
  HASH_SECRET.length < 16
) {
  console.error('❌ HASH_SECRET invalid. Exiting...');
  process.exit(1);
}

export const generateOtp = () => {
  const otpNumber = crypto.randomInt(0, 1000000);
  const otp = String(otpNumber).padStart(6, '0');
  return otp;
};

const hashOtp = (data) => {
  return crypto.createHmac('sha256', HASH_SECRET).update(data).digest('hex');
};

export const verifyOtp = (hashedOtp, data) => {
  const computedHash = hashOtp(data);
  return hashedOtp === computedHash;
};

export const generateAndHashOtpServices = async (email) => {
  const otp = generateOtp();
  const ttl = 1000 * 60 * 5; // 5min
  const expires = Date.now() + ttl;
  const data = `${email}.${otp}.${expires}`;
  const hash = hashOtp(data);
  const htmlContent = otpTemplate(otp);
  const subjectContent = '🧩 Verify Your Email - Problem-Solver OTP';
  await sendOTPEmail(email, subjectContent, htmlContent);
  return { hash, expires, email };
};
