import { Router } from "express";
import {
  getAllDoctors,
  getPendingApprovals,
  handleDoctorApproval,
} from "../controllers/admin.controller.js";

const router = Router();

router.get("/doctors", getAllDoctors); // Fetch all doctors
router.get("/pending-approvals", getPendingApprovals); // Fetch pending approvals
router.post("/doctors/:doctorId/approval", handleDoctorApproval); // Approve/Reject doctor

export default router;