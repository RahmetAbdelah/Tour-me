import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // 1. 🔒 THE TEST ADMIN SHORTCUT
    // This intercepts the request so you don't need a real database user to test the Admin UI.
    if (email === "admin@tourme.com" && password === "admin123") {
      return NextResponse.json({
        success: true,
        message: "Admin Test Login Successful",
        user: {
          id: "admin-id",
          firstName: "System",
          lastName: "Admin",
          email: "admin@tourme.com",
          role: "ADMIN" 
        },
        token: "fake-jwt-token-for-testing"
      }, { status: 200 });
    }

    // 2. REGULAR USER LOGIN (Database Check)
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 3. Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 4. Create JWT Token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "fallback_secret_for_dev",
      { expiresIn: "1d" }
    );

    // 5. Send real user response
    return NextResponse.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        email: user.email,
        role: user.role || "USER" // Make sure your DB user has a role too!
      }
    }, { status: 200 });

  } catch (error) {
    console.error("LOGIN_ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}