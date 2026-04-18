import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const myBookings = await prisma.booking.findMany({
      where: { 

        userId: parseInt(decoded.userId) 
      },
      include: {
        tour: true 
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ success: true, bookings: myBookings });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}