import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, userType: user.userType },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// Register User
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, userType } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json(new apiResponse(400, "User already exists", null));
  }

  // Create new user
  const user = await User.create({ name, email, password, userType });
  const token = generateToken(user);

  return res
    .status(201)
    .json(
      new apiResponse(201, "User registered successfully", {
        _id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        token,
      })
    );
});

// Login User
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    return res
      .status(401)
      .json(new apiResponse(401, "Invalid email or password", null));
  }

  const token = generateToken(user);

  return res
    .status(200)
    .json(
      new apiResponse(200, "User logged in successfully", {
        _id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        token,
      })
    );
});
