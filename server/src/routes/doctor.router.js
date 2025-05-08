import { Router } from "express";
import {
  deleteDoctorAppointments,
  getAllDoctors,
  getDoctorAppointments,
  getDoctorPatients,
  getPendingApprovals,
  handleAppointmentApproval,
} from "../controllers/doctor.controller.js";
import apiResponse from "../utils/apiResponse.js";
import { Doctor } from "../models/doctor.model.js";
import User from "../models/user.model.js"; // Import the User model

const router = Router();
//delete appointments usig userId
router.delete("/appointments/:doctorId", deleteDoctorAppointments); // Add this route to delete an appointment by ID
router.get("/", getAllDoctors); // Add this route to fetch all doctors
router.get("/:doctorId/appointments", getDoctorAppointments);
router.get("/:doctorId/patients", getDoctorPatients);
router.get("/:doctorId/pending-approvals", getPendingApprovals);
router.post("/:doctorId/appointments/:appointmentId/approval", handleAppointmentApproval);
//delete all doctors
router.delete("/", async (req, res) => {
  try {
    await User.deleteMany({ userType: "doctor" });
    return res.status(200).json(new apiResponse(200, "All doctors deleted successfully"));
  } catch (error) {
    return res.status(500).json(new apiResponse(500, "Error deleting doctors", error));
  }
});
export default router;