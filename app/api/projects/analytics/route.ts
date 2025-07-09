import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const total = await prisma.project.count();
    const active = await prisma.project.count({ where: { archived: false } });
    const archived = await prisma.project.count({ where: { archived: true } });
    return NextResponse.json({
      success: true,
      data: { total, active, archived },
    });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
