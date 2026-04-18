import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    );

    // This clears the cookie named 'token'
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0), // Set expiration to the past
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}