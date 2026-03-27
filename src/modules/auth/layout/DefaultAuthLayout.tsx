import Image from "next/image";
import React from "react";

const DefaultAuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative min-h-screen background-auth w-full flex flex-col items-center justify-center overflow-hidden pt-[80px] pb-10 isolate">
      {/* Bunga 1 (Kiri Bawah) */}
      <div className="absolute -bottom-25 -left-20 w-50 h-50 md:w-62.5 md:h-62.5 lg:w-75 lg:h-75 z-5 pointer-events-none animate-[spin_25s_linear_infinite]">
        <Image
          src="/images/Star.webp"
          alt="Bunga1"
          fill
          className="object-contain object-bottom-left"
          priority
        />
      </div>
      <div className="absolute -top-5 -right-20 w-50 h-50 md:w-62.5 md:h-62.5 lg:w-75 lg:h-75 z-5 pointer-events-none animate-[spin_25s_linear_infinite]">
        <Image
          src="/images/Star.webp"
          alt="Bunga2"
          fill
          className="object-contain object-top-right"
          priority
        />
      </div>

      <div className="absolute -bottom-17.5 lg:-bottom-25 right-0 hidden md:block w-200 h-200 lg:w-400 lg:h-400 z-5 pointer-events-none">
        <Image
          src="/auth/Garis.webp"
          alt="Garis"
          fill
          className="object-contain object-bottom"
          priority
        />
      </div>

      {/* Texture overlay */}
      <div className="absolute inset-0 z-6 pointer-events-none opacity-[0.48] mix-blend-soft-light overflow-hidden" style={{ height: "110%" }}>
        <Image
          src="/images/TextureBg.webp"
          alt="Texture Background"
          fill
          className="object-cover object-left-top"
          priority
        />
      </div>
      <div className="relative z-10 w-full h-full px-4 md:px-8">{children}</div>
    </main>
  );
};

export default DefaultAuthLayout;
