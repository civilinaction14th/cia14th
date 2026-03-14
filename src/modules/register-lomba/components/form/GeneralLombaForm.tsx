"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import InputField from "./InputField";
import FileUploadField from "./FileUploadField";
import Button from "./Button";
import FormContainer from "./FormContainer";
import Text from "../elements/Text";
import { useRegisterLomba } from "@/src/utils/hooks/useRegisterLomba";

import { useRouter } from "next/navigation";

interface GeneralFormValues {
  namaTim: string;
  namaKetua: string;
  emailKetua: string;
  dosenNama: string;
  dosenNip: string;
  dosenTelepon: string;
  dosenEmail: string;
  biodataFile: File | null;
  ktmFile: File | null;
  twibbonFile: File | null;
  instagramFile: File | null;
  pembayaranFile: File | null;
}

const LOMBA_MAP: Record<string, string> = {
  cic: "Civil Innovation Challenge 2026",
  sbc: "Sustainable Bridge Competition 2026",
  itc: "Innovation Technology Competition 2026",
};

export default function GeneralLombaForm({ lomba }: { lomba: string }) {
  const router = useRouter();
  const lombaTitle =
    LOMBA_MAP[lomba?.toLowerCase()] || "Civil Innovation Challenge 2026";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<GeneralFormValues>({
    defaultValues: {
      biodataFile: null,
      ktmFile: null,
      twibbonFile: null,
      instagramFile: null,
      pembayaranFile: null,
    },
  });

  const {
    submitLomba,
    isLoading: isUploading,
    error: apiError,
    success,
  } = useRegisterLomba();

  const onSubmit = async (data: GeneralFormValues) => {
    console.log("Submit General Form for", lomba, ":", data);

    // Panggil helper fetch dengan nama lombanya (CIC/SBC/ITC)
    const response = await submitLomba(lomba, data);

    if (response.success) {
      // route pindah ke halaman success
      router.push("/registrasi-lomba/success");
    } else {
      alert(`Gagal: ${response.message}`);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      {/* HEADER FORM */}
      <div className="flex flex-col gap-3 mb-2">
        <Text as="h1" size="3xl">
          Registration Form
        </Text>
        <Text as="h2" size="lg" strokeWidth="1px">
          {lombaTitle}
        </Text>
      </div>

      {/* --- DATA KELOMPOK --- */}
      <div className="flex flex-col gap-4">
        <h3 className="font-publicas font-bold text-[#262626] text-lg uppercase tracking-wide">
          DATA KELOMPOK
        </h3>
        <InputField
          label="Nama Tim"
          required
          placeholder="Masukkan nama tim"
          error={errors.namaTim?.message}
          {...register("namaTim", { required: "Nama Tim wajib diisi" })}
        />
        <InputField
          label="Nama Ketua Tim"
          required
          placeholder="Masukkan nama ketua tim"
          error={errors.namaKetua?.message}
          {...register("namaKetua", { required: "Nama Ketua Tim wajib diisi" })}
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
      </div>

      {/* --- DATA DOSEN PEMBIMBING --- */}
      <div className="flex flex-col gap-4 pt-2">
        <h3 className="font-publicas font-bold text-[#262626] text-lg uppercase tracking-wide">
          DATA DOSEN PEMBIMBING
        </h3>
        <InputField
          label="Nama"
          required
          placeholder="Masukkan nama dosen"
          error={errors.dosenNama?.message}
          {...register("dosenNama", { required: "Nama Dosen wajib diisi" })}
        />
        <InputField
          label="NIP"
          required
          placeholder="Masukkan NIP dosen"
          error={errors.dosenNip?.message}
          {...register("dosenNip", { required: "NIP Dosen wajib diisi" })}
        />
        <InputField
          label="Telepon"
          type="tel"
          required
          placeholder="Masukkan no telepon dosen"
          error={errors.dosenTelepon?.message}
          {...register("dosenTelepon", {
            required: "Telepon Dosen wajib diisi",
          })}
        />
        <InputField
          label="Email"
          type="email"
          required
          placeholder="Masukkan email dosen"
          error={errors.dosenEmail?.message}
          {...register("dosenEmail", {
            required: "Email Dosen wajib diisi",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Format email tidak valid",
            },
          })}
        />
      </div>

      {/* --- DOKUMEN PERSYARATAN --- */}
      <div className="flex flex-col gap-4 pt-2">
        <h3 className="font-publicas font-bold text-[#262626] text-lg uppercase tracking-wide">
          DOKUMEN PERSYARATAN
        </h3>

        <Controller
          name="biodataFile"
          control={control}
          rules={{ required: "File wajib diunggah" }}
          render={({ field }) => (
            <FileUploadField
              label="Biodata Tim"
              required
              value={field.value}
              onChange={field.onChange}
              error={errors.biodataFile?.message}
            />
          )}
        />

        <Controller
          name="ktmFile"
          control={control}
          rules={{ required: "File wajib diunggah" }}
          render={({ field }) => (
            <FileUploadField
              label="Kartu Tanda Mahasiswa (KTM)"
              required
              value={field.value}
              onChange={field.onChange}
              error={errors.ktmFile?.message}
            />
          )}
        />

        <Controller
          name="twibbonFile"
          control={control}
          rules={{ required: "File wajib diunggah" }}
          render={({ field }) => (
            <FileUploadField
              label="Bukti Twibbon"
              required
              value={field.value}
              onChange={field.onChange}
              error={errors.twibbonFile?.message}
            />
          )}
        />

        <Controller
          name="instagramFile"
          control={control}
          rules={{ required: "File wajib diunggah" }}
          render={({ field }) => (
            <FileUploadField
              label="Bukti Follow Instagram @civilinaction"
              required
              value={field.value}
              onChange={field.onChange}
              error={errors.instagramFile?.message}
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
              value={field.value}
              onChange={field.onChange}
              error={errors.pembayaranFile?.message}
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
