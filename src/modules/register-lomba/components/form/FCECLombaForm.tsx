"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
  ktpFile: File | null;
  pasFotoFile: File | null;
  orisinalitasFile: File | null;
  siswaAktifFile: File | null;
  twibbonFile: File | null;
  pembayaranFile: File | null;
  judulAbstrak: string;
  subtema: string;
  abstrakFile: File | null;
}

export default function FCECLombaForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FCECFormValues>({
    defaultValues: {
      ktpFile: null,
      pasFotoFile: null,
      orisinalitasFile: null,
      siswaAktifFile: null,
      twibbonFile: null,
      pembayaranFile: null,
      abstrakFile: null,
    },
  });

  const {
    submitLomba,
    isLoading: isUploading,
    error: apiError,
    success,
  } = useRegisterLomba();

  const onSubmit = async (data: FCECFormValues) => {
    console.log("Submit FCEC Form:", data);

    // Panggil helper fetch dengan nama lomba "FCEC"
    const response = await submitLomba("FCEC", data);

    if (response.success) {
      // route pindah ke halaman success
      router.push("/registrasi-lomba/success");
    } else {
      alert(`Gagal: ${response.message}`);
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
          label="Nomor WhatsApp & ID Line Ketua Tim"
          required
          placeholder="Contoh: 08123456789 (Line: idline)"
          error={errors.nomorWhatsApp?.message}
          {...register("nomorWhatsApp", {
            required: "Nomor kontak wajib diisi",
          })}
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
              description="Format penamaan file: Nama Tim_Kartu Identitas (.pdf)"
              value={field.value}
              onChange={field.onChange}
              error={errors.ktpFile?.message}
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
              description="Format penamaan file: Nama Tim_PAS Foto (.pdf)"
              value={field.value}
              onChange={field.onChange}
              error={errors.pasFotoFile?.message}
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
              description="Format penamaan file: Nama Tim_Surat Pernyataan Orisinalitas (.pdf)"
              value={field.value}
              onChange={field.onChange}
              error={errors.orisinalitasFile?.message}
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
              description="Format penamaan file: Nama Tim_Surat Pernyataan Siswa Aktif (.pdf)"
              value={field.value}
              onChange={field.onChange}
              error={errors.siswaAktifFile?.message}
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
              description="Format penamaan file: Nama Tim_Bukti Posting Twibbon (.pdf)"
              value={field.value}
              onChange={field.onChange}
              error={errors.twibbonFile?.message}
            />
          )}
        />

        <Controller
          name="pembayaranFile"
          control={control}
          rules={{ required: "File wajib diunggah" }}
          render={({ field }) => (
            <FileUploadField
              label="Bukti Pembayaran"
              required
              description="Format penamaan file: Nama Tim_Bukti Pembayaran (.pdf)"
              value={field.value}
              onChange={field.onChange}
              error={errors.pembayaranFile?.message}
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
              description="Format penamaan file: Nama Tim_File Abstrak (.pdf)"
              value={field.value}
              onChange={field.onChange}
              error={errors.abstrakFile?.message}
            />
          )}
        />
      </div>

      {/* --- SUBMIT BUTTON --- */}
      {apiError && (
        <p className="text-red-600 text-center font-bold text-sm bg-red-100 p-2 rounded-md">
          {apiError}
        </p>
      )}

      {success && (
        <p className="text-green-600 text-center font-bold text-sm bg-green-100 p-2 rounded-md">
          Pendaftaran berhasil!
        </p>
      )}

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
