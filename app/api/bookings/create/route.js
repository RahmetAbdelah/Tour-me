import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { tourId, travelDate, guests } = await req.json();

    // Fetch the tour to get the price for the database
    const tour = await prisma.tour.findUnique({ where: { id: tourId } });
    
    const booking = await prisma.booking.create({
      data: {
        userId: parseInt(decoded.userId), // 👈 Converts your JWT string ID to Int
        tourId,
        travelDate: new Date(travelDate),
        guests: parseInt(guests),
        totalPrice: tour.price * parseInt(guests),
        status: "pending"
      },
    });

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Booking failed" }, { status: 500 });
  }
}