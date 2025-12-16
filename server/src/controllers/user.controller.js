import { User } from '../models/user.models.js';
import { ApiError, asyncHandler, ApiResponse } from '../utils/index.js';
import { generateAndHashOtpServices, verifyOtp } from '../utils/otpServices.js';

const generateAccessAndRefreshToken = async (userId) => {
  if (!userId) {
    throw new ApiError(404, 'Please provide user.');
  }
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return accessToken;
  } catch (error) {
    throw new ApiError(500, 'Internal Server Error.');
  }
};

const signup = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (
    [name, email, password, confirmPassword].some(
      (field) => !field || field?.trim() === '',
    )
  ) {
    throw new ApiError(400, 'Please fill in all fields.');
  }
  if (confirmPassword !== password) {
    throw new ApiError(401, 'ConfirmPassword not matched password.');
  }
  const isUserExisting = await User.findOne({ email });
  if (isUserExisting) {
    throw new ApiError(400, 'User is already exists.');
  }

  try {
    const user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password,
    });
    const otpData = generateAndHashOtpServices(email);
    if (!user || !user?._id) {
      throw new Error('Mongoose failed to create user document.');
    }
    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          otpData,
          'User created and OTP sent successfully. Please verify your email.',
        ),
      );
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new ApiError(
        400,
        'Validation failed: Check your username and password length.',
      );
    }
    throw new ApiError(500, error.message);
  }
});

const resendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(401, 'Please provide email');
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(402, 'User not found');
    }
    const otpData = generateAndHashOtpServices(email);
    return res
      .status(200)
      .json(
        new ApiResponse(
          201,
          otpData,
          'OTP sent successfully. Please verify your email.',
        ),
      );
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new ApiError(400, 'Otp resend problem.');
    }
    throw new ApiError(500, error.message);
  }
});

const validateOtp = asyncHandler(async (req, res) => {
  const { email, hash, expires, otp } = req.body;
  if (
    [email, hash, expires, otp].some((field) => !field || field?.trim() === '')
  ) {
    throw new ApiError(401, 'Otp is required.');
  }
  // 1️⃣ Expiry check
  if (Date.now() > Number(expires)) {
    throw new ApiError(410, 'OTP expired');
  }
  try {
    const data = `${email}.${otp}.${expires}`;
    const isValid = verifyOtp(hash, data);
    if (!isValid) {
      await User.findOneAndDelete({ email });
      throw new ApiError(402, 'Invaild OTP.');
    }
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { isVerified: true } },
      { new: true },
    ).select('-password');
    if (!user) {
      throw new ApiError(402, 'User not verified.');
    }
    const accessToken = await generateAccessAndRefreshToken(user?._id);
    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { user, accessToken },
          'User verified sccessflly.',
        ),
      );
  } catch (error) {
    throw new ApiError(402, error.message);
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if ([email, password].some((f) => !f || f.trim() === '')) {
    throw new ApiError(401, 'email and password is required.');
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    const isMatchedPassword = await user.isPasswordCorrect(password);
    if (!isMatchedPassword) {
      throw new ApiError(401, 'Incorrect Password.');
    }
    const accessToken = await generateAccessAndRefreshToken(user?._id);
    const userData = await User.findById(user?._id).select('-password');
    if (!userData) {
      throw new ApiError(404, 'Something went wrong.');
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { user: userData, accessToken },
          'User logged successfully.',
        ),
      );
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const logout = asyncHandler(async (req, res) => {
  const userId = req?.user?._id;
  if (!userId) {
    throw new ApiError(401, 'Unauthorized.');
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, 'User not found.');
    }
    // Clear refresh token
    user.refreshToken = null;
    await user.save({ validateBeforeSave: false });
    return res
      .status(200)
      .json(new ApiResponse(200, null, 'User logged out successfully'));
  } catch (error) {
    throw new ApiError(403, error.message);
  }
});

export { signup, validateOtp, login, logout, resendOtp };
