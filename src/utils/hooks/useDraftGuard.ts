import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useDraftGuard(isDirty: boolean) {
  const [showModal, setShowModal] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // 1. Mencegah user reload / close tab
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // 2. Trik untuk menangkap event 'Back' browser di Next.js App Router
    // Kita tambahkan hash #draft ke URL tanpa reload. Jika user klik back, hash ini hilang (popstate).
    if (isDirty) {
      if (window.location.hash !== "#draft") {
        window.history.pushState(null, "", window.location.pathname + window.location.search + "#draft");
      }
    } else {
      if (window.location.hash === "#draft") {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    }

    const handlePopState = (e: PopStateEvent) => {
      if (isDirty && window.location.hash !== "#draft") {
        // User menekan back button, hash hilang.
        // Mencegah navigasi menjauh dgn push kembali hash-nya!
        window.history.pushState(null, "", window.location.pathname + window.location.search + "#draft");
        setPendingPath("BACK_BUTTON");
        setShowModal(true);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isDirty]);

  // Handle route dari link internal kita
  const handleInterceptNavigation = (path: string, navigateAction: () => void) => {
    if (isDirty) {
      setPendingPath(path);
      setShowModal(true);
    } else {
      navigateAction();
    }
  };

  const confirmDiscard = () => {
    setShowModal(false);
    if (pendingPath === "BACK_BUTTON") {
      // User confirm discard dari back button.
      // Karena kita udah nambahin extra history state (push ganda di popstate), 
      // kita perlu go(-2) untuk mundur ke halaman sebelum form
      window.history.go(-2);
    } else if (pendingPath) {
      router.push(pendingPath);
    }
    return pendingPath;
  };

  const cancelDiscard = () => {
    setShowModal(false);
    setPendingPath(null);
  };

  return {
    showModal,
    handleInterceptNavigation,
    confirmDiscard,
    cancelDiscard,
  };
}
