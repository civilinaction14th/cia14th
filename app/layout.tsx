import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

import { AOSProvider } from "@/src/utils/providers/AOSProvider";
import ToasterProvider from "@/src/utils/providers/ToasterProvider";
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
  metadataBase: new URL("https://civilinaction14th.com"),
  title: {
    default: "CIA 14th | Civil In Action",
    template: "%s | CIA 14th | Civil In Action",
  },
  description:
    "Kolaborasi Pembangunan Nusantara, Infrastruktur Tangguh Berdaya. Kompetisi Teknik Sipil Nasional ke-14 yang menghadirkan inovasi pembangunan dan infrastruktur masa depan. Daftar sekarang di kompetisi CIC, SBC, FCEC, dan ITC.",
  keywords: [
    "Civil In Action",
    "CIA 14th",
    "UGM",
    "Civil Engineering Competition",
    "Teknik Sipil",
    "Inovasi Infrastruktur",
    "CIC",
    "SBC",
    "FCEC",
    "ITC",
    "Lomba Teknik Sipil Nasional",
    "Teknik Sipil Indonesia",
  ],
  authors: [{ name: "Civil In Action 14th" }],
  creator: "Civil In Action 14th",
  publisher: "Civil In Action 14th",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://civilinaction14th.com",
    siteName: "Civil In Action 14th",
    title: "CIA 14th | Civil In Action",
    description:
      "Kolaborasi Pembangunan Nusantara, Infrastruktur Tangguh Berdaya. Ikuti kompetisi teknik sipil nasional terbesar di CIA 14th.",
    images: [
      {
        url: "/images/Logo.webp",
        width: 1200,
        height: 630,
        alt: "Civil In Action 14th Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CIA 14th | Civil In Action",
    description:
      "Kolaborasi Pembangunan Nusantara, Infrastruktur Tangguh Berdaya. Ikuti kompetisi teknik sipil nasional terbesar.",
    images: ["/images/Logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico", // Using the same since they have it
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Civil In Action 14th (CIA 14th)",
    description:
      "Civil In Action 14th is a national civil engineering competition for students and high schoolers across Indonesia.",
    startDate: "2026-03-27T00:00:00Z",
    endDate: "2026-05-17T23:59:59Z",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "DTSL FT UGM (Departemen Teknik Sipil dan Lingkungan FT UGM)",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jl. Grafika No. 2",
        addressLocality: "Sleman",
        addressRegion: "DIY",
        postalCode: "55281",
        addressCountry: "ID",
      },
    },
    image: ["https://civilinaction14th.com/images/Logo.webp"],
    organizer: {
      "@type": "Organization",
      name: "KMTS FT UGM",
      url: "https://civilinaction14th.com",
    },
    offers: {
      "@type": "Offer",
      url: "https://civilinaction14th.com/events",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <html lang="id">
      <body
        className={cn(
          poppins.variable,
          PublicaRegular.variable,
          PublicaMedium.variable,
          "antialiased"
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AOSProvider>
          <ToasterProvider />
          <AuthProvider>{children}</AuthProvider>
        </AOSProvider>
      </body>
    </html>
  );
}

