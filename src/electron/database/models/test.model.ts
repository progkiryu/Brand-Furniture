import mongoose from "mongoose";

export const testSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const TestModel = mongoose.model("Test", testSchema);
