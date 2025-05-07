import { Router } from "express";
import {
  bookAppointment,
  getAllPatients,
  getPatientAppointments,
  getPatientRecords,
} from "../controllers/patient.controller.js";
import { get } from "mongoose";

const router = Router();

router.get("/",getAllPatients) // Add this route to fetch all patients
router.post("/:patientId/appointments", bookAppointment); // Add this route
router.get("/:patientId/appointments", getPatientAppointments);
router.get("/:patientId/records", getPatientRecords);

export default router;
