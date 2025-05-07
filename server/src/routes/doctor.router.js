import { Router } from "express";
import {
  getDoctorAppointments,
  getDoctorPatients,
  getPendingApprovals,
  handleAppointmentApproval,
} from "../controllers/doctor.controller.js";

const router = Router();

router.get("/:doctorId/appointments", getDoctorAppointments);
router.get("/:doctorId/patients", getDoctorPatients);
router.get("/:doctorId/pending-approvals", getPendingApprovals);
router.post("/:doctorId/appointments/:appointmentId/approval", handleAppointmentApproval);

export default router;