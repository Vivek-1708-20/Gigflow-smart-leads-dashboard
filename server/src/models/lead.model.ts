import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    status: String,
    source: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Lead", leadSchema);