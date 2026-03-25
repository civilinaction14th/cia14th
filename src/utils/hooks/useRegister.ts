import { useState } from "react";
import { toast } from "sonner";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState("");

  const registerWithEmail = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!auth) throw new Error("Firebase tidak terinisialisasi");

      // Buat akun baru di Firebase
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // Kirim email verifikasi
      await sendEmailVerification(credential.user);

      // Langsung sign out karena user "harus" verifikasi email dulu sebelum bisa masuk
      await signOut(auth);

      setUnverifiedEmail(email);
      setIsSuccess(true);
    } catch (err: any) {
      console.error(err);

      // Handle custom error messages (misal: email sudah dipakai, password kurang dari 6 karakter)
      if (err.code === "auth/email-already-in-use") {
        setError("Email ini sudah terdaftar.");
        toast.error("Email ini sudah terdaftar.");
      } else if (err.code === "auth/weak-password") {
        setError("Password terlalu lemah. Minimal 6 karakter.");
        toast.error("Password terlalu lemah. Minimal 6 karakter.");
      } else {
        setError("Gagal mendaftar. Silakan coba lagi.");
        toast.error("Gagal mendaftar. Silakan coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    registerWithEmail,
    isLoading,
    error,
    isSuccess,
    unverifiedEmail,
    setError,
  };
};
