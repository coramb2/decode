import { NextRequest, NextResponse } from "next/server";
import { getDecodeResponse } from "@/lib/decode";

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string" || query.trim().length === 0) {
      return NextResponse.json(
        { error: "No question provided." },
        { status: 400 }
      );
    }

    if (query.length > 2000) {
      return NextResponse.json(
        { error: "Question is too long. Try to keep it under 2000 characters." },
        { status: 400 }
      );
    }

    const response = await getDecodeResponse(query.trim());
    return NextResponse.json({ response });

  } catch (error) {
    console.error("Decode API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}