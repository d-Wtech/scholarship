import mongoose from "mongoose";

const testSchema = new mongoose.Schema({}, { timestamps: true });

export const testModel = new mongoose.model("testModel", testSchema);
