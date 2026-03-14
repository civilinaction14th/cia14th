import React from "react";
import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";
import Text from "@/src/modules/register-lomba/components/elements/Text";
import Button from "@/src/modules/register-lomba/components/form/Button";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#F3E6CF] flex items-center justify-center p-4">
      <div className="bg-white max-w-xl w-full rounded-3xl p-8 border-2 border-black flex flex-col items-center justify-center shadow-[4px_4px_0px_#000]">
        <FiCheckCircle className="text-emerald-500 w-24 h-24 mb-6" />

        <Text
          as="h1"
          size="3xl"
          textShadow="none"
          strokeWidth="0px"
          className="text-center text-black mb-2"
        >
          Pendaftaran Berhasil!
        </Text>

        <p className="text-gray-600 text-center font-poppins mb-8 leading-relaxed">
          Terima kasih telah mendaftar di Civil Innovation Challenge 14. Data
          tim Anda beserta berkas persyaratan telah sukses kami terima. Silakan
          menunggu informasi lebih lanjut melalui email atau pantau terus sosial
          media kami.
        </p>

        <div className="w-full flex flex-col gap-3">
          {/* Kalau nanti ada grup wa, bisa pasang di sini */}
          <Link href="/" className="w-full">
            <Button className="w-full">KEMBALI KE BERANDA</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
