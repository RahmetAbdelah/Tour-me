import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const totalBookings = await prisma.booking.count();
    const activeUsers = await prisma.user.count();
    const destinationsCount = await prisma.tour.count();
    
    const confirmedBookings = await prisma.booking.findMany({
      where: { status: "Confirmed" }
    });
    
    const totalRevenue = confirmedBookings.reduce((sum, booking) => sum + booking.totalPrice, 0);

    return NextResponse.json({ 
      success: true, 
      analytics: {
        totalRevenue,
        totalBookings,
        activeUsers,
        destinationsCount
      } 
    });
  } catch (error) {
    console.error("Failed to fetch analytics:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch analytics" }, { status: 500 });
  }
}
