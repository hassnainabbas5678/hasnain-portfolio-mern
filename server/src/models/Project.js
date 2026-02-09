import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tech: { type: String, default: "" },

    imageUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
