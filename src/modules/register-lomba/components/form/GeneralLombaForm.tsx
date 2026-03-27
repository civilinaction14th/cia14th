"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { generalValidationSchema, fileAcceptPdf } from "../../helper/validation";
import InputField from "./InputField";
import FileUploadField from "./FileUploadField";
import Button from "./Button";
import FormContainer from "./FormContainer";
import Text from "../elements/Text";
import { useRegisterLomba } from "@/src/utils/hooks/useRegisterLomba";
import { useRouter } from "next/navigation";

interface GeneralFormValues {
  asalUniversitas: string;
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

export default function GeneralLombaForm({
  lomba,
  onDirtyChange,
}: {
  lomba: string;
  onDirtyChange: (isDirty: boolean) => void;
}) {
  const router = useRouter();
  const lombaTitle =
    LOMBA_MAP[lomba?.toLowerCase()] || "Civil Innovation Challenge 2026";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<GeneralFormValues>({
    defaultValues: {
      asalUniversitas: "",
      namaTim: "",
      namaKetua: "",
      emailKetua: "",
      dosenNama: "",
      dosenNip: "",
      dosenTelepon: "",
      dosenEmail: "",
      biodataFile: null,
      ktmFile: null,
      twibbonFile: null,
      instagramFile: null,
      pembayaranFile: null,
    },
    resolver: zodResolver(generalValidationSchema),
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

  const onSubmit = async (data: GeneralFormValues) => {
    console.log("Submit General Form for", lomba, ":", data);

    // Panggil helper fetch dengan nama lombanya (CIC/SBC/ITC)
    const response = await submitLomba(lomba, data);

    if (response.success) {
      sessionStorage.setItem("registrasi-success", lomba);
      // route pindah ke halaman success per lomba
      router.push(`/registrasi-lomba/${lomba}/success`);
    } else {
      toast.error(response.message);
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
          label="Asal Universitas"
          required
          placeholder="Masukkan asal universitas"
          error={errors.asalUniversitas?.message}
          {...register("asalUniversitas", { required: "Asal Universitas wajib diisi" })}
        />
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
              maxSizeMB={3}
              accept={fileAcceptPdf}
              value={field.value}
              onChange={field.onChange}
              error={errors.biodataFile?.message as string}
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
              maxSizeMB={3}
              accept={fileAcceptPdf}
              value={field.value}
              onChange={field.onChange}
              error={errors.ktmFile?.message as string}
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
              maxSizeMB={3}
              accept={fileAcceptPdf}
              value={field.value}
              onChange={field.onChange}
              error={errors.twibbonFile?.message as string}
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
              maxSizeMB={3}
              accept={fileAcceptPdf}
              value={field.value}
              onChange={field.onChange}
              error={errors.instagramFile?.message as string}
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
              maxSizeMB={3}
              accept={fileAcceptPdf}
              value={field.value}
              onChange={field.onChange}
              error={errors.pembayaranFile?.message as string}
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
