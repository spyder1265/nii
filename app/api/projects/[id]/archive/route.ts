import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (!id)
    return NextResponse.json({ error: "Project ID required" }, { status: 400 });

  try {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project)
      return NextResponse.json({ error: "Project not found" }, { status: 404 });

    const updated = await prisma.project.update({
      where: { id },
      data: { archived: !project.archived },
    });
    return NextResponse.json({ success: true, archived: updated.archived });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}
