"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  generalFormSchema,
  GeneralFormValues,
} from "@/lib/schemas/general-form";

interface GeneralFormProps {
  competition: "ITC" | "SBC" | "CIC";
  userId: string;
  onSuccess: () => void;
}

type DocumentKey = "biodataTeam" | "ktm" | "twibbon" | "followIG" | "payment";

const DOCUMENT_LABELS: Record<DocumentKey, string> = {
  biodataTeam: "Biodata Tim",
  ktm: "Kartu Tanda Mahasiswa (KTM)",
  twibbon: "Bukti Twibbon",
  followIG: "Bukti Follow Instagram",
  payment: "Bukti Pembayaran",
};

const DOCUMENT_FILE_NAMES: Record<DocumentKey, string> = {
  biodataTeam: "biodata_tim.pdf",
  ktm: "ktm.pdf",
  twibbon: "bukti_twibbon.pdf",
  followIG: "bukti_follow_ig.pdf",
  payment: "bukti_pembayaran.pdf",
};

async function uploadToDrive(
  file: File,
  fileName: string,
  subfolderName: string
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
    const err = await res.json();
    throw new Error(err.error || "Gagal mengupload file");
  }

  const data = await res.json();
  return data.fileUrl as string;
}

export default function GeneralForm({
  competition,
  userId,
  onSuccess,
}: GeneralFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GeneralFormValues>({
    resolver: zodResolver(generalFormSchema),
  });

  const onSubmit = async (data: GeneralFormValues) => {
    if (!db) {
      setSubmitError("Firestore belum dikonfigurasi.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const byUser = await getDocs(
        query(collection(db, "registrations"), where("competition", "==", competition), where("userId", "==", userId))
      );
      if (!byUser.empty) {
        setSubmitError(`Akun Anda sudah terdaftar untuk lomba ${competition}.`);
        return;
      }

      const byEmail = await getDocs(
        query(collection(db, "registrations"), where("competition", "==", competition), where("leaderEmail", "==", data.leaderEmail))
      );
      if (!byEmail.empty) {
        setSubmitError(`Email ketua (${data.leaderEmail}) sudah digunakan untuk mendaftar lomba ${competition}.`);
        return;
      }

      const docKeys: DocumentKey[] = [
        "biodataTeam",
        "ktm",
        "twibbon",
        "followIG",
        "payment",
      ];

      const uploadedDocs: Record<string, string> = {};
      const subfolderName = `${competition}_${data.teamName}`;

      for (const key of docKeys) {
        const files = data[key] as FileList;
        const file = files[0];
        uploadedDocs[key] = await uploadToDrive(file, DOCUMENT_FILE_NAMES[key], subfolderName);
      }

      await addDoc(collection(db, "registrations"), {
        competition,
        userId,
        createdAt: serverTimestamp(),
        teamName: data.teamName,
        university: data.university,
        leaderName: data.leaderName,
        leaderEmail: data.leaderEmail,
        supervisorName: data.supervisorName,
        supervisorNIP: data.supervisorNIP,
        supervisorPhone: data.supervisorPhone,
        supervisorEmail: data.supervisorEmail,
        documents: uploadedDocs,
      });

      onSuccess();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Data Kelompok */}
      <section>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs flex items-center justify-center font-bold">
            1
          </span>
          Data Kelompok
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Nama Tim"
            error={errors.teamName?.message}
            {...register("teamName")}
            placeholder="Contoh: Tim Inovasi 1"
          />
          <FormField
            label="Nama Universitas"
            error={errors.university?.message}
            {...register("university")}
            placeholder="Contoh: Universitas Indonesia"
          />
          <FormField
            label="Nama Ketua"
            error={errors.leaderName?.message}
            {...register("leaderName")}
            placeholder="Nama lengkap ketua tim"
          />
          <FormField
            label="Email Ketua"
            type="email"
            error={errors.leaderEmail?.message}
            {...register("leaderEmail")}
            placeholder="ketua@email.com"
          />
        </div>
      </section>

      {/* Data Dosen Pembimbing */}
      <section>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs flex items-center justify-center font-bold">
            2
          </span>
          Data Dosen Pembimbing
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Nama Dosen Pembimbing"
            error={errors.supervisorName?.message}
            {...register("supervisorName")}
            placeholder="Nama lengkap dosen"
          />
          <FormField
            label="NIP"
            error={errors.supervisorNIP?.message}
            {...register("supervisorNIP")}
            placeholder="Nomor Induk Pegawai"
          />
          <FormField
            label="Nomor Telepon"
            error={errors.supervisorPhone?.message}
            {...register("supervisorPhone")}
            placeholder="08xxxxxxxxxx"
          />
          <FormField
            label="Email Dosen"
            type="email"
            error={errors.supervisorEmail?.message}
            {...register("supervisorEmail")}
            placeholder="dosen@university.ac.id"
          />
        </div>
      </section>

      {/* Dokumen Persyaratan */}
      <section>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs flex items-center justify-center font-bold">
            3
          </span>
          Dokumen Persyaratan
          <span className="text-xs text-gray-400 font-normal">(PDF, maks. 5MB)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(Object.keys(DOCUMENT_LABELS) as DocumentKey[]).map((key) => (
            <FileField
              key={key}
              label={DOCUMENT_LABELS[key]}
              error={(errors[key] as { message?: string } | undefined)?.message}
              {...register(key)}
            />
          ))}
        </div>
      </section>

      {submitError && (
        <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg py-3 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Mengupload &amp; Menyimpan...
          </>
        ) : (
          `Daftar ${competition}`
        )}
      </button>
    </form>
  );
}

// --- Reusable field components ---

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormField = ({ label, error, ...props }: FormFieldProps) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      {...props}
      className={`w-full rounded-lg border px-3 py-2.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
        error
          ? "border-red-400 dark:border-red-600"
          : "border-gray-300 dark:border-gray-700"
      }`}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

interface FileFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FileField = ({ label, error, ...props }: FileFieldProps) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      type="file"
      accept=".pdf,application/pdf"
      {...props}
      className={`w-full rounded-lg border px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-700 dark:file:bg-blue-900/30 dark:file:text-blue-400 hover:file:bg-blue-100 transition cursor-pointer ${
        error
          ? "border-red-400 dark:border-red-600"
          : "border-gray-300 dark:border-gray-700"
      }`}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);
