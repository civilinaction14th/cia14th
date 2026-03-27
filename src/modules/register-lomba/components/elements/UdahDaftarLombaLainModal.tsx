"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Modal from "@/src/components/element/Modal";

interface UdahDaftarLombaLainModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UdahDaftarLombaLainModal: React.FC<UdahDaftarLombaLainModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Oops, Kamu Sudah Terdaftar!"
      description="Setiap peserta hanya diperbolehkan mendaftar satu cabang lomba dalam rangkaian Civil in Action 14th. Kamu sudah terdaftar di cabang lomba lain sebelumnya."
      confirmText="Ke Dashboard"
      cancelText="Tutup"
      onConfirm={() => {
        router.push("/dashboard");
        onClose();
      }}
    />
  );
};
