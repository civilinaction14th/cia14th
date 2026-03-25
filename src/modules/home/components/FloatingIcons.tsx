"use client";

import { CSSProperties, useEffect, useState } from "react";
import Image from "next/image";

type Viewport = "mobile" | "tablet" | "desktop";

export default function FloatingIcons() {
  const [viewport, setViewport] = useState<Viewport>("desktop");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewport("mobile");
        return;
      }

      if (window.innerWidth < 1024) {
        setViewport("tablet");
        return;
      }

      setViewport("desktop");
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = viewport === "mobile";
  const isTablet = viewport === "tablet";

  const icons: {
    src: string;
    alt: string;
    width: number;
    height: number;
    style: CSSProperties;
    animationStyle?: CSSProperties;
  }[] = [
    {
      src: "/svg/FCEC.svg",
      alt: "FCEC Icon",
      width: isMobile ? 120 : isTablet ? 150 : 220,
      height: isMobile ? 120 : isTablet ? 150 : 220,
      animationStyle: { animation: "float 4s ease-in-out 0.5s infinite" },
      style:
        viewport === "mobile"
          ? { bottom: "23%", left: "22%" }
          : viewport === "tablet"
            ? { top: "22%", left: "7%" }
            : { top: "20%", left: "10%" },
    },
    {
      src: "/images/Star.svg",
      alt: "Star Decoration",
      width: isMobile ? 195 : isTablet ? 250 : 350,
      height: isMobile ? 195 : isTablet ? 250 : 350,
      animationStyle: { animation: "spin-slow 15s linear infinite" },
      style:
        viewport === "mobile"
          ? { top: "-2%", right: "-14%" }
          : viewport === "tablet"
            ? { top: "-4%", right: "-8%" }
            : { top: "-12%", right: "-4%" },
    },
    {
      src: "/svg/ITC.svg",
      alt: "ITC Icon",
      width: isMobile ? 100 : isTablet ? 140 : 200,
      height: isMobile ? 100 : isTablet ? 140 : 200,
      animationStyle: { animation: "float 4s ease-in-out 1s infinite" },
      style:
        viewport === "mobile"
          ? { top: "20%", left: "4%" }
          : viewport === "tablet"
            ? { bottom: "14%", left: "22%" }
            : { bottom: "-6%", left: "17%" },
    },
    {
      src: "/svg/SBC.svg",
      alt: "SBC Icon",
      width: isMobile ? 120 : isTablet ? 170 : 240,
      height: isMobile ? 120 : isTablet ? 170 : 240,
      animationStyle: { animation: "float 3s ease-in-out 1.5s infinite" },
      style:
        viewport === "mobile"
          ? { top: "22%", right: "-3%" }
          : viewport === "tablet"
            ? { top: "30%", right: "4%" }
            : { top: "28%", right: "8%" },
    },
    {
      src: "/svg/CIC.svg",
      alt: "CIC Icon",
      width: isMobile ? 100 : isTablet ? 150 : 220,
      height: isMobile ? 100 : isTablet ? 150 : 220,
      animationStyle: { animation: "float 5s ease-in-out 2s infinite" },
      style:
        viewport === "mobile"
          ? { bottom: "22%", right: "12%" }
          : viewport === "tablet"
            ? { bottom: "14%", right: "14%" }
            : { bottom: "2%", right: "6%" },
    },
    {
      src: "/svg/Line.svg",
      alt: "Line Decoration",
      width: isMobile ? 100 : isTablet ? 130 : 150,
      height: isMobile ? 100 : isTablet ? 130 : 150,
      style:
        viewport === "mobile"
          ? { bottom: "-14%", left: "-12%" }
          : viewport === "tablet"
            ? { bottom: "-18%", left: "0%" }
            : { bottom: "-70%", left: "0%" },
    },
    {
      src: "/images/fan.svg",
      alt: "Fan Decoration",
      width: isMobile ? 225 : isTablet ? 280 : 385,
      height: isMobile ? 225 : isTablet ? 280 : 385,
      animationStyle: {
        animation: "swing 3s ease-in-out infinite",
        transformOrigin: "center",
      },
      style:
        viewport === "mobile"
          ? { bottom: "20%", left: "-25%" }
          : viewport === "tablet"
            ? { bottom: "12%", left: "-12%" }
            : { bottom: "-20%", left: "-10%" },
    },
  ];

  const getIconStyle = (baseStyle: CSSProperties): CSSProperties => ({
    ...baseStyle,
    transform: isMobile ? "scale(0.9)" : "scale(1)",
    transformOrigin: "center",
  });

  return (
    <>
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes swing {
          0%, 100% { transform: rotate(-20deg); }
          50% { transform: rotate(20deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
      {icons.map((icon) => (
        <div
          key={icon.alt}
          className="absolute pointer-events-none select-none"
          style={getIconStyle(icon.style)}
        >
          <div style={icon.animationStyle}>
            <Image
              src={icon.src}
              alt={icon.alt}
              width={icon.width}
              height={icon.height}
              className="object-contain drop-shadow-lg"
            />
          </div>
        </div>
      ))}
    </>
  );
}
