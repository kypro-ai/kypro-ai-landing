import { NextRequest, NextResponse } from "next/server";
import { logVisit } from "@/lib/visit-log";

/**
 * POST /api/track
 * Body: { path: string }
 * Lightweight page-visit tracker for client-side pages.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path } = body as { path?: string };
    if (!path) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const ua = request.headers.get("user-agent") || "";
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    logVisit(path, ua, ip, false);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
