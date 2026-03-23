import { useState } from "react";
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

      // -- 4. Pisahkan Form Data Biasa dengan File Object --
      const uploadedDocs: Record<string, string> = {};
      const textData: Record<string, any> = {};

      const teamName = data.namaTim || data.teamName || "Tanpa_Nama_Tim";
      const subfolderName = `${compKey}_${teamName}`;

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

      // -- 5. Submit Data ke Google Sheets 
      const sheetsData = {
        competition: compKey,
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

      // -- 6. Submit Teks dan Drive Links ke Firestore 
      const firestoreData = {
        competition: compKey,
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
      const errorMessage = err.message || "Terjadi kesalahan pada server.";
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
