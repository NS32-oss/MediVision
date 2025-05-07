import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
  {
    businessName:{
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    ownerEmail: {
      type: String,
      required: true,
    }, // Clerk email of the business owner
    ownerClerkId: {
      type: String,
      required: true,
    },
    employees: [
      {        
        email: {
          type: String,
        },
        role: {
          type: String,
          enum: ["employee"],
          default: "employee",
        },
      },
    ],
    // Add any other business-specific fields here (address, etc.)
  },
  {
    timestamps: true,
  }
);

export const Business = mongoose.model("Business", businessSchema);
