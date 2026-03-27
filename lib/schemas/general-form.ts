import { z } from "zod";

const pdfFile = z
  .custom<FileList>((val) => val instanceof FileList && val.length > 0, {
    message: "File wajib diunggah",
  })
  .refine(
    (files) => files[0]?.type === "application/pdf",
    "Hanya file PDF yang diizinkan"
  )
  .refine(
    (files) => files[0]?.size <= 3 * 1024 * 1024,
    "Ukuran file maksimal 3MB"
  );

export const generalFormSchema = z.object({
  // Data Kelompok
  teamName: z.string().min(1, "Nama tim wajib diisi"),
  university: z.string().min(1, "Nama universitas wajib diisi"),
  leaderName: z.string().min(1, "Nama ketua wajib diisi"),
  leaderEmail: z.string().email("Format email tidak valid"),

  // Data Dosen Pembimbing
  supervisorName: z.string().min(1, "Nama dosen pembimbing wajib diisi"),
  supervisorNIP: z.string().min(1, "NIP dosen pembimbing wajib diisi"),
  supervisorPhone: z
    .string()
    .min(10, "Nomor telepon tidak valid")
    .regex(/^[0-9+\-\s]+$/, "Nomor telepon tidak valid"),
  supervisorEmail: z.string().email("Format email tidak valid"),

  // Dokumen Persyaratan
  biodataTeam: pdfFile,
  ktm: pdfFile,
  twibbon: pdfFile,
  followIG: pdfFile,
  payment: pdfFile,
});

export type GeneralFormValues = z.infer<typeof generalFormSchema>;
