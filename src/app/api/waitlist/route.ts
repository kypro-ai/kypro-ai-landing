import { NextRequest, NextResponse } from "next/server";

// In-memory waitlist (resets on redeploy — fine for now)
const waitlistEmails: Set<string> = new Set();

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

    if (waitlistEmails.has(email)) {
      return NextResponse.json(
        { message: "You're already on the waitlist! We'll be in touch soon." },
        { status: 200 }
      );
    }

    waitlistEmails.add(email);

    return NextResponse.json(
      {
        message: "Welcome to the waitlist! We'll send you our research for free.",
        count: waitlistEmails.size,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    count: waitlistEmails.size,
  });
}
