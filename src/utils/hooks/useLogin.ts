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

/**
 * Custom Hook untuk menangani proses Login di dalam aplikasi.
 * Mendukung metode login via Email/Password dan via Google Auth.
 * Secara otomatis akan memeriksa verifikasi status email pengguna.
 */
export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Menyimpan redirect page tujuan jika pengguna login dari guard/middleware page lain
  const callbackUrl = searchParams.get("callbackUrl");

  /**
   * Fungsi Login menggunakan Email dan Password
   *
   * @param email - Alamat email pengguna
   * @param password - Kata sandi pengguna
   */
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

      // ==========================================
      // 1. CEK STATUS VERIFIKASI EMAIL
      // ==========================================
      // Wajib Verifikasi Email - cek dari Firestore verificationTokens
      const tokensRef = collection(db, "verificationTokens");
      const q = query(
        tokensRef,
        where("email", "==", email),
        where("verified", "==", true),
      );
      const tokenSnapshot = await getDocs(q);

      if (tokenSnapshot.empty) {
        await signOut(auth); // tendang (logout paksa)
        throw { code: "custom/email-not-verified" };
      }

      // ==========================================
      // 2. SUKSES DAN REDIRECT
      // ==========================================
      // Redirect ke callbackUrl jika ada history tujuan, atau fallback ke '/events'
      toast.success("Anda berhasil login!");
      router.push(callbackUrl || "/events");
    } catch (err: any) {
      console.error(err);

      // ==========================================
      // 3. HANDLING ERROR MESSAGES
      // ==========================================
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

  /**
   * Fungsi Login Cepat Menggunakan Akun Google (Google Auth Provider)
   */
  const loginWithGoogle = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!auth) throw new Error("Firebase tidak terinisialisasi");
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      // Redirect ke callbackUrl jika ada history tujuan, atau fallback ke '/events'
      toast.success("Anda berhasil login!");
      router.push(callbackUrl || "/events");
    } catch (err: any) {
      console.error(err);

      // Mengabaikan pesan error/toast jika user hanya sengaja menutup/cancel pop-up
      if (err.code === "auth/popup-closed-by-user") {
        toast.error("Anda membatalkan login dengan Google.");
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
