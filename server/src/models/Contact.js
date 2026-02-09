import mongoose from "mongoose";

export default mongoose.model(
  "Contact",
  new mongoose.Schema(
    {
      name: String,
      email: String,
      phone: String,
      message: String
    },
    { timestamps: true }
  )
);
