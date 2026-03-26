import { useState } from "react";
import { toast } from "sonner";
import {
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

/**
 * Generate random verification token
 */
function generateToken(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 64; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState("");

  const registerWithEmail = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!auth || !db) throw new Error("Firebase tidak terinisialisasi");

      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
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
      }

      await signOut(auth);

      setUnverifiedEmail(email);
      setIsSuccess(true);
    } catch (err: any) {
      console.error(err);

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
