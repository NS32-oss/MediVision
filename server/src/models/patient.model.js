import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  lastVisit: {
    type: Date,
  },
  records: [
    {
      date: {
        type: Date,
        required: true,
      },
      type: {
        type: String,
        required: true,
      }, // e.g., "Diagnosis", "Prescription"
      doctor: {
        type: String,
        required: true,
      }, // Doctor's name or ID
      summary: {
        type: String,
        required: true,
      }, // Brief description
    },
  ],
});

export const Patient = mongoose.model("Patient", patientSchema);
