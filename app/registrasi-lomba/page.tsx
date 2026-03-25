"use client";

import RegistrasiLomba from "@/src/modules/register-lomba/RegistrasiLomba";
import DefaultAuthLayout from "@/src/modules/auth/layout/DefaultAuthLayout";
import LoadingPage from "@/src/components/layouts/LoadingPage";
import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { events, getCurrentDate, isEventOpen } from "@/src/modules/events/data/eventData";

function RegistrasiLombaPageContent() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  const searchParams = useSearchParams();
  const lomba = searchParams.get("lomba") || "cic";

  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        router.replace("/auth/login");
        return;
      }

      // Guard: Cek apakah lomba ini masih open
      const event = events.find((e) => e.id === lomba);
      const now = getCurrentDate();
      if (!event || !isEventOpen(event, now)) {
        const eventName = event ? event.name : "Kompetisi";
        router.push(`/events?error=closed&eventName=${encodeURIComponent(eventName)}`);
      }
    }
  }, [loading, currentUser, router, lomba]);

  if (loading || !currentUser) {
    return (
      <DefaultAuthLayout>
        <LoadingPage />
      </DefaultAuthLayout>
    );
  }

  // Jika sudah login, tampilkan halaman form pendaftaran utamanya
  return <RegistrasiLomba />;
}

export default function RegistrasiLombaPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <RegistrasiLombaPageContent />
    </Suspense>
  );
}
