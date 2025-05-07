import { Doctor } from "../models/doctor.model.js";
import { Appointment } from "../models/appointment.model.js";
import { Patient } from "../models/patient.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";

// Fetch all appointments for a doctor
export const getDoctorAppointments = asyncHandler(async (req, res) => {
  const { doctorId } = req.params;
  console.log("Fetching appointments for doctor:", doctorId);
  const appointments = await Appointment.find({ doctor: doctorId }).populate(
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
  console.log("Fetching patients for doctor:", req.params.doctorId);
  const { doctorId } = req.params;

  // Find the doctor by ID
  const doctor = await Doctor.findById(doctorId).populate("patients");

  // Handle the case where the doctor is not found
  if (!doctor) {
    console.log("Doctor not found:", doctorId);
    return;
  }

  return res
    .status(200)
    .json(
      new apiResponse(200, "Patients fetched successfully", doctor.patients)
    );
});

// Fetch pending approvals for a doctor
export const getPendingApprovals = asyncHandler(async (req, res) => {
  const { doctorId } = req.params;
  const pendingApprovals = await Appointment.find({
    doctor: doctorId,
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
  const doctors = await Doctor.find({}, "name email specialty experience");
  console.log("Fetched doctors:", doctors);
  return res
    .status(200)
    .json(new apiResponse(200, "Doctors fetched successfully", doctors));
});