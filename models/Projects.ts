import mongoose, { Schema, model, models, Document } from "mongoose";

export interface ProjectDocument extends Document {
  name: string;
  description: string;
  images: string[]; // Array of Base64 image strings
  date: string;
  platform: string;
  ytLink?: string;
  skillsDeliverables?: string; // Array of strings for skills and deliverables
}

const projectSchema = new Schema<ProjectDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  date: { type: String, required: true },
  platform: { type: String, required: true },
  ytLink: { type: String, required: true },
  skillsDeliverables: { type: String, required: true }, // Store as an array of strings
});

const Project =
  models.Project || model<ProjectDocument>("Project", projectSchema);

export default Project;
