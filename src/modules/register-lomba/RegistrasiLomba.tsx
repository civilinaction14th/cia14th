"use client";

import React, { Suspense } from "react";
import DefaultLombaLayout from "./layout/DefaultLombaLayout";
import LombaTabBar from "./layout/LombaTabBar";
import { useSearchParams } from "next/navigation";
import GeneralLombaForm from "./components/form/GeneralLombaForm";
import FCECLombaForm from "./components/form/FCECLombaForm";

const RegistrasiLombaContent = () => {
  const searchParams = useSearchParams();
  const lomba = searchParams.get("lomba") || "cic";

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-4 mt-28 md:mt-32 mb-20 relative z-10 px-2 sm:px-0">
      <LombaTabBar />
      <div className="w-full">
        {lomba === "fcec" ? (
          <FCECLombaForm />
        ) : (
          <GeneralLombaForm lomba={lomba} />
        )}
      </div>
    </div>
  );
};

export default function RegistrasiLomba() {
  return (
    <DefaultLombaLayout>
      <Suspense
        fallback={
          <div className="text-white text-center py-20 font-poppins animate-pulse">
            Memuat formulir...
          </div>
        }
      >
        <RegistrasiLombaContent />
      </Suspense>
    </DefaultLombaLayout>
  );
}
