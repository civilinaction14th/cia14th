import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { VerificationEmail } from "@/src/utils/email/templates/verification-email";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    
    console.log("=== RESEND EMAIL DEBUG ===");
    console.log("API Key exists:", !!apiKey);
    console.log("API Key prefix:", apiKey?.substring(0, 10));
    
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service tidak dikonfigurasi" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const { email, token } = await request.json();

    console.log("Email to send:", email);
    console.log("Token:", token?.substring(0, 10) + "...");

    if (!email || !token) {
      return NextResponse.json(
        { error: "Email dan token wajib disertakan" },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const verificationUrl = `${appUrl}/auth/verify-email?token=${token}&email=${encodeURIComponent(email)}`;

    console.log("Verification URL:", verificationUrl);
    console.log("Sending email via Resend...");

    const { data, error } = await resend.emails.send({
      from: "CIA 14 <noreply@civilinaction14th.com>",
      to: [email],
      subject: "Verifikasi Email - CIA 14",
      react: VerificationEmail({ email, verificationUrl }),
    });

    console.log("Resend response data:", data);
    console.log("Resend response error:", error);

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Gagal mengirim email verifikasi" },
        { status: 500 }
      );
    }

    console.log("Email sent successfully! Message ID:", data?.id);
    return NextResponse.json({ success: true, messageId: data?.id });
  } catch (error) {
    console.error("Send verification email error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengirim email" },
      { status: 500 }
    );
  }
}
