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
  const appointments = await Appointment.find({ doctor: doctor.name }).populate(
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
    doctor: doctor.name,
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

  // Find the appointment
  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) {
    return res.status(404).json(new apiResponse(404, "Appointment not found"));
  }

  // Update the appointment status
  appointment.status = isApproved ? "Approved" : "Rejected";
  await appointment.save();

  // If approved, add the patient to the doctor's patients array
  if (isApproved) {
    const doctor = await Doctor.findOne({ name: appointment.doctor });
    if (!doctor) {
      return res.status(404).json(new apiResponse(404, "Doctor not found"));
    }

    // Fetch the patient's ObjectId
    const patient = await Patient.findOne({ name: appointment.patient });
    if (!patient) {
      return res.status(404).json(new apiResponse(404, "Patient not found"));
    }

    // Check if the patient is already in the doctor's patients array
    const patientExists = doctor.patients.some(
      (patientId) => patientId.toString() === patient._id.toString()
    );

    if (!patientExists) {
      doctor.patients.push(patient._id); // Use the patient's ObjectId
      await doctor.save();
    }
  }

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


// delete appointments for a Doctor using it id
export const deleteDoctorAppointments = asyncHandler(async (req, res) => {
  const { doctorId } = req.params; // This is actually the userId
  console.log("Deleting appointments for doctor (user):", doctorId);

  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    console.log("User not found:", doctorId);
    return res.status(404).json(new apiResponse(404, "User not found"));
  }
  // Find the doctor using the userId       
   // Delete appointments for the doctor
  await Appointment.deleteMany({ doctor: doctor.name });

  return res
    .status(200)
    .json(
      new apiResponse(200, "Appointments deleted successfully")
    );
});



