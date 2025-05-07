import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  condition: { type: String, required: true },
  lastVisit: { type: Date },
});

export const Patient = mongoose.model("Patient", patientSchema);