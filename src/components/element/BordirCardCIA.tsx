import React from "react";
import Image from "next/image";
import { cn } from "@/src/utils/helpers/cn";

interface BordirCardCIAProps {
  title: string;
  description: string;
  logo: string;
  bg: string;
  bordirColor?: string;
  imagePosition?: "left" | "right";
  rotate?: string;
  className?: string;
}

export const BordirCardCIA: React.FC<BordirCardCIAProps> = ({
  title,
  description,
  logo,
  bg,
  bordirColor = "#ffffff",
  imagePosition = "left",
  rotate = "0deg",
  className,
}) => {
  // horizontal dash line svg
  const svgBordir = `<svg width='100%' height='2' xmlns='http://www.w3.org/2000/svg'><line x1='0' y1='1' x2='100%' y2='1' stroke='${encodeURIComponent(
    bordirColor,
  )}' stroke-width='2' stroke-dasharray='10,10' stroke-linecap='round'/></svg>`;

  const lowerBg = bg.toLowerCase();
  const needsDarkText = lowerBg === "#f0b040" || lowerBg === "#e05020" || lowerBg === "#00a86b";

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden transition-all duration-300",
        className,
      )}
      style={{ backgroundColor: bg, transform: `rotate(${rotate})` }}
    >
      {/* Top Bordir */}
      <div
        className="absolute top-3 left-0 w-full h-[2px] z-20 pointer-events-none opacity-80"
        style={{
          backgroundImage: `url("data:image/svg+xml,${svgBordir}")`,
          backgroundRepeat: "repeat-x",
        }}
      />

      {/* Bottom Bordir */}
      <div
        className="absolute bottom-3 left-0 w-full h-[2px] z-20 pointer-events-none opacity-80"
        style={{
          backgroundImage: `url("data:image/svg+xml,${svgBordir}")`,
          backgroundRepeat: "repeat-x",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-4 md:py-8 relative z-10">
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-12 items-center gap-4 md:gap-8 lg:gap-12",
            imagePosition === "right" ? "md:flex-row-reverse" : "",
          )}
        >
          {/* Logo Section */}
          <div
            className={cn(
              "md:col-span-3 flex justify-center items-center relative",
              imagePosition === "right" ? "md:order-last" : "",
            )}
          >
            <div className="relative w-full aspect-square max-w-[200px] md:max-w-[240px] lg:max-w-[280px]">
              <Image
                src={logo}
                alt={title}
                fill
                sizes="(max-width: 768px) 200px, (max-width: 1024px) 240px, 280px"
                className="object-contain drop-shadow-[0_5px_15px_rgba(0,0,0,0.2)]"
              />
            </div>
          </div>

          {/* Text Section */}
          <div className="md:col-span-9 flex flex-col gap-2 md:gap-4">
            <h2
              className={cn(
                "text-2xl md:text-4xl lg:text-5xl font-poppins font-bold tracking-tight leading-tight",
                needsDarkText ? "text-[#1A1A1A]" : "text-white",
                imagePosition === "right" ? "md:text-right" : "md:text-left",
              )}
              style={{
                textShadow: needsDarkText ? "none" : "2px 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              {title}
            </h2>
            <p
              className={cn(
                "text-sm md:text-base lg:text-lg font-publicas leading-relaxed font-normal",
                needsDarkText ? "text-[#1A1A1A]" : "text-white",
                imagePosition === "right" ? "md:text-right" : "md:text-left",
              )}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
