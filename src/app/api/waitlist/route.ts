import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

const WAITLIST_KEY = "waitlist:emails";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body.email?.trim()?.toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const redis = getRedis();
    if (!redis) {
      return NextResponse.json(
        { error: "Database not configured." },
        { status: 503 }
      );
    }

    // Check if already on waitlist
    const isMember = await redis.sismember(WAITLIST_KEY, email);
    if (isMember) {
      return NextResponse.json(
        { message: "You're already on the waitlist! We'll be in touch soon." },
        { status: 200 }
      );
    }

    // Add to waitlist
    await redis.sadd(WAITLIST_KEY, email);
    const count = await redis.scard(WAITLIST_KEY);

    return NextResponse.json(
      {
        message: "Welcome to the waitlist! We'll send you our research for free.",
        count,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("[waitlist] Error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const redis = getRedis();
  if (!redis) return NextResponse.json({ count: 0 });
  const count = await redis.scard(WAITLIST_KEY);
  return NextResponse.json({ count });
}
