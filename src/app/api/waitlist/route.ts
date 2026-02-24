import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const WAITLIST_FILE = path.join(process.cwd(), "waitlist.json");

function readWaitlist(): string[] {
  try {
    if (fs.existsSync(WAITLIST_FILE)) {
      const data = fs.readFileSync(WAITLIST_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch {
    // ignore read errors
  }
  return [];
}

function writeWaitlist(emails: string[]) {
  fs.writeFileSync(WAITLIST_FILE, JSON.stringify(emails, null, 2), "utf-8");
}

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

    const emails = readWaitlist();

    if (emails.includes(email)) {
      return NextResponse.json(
        { message: "You're already on the waitlist! We'll be in touch soon." },
        { status: 200 }
      );
    }

    emails.push(email);
    writeWaitlist(emails);

    return NextResponse.json(
      {
        message: "Welcome to the waitlist! We'll send you our research for free.",
        count: emails.length,
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
