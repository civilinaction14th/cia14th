import Image from "next/image";
import React from "react";

const DefaultEventLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative min-h-screen bg-[linear-gradient(to_right,#0c1f31_47%,#0d334e_100%)] w-full flex flex-col items-center overflow-hidden py-10 isolate">
      {/* Bunga 1 (Kiri Bawah) */}
      <div className="absolute -bottom-25 -left-20 w-50 h-50 md:w-62.5 md:h-62.5 lg:w-75 lg:h-75 z-5 pointer-events-none animate-[spin_15s_linear_infinite]">
        <Image
          src="/images/Star.svg"
          alt="Bunga1"
          fill
          className="object-contain object-bottom-left"
          priority
        />
      </div>

      <div className="absolute -top-5 -right-20 w-50 h-50 md:w-62.5 md:h-62.5 lg:w-75 lg:h-75 z-5 pointer-events-none animate-[spin_15s_linear_infinite]">
        <Image
          src="/images/Star.svg"
          alt="Bunga2"
          fill
          className="object-contain object-top-right"
          priority
        />
      </div>

      {/* Texture overlay */}
      <div
        className="absolute inset-0 bg-cover bg-start z-10 pointer-events-none"
        style={{
          backgroundImage: "url('/images/TextureBg.png')",
          opacity: 0.58,
          mixBlendMode: "soft-light",
          height: "150%",
        }}
      />
      <div className="relative z-10 w-full px-4 md:px-8">{children}</div>
    </main>
  );
};

export default DefaultEventLayout;
