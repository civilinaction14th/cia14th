import { useState } from "react";
import { toast } from "sonner";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter, useSearchParams } from "next/navigation";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");

  const loginWithEmail = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!auth || !db) throw new Error("Firebase tidak terinisialisasi");
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // Wajib Verifikasi Email - cek dari Firestore verificationTokens
      const tokensRef = collection(db, "verificationTokens");
      const q = query(tokensRef, where("email", "==", email), where("verified", "==", true));
      const tokenSnapshot = await getDocs(q);

      if (tokenSnapshot.empty) {
        await signOut(auth);
        throw { code: "custom/email-not-verified" };
      }

      // Redirect ke callbackUrl jika ada, kalau nggak ke event list
      toast.success("Anda berhasil login!");
      router.push(callbackUrl || "/events");
    } catch (err: any) {
      if (err.code === "custom/email-not-verified") {
        setError(
          "Silakan periksa inbox email Anda dan verifikasi email Anda terlebih dahulu.",
        );
        toast.error(
          "Silakan periksa inbox email Anda dan verifikasi email Anda terlebih dahulu.",
        );
      } else if (err.code === "auth/network-request-failed") {
        setError(
          "Koneksi terputus. Pastikan internet Anda stabil lalu coba lagi.",
        );
        toast.error(
          "Koneksi terputus. Pastikan internet Anda stabil lalu coba lagi.",
        );
      } else if (err.code === "auth/too-many-requests") {
        setError(
          "Terlalu banyak percobaan gagal. Silakan coba lagi dalam 5-15 menit.",
        );
        toast.error(
          "Terlalu banyak percobaan gagal. Silakan coba lagi dalam 5-15 menit.",
        );
      } else {
        console.error("Login error:", err);
        setError("Gagal masuk. Pastikan email dan password sudah benar.");
        toast.error("Gagal masuk. Pastikan email dan password sudah benar.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!auth) throw new Error("Firebase tidak terinisialisasi");
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      // Redirect ke callbackUrl jika ada, atau default ke /events
      toast.success("Anda berhasil login!");
      router.push(callbackUrl || "/events");
    } catch (err: any) {
      console.error(err);

      // Kalau cuma perkara pop-up diclose/cancel manual sama user, diemin aja
      if (err.code === "auth/popup-closed-by-user") {
        return;
      }

      setError("Gagal masuk menggunakan Google.");
      toast.error("Gagal masuk menggunakan Google.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    loginWithEmail,
    loginWithGoogle,
    isLoading,
    error,
    setError, // Diexport jika butuh ngereset error dari UI
  };
};
