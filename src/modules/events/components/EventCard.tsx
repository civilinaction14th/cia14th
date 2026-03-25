import React from "react";
import { BordirCard } from "@/src/components/element/BordirCard";
import {
  type EventData,
  isEventOpen,
  getEventDescription,
  getCurrentDate,
} from "../data/eventData";

interface EventCardProps {
  event: EventData;
  className?: string;
  onClick?: () => void;
  "data-aos"?: string;
  "data-aos-delay"?: number | string;
}

// ============================================================
// Variant 1: Dark card bg + colored bordir
// ============================================================
export const EventCardBordir: React.FC<EventCardProps> = ({
  event,
  className = "",
  onClick,
  "data-aos": dataAos,
  "data-aos-delay": dataAosDelay,
}) => {
  const now = getCurrentDate();
  const open = isEventOpen(event, now);
  const description = getEventDescription(event, now);

  return (
    <BordirCard
      bg="bg-linear-to-b from-[#1a2a3a] to-[#0f1c2c]"
      bordirColor={event.color}
      bordirWidth="thin"
      className={`w-full cursor-pointer hover:brightness-110 active:scale-[0.99] transition-all ${className}`}
      onClick={onClick}
      data-aos={dataAos}
      data-aos-delay={dataAosDelay}
    >
      <div className="flex items-center justify-between gap-4 p-2 sm:p-0">
        <div className="flex flex-col gap-1.5 min-w-0">
          {/* Status badge */}
          <div className="flex items-center gap-1.5 mb-1">
            <span
              className={`w-2.5 h-2.5 rounded-full shrink-0 ${open ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`}
            />
            <span
              className={`text-xs font-bold font-poppins tracking-wider uppercase ${open ? "text-emerald-400" : "text-red-400"}`}
            >
              {open ? "OPEN" : "CLOSED"}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-xl md:text-2xl font-bold font-publicas"
            style={{ color: event.color }}
          >
            {event.name}
          </h3>

          {/* Description */}
          <p className="text-xs md:text-sm font-poppins text-white/70">
            {description}
          </p>
        </div>

        {/* Chevron right */}
        <div className="shrink-0 flex items-center">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke={event.color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-70"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
      </div>
    </BordirCard>
  );
};

// ============================================================
// Variant 2: Colored card bg + white bordir
// ============================================================
export const EventCardColored: React.FC<EventCardProps> = ({
  event,
  className = "",
  onClick,
  "data-aos": dataAos,
  "data-aos-delay": dataAosDelay,
}) => {
  const now = getCurrentDate();
  const open = isEventOpen(event, now);
  const description = getEventDescription(event, now);

  // Bikin gradient dari warna event
  const darkerColor = `${event.color}CC`;

  return (
    <BordirCard
      bg=""
      bordirColor="#ffffff"
      bordirWidth="thin"
      className={`w-full cursor-pointer hover:brightness-110 active:scale-[0.99] transition-all duration-400 ${className}`}
      style={{
        background: `linear-gradient(to bottom, ${event.color}, ${darkerColor})`,
      }}
      onClick={onClick}
      data-aos={dataAos}
      data-aos-delay={dataAosDelay}
    >
      <div className="flex items-center justify-between gap-4 p-2 sm:p-0">
        <div className="flex flex-col gap-1.5 min-w-0">
          {/* Status badge - pill */}
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 mb-2 rounded-full w-fit backdrop-blur-sm bg-white `}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full shrink-0 ${open ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`}
            />
            <span
              className={`text-[10px] font-bold font-poppins tracking-wider uppercase ${open ? "text-emerald-400" : "text-red-400"}`}
            >
              {open ? "OPEN" : "CLOSED"}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold font-publicas text-white drop-shadow-md">
            {event.name}
          </h3>

          {/* Description */}
          <p className="text-xs md:text-sm font-poppins text-white/80">
            {description}
          </p>
        </div>

        {/* Chevron right */}
        <div className="shrink-0 flex items-center">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-70"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
      </div>
    </BordirCard>
  );
};

// Default export tetap yang bordir
const EventCard = EventCardBordir;
export default EventCard;
