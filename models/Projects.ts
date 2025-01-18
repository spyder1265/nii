import mongoose, { Schema, model, models, Document } from "mongoose";

export interface ProjectDocument extends Document {
  name: string;
  description: string;
  images: string[];
  date: string;
  platform: string;
  ytLink: string;
  skillsDeliverables: string[]; // Changed to string array
}

const projectSchema = new Schema<ProjectDocument>(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
    },
    images: {
      type: [String],
      required: [true, "At least one image is required"],
    },
    date: {
      type: String,
      required: [true, "Project date is required"],
    },
    platform: {
      type: String,
      required: [true, "Platform is required"],
    },
    ytLink: {
      type: String,
      required: [true, "YouTube link is required"],
    },
    skillsDeliverables: {
      type: [String],
      required: [true, "Skills and deliverables are required"],
      validate: {
        validator: function (v: string[]) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "At least one skill or deliverable is required",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Project =
  models.Project || model<ProjectDocument>("Project", projectSchema);

export default Project;
