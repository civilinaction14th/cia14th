"use client";

import React from "react";
import DefaultLombaLayout from "./layout/DefaultLombaLayout";
import PageTitle from "./components/elements/PageTitle";
import GeneralLombaForm from "./components/form/GeneralLombaForm";
import FCECLombaForm from "./components/form/FCECLombaForm";

const VALID_SLUGS = ["cic", "sbc", "fcec", "itc"];

interface RegistrasiLombaSlugProps {
  slug: string;
}

export default function RegistrasiLombaSlug({ slug }: RegistrasiLombaSlugProps) {
  const lomba = slug.toLowerCase();

  if (!VALID_SLUGS.includes(lomba)) {
    return (
      <DefaultLombaLayout>
        <div className="flex flex-col items-center justify-center min-h-[50vh] mt-28 text-white font-poppins gap-4">
          <h1 className="text-2xl font-bold">Lomba tidak ditemukan</h1>
          <p className="text-white/70">Silakan pilih lomba yang tersedia.</p>
        </div>
      </DefaultLombaLayout>
    );
  }

  return (
    <DefaultLombaLayout>
      <div className="flex flex-col w-full max-w-4xl mx-auto gap-6 mt-28 md:mt-32 mb-20 relative z-10 px-2 sm:px-0">
        <PageTitle lomba={lomba} />
        <div className="w-full">
          {lomba === "fcec" ? (
            <FCECLombaForm />
          ) : (
            <GeneralLombaForm lomba={lomba} />
          )}
        </div>
      </div>
    </DefaultLombaLayout>
  );
}
