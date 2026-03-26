import { NextRequest, NextResponse } from "next/server";

/**
 * Redirect ke halaman verify-email
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  if (!token || !email) {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return NextResponse.redirect(
      `${appUrl}/auth/verify-email?error=invalid_params`
    );
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return NextResponse.redirect(
    `${appUrl}/auth/verify-email?token=${token}&email=${encodeURIComponent(email)}`
  );
}
