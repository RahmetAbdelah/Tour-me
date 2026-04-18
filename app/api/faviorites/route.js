import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
export async function GET(req) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const favorites = await prisma.favorite.findMany({
      where: { userId: parseInt(decoded.userId) }, // Must be Int
      include: { tour: true }
    });

   
    return NextResponse.json({ success: true, tours: favorites.map(f => f.tour) });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching favorites" }, { status: 500 });
  }
}