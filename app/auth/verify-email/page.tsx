"use client";

import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import DefaultAuthLayout from "@/src/modules/auth/layout/DefaultAuthLayout";

type VerifyStatus = "loading" | "success" | "error" | "expired" | "already_verified";

const VerifyEmailContent = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [status, setStatus] = useState<VerifyStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token || !email || !db) {
        setStatus("error");
        setErrorMessage("Link verifikasi tidak valid.");
        return;
      }

      try {
        const tokenRef = doc(db, "verificationTokens", token);
        const tokenDoc = await getDoc(tokenRef);

        if (!tokenDoc.exists()) {
          setStatus("error");
          setErrorMessage("Token tidak valid atau sudah kadaluarsa.");
          return;
        }

        const tokenData = tokenDoc.data();

        if (tokenData.email !== email) {
          setStatus("error");
          setErrorMessage("Email tidak cocok dengan token.");
          return;
        }

        if (tokenData.verified) {
          setStatus("already_verified");
          return;
        }

        const expiresAt = tokenData.expiresAt.toDate();
        if (expiresAt < new Date()) {
          setStatus("expired");
          return;
        }

        await updateDoc(tokenRef, {
          verified: true,
          verifiedAt: Timestamp.now(),
        });

        setStatus("success");
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
        setErrorMessage("Terjadi kesalahan saat verifikasi.");
      }
    };

    verifyEmail();
  }, [token, email]);

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-white font-publicas mb-2">
              Memverifikasi Email...
            </h1>
            <p className="text-gray-300 font-poppins">
              Mohon tunggu sebentar
            </p>
          </div>
        );

      case "success":
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white font-publicas mb-2">
              Email Berhasil Diverifikasi!
            </h1>
            <p className="text-gray-300 font-poppins mb-8">
              Akun kamu sudah aktif. Silakan login untuk melanjutkan.
            </p>
            <Link
              href="/auth/login"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Masuk Sekarang
            </Link>
          </div>
        );

      case "already_verified":
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white font-publicas mb-2">
              Email Sudah Diverifikasi
            </h1>
            <p className="text-gray-300 font-poppins mb-8">
              Akun kamu sudah diverifikasi sebelumnya. Silakan login.
            </p>
            <Link
              href="/auth/login"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Masuk Sekarang
            </Link>
          </div>
        );

      case "expired":
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white font-publicas mb-2">
              Link Sudah Kadaluarsa
            </h1>
            <p className="text-gray-300 font-poppins mb-8">
              Link verifikasi sudah tidak berlaku. Silakan daftar ulang.
            </p>
            <Link
              href="/auth/register"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Daftar Ulang
            </Link>
          </div>
        );

      case "error":
      default:
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white font-publicas mb-2">
              Verifikasi Gagal
            </h1>
            <p className="text-gray-300 font-poppins mb-8">
              {errorMessage || "Terjadi kesalahan saat verifikasi email."}
            </p>
            <Link
              href="/auth/register"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Kembali ke Halaman Daftar
            </Link>
          </div>
        );
    }
  };

  return (
    <DefaultAuthLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="mb-8">
          <Image
            src="/images/Logo.webp"
            alt="Logo"
            width={150}
            height={150}
            className="object-contain"
          />
        </div>
        <div className="w-full max-w-md bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
          {renderContent()}
        </div>
      </div>
    </DefaultAuthLayout>
  );
};

const LoadingFallback = () => (
  <DefaultAuthLayout>
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="mb-8">
        <Image
          src="/images/Logo.webp"
          alt="Logo"
          width={150}
          height={150}
          className="object-contain"
        />
      </div>
      <div className="w-full max-w-md bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white font-publicas mb-2">
            Memuat...
          </h1>
        </div>
      </div>
    </div>
  </DefaultAuthLayout>
);

const VerifyEmailPage = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VerifyEmailContent />
    </Suspense>
  );
};

export default VerifyEmailPage;
