import { NextRequest, NextResponse } from "next/server";
import { createApiKey, findKeyBySession } from "@/lib/api-keys";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pitfallIds, sessionId } = body as {
      pitfallIds?: string[];
      sessionId?: string;
    };

    // If a session ID is provided, look up existing key
    if (sessionId) {
      const existing = findKeyBySession(sessionId);
      if (existing) {
        return NextResponse.json(
          { key: existing.key, pitfallIds: existing.pitfallIds, createdAt: existing.createdAt },
          { headers: corsHeaders }
        );
      }
    }

    if (!pitfallIds || pitfallIds.length === 0) {
      return NextResponse.json(
        { error: "pitfallIds array is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const record = createApiKey(pitfallIds, sessionId);

    return NextResponse.json(
      { key: record.key, pitfallIds: record.pitfallIds, createdAt: record.createdAt },
      { status: 201, headers: corsHeaders }
    );
  } catch (err: unknown) {
    console.error("[keys] Error:", err);
    return NextResponse.json(
      { error: "Failed to create API key" },
      { status: 500, headers: corsHeaders }
    );
  }
}
