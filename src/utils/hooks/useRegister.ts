import { useState } from "react";
import { toast } from "sonner";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

/**
 * Generate random verification token
 */
function generateToken(): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 64; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

/**
 * Custom Hook untuk menangani proses Registrasi (pembuatan akun baru).
 * Merangkum proses pemebentukan akun di Auth, lalu pengiriman email Verifikasi,
 * dan langsung logout paksa agar pengguna verifikasi terlebih dahulu lewat email.
 */
export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState("");

  /**
   * Fungsi Registrasi menggunakan Email dan Password baru
   *
   * @param email - Alamat email yang ingin didaftarkan.
   * @param password - Kata sandi yang diinginkan (minimal panjangnya 6 karakter dari policy firebase).
   */
  const registerWithEmail = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!auth || !db) throw new Error("Firebase tidak terinisialisasi");

      // ==========================================
      // 1. BUAT KREDENSIAL AKUN FIREBASE
      // ==========================================
      // Buat akun baru di Firebase menggunakan Auth provider bawaan
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const token = generateToken();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      await setDoc(doc(db, "verificationTokens", token), {
        email,
        uid: credential.user.uid,
        expiresAt: Timestamp.fromDate(expiresAt),
        verified: false,
        createdAt: Timestamp.now(),
      });

      const response = await fetch("/api/send-verification-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
      });

      if (!response.ok) {
        console.error("Failed to send verification email");
        toast.error(
          "Gagal mengirim email verifikasi. Silakan coba lagi nanti.",
        );
        setError("Gagal mengirim email verifikasi. Silakan coba lagi nanti.");
      }

      // Langsung sign out karena user "harus" verifikasi email dulu sebelum bisa masuk
      await signOut(auth);

      setUnverifiedEmail(email);
      setIsSuccess(true);
    } catch (err: any) {
      console.error(err);

      // ==========================================
      // 3. HANDLING ERROR MESSAGES
      // ==========================================
      // Translasi error code firebase menjadi bahasa Indonesia agar mudah dipahami user
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
