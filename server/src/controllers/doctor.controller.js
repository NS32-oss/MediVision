import { Doctor } from "../models/doctor.model.js";
import { Appointment } from "../models/appointment.model.js";
import { Patient } from "../models/patient.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";

// Fetch all appointments for a doctor
export const getDoctorAppointments = asyncHandler(async (req, res) => {
  const { doctorId } = req.params;
  const appointments = await Appointment.find({ doctor: doctorId }).populate("patient");
  return res.status(200).json(new apiResponse(200, "Appointments fetched successfully", appointments));
});

// Fetch all patients for a doctor
export const getDoctorPatients = asyncHandler(async (req, res) => {
  const { doctorId } = req.params;
  const doctor = await Doctor.findById(doctorId).populate("patients");
  return res.status(200).json(new apiResponse(200, "Patients fetched successfully", doctor.patients));
});

// Fetch pending approvals for a doctor
export const getPendingApprovals = asyncHandler(async (req, res) => {
  const { doctorId } = req.params;
  const pendingApprovals = await Appointment.find({ doctor: doctorId, status: "Pending" }).populate("patient");
  return res.status(200).json(new apiResponse(200, "Pending approvals fetched successfully", pendingApprovals));
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

  return res.status(200).json(new apiResponse(200, `Appointment ${isApproved ? "approved" : "rejected"} successfully`, appointment));
});