// app/api/admin/tours/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// --- GET: Fetch all tours OR single tour by ID ---
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // 1. Fetch SINGLE tour (for detail page)
    if (id) {
      const tour = await prisma.tour.findUnique({
        where: { id: id },   // Make sure your Prisma model uses String or Int for id
      });

      if (!tour) {
        return NextResponse.json(
          { success: false, error: "Tour not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, tour });
    }

    // 2. Fetch ALL tours (for Explore page)
    const tours = await prisma.tour.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, tours });
  } catch (error) {
    console.error("GET_TOURS_ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch tours" },
      { status: 500 }
    );
  }
}

// --- POST: Create new tour ---
export async function POST(req) {
  try {
    const body = await req.json();

    const newTour = await prisma.tour.create({
      data: {
        title: body.title,
        description: body.description,
        location: body.location || "Unknown Location",
        price: parseFloat(body.price),
        duration: body.duration || "3 Days",
        imageUrl: body.imageUrl,
        createdBy: "admin-id", // Change this later when you have real auth
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: "Tour created successfully",
      tour: newTour 
    });
  } catch (error) {
    console.error("POST_TOUR_ERROR:", error);
    return NextResponse.json(
      { success: false, error: error.message }, 
      { status: 500 }
    );
  }
}