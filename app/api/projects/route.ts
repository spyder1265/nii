import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Project from "@/models/Projects";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json(); // Parse request body
    const {
      name,
      description,
      images,
      date,
      platform,
      ytLink,
      skillsDeliverables,
    } = body;

    const newProject = await Project.create({
      name,
      description,
      images, // Array of Base64 strings
      date,
      platform,
      ytLink,
      skillsDeliverables,
    });

    return NextResponse.json({ success: true, data: newProject });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const name = req.nextUrl.searchParams.get("name");

    if (name) {
      // Find a project by name (case-insensitive search)
      const project = await Project.findOne({
        name: { $regex: name, $options: "i" },
      });
      if (!project) {
        return NextResponse.json(
          { success: false, error: "Project not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: project });
    }

    // If no name parameter is provided, return all projects
    const projects = await Project.find({});
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
