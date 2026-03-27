import Image from "next/image";
import React from "react";

export default function CenterScreenLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen bg-[linear-gradient(to_right,#0c1f31_47%,#0d334e_100%)] w-full flex items-center justify-center overflow-hidden py-10 isolate">
      {/* Bintang 1 (Kiri Bawah) */}
      <div className="absolute -bottom-25 -left-20 w-50 h-50 md:w-62.5 md:h-62.5 lg:w-75 lg:h-75 z-5 pointer-events-none animate-[spin_25s_linear_infinite]">
        <Image
          src="/images/Star.webp"
          alt="Bunga1"
          fill
          className="object-contain object-bottom-left"
          priority
        />
      </div>

      {/* Bintang 2 (Kanan Atas) */}
      <div className="absolute -top-5 -right-20 w-50 h-50 md:w-62.5 md:h-62.5 lg:w-75 lg:h-75 z-5 pointer-events-none animate-[spin_25s_linear_infinite]">
        <Image
          src="/images/Star.webp"
          alt="Bunga2"
          fill
          className="object-contain object-top-right"
          priority
        />
      </div>

      {/* Texture overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.58] mix-blend-soft-light overflow-hidden">
        <Image
          src="/images/TextureBg.webp"
          alt="Texture Background"
          fill
          className="object-cover object-left-top"
          priority
        />
      </div>
      
      {/* Container utama yg sudah diset center absolut */}
      <div className="relative z-10 w-full px-4 md:px-8 flex-1 flex flex-col justify-center items-center h-full">
        {children}
      </div>
    </main>
  );
}