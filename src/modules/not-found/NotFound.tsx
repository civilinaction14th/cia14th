import React from "react";
import Link from "next/link";
import { BordirCard } from "@/src/components/element/BordirCard";
import CenterScreenLayout from "@/src/components/layouts/CenterScreenLayout";
import Navbar from "@/src/components/layouts/Navbar";
import Footer from "@/src/components/layouts/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <CenterScreenLayout>
        <div className="flex flex-col w-full max-w-md mx-auto gap-6 relative z-10 px-2 sm:px-0">
        <BordirCard
          bg="bg-[#F3E6CF]"
          bordirColor="#F2A23A"
          bordirWidth="thick"
          className="w-full flex items-center justify-center p-6 md:p-8 text-center"
        >
          <div className="flex flex-col items-center max-w-lg">
            <h1 className="font-publicas font-bold text-[#8D2D2D] text-6xl md:text-7xl mb-2 drop-shadow-sm">
              404
            </h1>
            <h2 className="font-publicas font-bold text-[#262626] text-xl md:text-2xl mb-4">
              Halaman Tidak Ditemukan
            </h2>
            <p className="text-[#555] font-poppins text-sm md:text-base mb-8 leading-relaxed">
              Maaf, halaman yang Anda cari tidak dapat ditemukan.
            </p>

            <Link href="/" className="w-full">
              <button className="w-full bg-[#1F4B66] hover:bg-[#0E2A3A] text-white font-bold font-poppins py-3 px-6 rounded-xl transition-colors duration-300 drop-shadow-md">
                Kembali ke Beranda
              </button>
            </Link>
          </div>
        </BordirCard>
      </div>
    </CenterScreenLayout>
      <Footer />
    </>
  );
}
