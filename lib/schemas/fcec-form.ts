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
    (files) => files[0]?.size <= 5 * 1024 * 1024,
    "Ukuran file maksimal 5MB"
  );

export const SUB_THEMES = [
  "Inovasi Infrastruktur Tangguh Bencana Hidrometeorologi dan Geologi",
  "Rekayasa Berbasis Alam (Nature Based-Solution) dalam Penanggulangan Bencana",
  "Inovasi Penyediaan Air Bersih pada Kondisi Darurat Bencana",
] as const;

export const fcecFormSchema = z.object({
  // Identitas
  teamName: z.string().min(1, "Nama tim wajib diisi"),
  school: z.string().min(1, "Asal sekolah wajib diisi"),
  leaderName: z.string().min(1, "Nama ketua wajib diisi"),
  member1: z.string().min(1, "Nama anggota 1 wajib diisi"),
  member2: z.string().min(1, "Nama anggota 2 wajib diisi"),
  leaderEmail: z.string().email("Format email tidak valid"),
  leaderWhatsapp: z
    .string()
    .min(10, "Nomor WhatsApp tidak valid")
    .regex(/^[0-9+\-\s]+$/, "Nomor WhatsApp tidak valid"),
  leaderLine: z.string().min(1, "ID Line ketua wajib diisi"),

  // Dokumen Persyaratan
  identity: pdfFile,
  photo: pdfFile,
  originalityStatement: pdfFile,
  studentStatement: pdfFile,
  twibbonFcec: pdfFile,
  paymentFcec: pdfFile,

  // Pengumpulan Abstrak
  abstractTitle: z.string().min(1, "Judul abstrak wajib diisi"),
  subTheme: z.enum(SUB_THEMES).refine((val) => SUB_THEMES.includes(val), {
    message: "Pilih sub tema yang tersedia",
  }),
  abstractFile: pdfFile,
});

export type FcecFormValues = z.infer<typeof fcecFormSchema>;
