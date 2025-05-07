import { Router } from "express";
import { registerUser, loginUser, getAllUsers, deleteAllPatients, getAllAppointmentsRaw } from "../controllers/auth.controller.js";
import { get } from "mongoose";

const router = Router();

//delete usertype patient
router.get("/appointments",getAllAppointmentsRaw) // Add this route to fetch all patients
router.delete("/delete",deleteAllPatients)
router.get("/",getAllUsers)
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

export default router;
