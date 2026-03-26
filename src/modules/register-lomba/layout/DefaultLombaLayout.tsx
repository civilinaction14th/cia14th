import Image from "next/image";
import React from "react";

const DefaultLombaLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative min-h-screen background-auth w-full flex flex-col items-center overflow-hidden py-10 isolate">
      {/* Bunga 1 (Kiri Bawah) */}
      <div className="absolute bottom-0 left-0 w-50 h-50 md:w-62.5 md:h-62.5 lg:w-75 lg:h-75 z-5 pointer-events-none">
        <Image
          src="/auth/Bunga1.webp"
          alt="Bunga1"
          fill
          className="object-contain object-bottom-left"
          priority
        />
      </div>

      <div className="absolute top-0 right-0 w-50 h-50 md:w-62.5 md:h-62.5 lg:w-75 lg:h-75 z-5 pointer-events-none">
        <Image
          src="/auth/Bunga2.webp"
          alt="Bunga2"
          fill
          className="object-contain object-top-right"
          priority
        />
      </div>

      {/* Texture overlay */}
      <div
        className="absolute inset-0 bg-cover bg-start z-6 pointer-events-none"
        style={{
          backgroundImage: "url('/images/TextureBg.webp')",
          opacity: 0.48,
          mixBlendMode: "soft-light",
          height: "110%",
        }}
      />
      <div className="relative z-10 w-full px-4 md:px-8">{children}</div>
    </main>
  );
};

export default DefaultLombaLayout;
