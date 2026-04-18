import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const body = await req.json();
    const { title, description, location, price, duration, imageUrl } = body;

    const newTour = await prisma.tour.create({
      data: {
        title,
        description,
        location,
        price: parseFloat(price),
        duration,
        imageUrl,
        createdBy: decoded.userId,
      },
    });

    return NextResponse.json({ success: true, tour: newTour }, { status: 201 });
  } catch (error) {
    console.error("CREATE_TOUR_ERROR:", error);
    return NextResponse.json({ error: "Failed to create tour" }, { status: 500 });
  }
}