import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function DELETE(req) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await prisma.user.delete({
      where: { id: decoded.userId },
    });

    return NextResponse.json({ success: true, message: "Account deleted forever" });
  } catch (error) {
    return NextResponse.json({ error: "Could not delete account" }, { status: 500 });
  }
}