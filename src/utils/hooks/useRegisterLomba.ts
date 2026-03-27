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
  parentFolderId: string,
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", fileName);
  formData.append("targetFolderId", parentFolderId);

  const res = await fetch("/api/upload-drive", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Gagal mengupload file: ${fileName}`);
  }

  const data = await res.json();
  return data.fileUrl as string;
}

/**
 * Helper function untuk memastikan Folder terbentuk dengan benar HANYA 1 KALI.
 */
async function createDriveFolder(subfolderName: string): Promise<string> {
  const res = await fetch("/api/create-drive-folder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ subfolderName }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Gagal membuat folder tim di Drive`);
  }

  const data = await res.json();
  return data.folderId;
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
          where("userId", "==", userId),
        ),
      );

      if (!byUser.empty) {
        throw new Error(`Anda sudah terdaftar di cabang lomba lain. Setiap peserta hanya diperbolehkan mendaftar satu cabang lomba.`);
      }

      // -- Cek duplikasi Nama Tim --
      const inputTeamName = data.teamName || data.namaTim || "";
      if (inputTeamName) {
        const byTeamName = await getDocs(
          query(
            collection(db, "registrations"),
            where("competition", "==", compKey),
            where("teamName", "==", inputTeamName),
          ),
        );
        
        if (!byTeamName.empty) {
          throw new Error(
            `Nama tim "${inputTeamName}" sudah terdaftar untuk lomba ${compKey}. Silakan gunakan nama tim lain.`,
          );
        }
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

      const targetFolderId = await createDriveFolder(subfolderName);
      const uploadPromises: Promise<void>[] = [];

      const entries = Object.entries(data);
      for (const [key, value] of entries) {
        if (value instanceof File) {
          const cleanFileName = value.name.endsWith(".pdf")
            ? value.name
            : `${key}.pdf`;

          const uploadTask = uploadToDrive(
            value,
            cleanFileName,
            targetFolderId,
          ).then((url) => {
            uploadedDocs[key] = url;
          });
          uploadPromises.push(uploadTask);
        } else if (value !== null && value !== undefined && value !== "") {
          textData[key] = value;
        }
      }

      await Promise.all(uploadPromises);

      // -- 6. Submit Data ke Google Sheets 
      const sheetsData = {
        competition: compKey,
        gelombang: gelombangName,
        userId,
        createdAt: new Date().toISOString(),
        ...textData,
        documents: uploadedDocs,
      };

      // -- 7. Submit Teks dan Drive Links ke Firestore
      const firestoreData = {
        competition: compKey,
        gelombang: gelombangName,
        userId,
        createdAt: serverTimestamp(),
        ...textData,
        documents: uploadedDocs,
      };

      await Promise.all([
        fetch("/api/write-to-sheets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sheetsData),
        }).then(async (res) => {
          if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.error || "Gagal menyimpan data ke Google Sheets.");
          }
        }),
        addDoc(collection(db, "registrations"), firestoreData),
      ]);

      // Update cache status
      sessionStorage.setItem(`reg-status-${compKey}-${userId}`, "true");

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

  const checkIsRegistered = async (competition: string) => {
    if (!auth?.currentUser || !db) return false;
    const compKey = competition.toUpperCase();
    const userId = auth.currentUser.uid;
    
    // Optimasi: Cek cache di sessionStorage agar tidak hit API terus-menerus
    const cacheKey = `reg-status-${compKey}-${userId}`;
    const cachedStatus = sessionStorage.getItem(cacheKey);
    if (cachedStatus !== null) {
      return cachedStatus === "true";
    }

    const byUser = await getDocs(
      query(
        collection(db, "registrations"),
        where("competition", "==", compKey),
        where("userId", "==", userId),
      ),
    );

    const isRegistered = !byUser.empty;
    sessionStorage.setItem(cacheKey, isRegistered ? "true" : "false");
    return isRegistered;
  };

  const checkHasRegisteredAnyLomba = async () => {
    if (!auth?.currentUser || !db) return false;
    const userId = auth.currentUser.uid;

    const cacheKey = `reg-status-any-${userId}`;
    const cachedStatus = sessionStorage.getItem(cacheKey);
    if (cachedStatus !== null) {
      return cachedStatus === "true";
    }

    const q = query(
      collection(db, "registrations"),
      where("userId", "==", userId),
    );
    const querySnapshot = await getDocs(q);

    const hasRegistered = !querySnapshot.empty;
    sessionStorage.setItem(cacheKey, hasRegistered ? "true" : "false");
    return hasRegistered;
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    submitLomba,
    checkIsRegistered,
    checkHasRegisteredAnyLomba,
    isLoading,
    error,
    success,
    resetState,
    setError,
  };
};
