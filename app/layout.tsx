import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

import { AOSProvider } from "@/src/utils/providers/AOSProvider";
import {
  PublicaRegular,
  PublicaMedium,
  PublicaBold,
} from "@/src/utils/helpers/font";
import { cn } from "@/src/utils/helpers/cn";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CIA 14th — Civil In Action",
  description:
    "Kolaborasi Pembangunan Nusantara, Infrastruktur Tangguh Berdaya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          poppins.variable,
          PublicaRegular.variable,
          PublicaMedium.variable,
          PublicaBold.variable,
          "antialiased",
        )}
      >
        <AOSProvider>
          <AuthProvider>{children}</AuthProvider>
        </AOSProvider>
      </body>
    </html>
  );
}
