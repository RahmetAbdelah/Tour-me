import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: true,
        tour: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const { bookingId, status } = await req.json();
    
    const updated = await prisma.booking.update({
      where: { id: bookingId },
      data: { status }
    });
    
    return NextResponse.json({ success: true, updated });
  } catch (error) {
    console.error("Failed to update booking status:", error);
    return NextResponse.json({ success: false, error: "Failed to update booking status" }, { status: 500 });
  }
}