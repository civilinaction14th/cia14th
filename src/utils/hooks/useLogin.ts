import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const loginWithEmail = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!auth) throw new Error("Firebase tidak terinisialisasi");
      await signInWithEmailAndPassword(auth, email, password);

      // Redirect ke dashboard atau halaman form registrasi setelah berhasil login
      router.push("/registrasi-lomba");
    } catch (err: any) {
      console.error(err);
      // Bisa disesuaikan dengan pesan error dari Firebase
      setError("Gagal masuk. Pastikan email dan password sudah benar.");
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

      // Redirect setelah berhasil login
      router.push("/registrasi-lomba");
    } catch (err: any) {
      console.error(err);
      setError("Gagal masuk menggunakan Google.");
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
