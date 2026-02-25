import { NextRequest, NextResponse } from "next/server";
import { getRecentVisits, getDailyStats } from "@/lib/visit-log";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date") || undefined;
  
  const [recent, daily] = await Promise.all([
    getRecentVisits(50),
    getDailyStats(date),
  ]);

  return NextResponse.json({
    daily,
    recent,
  }, {
    headers: {
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
