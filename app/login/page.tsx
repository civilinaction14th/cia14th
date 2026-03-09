"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!auth) {
      setError("Firebase belum dikonfigurasi. Isi .env.local terlebih dahulu.");
      return;
    }
    setLoading(true);

    try {
      if (mode === "signin") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push("/");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan.";
      setError(formatFirebaseError(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    if (!auth) {
      setError("Firebase belum dikonfigurasi. Isi .env.local terlebih dahulu.");
      return;
    }
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan.";
      setError(formatFirebaseError(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-md p-8">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
          {mode === "signin" ? "Masuk" : "Daftar"}
        </h1>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
          {mode === "signin"
            ? "Selamat datang kembali"
            : "Buat akun baru"}
        </p>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-700 rounded-lg py-2.5 px-4 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <GoogleIcon />
          Lanjutkan dengan Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          <span className="text-xs text-gray-400">atau</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 6 karakter"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg py-2.5 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Memproses..."
              : mode === "signin"
              ? "Masuk"
              : "Daftar"}
          </button>
        </form>

        {/* Toggle mode */}
        <p className="mt-5 text-center text-sm text-gray-500 dark:text-gray-400">
          {mode === "signin" ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
          <button
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError("");
            }}
            className="text-blue-600 hover:underline font-medium"
          >
            {mode === "signin" ? "Daftar" : "Masuk"}
          </button>
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
      <path
        d="M47.532 24.552c0-1.636-.132-3.2-.396-4.704H24v9.288h13.196c-.576 3.024-2.268 5.58-4.812 7.296v6.072h7.788c4.56-4.2 7.36-10.392 7.36-17.952z"
        fill="#4285F4"
      />
      <path
        d="M24 48c6.588 0 12.12-2.172 16.164-5.892l-7.788-6.072c-2.172 1.464-4.956 2.328-8.376 2.328-6.444 0-11.904-4.344-13.86-10.188H2.1v6.264C6.132 42.636 14.484 48 24 48z"
        fill="#34A853"
      />
      <path
        d="M10.14 28.176A14.898 14.898 0 0 1 9.348 24c0-1.452.252-2.868.792-4.176v-6.264H2.1A23.97 23.97 0 0 0 0 24c0 3.864.924 7.524 2.1 10.44l8.04-6.264z"
        fill="#FBBC05"
      />
      <path
        d="M24 9.636c3.624 0 6.876 1.248 9.432 3.696l7.02-7.02C36.108 2.388 30.588 0 24 0 14.484 0 6.132 5.364 2.1 13.56l8.04 6.264C12.096 13.98 17.556 9.636 24 9.636z"
        fill="#EA4335"
      />
    </svg>
  );
}

function formatFirebaseError(message: string): string {
  if (message.includes("user-not-found") || message.includes("wrong-password") || message.includes("invalid-credential"))
    return "Email atau password salah.";
  if (message.includes("email-already-in-use"))
    return "Email sudah terdaftar.";
  if (message.includes("weak-password"))
    return "Password terlalu lemah. Minimal 6 karakter.";
  if (message.includes("invalid-email"))
    return "Format email tidak valid.";
  if (message.includes("popup-closed-by-user"))
    return "Login dibatalkan.";
  if (message.includes("network-request-failed"))
    return "Masalah koneksi. Periksa internet Anda.";
  return "Terjadi kesalahan. Silakan coba lagi.";
}
