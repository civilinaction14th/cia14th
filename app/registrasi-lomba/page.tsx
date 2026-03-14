"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import RegistrasiLomba from "@/src/modules/register-lomba/RegistrasiLomba";

export default function RegistrasiLombaPage() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.replace("/auth/login");
    }
  }, [loading, currentUser, router]);

  if (loading || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#4B3122]">
        <div className="flex flex-col items-center gap-3 text-white font-poppins animate-pulse">
          <p className="text-xl font-bold">Memuat halaman...</p>
        </div>
      </div>
    );
  }

  // Jika sudah login, tampilkan halaman form pendaftaran utamanya
  return <RegistrasiLomba />;
}
