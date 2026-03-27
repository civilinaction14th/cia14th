"use client";

import React from "react";
import Link from "next/link";
import DefaultLombaLayout from "./layout/DefaultLombaLayout";
import PageTitle from "./components/elements/PageTitle";
import GeneralLombaForm from "./components/form/GeneralLombaForm";
import FCECLombaForm from "./components/form/FCECLombaForm";
import { FaArrowLeft } from "react-icons/fa";
import { useDraftGuard } from "@/src/utils/hooks/useDraftGuard";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/src/components/element/Modal";
import { useAuth } from "@/lib/auth-context";
import { useRegisterLomba } from "@/src/utils/hooks/useRegisterLomba";
import Success from "./Success";

const VALID_SLUGS = ["cic", "sbc", "fcec", "itc"];

interface RegistrasiLombaSlugProps {
  slug: string;
}

export default function RegistrasiLombaSlug({
  slug,
}: RegistrasiLombaSlugProps) {
  const router = useRouter();
  const lomba = slug.toLowerCase();
  const [isDirty, setIsDirty] = useState(false);

  const { currentUser, loading: authLoading } = useAuth();
  const { checkIsRegistered } = useRegisterLomba();
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [checkingRegistration, setCheckingRegistration] = useState(true);

  const {
    showModal,
    handleInterceptNavigation,
    confirmDiscard,
    cancelDiscard,
  } = useDraftGuard(isDirty);

  useEffect(() => {
    const checkStatus = async () => {
      if (!authLoading && currentUser) {
        const registered = await checkIsRegistered(lomba);
        setIsRegistered(registered);
        setCheckingRegistration(false);
      } else if (!authLoading && !currentUser) {
        setCheckingRegistration(false);
      }
    };
    checkStatus();
  }, [authLoading, currentUser, lomba, checkIsRegistered]);

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

  if (isRegistered) {
    return <Success slug={lomba} isForcedAuthorized={true} />;
  }

  return (
    <DefaultLombaLayout>
      <div className="flex flex-col w-full max-w-4xl mx-auto gap-6 mt-28 md:mt-32 mb-20 relative z-10 px-2 sm:px-0">
        <button
          onClick={() =>
            handleInterceptNavigation("/events", () => router.push("/events"))
          }
          className="text-white flex flex-row gap-2 items-center justify-center whitespace-nowrap w-fit bg-[#8D2D2D] px-5 py-2 rounded-lg font-bold hover:bg-[#722020] transition-colors font-poppins shadow-md cursor-pointer"
        >
          <FaArrowLeft /> Kembali
        </button>
        <PageTitle lomba={lomba} />
        <div className="w-full">
          {checkingRegistration || authLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-white/50 animate-pulse">
              Memuat data pendaftaran...
            </div>
          ) : lomba === "fcec" ? (
            <FCECLombaForm onDirtyChange={setIsDirty} />
          ) : (
            <GeneralLombaForm lomba={lomba} onDirtyChange={setIsDirty} />
          )}
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={cancelDiscard}
        title="Buang Draft?"
        description="Data Anda akan hilang jika Anda pergi dari halaman ini."
        confirmText="Buang"
        cancelText="Batal"
        onConfirm={confirmDiscard}
      />
    </DefaultLombaLayout>
  );
}
