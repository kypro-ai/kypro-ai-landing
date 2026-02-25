import { NextResponse } from "next/server";
import { getStats } from "@/lib/analytics";

export function GET() {
  const stats = getStats();

  return NextResponse.json(stats, {
    headers: {
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
