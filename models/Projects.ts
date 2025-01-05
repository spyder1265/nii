import mongoose, { Schema, Document, model, models } from "mongoose";

// Define the TypeScript interface for a Project document
export interface ProjectDocument extends Document {
  name: string;
  description: string;
  images: string[]; // Array of Base64 strings for multiple images
  date: string; // Month and year (e.g., "January 2025")
  platform: string;
  ytLink?: string; // Optional field
  skillsDeliverables?: string; // Optional field
}

// Define the Mongoose schema for the Project model
const projectSchema = new Schema<ProjectDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true }, // Array of Base64 image strings
  date: { type: String, required: true }, // Month and year
  platform: { type: String, required: true },
  ytLink: { type: String, required: false }, // Optional
  skillsDeliverables: { type: String, required: false }, // Optional
});

// Create or reuse the Project model
const ProjectModel =
  models.Project || model<ProjectDocument>("Project", projectSchema);

export default ProjectModel;
