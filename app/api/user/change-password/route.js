import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { oldPassword, newPassword } = await req.json();

    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    // 1. Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Current password incorrect" }, { status: 401 });
    }

    // 2. Hash and Save new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { password: hashedNewPassword },
    });

    return NextResponse.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Password change failed" }, { status: 500 });
  }
}