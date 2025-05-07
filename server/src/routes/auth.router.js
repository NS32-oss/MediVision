import { Router } from "express";
import { registerUser, loginUser, getAllUsers } from "../controllers/auth.controller.js";
import { get } from "mongoose";

const router = Router();

router.get("/",getAllUsers)
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

export default router;
