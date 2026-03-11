"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import CompetitionCard from "./components/CompetitionCard";
import GeneralForm from "./components/forms/GeneralForm";
import FCECForm from "./components/forms/FCECForm";

type Competition = "CIC" | "SBC" | "FCEC" | "ITC";

const COMPETITIONS: {
  id: Competition;
  name: string;
  color: string;
}[] = [
  { id: "CIC", name: "CIC", color: "bg-blue-600 border-blue-600 text-white" },
  { id: "SBC", name: "SBC", color: "bg-orange-500 border-orange-500 text-white" },
  { id: "FCEC", name: "FCEC", color: "bg-green-600 border-green-600 text-white" },
  { id: "ITC", name: "ITC", color: "bg-purple-600 border-purple-600 text-white" },
];

export default function RegistrasiLombaPage() {
  const { currentUser, loading, signOut } = useAuth();
  const router = useRouter();
  const [selectedCompetition, setSelectedCompetition] =
    useState<Competition | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!loading && !currentUser) {
      router.replace("/login");
    }
  }, [loading, currentUser, router]);

  if (loading || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="flex flex-col items-center gap-3 text-gray-500 dark:text-gray-400">
          <svg className="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm">Memuat...</p>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Berhasil Mendaftar!
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Pendaftaran lomba <strong>{selectedCompetition}</strong> Anda telah berhasil disimpan. Tim kami akan menghubungi Anda melalui email.
          </p>
          <button
            onClick={() => router.push("/")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg py-2.5 transition"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  const displayName =
    currentUser.displayName || currentUser.email?.split("@")[0] || "Peserta";
  const email = currentUser.email;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">
              Selamat datang, {displayName}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Registrasi Lomba CIA 14
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Masuk sebagai <span className="font-medium text-gray-700 dark:text-gray-300">{email}</span>
            </p>
          </div>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition mt-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Keluar
          </button>
        </div>

        {/* Competition Cards */}
        {!selectedCompetition && (
          <>
            <h2 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Pilih Lomba
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {COMPETITIONS.map((comp) => (
                <CompetitionCard
                  key={comp.id}
                  name={comp.name}
                  color={comp.color}
                  isSelected={selectedCompetition === comp.id}
                  onClick={() => setSelectedCompetition(comp.id)}
                />
              ))}
            </div>
          </>
        )}

        {/* Registration Form */}
        {selectedCompetition && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
            {/* Form Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Form Pendaftaran {selectedCompetition}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  Lengkapi semua data di bawah ini
                </p>
              </div>
              <button
                onClick={() => setSelectedCompetition(null)}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1.5 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Ganti Lomba
              </button>
            </div>

            <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6" />

            {selectedCompetition === "FCEC" ? (
              <FCECForm
                userId={currentUser.uid}
                onSuccess={() => setIsSuccess(true)}
              />
            ) : (
              <GeneralForm
                competition={selectedCompetition}
                userId={currentUser.uid}
                onSuccess={() => setIsSuccess(true)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
