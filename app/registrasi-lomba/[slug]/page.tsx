"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import RegistrasiLombaSlug from "@/src/modules/register-lomba/RegistrasiLombaSlug";
import DefaultAuthLayout from "@/src/modules/auth/layout/DefaultAuthLayout";
import LoadingPage from "@/src/components/layouts/LoadingPage";
import { events, getCurrentDate, isEventOpen } from "@/src/modules/events/data/eventData";

export default function RegistrasiLombaSlugPage() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        router.replace(`/auth/login?message=login_required&callbackUrl=/registrasi-lomba/${slug}`);
        return;
      }

      // Guard: Cek apakah event ini masih open
      const event = events.find((e) => e.id === slug);
      const now = getCurrentDate();
      if (!event || !isEventOpen(event, now)) {
        const eventName = event ? event.name : "Kompetisi";
        router.replace(`/events?error=closed&eventName=${encodeURIComponent(eventName)}`);
      }
    }
  }, [loading, currentUser, router, slug]);

  if (loading || !currentUser) {
    return (
      <DefaultAuthLayout>
        <LoadingPage />
      </DefaultAuthLayout>
    );
  }

  return <RegistrasiLombaSlug slug={slug} />;
}
