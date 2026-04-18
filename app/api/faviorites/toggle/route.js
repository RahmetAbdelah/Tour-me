import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const { tourId } = await req.json();
    const userId = parseInt(decoded.userId); 

    const existing = await prisma.favorite.findFirst({
      where: { userId, tourId }
    });

    if (existing) {
      
      await prisma.favorite.delete({ where: { id: existing.id } });
      return NextResponse.json({ success: true, message: "Removed from favorites", isFavorite: false });
    } else {
      // 3. Add it
      await prisma.favorite.create({
        data: { userId, tourId }
      });
      return NextResponse.json({ success: true, message: "Added to favorites", isFavorite: true });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Toggle failed" }, { status: 500 });
  }
}