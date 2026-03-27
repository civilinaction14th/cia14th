"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import CenterScreenLayout from "@/src/components/layouts/CenterScreenLayout";
import { BordirCard } from "@/src/components/element/BordirCard";
import { events } from "@/src/modules/events/data/eventData";
import { FaWhatsapp } from "react-icons/fa";

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

export default function Success({ slug }: { slug: string }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const eventData = events.find((e) => e.id === slug);

  useEffect(() => {
    // Strict guard
    const isSuccess = sessionStorage.getItem("registrasi-success") === slug;

    // Jika belum auth dan flag gak valid, tendang
    if (!isSuccess && !isAuthorized) {
      router.replace("/events");
    } else if (isSuccess && !isAuthorized) {
      setIsAuthorized(true);
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
  }, [slug, router, eventData, isAuthorized]);

  if (!isAuthorized || !eventData) return null;

  return (
    <CenterScreenLayout>
      <div className="flex flex-col w-full max-w-2xl mx-auto gap-6 relative z-10 px-2 sm:px-0">
        <BordirCard
          bg="bg-[#F3E6CF]"
          bordirColor="#F2A23A"
          bordirWidth="thick"
          className="w-full flex items-center justify-center p-6 md:p-8 text-center"
        >
          <div className="flex flex-col items-center max-w-lg">
            <h2 className="font-publicas font-bold text-[#262626] text-2xl md:text-3xl mb-4">
              Pendaftaran Berhasil!
            </h2>

            <p className="text-[#555] font-poppins mb-8 leading-relaxed text-sm md:text-base">
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
                      className="group flex flex-col items-center justify-center p-4 rounded-xl border-2 border-[#1F4B66]/20 bg-white/50 hover:bg-[#377da8] hover:border-white/20 transition-all duration-300 w-full md:w-1/2"
                    >
                      <p className="font-poppins text-xs text-[#555] group-hover:text-white/80 mb-1">
                        Contact Person {idx + 1}
                      </p>
                      <p className="font-publicas font-bold text-[#262626] group-hover:text-white text-base mb-2">
                        {cp.name}
                      </p>
                      <div className="flex items-center gap-2 text-[#1DA851] group-hover:text-[#25D366] font-bold text-sm">
                        <FaWhatsapp className="text-xl" /> Chat WA
                      </div>
                    </a>
                  );
                })}
            </div>
          </div>
        </BordirCard>
      </div>
    </CenterScreenLayout>
  );
}
