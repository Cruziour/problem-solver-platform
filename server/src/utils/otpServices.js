import crypto from 'crypto';
import dotenv from 'dotenv';

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

export const generateAndHashOtpServices = (email) => {
  const otp = generateOtp();
  const ttl = 1000 * 60 * 5; // 5min
  const expires = Date.now() + ttl;
  const data = `${email}.${otp}.${expires}`;
  const hash = hashOtp(data);
  return { otp, hash, expires, email };
};
