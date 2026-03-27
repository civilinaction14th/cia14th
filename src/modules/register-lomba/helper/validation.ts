import { z } from "zod";

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
];

export const fileSchema = z
  .any()
  .refine((file) => file !== null && file !== undefined, "File wajib diunggah")
  .refine(
    (file) => file instanceof File && file.size <= MAX_FILE_SIZE,
    "Ukuran maksimal file adalah 3MB"
  )
  .refine(
    (file) => file instanceof File && ACCEPTED_FILE_TYPES.includes(file.type),
    "Format file hanya mendukung .pdf"
  );

export const pdfOnlySchema = z
  .any()
  .refine((file) => file !== null && file !== undefined, "File wajib diunggah")
  .refine(
    (file) => file instanceof File && file.size <= MAX_FILE_SIZE,
    "Ukuran maksimal file adalah 3MB"
  )
  .refine(
    (file) => file instanceof File && file.type === "application/pdf",
    "Format file hanya mendukung .pdf"
  );

const waRegex = /^(08|628)[0-9]{7,12}$/;
const phoneRegex = /^[0-9+\- ]{7,15}$/;

export const generalValidationSchema = z.object({
  asalUniversitas: z.string().min(1, "Asal Universitas wajib diisi"),
  namaTim: z.string().min(1, "Nama Tim wajib diisi"),
  namaKetua: z.string().min(1, "Nama Ketua wajib diisi"),
  emailKetua: z.string().email("Format email tidak valid"),
  dosenNama: z.string().min(1, "Nama Dosen wajib diisi"),
  dosenNip: z.string().min(1, "NIP Dosen wajib diisi"),
  dosenTelepon: z
    .string()
    .min(1, "Nomor Telepon wajib diisi")
    .regex(phoneRegex, "Nomor telepon tidak valid"),
  dosenEmail: z.string().email("Format email tidak valid"),

  biodataFile: fileSchema,
  ktmFile: fileSchema,
  twibbonFile: fileSchema,
  instagramFile: fileSchema,
  pembayaranFile: fileSchema,
});

export const fcecValidationSchema = z.object({
  namaTim: z.string().min(1, "Nama Tim wajib diisi"),
  asalSekolah: z.string().min(1, "Asal Sekolah wajib diisi"),
  namaKetua: z.string().min(1, "Nama Ketua wajib diisi"),
  namaAnggota1: z.string().min(1, "Nama Anggota 1 wajib diisi"),
  namaAnggota2: z.string().min(1, "Nama Anggota 2 wajib diisi"),
  emailKetua: z.string().email("Format email tidak valid"),
  nomorWhatsApp: z
    .string()
    .min(1, "Nomor WhatsApp wajib diisi")
    .regex(
      waRegex,
      "Nomor WhatsApp harus diawali 08 atau 628 (contoh: 0812... atau 62812...)"
    ),
  idLine: z.string().min(1, "ID Line wajib diisi"),
  judulAbstrak: z.string().min(1, "Judul Abstrak wajib diisi"),
  subtema: z.string().min(1, "Pilihan subtema wajib dipilih"),

  ktpFile: fileSchema,
  pasFotoFile: fileSchema,
  orisinalitasFile: fileSchema,
  siswaAktifFile: fileSchema,
  twibbonFile: fileSchema,
  abstrakFile: pdfOnlySchema, // Khusus abstrak biasanya mesti PDF
});

export const fileAcceptMix = {
  "application/pdf": [".pdf"],
};

export const fileAcceptPdf = {
  "application/pdf": [".pdf"],
};
