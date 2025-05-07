import { Router } from "express";
import {
  createBusiness,
  getBusiness,
  updateBusiness,
  addEmployeeToBusiness,
} from "../controllers/business.controller.js";
import { requireAuth } from "@clerk/clerk-sdk-node"; // Correct import

const router = Router();

router.use(requireAuth()); // Apply verifyJWT middleware to all routes in this file

// Route to create, fetch, or update a business
router
  .route("/")
  .post(createBusiness) // Create a new business
  .get(getBusiness) // Get the current owner's business details
  .patch(updateBusiness); // Update business details

// Route to add an employee to the business
router.route("/employee").post(addEmployeeToBusiness);

export default router;