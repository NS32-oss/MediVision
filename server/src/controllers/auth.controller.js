import { Doctor } from "../models/doctor.model.js";
import { Patient } from "../models/patient.model.js";
import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Appointment } from "../models/appointment.model.js";
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

// src/controllers/auth.controller.js

export const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    userType,
    specialty,
    experience,
    age,
    gender,
    phone,
    condition,
    records,
  } = req.body;

  // Log incoming request for debugging
  console.log("Incoming registration data:", req.body);

  // Validate common fields
  if (!name || !email || !password || !userType) {
    return res
      .status(400)
      .json(
        new apiResponse(
          400,
          "Name, email, password, and userType are required",
          null
        )
      );
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json(new apiResponse(400, "User already exists", null));
  }

  // Create new user
  const user = await User.create({ name, email, password, userType });

  // Create a corresponding Doctor or Patient object
  if (userType === "doctor") {
    if (!specialty || !experience) {
      return res
        .status(400)
        .json(
          new apiResponse(
            400,
            "Specialty and experience are required for doctors",
            null
          )
        );
    }

    await Doctor.create({
      name: user.name,
      email: user.email,
      specialty,
      experience,
    });

    console.log(`New doctor created: ${user.name} (${user.email})`);
  } else if (userType === "patient") {
    if (!age || !gender || !phone || !condition) {
      return res
        .status(400)
        .json(
          new apiResponse(
            400,
            "Age, gender, phone, and condition are required for patients",
            null
          )
        );
    }

    // Make sure the records are properly cast to Mongoose subdocuments
    const patientRecords = records
      ? records.map((record) => ({
          date: new Date(record.date),
          type: record.type,
          doctor: record.doctor,
          summary: record.summary,
        }))
      : [];

    console.log("Records being saved:", patientRecords);

    const patient = await Patient.create({
      name: user.name,
      age,
      gender,
      phone,
      condition,
      records: patientRecords,
    });

    console.log("Patient records:", patient.records);
    console.log(`New patient created: ${user.name} (${user.email})`);
  }

  // Generate JWT Token
  const token = generateToken(user);

  return res.status(201).json(
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

  return res.status(200).json(
    new apiResponse(200, "User logged in successfully", {
      _id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      token,
    })
  );
});

//get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, "-password");
  return res
    .status(200)
    .json(new apiResponse(200, "Users fetched successfully", users));
});

//delete all user whose user type is patient
export const deleteAllPatients = asyncHandler(async (req, res) => {
  const patients = await User.deleteMany({ userType: "patient" });
  return res
    .status(200)
    .json(new apiResponse(200, "Patients deleted successfully", patients));
});

// to show all appoinments raw data
export const getAllAppointmentsRaw = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({});
  return res
    .status(200)
    .json(new apiResponse(200, "Appointments fetched successfully", appointments));
});