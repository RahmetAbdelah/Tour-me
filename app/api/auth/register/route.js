import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";  
import { registerSchema } from "@/lib/validations/auth"; // Make sure this path is correct
export async function GET() {
  return NextResponse.json({ message: "API is working" });
}

export async function POST(req) {
    try {
        const body = await req.json();
        
        // 1. Validate the data
        const validation = registerSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ 
                error: "Validation failed", 
                details: validation.error.format() 
            }, { status: 400 });
        }

        const { email, password, firstName, lastName, phone, location, birthdate } = validation.data;

        // 2. Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json({ error: "Email already registered" }, { status: 409 });
        }

        // 3. Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // 4. Create the user
        const newUser = await prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                phone,
                location,
                birthDate: new Date(birthdate),
                password: hashedPassword,
            },
        });

        return NextResponse.json({ 
            success: true, 
            message: "User created successfully!",
            userId: newUser.id 
        }, { status: 201 });

    } catch (error) {
        console.error("REGISTER_ERROR:", error);
        return NextResponse.json({ 
            error: "Internal Server Error", 
            message: error.message 
        }, { status: 500 });
    }
}
