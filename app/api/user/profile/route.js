import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function PATCH(req) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const body = await req.json();
    const { firstName, lastName, phone, location } = body;

    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        firstName,
        lastName,
        phone,
        location,
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: "Profile updated", 
      user: updatedUser 
    });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}