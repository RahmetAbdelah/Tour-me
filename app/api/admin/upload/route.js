import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Admin (Use your service_role_key for storage bypass)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Create a unique filename
    const fileName = `${Date.now()}-${file.name}`;
    
    // Upload to the 'tours' bucket
    const { data, error } = await supabase.storage
      .from("tours")
      .upload(fileName, file);

    if (error) throw error;

    // Get the Public URL
    const { data: { publicUrl } } = supabase.storage
      .from("tours")
      .getPublicUrl(fileName);

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error("UPLOAD_ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}