import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const { date } = await req.json();

  if (!date) {
    return NextResponse.json({ exists: false });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!
  );

  // List all files
  const { data: files, error } = await supabase
    .storage
    .from("dashboards")
    .list();

  if (error) {
    console.error(error);
    return NextResponse.json({ exists: false });
  }

  // Check if any file starts with "{date}_"
  const exists = files.some(file => file.name.startsWith(`${date}_`));

  return NextResponse.json({ exists });
}