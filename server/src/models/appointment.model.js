import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: String,
    required: true,
  },
  patient: {
    type: String,
    required: true,
  },
  appointmentType: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
