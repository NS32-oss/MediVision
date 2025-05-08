import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  specialty: { type: String, required: true },
  experience: { type: Number, required: true },
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
  patients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" }],
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }, // New field
});

export const Doctor = mongoose.model("Doctor", doctorSchema);