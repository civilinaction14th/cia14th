"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DefaultEventLayout from "./layout/DefaultEventLayout";
import { EventCardBordir, EventCardColored } from "./components/EventCard";
import { events, getCurrentDate, isEventOpen } from "./data/eventData";
import Modal from "@/src/components/element/Modal";

export default function Events() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showClosedModal, setShowClosedModal] = useState(false);
  const [selectedEventName, setSelectedEventName] = useState("");

  // Handle auto-show modal from redirect params
  useEffect(() => {
    const errorParam = searchParams.get("error");
    const nameParam = searchParams.get("eventName");

    if (errorParam === "closed" && nameParam) {
      setSelectedEventName(nameParam);
      setShowClosedModal(true);

      // Bersihkan URL dari params biar pas reload modalnya ilang
      const newUrl = window.location.pathname;
      window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, "", newUrl);
    }
  }, [searchParams]);

  const handleClick = (eventId: string) => {
    const event = events.find((e) => e.id === eventId);
    if (!event) return;

    const now = getCurrentDate();
    if (!isEventOpen(event, now)) {
      setSelectedEventName(event.name);
      setShowClosedModal(true);
      return;
    }

    router.push(`/registrasi-lomba/${eventId}`);
  };

  return (
    <DefaultEventLayout>
      <div className="flex flex-col w-full max-w-4xl mx-auto gap-6 mt-28 md:mt-32 mb-20 relative z-10 px-2 sm:px-0">
        {/* Header */}
        <div
          className="flex flex-col items-center text-center gap-2 mb-4"
          data-aos="fade-up"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white font-publicas">
            Ikuti Kompetisi Kami
          </h1>
          <p className="text-sm md:text-base text-white/70 font-poppins max-w-2xl">
            Pilih salah satu kompetisi di bawah ini dan tunjukkan kemampuanmu
            bersama tim terbaikmu!
          </p>
        </div>

        {/* Variant 1: Dark card + colored bordir
        <div className="flex flex-col gap-4">
          {events.map((event) => (
            <EventCardBordir
              key={event.id}
              event={event}
              onClick={() => handleClick(event.id)}
            />
          ))}
        </div>

        {/* Separator */}
        {/* <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-white/20" />
          <span className="text-sm text-white/40 font-poppins">
            Versi alternatif
          </span>
          <div className="flex-1 h-px bg-white/20" />
        </div> */}

        {/* Variant 2: Colored card + white bordir */}
        <div className="flex flex-col gap-4">
          {events.map((event, index) => (
            <EventCardColored
              key={event.id}
              event={event}
              onClick={() => handleClick(event.id)}
              data-aos="fade-up"
              data-aos-delay={200 + index * 150}
            />
          ))}
        </div>
      </div>

      <Modal
        isOpen={showClosedModal}
        onClose={() => setShowClosedModal(false)}
        title="Pendaftaran Ditutup"
        description={`Maaf, pendaftaran untuk kompetisi ${selectedEventName} saat ini sedang ditutup atau belum dibuka.`}
        confirmText="Tutup"
        onConfirm={() => setShowClosedModal(false)}
        // Kita sembunyikan cancel button karena cuma butuh 1 action "Tutup"
        cancelText="" 
      />
    </DefaultEventLayout>
  );
}
