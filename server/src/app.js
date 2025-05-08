// Load environment variables
import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Initialize Express app
const app = express();

// Middleware for security and performance

// Rate limiting to prevent abuse (100 requests per 15 minutes per IP)

// CORS configuration

app.use(cors());

// Body parsers
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static file serving
app.use(express.static("public"));

// Import and declare routes
import authRouter from "./routes/auth.router.js";
import doctorRouter from "./routes/doctor.router.js";
import patientRouter from "./routes/patient.router.js";
import adminRouter from "./routes/admin.router.js";

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/patients", patientRouter);
app.use("/api/v1/doctors", doctorRouter);
app.use("/api/v1/auth", authRouter);

// Health check route
app.get("/", (req, res) => res.send("MediVision API is running..."));

// Centralized error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err); // Delegate to the default Express error handler
  }

  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Log a message indicating the app is running
console.log("App.js is running");

export default app;
