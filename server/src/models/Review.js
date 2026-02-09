import mongoose from "mongoose";

export default mongoose.model(
  "Review",
  new mongoose.Schema(
    {
      name: String,
      rating: Number,
      message: String
    },
    { timestamps: true }
  )
);
