import { Router } from "express";
import {
  deleteDoctorAppointments,
  getAllDoctors,
  getDoctorAppointments,
  getDoctorPatients,
  getPendingApprovals,
  handleAppointmentApproval,
} from "../controllers/doctor.controller.js";

const router = Router();
//delete appointments usig userId
router.delete("/appointments/:doctorId", deleteDoctorAppointments); // Add this route to delete an appointment by ID
router.get("/", getAllDoctors); // Add this route to fetch all doctors
router.get("/:doctorId/appointments", getDoctorAppointments);
router.get("/:doctorId/patients", getDoctorPatients);
router.get("/:doctorId/pending-approvals", getPendingApprovals);
router.post("/:doctorId/appointments/:appointmentId/approval", handleAppointmentApproval);

export default router;