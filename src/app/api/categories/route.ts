import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Get categories endpoint" });
}

export async function POST() {
  return NextResponse.json({ message: "Create category endpoint" });
}
