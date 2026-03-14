import { Jeans } from "@/src/components/element/Jeans";
import Image from "next/image";
import React from "react";

const DefaultAuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative h-screen background-auth w-full flex flex-col items-center justify-center overflow-hidden py-10 isolate">
      {/* Bunga 1 (Kiri Bawah) */}
      <div className="fixed bottom-0 left-0 w-50 h-50 md:w-62.5 md:h-62.5 lg:w-75 lg:h-75 z-5 pointer-events-none">
        <Image
          src="/auth/Bunga1.webp"
          alt="Bunga1"
          fill
          className="object-contain object-bottom-left"
          priority
        />
      </div>

      <div className="fixed top-0 right-0 w-50 h-50 md:w-62.5 md:h-62.5 lg:w-75 lg:h-75 z-5 pointer-events-none">
        <Image
          src="/auth/Bunga2.webp"
          alt="Bunga2"
          fill
          className="object-contain object-top-right"
          priority
        />
      </div>

      <div className="fixed -bottom-17.5 lg:-bottom-25 right-0 hidden md:block w-200 h-200 lg:w-400 lg:h-400 z-5 pointer-events-none">
        <Image
          src="/auth/Garis.webp"
          alt="Garis"
          fill
          className="object-contain object-bottom"
          priority
        />
      </div>

      <Jeans />
      <div className="relative z-10 w-full px-4 md:px-8">{children}</div>
    </main>
  );
};

export default DefaultAuthLayout;
