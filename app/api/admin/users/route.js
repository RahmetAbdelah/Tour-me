import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        bookings: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedUsers = users.map(user => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      status: "Active",
      bookings: user.bookings.length,
      createdAt: user.createdAt,
    }));

    return NextResponse.json({ success: true, users: formattedUsers });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch users" }, { status: 500 });
  }
}
