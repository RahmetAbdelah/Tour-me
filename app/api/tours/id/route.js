import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    const tour = await prisma.tour.findUnique({
      where: { id },
    });

    if (!tour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, tour });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tour" }, { status: 500 });
  }
}