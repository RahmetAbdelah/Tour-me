import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Extract filters from URL
    const query = searchParams.get("query"); // Text search
    const location = searchParams.get("location");
    const category = searchParams.get("category");
    const maxPrice = searchParams.get("maxPrice");

    // Build the dynamic filter object
    const where = {};

    if (query) {
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } }
      ];
    }

    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }

    if (category) {
      where.category = category;
    }

    if (maxPrice) {
      where.price = { lte: parseFloat(maxPrice) }; // lte = "Less Than or Equal to"
    }

    const tours = await prisma.tour.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, count: tours.length, tours });

  } catch (error) {
    console.error("SEARCH_ERROR:", error);
    return NextResponse.json({ error: "Failed to search tours" }, { status: 500 });
  }
}