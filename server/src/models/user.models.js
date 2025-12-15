import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ApiError } from '../utils/index.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN', 'SUB_ADMIN', 'SOLVER'],
      default: 'USER',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function () {
  // If password is not modified, move to the next middleware
  if (!this.isModified('password')) return;

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw new ApiError(401, error.message);
  }
});

//Never use arrow function
userSchema.methods.isPasswordCorrect = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    return false;
  }
};

userSchema.methods.generateAccessToken = function () {
  // short lived token
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
    },
    process.env.ACCESSTOKEN_SECRET_KEY,
    {
      expiresIn: process.env.ACCESSTOKEN_EXPIRE,
    },
  );
};

userSchema.methods.generateRefreshToken = function () {
  // Long lived token
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESHTOKEN_SECRET_KEY,
    {
      expiresIn: process.env.REFRESHTOKEN_EXPIRE,
    },
  );
};

export const User = mongoose.model('User', userSchema);
