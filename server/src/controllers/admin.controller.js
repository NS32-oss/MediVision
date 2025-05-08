import { Doctor } from "../models/doctor.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";

// Fetch all doctors
export const getAllDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find({}, "name email specialty experience patients status");
  return res
    .status(200)
    .json(new apiResponse(200, "Doctors fetched successfully", doctors));
});

// Fetch pending approvals
export const getPendingApprovals = asyncHandler(async (req, res) => {
  const pendingApprovals = await Doctor.find({ status: "Pending" });
  return res
    .status(200)
    .json(new apiResponse(200, "Pending approvals fetched successfully", pendingApprovals));
});

// Approve or reject a doctor
export const handleDoctorApproval = asyncHandler(async (req, res) => {
  const { doctorId } = req.params;
  const { isApproved } = req.body;

  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    return res.status(404).json(new apiResponse(404, "Doctor not found"));
  }

  doctor.status = isApproved ? "Approved" : "Rejected";
  await doctor.save();

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        `Doctor ${isApproved ? "approved" : "rejected"} successfully`,
        doctor
      )
    );
});