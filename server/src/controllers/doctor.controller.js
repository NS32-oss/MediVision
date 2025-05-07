import { Doctor } from "../models/doctor.model.js";
import { Appointment } from "../models/appointment.model.js";
import { Patient } from "../models/patient.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import User from "../models/user.model.js"; // Import the User model

// Fetch all appointments for a doctor
export const getDoctorAppointments = asyncHandler(async (req, res) => {
  const { doctorId } = req.params; // This is actually the userId
  console.log("Fetching appointments for doctor (user):", doctorId);

  const user = await User.findById(doctorId);
  if (!user) {
    console.log("User not found:", doctorId);
    return res.status(404).json(new apiResponse(404, "User not found"));
  }
  console.log("User found:", user);
  const doctor = await Doctor.findOne({ name: user.name });
  if (!doctor) {
    console.log("Doctor not found for user:", doctorId);
    return res.status(404).json(new apiResponse(404, "Doctor not found"));
  }

  // Fetch appointments for the doctor
  const appointments = await Appointment.find({ doctor: doctor._id }).populate(
    "patient"
  );

  return res
    .status(200)
    .json(
      new apiResponse(200, "Appointments fetched successfully", appointments)
    );
});
// Fetch all patients for a doctor
export const getDoctorPatients = asyncHandler(async (req, res) => {
  const { doctorId } = req.params; // This is actually the userId
  console.log("Fetching patients for doctor (user):", doctorId);
  
  const user = await User.findById(doctorId);
  if (!user) {
    console.log("User not found:", doctorId);
    return res.status(404).json(new apiResponse(404, "User not found"));
  }
  // Find the doctor using the userId
  const doctor = await Doctor.findOne({ name: user.name }).populate("patients");
  if (!doctor) {
    console.log("Doctor not found for user:", doctorId);
    return res.status(404).json(new apiResponse(404, "Doctor not found"));
  }

  return res
    .status(200)
    .json(
      new apiResponse(200, "Patients fetched successfully", doctor.patients)
    );
});

// Fetch pending approvals for a doctor
export const getPendingApprovals = asyncHandler(async (req, res) => {
  const { doctorId } = req.params; // This is actually the userId
  console.log("Fetching pending approvals for doctor (user):", doctorId);

  const user = await User.findById(doctorId);
  if (!user) {
    console.log("User not found:", doctorId);
    return res.status(404).json(new apiResponse(404, "User not found"));
  }
  // Find the doctor using the userId
  const doctor = await Doctor.findOne({ name: user.name });
  if (!doctor) {
    console.log("Doctor not found for user:", doctorId);
    return res.status(404).json(new apiResponse(404, "Doctor not found"));
  }

  // Fetch pending approvals for the doctor
  const pendingApprovals = await Appointment.find({
    doctor: doctor._id,
    status: "Pending",
  }).populate("patient");

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        "Pending approvals fetched successfully",
        pendingApprovals
      )
    );
});

// Approve or reject an appointment
export const handleAppointmentApproval = asyncHandler(async (req, res) => {
  const { appointmentId } = req.params;
  const { isApproved } = req.body;

  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) {
    return res.status(404).json(new apiResponse(404, "Appointment not found"));
  }

  appointment.status = isApproved ? "Approved" : "Rejected";
  await appointment.save();

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        `Appointment ${isApproved ? "approved" : "rejected"} successfully`,
        appointment
      )
    );
});

export const getAllDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find({}, "name email specialty experience password");
  console.log("Fetched doctors:", doctors);
  return res
    .status(200)
    .json(new apiResponse(200, "Doctors fetched successfully", doctors));
});