import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { defaultData } from "@/lib/data";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Initialize Supabase Client if variables are configured
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export async function GET() {
  if (!supabase) {
    return NextResponse.json({
      success: true,
      db_connected: false,
      data: defaultData,
    });
  }

  try {
    const { data: row, error } = await supabase
      .from("portfolio")
      .select("data")
      .eq("id", 1)
      .single();

    if (error || !row || !row.data || Object.keys(row.data).length === 0) {
      // Seed defaultData to database on initial connect
      await supabase.from("portfolio").upsert({ id: 1, data: defaultData });
      return NextResponse.json({
        success: true,
        db_connected: true,
        data: defaultData,
      });
    }

    return NextResponse.json({
      success: true,
      db_connected: true,
      data: row.data,
    });
  } catch {
    return NextResponse.json({
      success: true,
      db_connected: true,
      data: defaultData,
    });
  }
}

export async function POST(req: Request) {
  // 1. Authenticate with admin password
  const authHeader = req.headers.get("Authorization");
  const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "harimohan787799";

  if (!authHeader || authHeader !== correctPassword) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access denied." },
      { status: 401 }
    );
  }

  // 2. Check Database connection
  if (!supabase) {
    return NextResponse.json(
      { success: false, error: "Database not connected. Configuration missing." },
      { status: 500 }
    );
  }

  try {
    const payload = await req.json();

    // Upsert payload to single portfolio row id=1
    const { error } = await supabase
      .from("portfolio")
      .upsert({ id: 1, data: payload, updated_at: new Date().toISOString() });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process request." },
      { status: 500 }
    );
  }
}
