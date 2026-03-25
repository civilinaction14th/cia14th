"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import DefaultLombaLayout from "@/src/modules/register-lomba/layout/DefaultLombaLayout";
import Button from "@/src/modules/register-lomba/components/form/Button";
import { BordirCard } from "@/src/components/element/BordirCard";
import { events } from "@/src/modules/events/data/eventData";
import { FaWhatsapp } from "react-icons/fa";

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
    <DefaultLombaLayout>
      <div className="flex flex-col w-full max-w-2xl mx-auto gap-6 mt-28 md:mt-32 mb-20 relative z-10 px-2 sm:px-0">
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
              hubungi LO lomba untuk informasi lebih lanjut.
            </p>

            <div className="w-full flex flex-col gap-3">
              {eventData.loPhone && (
                <a
                  href={`https://wa.me/${eventData.loPhone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full"
                >
                  <Button className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white">
                    <FaWhatsapp className="mr-1 text-xl" /> Chat LO {eventData.name}
                  </Button>
                </a>
              )}

              <Link href="/" className="w-full">
                <Button className="w-full bg-[#8D2D2D] hover:bg-[#722020] text-white">
                  Kembali ke Beranda
                </Button>
              </Link>
            </div>
          </div>
        </BordirCard>
      </div>
    </DefaultLombaLayout>
  );
}
