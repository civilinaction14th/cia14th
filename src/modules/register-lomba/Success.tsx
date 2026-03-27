"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import CenterScreenLayout from "@/src/components/layouts/CenterScreenLayout";
import { BordirCard } from "@/src/components/element/BordirCard";
import { events } from "@/src/modules/events/data/eventData";
import { FaWhatsapp, FaArrowLeft } from "react-icons/fa";
import PageTitle from "./components/elements/PageTitle";

const contacts = [
  {
    cabang: "CIC",
    detail: [
      {
        name: "Kautsaura Raisa Mulia",
        whatsapp: "085727119216",
        line: "kautsaura",
      },
      {
        name: "Anisa Salsabila",
        whatsapp: "081918786065",
        line: "ann.archieve",
      },
    ],
  },
  {
    cabang: "SBC",
    detail: [
      {
        name: "M. Chairul Nusantara",
        whatsapp: "081311783896",
        line: "@24042006_",
      },
      { name: "Zafira Wanashita", whatsapp: "082324568500", line: "zafiraa28" },
    ],
  },
  {
    cabang: "FCEC",
    detail: [
      { name: "Denting", whatsapp: "08813997545", line: "dentingpc" },
      { name: "Ardina", whatsapp: "087753687396", line: "ardinacahaya" },
    ],
  },
  {
    cabang: "ITC",
    detail: [
      {
        name: "Nabila Octavia Savitri",
        whatsapp: "0895392347946",
        line: "scbyllz",
      },
      {
        name: "Tiwi Destarani Putri",
        whatsapp: "081528224183",
        line: "tiiwayy",
      },
    ],
  },
];

export default function Success({
  slug,
  isForcedAuthorized = false,
  noLayout = false,
}: {
  slug: string;
  isForcedAuthorized?: boolean;
  noLayout?: boolean;
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const eventData = events.find((e) => e.id === slug);

  useEffect(() => {
    // Strict guard
    const isSuccess =
      sessionStorage.getItem("registrasi-success") === slug || isForcedAuthorized;

    // Jika belum auth dan flag gak valid, tendang
    if (!isSuccess && !isAuthorized) {
      router.replace("/events");
    } else if (isSuccess && !isAuthorized) {
      setIsAuthorized(true);
      
      // Hanya fire confetti jika baru saja mendaftar (via sessionStorage)
      // bukan jika sekadar melihat kembali via forceIsAuthorized
      const fromSession = sessionStorage.getItem("registrasi-success") === slug;
      if (fromSession) {
        // Fire confetti from both sides
        const duration = 1000;
        const end = Date.now() + duration;

        const frame = () => {
          confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: [eventData?.color || "#F0B040", "#ffffff", "#8D2D2D"],
          });
          confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: [eventData?.color || "#F0B040", "#ffffff", "#8D2D2D"],
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };

        frame();
      }
    }
  }, [slug, router, eventData, isAuthorized, isForcedAuthorized]);

  if (!isAuthorized || !eventData) return null;

  const content = (
    <div className="flex flex-col w-full max-w-4xl mx-auto items-center gap-6 relative z-10 px-2 sm:px-0">
      <PageTitle lomba={slug} />
      <BordirCard
        bg="bg-[#F3E6CF]"
        bordirColor="#F2A23A"
        bordirWidth="thick"
        className="w-full flex items-center justify-center p-6 md:p-8 text-center"
      >
        <div className="flex flex-col items-center max-w-2xl mx-auto">
          <h2 className="font-publicas font-bold text-[#262626] text-2xl md:text-3xl mb-4 text-center">
            Pendaftaran Berhasil!
          </h2>

          <p className="text-[#555] font-poppins mb-8 leading-relaxed text-xs md:text-base text-center">
            Terima kasih telah mendaftar di Civil In Action 14. Data tim Anda
            beserta berkas persyaratan telah sukses kami terima. Silakan
            hubungi Contact Person lomba untuk informasi lebih lanjut.
          </p>

          <div className="w-full flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-8">
            {contacts
              .find((c) => c.cabang.toLowerCase() === slug.toLowerCase())
              ?.detail.map((cp, idx) => {
                // Ensure WhatsApp number format starts with 62 instead of 0
                const waNumber = cp.whatsapp.startsWith("0")
                  ? `62${cp.whatsapp.substring(1)}`
                  : cp.whatsapp;

                return (
                  <a
                    key={idx}
                    href={`https://wa.me/${waNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-[#1F4B66]/10 bg-white hover:bg-[#fdfbf7] hover:border-[#1F4B66]/30 shadow-sm hover:shadow-md transition-all duration-300 w-full md:w-1/2 overflow-hidden hover:-translate-y-1"
                  >
                    {/* Top Accent Bar */}
                    <div 
                      className="absolute top-0 left-0 w-full h-1.5" 
                      style={{ backgroundColor: eventData?.color || "#8D2D2D" }}
                    />
                    
                    <p className="font-poppins text-[10px] uppercase tracking-wider text-[#777] mb-1 font-bold">
                      Contact Person {idx + 1}
                    </p>
                    <p className="font-publicas font-bold text-[#1A1A1A] text-lg mb-4 text-center">
                      {cp.name}
                    </p>
                    
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/10 text-[#128C7E] font-bold text-xs group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300">
                      <FaWhatsapp className="text-lg" /> Chat via WhatsApp
                    </div>
                  </a>
                );
              })}
          </div>
          <button
            onClick={() => router.push("/events")}
            className="text-white flex flex-row gap-2 items-center justify-center whitespace-nowrap w-fit bg-[#8D2D2D] px-8 py-3.5 rounded-xl font-bold hover:bg-[#722020] hover:scale-105 transition-all duration-300 font-poppins shadow-lg cursor-pointer mt-8"
          >
            <FaArrowLeft /> Kembali ke Halaman Events
          </button>
        </div>
      </BordirCard>
    </div>
  );

  if (noLayout) return content;

  return <CenterScreenLayout>{content}</CenterScreenLayout>;
}
