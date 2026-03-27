"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function HeroSection() {
  const { currentUser, loading } = useAuth();

  const getDaftarLink = () => {
    if (loading) return "#";
    return currentUser ? "/events" : "/auth/login";
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen pb-24 text-center px-4">
      {/* Center Emblem */}
      <div className="mb-0 z-1 mt-0 md:mt-[10%]">
        <Image
          src="/images/Logo.webp"
          alt="Civil In Action Emblem"
          width={288}
          height={288}
          className="w-54 sm:w-64 md:w-102 drop-shadow-2xl"
          priority
        />
      </div>

      {/* Title Image */}
      <div className="relative mb-0 mt-0 w-full max-w-xs sm:max-w-lg md:max-w-3xl lg:max-w-5xl">
        <Image
          src="/images/CIA-title.webp"
          alt="14th Civil In Action"
          width={1100}
          height={300}
          className="w-full h-auto"
          priority
        />
      </div>

      {/* Subtitle */}
      <p className="text-white text-sm sm:text-lg md:text-2xl mb-4 font-bold tracking-wide font-[PublicaSansRound]">
        &quot;Kolaborasi Pembangunan Nusantara, Infrastruktur Tangguh
        Berdaya&quot;
      </p>

      {/* CTA Buttons */}
      <div className="flex items-center gap-4">
        <Link
          href="#informasi-lanjut"
          className="px-8 md:px-12 py-2 border-2 border-dashed border-white text-white text-[10px] sm:text-md md:text-lg font-medium hover:bg-white/10 transition-colors rounded-xl"
        >
          Kontak Kami
        </Link>
        <Link
          href={getDaftarLink()}
          className="px-8 md:px-12 py-2 bg-white border-2 border-white text-black text-[10px] sm:text-md md:text-lg font-bold transition-colors shadow-lg rounded-xl"
        >
          Daftar Sekarang!
        </Link>
      </div>
    </section>
  );
}
