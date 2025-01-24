import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Project from "@/models/Projects";

export async function GET(
  req: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    await dbConnect();
    const decodedName = decodeURIComponent(params.name);

    const project = await Project.findOne({
      name: { $regex: new RegExp(`^${decodedName}$`, "i") },
    });

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    await dbConnect();
    const decodedName = decodeURIComponent(params.name);
    const body = await req.json();

    // Validate required fields
    if (
      !body.name ||
      !body.description ||
      !body.date ||
      !body.platform ||
      !body.images ||
      !body.ytLink ||
      !body.skillsDeliverables
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Process skillsDeliverables
    const processedSkills = Array.isArray(body.skillsDeliverables)
      ? body.skillsDeliverables
      : typeof body.skillsDeliverables === "string"
      ? body.skillsDeliverables
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean)
      : [];

    if (processedSkills.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "At least one skill or deliverable is required",
        },
        { status: 400 }
      );
    }

    const updatedProject = await Project.findOneAndUpdate(
      { name: { $regex: new RegExp(`^${decodedName}$`, "i") } },
      {
        ...body,
        skillsDeliverables: processedSkills,
      },
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedProject,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { _id: string } }
// ) {
//   try {
//     await dbConnect();
//     const project = await Project.findById(params._id);

//     if (!project) {
//       return NextResponse.json(
//         { success: false, error: "Project not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       data: project,
//     });
//   } catch (error) {
//     console.error("Database error:", error);
//     return NextResponse.json(
//       { success: false, error: "Failed to fetch project" },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { _id: string } }
// ) {
//   try {
//     await dbConnect();
//     const body = await req.json();

//     // Validate required fields
//     if (
//       !body.name ||
//       !body.description ||
//       !body.date ||
//       !body.platform ||
//       !body.images ||
//       !body.ytLink ||
//       !body.skillsDeliverables
//     ) {
//       return NextResponse.json(
//         { success: false, error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Process skillsDeliverables
//     const processedSkills = Array.isArray(body.skillsDeliverables)
//       ? body.skillsDeliverables
//       : typeof body.skillsDeliverables === "string"
//       ? body.skillsDeliverables
//           .split(",")
//           .map((s: string) => s.trim())
//           .filter(Boolean)
//       : [];

//     if (processedSkills.length === 0) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: "At least one skill or deliverable is required",
//         },
//         { status: 400 }
//       );
//     }

//     const updatedProject = await Project.findByIdAndUpdate(
//       params._id,
//       {
//         ...body,
//         skillsDeliverables: processedSkills,
//       },
//       { new: true }
//     );

//     if (!updatedProject) {
//       return NextResponse.json(
//         { success: false, error: "Project not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       data: updatedProject,
//     });
//   } catch (error) {
//     console.error("Database error:", error);
//     return NextResponse.json(
//       { success: false, error: "Failed to update project" },
//       { status: 500 }
//     );
//   }
// }
