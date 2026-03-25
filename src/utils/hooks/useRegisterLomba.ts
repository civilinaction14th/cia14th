import { useState } from "react";
import { events, getActiveWave } from "@/src/modules/events/data/eventData";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase"; // Pastikan path firebase sesuai

// Helper function untuk upload ke Google Drive via API Route
async function uploadToDrive(
  file: File,
  fileName: string,
  subfolderName: string,
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", fileName);
  formData.append("subfolderName", subfolderName);

  const res = await fetch("/api/upload-drive", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Gagal mengupload file ${fileName}`);
  }

  const data = await res.json();
  return data.fileUrl as string;
}

export const useRegisterLomba = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  /**
   * Fungsi submit pendaftaran ke backend + firestore
   * Sesuai dengan spesifikasi GDrive + Firebase
   */
  const submitLomba = async (
    competition: string, // contoh: "FCEC", "CIC", "SBC", "ITC"
    data: Record<string, any>,
  ) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const compKey = competition.toUpperCase();

      // -- 1. Ambil User ID Firebase yang sedang login --
      if (!auth?.currentUser) {
        throw new Error("Anda harus login untuk bisa mendaftar lomba.");
      }
      const userId = auth.currentUser.uid;

      if (!db) {
        throw new Error("Firestore belum dikonfigurasi.");
      }

      // -- 2. Cek Duplikasi Pendaftaran Berdasarkan Akun --
      const byUser = await getDocs(
        query(
          collection(db, "registrations"),
          where("competition", "==", compKey),
          where("userId", "==", userId),
        ),
      );

      if (!byUser.empty) {
        throw new Error(`Akun Anda sudah terdaftar untuk lomba ${compKey}.`);
      }

      // -- 3. Cek Duplikasi Berdasarkan Email Ketua --
      // (asumsi key email adalah "emailKetua" atau jatuh ke data lain misal leaderEmail)
      const leaderEmail = data.emailKetua || data.leaderEmail || "";
      if (leaderEmail) {
        const byEmail = await getDocs(
          query(
            collection(db, "registrations"),
            where("competition", "==", compKey),
            where("emailKetua", "==", leaderEmail),
          ),
        );
        if (!byEmail.empty) {
          throw new Error(
            `Email ketua (${leaderEmail}) sudah digunakan untuk mendaftar lomba ${compKey}.`,
          );
        }
      }

      // -- 4. Hitung Gelombang Pendaftaran --
      const eventInfo = events.find((e) => e.id.toUpperCase() === compKey);
      let gelombangName = "Tanpa Gelombang";

      if (eventInfo) {
        const active = getActiveWave(eventInfo);
        if (active) {
          const lowerLabel = active.label.toLowerCase();
          if (lowerLabel === "dibuka") {
            gelombangName = "Normal";
          } else if (lowerLabel === "diperpanjang") {
            gelombangName = "Extended";
          } else {
            gelombangName = active.label; // e.g. "Gelombang 1"
          }
        }
      }

      // -- 5. Pisahkan Form Data Biasa dengan File Object --
      const uploadedDocs: Record<string, string> = {};
      const textData: Record<string, any> = {};

      const teamName = data.namaTim || data.teamName || "Tanpa_Nama_Tim";
      // Bikin path bertingkat: CIC/Gelombang 1/CIC_TimA_1234
      const uniqueId = `${compKey}_${teamName}_${Date.now()}`;
      const subfolderName = `${compKey}/${gelombangName}/${uniqueId}`;

      const entries = Object.entries(data);
      for (const [key, value] of entries) {
        if (value instanceof File) {
          // File diupload satu per satu sesuai nama key-nya (misal: abstrakFile.pdf)
          // Berhubung form kita sekarang hanya PDF, kita append string '.pdf' agar spesifik
          const cleanFileName = value.name.endsWith(".pdf")
            ? value.name
            : `${key}.pdf`;
          uploadedDocs[key] = await uploadToDrive(
            value,
            cleanFileName,
            subfolderName,
          );
        } else if (value !== null && value !== undefined && value !== "") {
          textData[key] = value;
        }
      }

      // -- 6. Submit Data ke Google Sheets 
      const sheetsData = {
        competition: compKey,
        gelombang: gelombangName,
        userId,
        createdAt: new Date().toISOString(),
        ...textData,
        documents: uploadedDocs,
      };

      const sheetsResponse = await fetch("/api/write-to-sheets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sheetsData),
      });

      if (!sheetsResponse.ok) {
        const sheetsError = await sheetsResponse.json().catch(() => ({}));
        throw new Error(
          sheetsError.error ||
            "Gagal menyimpan data ke Google Sheets. Registrasi dibatalkan.",
        );
      }

      // -- 7. Submit Teks dan Drive Links ke Firestore 
      const firestoreData = {
        competition: compKey,
        gelombang: gelombangName,
        userId,
        createdAt: serverTimestamp(),
        ...textData,
        documents: uploadedDocs,
      };

      await addDoc(collection(db, "registrations"), firestoreData);

      setSuccess(true);
      return { success: true, message: "Berhasil registrasi!" };
    } catch (err: any) {
      console.error("Error submitting lomba:", err);
      let errorMessage = err.message || "Terjadi kesalahan pada server.";
      
      const lowerErr = errorMessage.toLowerCase();
      if (lowerErr.includes("failed to fetch") || lowerErr.includes("network error")) {
        errorMessage = "Koneksi terputus. Pastikan internet Anda stabil lalu coba lagi.";
      } else if (lowerErr.includes("500") || lowerErr.includes("internal server error")) {
        errorMessage = "Sistem kami sedang sibuk. Silakan tunggu sebentar dan coba lagi.";
      } else if (lowerErr.includes("timeout")) {
        errorMessage = "Waktu unggah terlalu lama. Pastikan ukuran file tidak kebesaran atau coba lagi.";
      } else if (lowerErr.includes("fetcherror") && lowerErr.includes("failed")) {
        errorMessage = "Gagal terhubung ke API kami. Pastikan perangkat Anda terkoneksi internet.";
      }

      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
  };

  return { submitLomba, isLoading, error, success, resetState, setError };
};
