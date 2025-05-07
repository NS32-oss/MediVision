import { Appointment } from "../models/appointment.model.js";
import { Patient } from "../models/patient.model.js";
import { Doctor } from "../models/doctor.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import User from "../models/user.model.js"; // Import the User model

export const bookAppointment = asyncHandler(async (req, res) => {
  console.log("Booking appointment for user:", req.body);
  const { patientId } = req.params; // This is actually the userId
  const { doctorId, appointmentType, dateTime } = req.body;

  // Validate input
  if (!doctorId || !appointmentType || !dateTime) {
    return res
      .status(400)
      .json(
        new apiResponse(
          400,
          "Doctor ID, appointment type, and date/time are required"
        )
      );
  }

  // Check if the user exists and is a patient
  const user = await User.findById(patientId);
  if (!user) {
    console.log("User not found:", patientId);
    return res.status(404).json(new apiResponse(404, "User not found"));
  }

  if (user.userType !== "patient") {
    console.log("User is not a patient:", patientId);
    return res
      .status(403)
      .json(
        new apiResponse(403, "User is not authorized to book an appointment")
      );
  }

  // Check if the doctor exists
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    console.log("Doctor not found:", doctorId);
    return res.status(404).json(new apiResponse(404, "Doctor not found"));
  }

  // Convert the dateTime string into a valid Date object
  const today = new Date(); // Use today's date
  const [startTime] = dateTime.split(" - "); // Extract the start time
  const appointmentDateTime = new Date(`${today.toDateString()} ${startTime}`);

  if (isNaN(appointmentDateTime)) {
    return res
      .status(400)
      .json(new apiResponse(400, "Invalid date/time format"));
  }

  // Create the appointment
  const appointment = await Appointment.create({
    doctor: doctor.name,
    patient: user.name, // Use the userId as the patientId
    appointmentType,
    dateTime: appointmentDateTime, // Use the converted Date object
    status: "Pending", // Default status
  });

  return res
    .status(201)
    .json(new apiResponse(201, "Appointment booked successfully", appointment));
});

// Fetch all appointments for a patient
export const getPatientAppointments = asyncHandler(async (req, res) => {
  const { patientId } = req.params;

  console.log("Fetching appointments for patient:", patientId);
  const user = await User.findById(patientId);
  if (!user) {
    console.log("User not found:", patientId);
    return res.status(404).json(new apiResponse(404, "User not found"));
  }
  const appointments = await Appointment.find({ patient: user.name }).populate(
    "doctor"
  );

  return res
    .status(200)
    .json(
      new apiResponse(200, "Appointments fetched successfully", appointments)
    );
});

// Fetch all medical records for a patient
export const getPatientRecords = asyncHandler(async (req, res) => {
  const { patientId } = req.params; // This is actually the userId

  console.log("Fetching medical records for user:", patientId);

  // Check if the user exists and is a patient
  const user = await User.findById(patientId);
  if (!user) {
    console.log("User not found:", patientId);
    return res.status(404).json(new apiResponse(404, "User not found"));
  }

  if (user.userType !== "patient") {
    console.log("User is not a patient:", patientId);
    return res
      .status(403)
      .json(
        new apiResponse(403, "User is not authorized to access medical records")
      );
  }

  // Fetch the patient document using the userId
  const patient = await Patient.findOne({ name: user.name }); // Assuming `user` is a reference in the Patient model
  if (!patient) {
    console.log("Patient record not found for user:", patientId);
    return res
      .status(404)
      .json(new apiResponse(404, "Patient record not found"));
  }
  console.log("Patient record found:", patient);
  // Assuming medical records are stored in the `records` field of the patient document
  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        "Medical records fetched successfully",
        patient.records || []
      )
    );
});

//get all patients
export const getAllPatients = asyncHandler(async (req, res) => {
  const patients = await Patient.find({});
  return res
    .status(200)
    .json(new apiResponse(200, "Patients fetched successfully", patients));
});
