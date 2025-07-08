import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      description,
      images, // Expect base64 strings
      date,
      platform,
      ytLink,
      skillsDeliverables,
    } = body;

    // Validate required fields
    if (
      !name ||
      !description ||
      !date ||
      !platform ||
      !ytLink ||
      !skillsDeliverables
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Process skillsDeliverables
    const processedSkills = Array.isArray(skillsDeliverables)
      ? skillsDeliverables
      : typeof skillsDeliverables === "string"
      ? skillsDeliverables
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

    // Upload images to Cloudinary
    let uploadedImageUrls: string[] = [];
    if (images?.length > 0) {
      try {
        uploadedImageUrls = await Promise.all(
          images.map(async (image: string) => {
            const uploadResponse = await cloudinary.uploader.upload(image, {
              folder: "projects",
              resource_type: "auto",
            });
            return uploadResponse.secure_url;
          })
        );
      } catch (uploadError) {
        console.error("Image upload error:", uploadError);
        return NextResponse.json(
          { success: false, error: "Failed to upload images" },
          { status: 500 }
        );
      }
    }

    // Create the project in the database
    const project = await prisma.project.create({
      data: {
        name,
        description,
        images: uploadedImageUrls,
        date,
        platform,
        ytLink,
        skillsDeliverables: processedSkills,
      },
    });

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const filter = req.nextUrl.searchParams.get("filter");

    if (id) {
      try {
        const project = await prisma.project.findUnique({
          where: { id },
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
      } catch (findError) {
        console.error("Error finding project by ID:", findError);
        return NextResponse.json(
          {
            success: false,
            error: "Failed to fetch project",
            details:
              findError instanceof Error ? findError.message : "Unknown error",
          },
          { status: 500 }
        );
      }
    }

    let where = {};
    if (filter === "active") where = { archived: false };
    else if (filter === "archived") where = { archived: true };
    // else (all) leave where = {}

    try {
      const projects = await prisma.project.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json({
        success: true,
        data: projects,
      });
    } catch (findError) {
      console.error("Error finding all projects:", findError);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to fetch projects",
          details:
            findError instanceof Error ? findError.message : "Unknown error",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch projects",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id,
      name,
      description,
      images,
      newImages,
      date,
      platform,
      ytLink,
      skillsDeliverables,
    } = body;

    // Validate required fields
    if (
      !name ||
      !description ||
      !date ||
      !platform ||
      !ytLink ||
      !skillsDeliverables
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Process skillsDeliverables
    const processedSkills = Array.isArray(skillsDeliverables)
      ? skillsDeliverables
      : typeof skillsDeliverables === "string"
      ? skillsDeliverables
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

    // Upload new images if any
    let allImages = [...images];

    if (newImages?.length > 0) {
      try {
        const uploadedImages = await Promise.all(
          newImages.map(async (image: string) => {
            const uploadResponse = await cloudinary.uploader.upload(image, {
              folder: "projects",
              resource_type: "auto",
            });
            return uploadResponse.secure_url;
          })
        );
        allImages = [...allImages, ...uploadedImages];
      } catch (uploadError) {
        console.error("Image upload error:", uploadError);
        return NextResponse.json(
          { success: false, error: "Failed to upload new images" },
          { status: 500 }
        );
      }
    }

    // Update the project
    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        name,
        description,
        images: allImages,
        date,
        platform,
        ytLink,
        skillsDeliverables: processedSkills,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedProject,
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
