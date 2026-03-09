"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { fcecFormSchema, FcecFormValues, SUB_THEMES } from "@/lib/schemas/fcec-form";

interface FCECFormProps {
  userId: string;
  onSuccess: () => void;
}

type DocKey =
  | "identity"
  | "photo"
  | "originalityStatement"
  | "studentStatement"
  | "twibbonFcec"
  | "paymentFcec";

const DOCUMENT_LABELS: Record<DocKey, string> = {
  identity: "Kartu Identitas",
  photo: "Pas Foto",
  originalityStatement: "Surat Pernyataan Orisinalitas",
  studentStatement: "Surat Pernyataan Siswa Aktif",
  twibbonFcec: "Bukti Posting Twibbon",
  paymentFcec: "Bukti Pembayaran",
};

const DOCUMENT_FILE_NAMES: Record<DocKey, string> = {
  identity: "kartu_identitas.pdf",
  photo: "pas_foto.pdf",
  originalityStatement: "surat_orisinalitas.pdf",
  studentStatement: "surat_siswa_aktif.pdf",
  twibbonFcec: "bukti_twibbon.pdf",
  paymentFcec: "bukti_pembayaran.pdf",
};

async function uploadToDrive(file: File, fileName: string, subfolderName: string): Promise<string> {
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

export default function FCECForm({ userId, onSuccess }: FCECFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FcecFormValues>({
    resolver: zodResolver(fcecFormSchema),
  });

  const onSubmit = async (data: FcecFormValues) => {
    if (!db) {
      setSubmitError("Firestore belum dikonfigurasi.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const byUser = await getDocs(
        query(collection(db, "registrations"), where("competition", "==", "FCEC"), where("userId", "==", userId))
      );
      if (!byUser.empty) {
        setSubmitError("Akun Anda sudah terdaftar untuk lomba FCEC.");
        return;
      }

      const byEmail = await getDocs(
        query(collection(db, "registrations"), where("competition", "==", "FCEC"), where("leaderEmail", "==", data.leaderEmail))
      );
      if (!byEmail.empty) {
        setSubmitError(`Email ketua (${data.leaderEmail}) sudah digunakan untuk mendaftar lomba FCEC.`);
        return;
      }

      const docKeys: DocKey[] = [
        "identity",
        "photo",
        "originalityStatement",
        "studentStatement",
        "twibbonFcec",
        "paymentFcec",
      ];

      const uploadedDocs: Record<string, string> = {};
      const subfolderName = `FCEC_${data.teamName}`;

      for (const key of docKeys) {
        const files = data[key] as FileList;
        const file = files[0];
        uploadedDocs[key] = await uploadToDrive(file, DOCUMENT_FILE_NAMES[key], subfolderName);
      }

      const abstractFiles = data.abstractFile as FileList;
      uploadedDocs.abstractFile = await uploadToDrive(
        abstractFiles[0],
        "abstrak.pdf",
        subfolderName
      );

      await addDoc(collection(db, "registrations"), {
        competition: "FCEC",
        userId,
        createdAt: serverTimestamp(),
        teamName: data.teamName,
        school: data.school,
        leaderName: data.leaderName,
        member1: data.member1,
        member2: data.member2,
        leaderEmail: data.leaderEmail,
        leaderWhatsapp: data.leaderWhatsapp,
        leaderLine: data.leaderLine,
        abstractTitle: data.abstractTitle,
        subTheme: data.subTheme,
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
      {/* Identitas */}
      <section>
        <SectionHeader number={1} title="Identitas Tim" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Nama Tim"
            error={errors.teamName?.message}
            {...register("teamName")}
            placeholder="Contoh: Tim FCEC 1"
          />
          <FormField
            label="Asal Sekolah"
            error={errors.school?.message}
            {...register("school")}
            placeholder="Nama sekolah/SMA"
          />
          <FormField
            label="Nama Ketua"
            error={errors.leaderName?.message}
            {...register("leaderName")}
            placeholder="Nama lengkap ketua"
          />
          <FormField
            label="Nama Anggota 1"
            error={errors.member1?.message}
            {...register("member1")}
            placeholder="Nama lengkap anggota 1"
          />
          <FormField
            label="Nama Anggota 2"
            error={errors.member2?.message}
            {...register("member2")}
            placeholder="Nama lengkap anggota 2"
          />
          <FormField
            label="Email Ketua"
            type="email"
            error={errors.leaderEmail?.message}
            {...register("leaderEmail")}
            placeholder="ketua@email.com"
          />
          <FormField
            label="Nomor WhatsApp Ketua"
            error={errors.leaderWhatsapp?.message}
            {...register("leaderWhatsapp")}
            placeholder="08xxxxxxxxxx"
          />
          <FormField
            label="ID Line Ketua"
            error={errors.leaderLine?.message}
            {...register("leaderLine")}
            placeholder="ID Line"
          />
        </div>
      </section>

      {/* Dokumen Persyaratan */}
      <section>
        <SectionHeader
          number={2}
          title="Dokumen Persyaratan"
          subtitle="PDF, maks. 5MB"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(Object.keys(DOCUMENT_LABELS) as DocKey[]).map((key) => (
            <FileField
              key={key}
              label={DOCUMENT_LABELS[key]}
              error={(errors[key] as { message?: string } | undefined)?.message}
              {...register(key)}
            />
          ))}
        </div>
      </section>

      {/* Pengumpulan Abstrak */}
      <section>
        <SectionHeader number={3} title="Pengumpulan Abstrak" />
        <div className="space-y-4">
          <FormField
            label="Judul Abstrak"
            error={errors.abstractTitle?.message}
            {...register("abstractTitle")}
            placeholder="Judul karya tulis / abstrak"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sub Tema <span className="text-red-500">*</span>
            </label>
            <select
              {...register("subTheme")}
              className={`w-full rounded-lg border px-3 py-2.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.subTheme
                  ? "border-red-400 dark:border-red-600"
                  : "border-gray-300 dark:border-gray-700"
              }`}
            >
              <option value="">-- Pilih Sub Tema --</option>
              {SUB_THEMES.map((theme, i) => (
                <option key={i} value={theme}>
                  {i + 1}. {theme}
                </option>
              ))}
            </select>
            {errors.subTheme && (
              <p className="mt-1 text-xs text-red-500">{errors.subTheme.message}</p>
            )}
          </div>

          <FileField
            label="File Abstrak"
            error={(errors.abstractFile as { message?: string } | undefined)?.message}
            {...register("abstractFile")}
          />
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
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium text-sm rounded-lg py-3 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
          "Daftar FCEC"
        )}
      </button>
    </form>
  );
}

// --- Reusable components ---

function SectionHeader({
  number,
  title,
  subtitle,
}: {
  number: number;
  title: string;
  subtitle?: string;
}) {
  return (
    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
      <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-xs flex items-center justify-center font-bold flex-shrink-0">
        {number}
      </span>
      {title}
      {subtitle && (
        <span className="text-xs text-gray-400 font-normal">({subtitle})</span>
      )}
    </h3>
  );
}

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
      className={`w-full rounded-lg border px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-green-50 file:text-green-700 dark:file:bg-green-900/30 dark:file:text-green-400 hover:file:bg-green-100 transition cursor-pointer ${
        error
          ? "border-red-400 dark:border-red-600"
          : "border-gray-300 dark:border-gray-700"
      }`}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);
