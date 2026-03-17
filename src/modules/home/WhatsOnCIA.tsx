import { BordirCardCIA } from "@/src/components/element/BordirCardCIA";
import Image from "next/image";
import { Jeans } from "@/src/components/element/Jeans";

export default function WhatsOnCIA() {
  const competitions = [
    {
      title: "Civil Innovation Challenge",
      description:
        "Civil Innovation Challenge (CIC) merupakan salah satu rangkaian kegiatan Civil In Action yang berfokus pada pengembangan inovasi di bidang teknik sipil dengan mengajak mahasiswa dari seluruh Indonesia, khususnya program studi Teknik Sipil, untuk menuangkan gagasan kreatif dan solutif terkait permasalahan infrastruktur dan pembangunan berkelanjutan. Pada tahun ini, CIC mengusung tema “Inovasi Metode Perbaikan dan Penguatan Tanah Berbasis Rekayasa Geoteknik sebagai Sistem Pendukung Infrastruktur Nusantara yang Tangguh”.",
      logo: "/home/whatsoncia/logo-cic.webp",
      bg: "#F0B040",
      imagePosition: "left" as const,
      rotate: "-1deg",
    },
    {
      title: "Sustainable Bridge Competition",
      description:
        "Sustainable Bridge Competition (SBC) merupakan lomba rancang jembatan tingkat nasional yang bertujuan menjadi wadah pengembangan potensi mahasiswa Teknik Sipil dalam berinovasi merancang jembatan yang mendukung pembangunan berkelanjutan serta memberikan gambaran lebih luas mengenai bidang Teknik Sipil. Pada tahun ini, SBC mengusung tema “Mengukir Masa Depan Nusantara Melalui Jembatan Sebagai Penaut Harapan Bangsa”.",
      logo: "/home/whatsoncia/logo-sbc.webp",
      bg: "#E05020",
      imagePosition: "right" as const,
      rotate: "0deg",
    },
    {
      title: "Future Civil Engineer Challenge",
      description:
        "Future Civil Engineer Challenge (FCEC) merupakan salah satu rangkaian kompetisi dalam 14th Civil in Action yang menghadirkan lomba karya tulis ilmiah tingkat nasional bagi pelajar SMA/SMK/MA sederajat. Mengusung tema “Infrastruktur Tangguh Berdaya: Inovasi Generasi Muda untuk Resiliensi terhadap Bencana”, FCEC 2026 mengajak generasi muda untuk merancang gagasan inovatif terkait infrastruktur yang tangguh, adaptif, dan berkelanjutan.",
      logo: "/home/whatsoncia/logo-fcec.webp",
      bg: "#0070B0",
      imagePosition: "left" as const,
      rotate: "-1deg",
    },
    {
      title: "Innovative Tender Competition",
      description:
        "Innovative Tender Competition (ITC) merupakan lomba tender konstruksi tingkat nasional bagi mahasiswa aktif D3, D4, dan S1 Teknik Sipil di seluruh Indonesia yang bertujuan mengasah kemampuan dalam menyusun dokumen penawaran, estimasi biaya, serta metode pelaksanaan konstruksi yang inovatif, efektif, dan efisien. Pada tahun ini, ITC mengusung tema “Strategi Pelaksanaan Infrastruktur yang Tangguh dan Berkelanjutan dalam Pembangunan Nusantara”.",
      logo: "/home/whatsoncia/logo-itc.webp",
      bg: "#00A86B",
      imagePosition: "right" as const,
      rotate: "0deg",
    },
  ];

  return (
    <section className="relative overflow-x-clip overflow-y-visible isolate">
      <Jeans />

      <div className="relative w-full pb-10 md:pb-20">
        {/* Flanel & Resleting */}
        <div className="absolute top-0 md:top-20 left-1/2 -translate-x-1/2 w-[200%] md:w-full min-w-[750px] h-auto z-10 pointer-events-none">
          <img
            src="/home/whatsoncia/resletingv3.webp"
            alt="resleting"
            className="w-full h-auto"
            style={{ mixBlendMode: "soft-light" }}
          />
        </div>

        <div className="relative pt-45 md:pt-85 z-[99]">
          <Image
            src="/home/whatsoncia/whatsOnCIA.webp"
            alt="whatsOnCIA"
            width={3000}
            height={1000}
            className="w-full max-w-[90vw] md:max-w-[80vw] mx-auto drop-shadow-2xl"
          />
        </div>
      </div>

      <div className="relative pb-40 min-h-screen z-[100] mt-4 md:mt-0">
        <div className="flex flex-col gap-2">
          {competitions.map((comp, index) => (
            <BordirCardCIA key={index} {...comp} />
          ))}
        </div>
      </div>
    </section>
  );
}
