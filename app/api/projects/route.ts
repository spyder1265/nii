// import { NextRequest, NextResponse } from "next/server";
// import cloudinary from "@/lib/cloudinary";
// import dbConnect from "@/lib/db";
// import Project from "@/models/Projects";

// interface ProjectInput {
//   name: string;
//   description: string;
//   images: string[];
//   date: string;
//   platform: string;
//   ytLink: string;
//   skillsDeliverables: string[];
// }

// export async function POST(req: NextRequest) {
//   if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
//     return NextResponse.json(
//       { success: false, error: "Cloudinary configuration missing" },
//       { status: 500 }
//     );
//   }

//   try {
//     await dbConnect();
//     const body = await req.json();
//     const {
//       name,
//       description,
//       images,
//       date,
//       platform,
//       ytLink,
//       skillsDeliverables,
//     } = body;

//     // Validate required fields
//     if (
//       !name ||
//       !description ||
//       !images ||
//       !date ||
//       !platform ||
//       !skillsDeliverables ||
//       !ytLink
//     ) {
//       return NextResponse.json(
//         { success: false, error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Validate and process skillsDeliverables
//     const processedSkills = Array.isArray(skillsDeliverables)
//       ? skillsDeliverables
//       : typeof skillsDeliverables === "string"
//       ? skillsDeliverables
//           .split(",")
//           .map((s) => s.trim())
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

//     // Validate images array
//     if (!Array.isArray(images) || images.length === 0) {
//       return NextResponse.json(
//         { success: false, error: "At least one image is required" },
//         { status: 400 }
//       );
//     }

//     // Upload images using signed upload
//     try {
//       const uploadedImages = await Promise.all(
//         images.map(async (image: string) => {
//           const uploadResponse = await cloudinary.uploader.upload(image, {
//             folder: "projects",
//             resource_type: "auto",
//             cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//             api_key: process.env.CLOUDINARY_API_KEY,
//             api_secret: process.env.CLOUDINARY_API_SECRET,
//           });
//           return uploadResponse.secure_url;
//         })
//       );

//       const newProject = await Project.create({
//         name,
//         description,
//         images: uploadedImages,
//         date,
//         platform,
//         ytLink,
//         skillsDeliverables: processedSkills,
//       });

//       return NextResponse.json({
//         success: true,
//         data: newProject,
//       });
//     } catch (uploadError) {
//       console.error("Image upload error:", uploadError);
//       return NextResponse.json(
//         { success: false, error: "Failed to upload images" },
//         { status: 500 }
//       );
//     }
//   } catch (error) {
//     console.error("Server error:", error);
//     return NextResponse.json(
//       { success: false, error: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(req: NextRequest) {
//   try {
//     await dbConnect();
//     const name = req.nextUrl.searchParams.get("name");

//     if (name) {
//       // Find a project by name (case-insensitive search)
//       const project = await Project.findOne({
//         name: { $regex: name, $options: "i" },
//       });

//       if (!project) {
//         return NextResponse.json(
//           { success: false, error: "Project not found" },
//           { status: 404 }
//         );
//       }

//       return NextResponse.json({
//         success: true,
//         data: project,
//       });
//     }

//     // If no name parameter is provided, return all projects
//     const projects = await Project.find({}).sort({ createdAt: -1 });
//     return NextResponse.json({
//       success: true,
//       data: projects,
//     });
//   } catch (error) {
//     console.error("Database error:", error);
//     return NextResponse.json(
//       { success: false, error: "Failed to fetch projects" },
//       { status: 500 }
//     );
//   }
// }

// // export async function GET(req: NextRequest) {
// //   try {
// //     await dbConnect();
// //     const _id = req.nextUrl.searchParams.get("_id");

// //     if (_id) {
// //       const project = await Project.findById(_id);

// //       if (!project) {
// //         return NextResponse.json(
// //           { success: false, error: "Project not found" },
// //           { status: 404 }
// //         );
// //       }

// //       return NextResponse.json({
// //         success: true,
// //         data: project,
// //       });
// //     }

// //     // If no id parameter is provided, return all projects
// //     const projects = await Project.find({}).sort({ createdAt: -1 });
// //     return NextResponse.json({
// //       success: true,
// //       data: projects,
// //     });
// //   } catch (error) {
// //     console.error("Database error:", error);
// //     return NextResponse.json(
// //       { success: false, error: "Failed to fetch projects" },
// //       { status: 500 }
// //     );
// //   }
// // }

// export async function PUT(req: NextRequest) {
//   try {
//     await dbConnect();
//     const body = await req.json();
//     const {
//       originalName, // Name of the project to update
//       name,
//       description,
//       images,
//       newImages, // Array of new base64 images
//       date,
//       platform,
//       ytLink,
//       skillsDeliverables,
//     } = body;

//     // Validate required fields
//     if (!name || !description || !date || !platform || !ytLink) {
//       return NextResponse.json(
//         { success: false, error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Process skillsDeliverables
//     const processedSkills = Array.isArray(skillsDeliverables)
//       ? skillsDeliverables
//       : typeof skillsDeliverables === "string"
//       ? skillsDeliverables
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

//     // Upload new images if any
//     let allImages = [...images]; // Start with existing images

//     if (newImages?.length > 0) {
//       try {
//         const uploadedImages = await Promise.all(
//           newImages.map(async (image: string) => {
//             const uploadResponse = await cloudinary.uploader.upload(image, {
//               folder: "projects",
//               resource_type: "auto",
//               cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//               api_key: process.env.CLOUDINARY_API_KEY,
//               api_secret: process.env.CLOUDINARY_API_SECRET,
//             });
//             return uploadResponse.secure_url;
//           })
//         );
//         allImages = [...allImages, ...uploadedImages];
//       } catch (uploadError) {
//         console.error("Image upload error:", uploadError);
//         return NextResponse.json(
//           { success: false, error: "Failed to upload new images" },
//           { status: 500 }
//         );
//       }
//     }

//     // Update the project
//     const updatedProject = await Project.findOneAndUpdate(
//       { name: { $regex: new RegExp(`^${originalName}$`, "i") } },
//       {
//         name,
//         description,
//         images: allImages,
//         date,
//         platform,
//         ytLink,
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
//     console.error("Server error:", error);
//     return NextResponse.json(
//       { success: false, error: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import cloudinary from "@/lib/cloudinary";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (id) {
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
    }

    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
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
    if (!name || !description || !date || !platform || !ytLink) {
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
