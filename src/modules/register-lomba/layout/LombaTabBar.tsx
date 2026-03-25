"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import LombaTabBarCard from "../components/elements/LombaTabBarCard";

const LOMBA_LIST = [
  { id: "cic", title: "CIC" },
  { id: "sbc", title: "SBC" },
  { id: "fcec", title: "FCEC" },
  { id: "itc", title: "ITC" },
];

const LombaTabBar = () => {
  const searchParams = useSearchParams();
  // Ambil parameter lomba dari URL, default ke "cic" jika kosong
  const currentLomba = searchParams.get("lomba") || "cic";

  return (
    <div className="grid grid-cols-2 md:flex w-full gap-3 md:gap-4 md:flex-wrap pb-2 md:pb-4 items-center">
      {LOMBA_LIST.map((lomba) => (
        <div key={lomba.id} className="w-full md:flex-1 h-full">
          <LombaTabBarCard
            href={`/registrasi-lomba?lomba=${lomba.id}`}
            isSelected={currentLomba === lomba.id}
          >
            {lomba.title}
          </LombaTabBarCard>
        </div>
      ))}
    </div>
  );
};

export default LombaTabBar;
