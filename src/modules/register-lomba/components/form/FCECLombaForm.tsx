"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { fcecValidationSchema, fileAcceptPdf } from "../../helper/validation";
import InputField from "./InputField";
import DropdownField from "./DropdownField";
import FileUploadField from "./FileUploadField";
import Button from "./Button";
import FormContainer from "./FormContainer";
import Text from "../elements/Text";
import { useRegisterLomba } from "@/src/utils/hooks/useRegisterLomba";
import { useRouter } from "next/navigation";

interface FCECFormValues {
  namaTim: string;
  asalSekolah: string;
  namaKetua: string;
  namaAnggota1: string;
  namaAnggota2: string;
  emailKetua: string;
  nomorWhatsApp: string;
  idLine: string;
  ktpFile: File | null;
  pasFotoFile: File | null;
  orisinalitasFile: File | null;
  siswaAktifFile: File | null;
  twibbonFile: File | null;
  judulAbstrak: string;
  subtema: string;
  abstrakFile: File | null;
}

export default function FCECLombaForm({
  onDirtyChange,
}: {
  onDirtyChange: (isDirty: boolean) => void;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FCECFormValues>({
    defaultValues: {
      namaTim: "",
      asalSekolah: "",
      namaKetua: "",
      namaAnggota1: "",
      namaAnggota2: "",
      emailKetua: "",
      nomorWhatsApp: "",
      idLine: "",
      judulAbstrak: "",
      subtema: "",
      ktpFile: null,
      pasFotoFile: null,
      orisinalitasFile: null,
      siswaAktifFile: null,
      twibbonFile: null,
      abstrakFile: null,
    },
    resolver: zodResolver(fcecValidationSchema)
  });

  const {
    submitLomba,
    isLoading: isUploading,
    error: apiError,
    success,
  } = useRegisterLomba();

  useEffect(() => {
    onDirtyChange(isDirty);
  }, [isDirty, onDirtyChange]);

  const onSubmit = async (data: FCECFormValues) => {
    // Combine WhatsApp and Line ID back together for the backend
    const combinedContact = `${data.nomorWhatsApp} / ${data.idLine}`;
    
    const finalData = {
      ...data,
      nomorWhatsApp: combinedContact,
    };
    
    console.log("Submit FCEC Form:", finalData);

    // Panggil helper fetch dengan nama lomba "FCEC"
    const response = await submitLomba("FCEC", finalData as any);

    if (response.success) {
      sessionStorage.setItem("registrasi-success", "fcec");
      // route pindah ke halaman success fcec
      router.push("/registrasi-lomba/fcec/success");
    } else {
      toast.error(response.message);
    }
  };

  const pilihanSubtema = [
    "Inovasi Infrastruktur Tangguh Bencana Hidrometeorologi dan Geologi",
    "Rekayasa Berbasis Alam (Nature Based-Solution) dalam Penanggulangan Bencana",
    "Inovasi Penyediaan Air Bersih pada Kondisi Darurat Bencana",
  ];

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      {/* HEADER FORM */}
      <div className="flex flex-col gap-3 mb-2">
        <Text as="h1" size="3xl">
          Registration Form
        </Text>
        <Text as="h2" size="lg" strokeWidth="1px">
          Future Civil Engineer Challenge 2026
        </Text>
      </div>

      {/* --- IDENTITAS --- */}
      <div className="flex flex-col gap-4">
        <h3 className="font-publicas font-bold text-[#262626] text-lg uppercase tracking-wide">
          IDENTITAS
        </h3>
        <InputField
          label="Nama Tim"
          required
          placeholder="Masukkan nama tim"
          error={errors.namaTim?.message}
          {...register("namaTim", { required: "Nama Tim wajib diisi" })}
        />
        <InputField
          label="Asal Sekolah"
          required
          placeholder="Masukkan asal sekolah"
          error={errors.asalSekolah?.message}
          {...register("asalSekolah", { required: "Asal Sekolah wajib diisi" })}
        />
        <InputField
          label="Nama Ketua Tim"
          required
          placeholder="Masukkan nama ketua tim"
          error={errors.namaKetua?.message}
          {...register("namaKetua", { required: "Nama Ketua Tim wajib diisi" })}
        />
        <InputField
          label="Nama Anggota 1"
          required
          placeholder="Masukkan nama anggota 1"
          error={errors.namaAnggota1?.message}
          {...register("namaAnggota1", {
            required: "Nama Anggota 1 wajib diisi",
          })}
        />
        <InputField
          label="Nama Anggota 2"
          required
          placeholder="Masukkan nama anggota 2"
          error={errors.namaAnggota2?.message}
          {...register("namaAnggota2", {
            required: "Nama Anggota 2 wajib diisi",
          })}
        />
        <InputField
          label="Email Ketua Tim"
          type="email"
          required
          placeholder="Masukkan email ketua tim"
          error={errors.emailKetua?.message}
          {...register("emailKetua", {
            required: "Email wajib diisi",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Format email tidak valid",
            },
          })}
        />
        <InputField
          label="Nomor WhatsApp Ketua Tim"
          required
          placeholder="Contoh: 08123456789"
          error={errors.nomorWhatsApp?.message}
          {...register("nomorWhatsApp")}
        />
        <InputField
          label="ID Line Ketua Tim"
          required
          placeholder="Masukkan ID Line"
          error={errors.idLine?.message}
          {...register("idLine")}
        />
      </div>

      {/* --- DOKUMEN PERSYARATAN --- */}
      <div className="flex flex-col gap-4 pt-2">
        <h3 className="font-publicas font-bold text-[#262626] text-lg uppercase tracking-wide">
          DOKUMEN PERSYARATAN
        </h3>

        <Controller
          name="ktpFile"
          control={control}
          rules={{ required: "File wajib diunggah" }}
          render={({ field }) => (
            <FileUploadField
              label="Kartu Identitas"
              required
              maxSizeMB={3}
              accept={fileAcceptPdf}
              description="Format penamaan file: Nama Tim_Kartu Identitas (.pdf)"
              value={field.value}
              onChange={field.onChange}
              error={errors.ktpFile?.message as string}
            />
          )}
        />

        <Controller
          name="pasFotoFile"
          control={control}
          rules={{ required: "File wajib diunggah" }}
          render={({ field }) => (
            <FileUploadField
              label="PAS Foto"
              required
              maxSizeMB={3}
              accept={fileAcceptPdf}
              description="Format penamaan file: Nama Tim_PAS Foto (.pdf)"
              value={field.value}
              onChange={field.onChange}
              error={errors.pasFotoFile?.message as string}
            />
          )}
        />

        <Controller
          name="orisinalitasFile"
          control={control}
          rules={{ required: "File wajib diunggah" }}
          render={({ field }) => (
            <FileUploadField
              label="Surat Pernyataan Orisinalitas"
              required
              maxSizeMB={3}
              accept={fileAcceptPdf}
              description="Format penamaan file: Nama Tim_Surat Pernyataan Orisinalitas (.pdf)"
              value={field.value}
              onChange={field.onChange}
              error={errors.orisinalitasFile?.message as string}
            />
          )}
        />

        <Controller
          name="siswaAktifFile"
          control={control}
          rules={{ required: "File wajib diunggah" }}
          render={({ field }) => (
            <FileUploadField
              label="Surat Pernyataan Siswa Aktif"
              required
              maxSizeMB={3}
              accept={fileAcceptPdf}
              description="Format penamaan file: Nama Tim_Surat Pernyataan Siswa Aktif (.pdf)"
              value={field.value}
              onChange={field.onChange}
              error={errors.siswaAktifFile?.message as string}
            />
          )}
        />

        <Controller
          name="twibbonFile"
          control={control}
          rules={{ required: "File wajib diunggah" }}
          render={({ field }) => (
            <FileUploadField
              label="Bukti Posting Twibbon"
              required
              maxSizeMB={3}
              accept={fileAcceptPdf}
              description="Format penamaan file: Nama Tim_Bukti Posting Twibbon (.pdf)"
              value={field.value}
              onChange={field.onChange}
              error={errors.twibbonFile?.message as string}
            />
          )}
        />

       
      </div>

      {/* --- PENGUMPULAN ABSTRAK --- */}
      <div className="flex flex-col gap-4 pt-2">
        <h3 className="font-publicas font-bold text-[#262626] text-lg uppercase tracking-wide">
          PENGUMPULAN ABSTRAK
        </h3>

        <InputField
          label="Judul Abstrak"
          required
          placeholder="Masukkan judul abstrak"
          error={errors.judulAbstrak?.message}
          {...register("judulAbstrak", {
            required: "Judul abstrak wajib diisi",
          })}
        />

        <Controller
          name="subtema"
          control={control}
          rules={{ required: "Pilihan subtema wajib dipilih" }}
          render={({ field }) => (
            <DropdownField
              label="Pilihan Subtema"
              required
              options={pilihanSubtema}
              value={field.value}
              onChange={field.onChange}
              error={errors.subtema?.message}
            />
          )}
        />

        <Controller
          name="abstrakFile"
          control={control}
          rules={{ required: "File wajib diunggah" }}
          render={({ field }) => (
            <FileUploadField
              label="Unggah Abstrak"
              required
              maxSizeMB={3}
              accept={fileAcceptPdf}
              description="Format penamaan file: Nama Tim_File Abstrak (.pdf)"
              value={field.value}
              onChange={field.onChange}
              error={errors.abstrakFile?.message as string}
            />
          )}
        />
      </div>

      {/* --- SUBMIT BUTTON --- */}


      <div className="flex justify-center pt-8">
        <Button
          type="submit"
          isLoading={isSubmitting || isUploading}
          className="w-1/2"
        >
          Submit
        </Button>
      </div>
    </FormContainer>
  );
}
