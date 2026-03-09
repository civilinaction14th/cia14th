"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function RegistrationButton() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    if (currentUser) {
      router.push("/registrasi-lomba");
    } else {
      router.push("/login");
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Memuat..." : "Registrasi Lomba"}
    </button>
  );
}
