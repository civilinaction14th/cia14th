import Image from "next/image";
import DefaultLayout from "@/src/components/layouts/DefaultLayout";
import { BordirCard } from "@/src/components/element/BordirCard";

const content = [
  {
    title: "Civil Innovation Challenge",
    points: [
      "Peserta merupakan mahasiswa aktif jenjang S1/D4/D3 yang berasal dari seluruh perguruan tinggi yang ada di Indonesia.",
      "Tim beranggotakan 3-4 orang dari perguruan tinggi yang sama dan diperbolehkan berasal dari program studi dan angkatan yang berbeda dengan minimal 1 anggota yang berasal dari program studi Teknik Sipil.",
    ],
  },
  {
    title: "Sustainable Bridge Competition",
    points: [
      "Peserta merupakan mahasiswa aktif jenjang S1/D4/D3 yang berasal dari seluruh perguruan tinggi yang ada di Indonesia.",
      "Masing-masing tim diperbolehkan berasal dari program studi dan angkatan yang berbeda dengan minimal 1 (satu) anggota yang berasal dari program studi Teknik Sipil atau prodi yang berkaitan dengan Bridge Modelling.",
      "Setiap anggota hanya boleh terdaftar dalam 1 tim.",
      "Masing-masing perguruan Tinggi diperbolehkan mengirimkan lebih dari 1 (satu) tim sebagai delegasi resmi.",
      "Bagi tim yang lolos ke babak final, diperbolehkan bawa tim support 0-3 orang (opsional) dengan syarat tim support wajib dari perguruan tinggi yang sama.",
    ],
  },
  {
    title: "Future Civil Engineer Challenge",
    points: [
      "Peserta merupakan siswa/siswi aktif SMA/SMK/MA dan/atau sederajat sampai dengan Agustus 2026.",
      "Setiap sekolah diperkenankan mengirim lebih dari 1 tim.",
      "Setiap tim beranggotakan 2-3 siswa yang berasal dari sekolah yang sama, dengan 1 (satu) siswa sebagai ketua tim.",
      "Anggota tim diperbolehkan berasal dari tahun angkatan yang berbeda.",
      "Setiap anggota hanya boleh terdaftar dalam 1 tim.",
    ],
  },
  {
    title: "Innovation Tender Competition",
    points: [
      "Peserta merupakan mahasiswa aktif jenjang S1/D3/D4 dari program studi Teknik Sipil atau rumpun program studi terkait bidang Teknik Sipil.",
      "Setiap tim terdiri dari maksimal 4 (empat) orang anggota, yang dipimpin oleh 1 (satu) orang Ketua Tim. Anggota tim diperbolehkan berasal dari angkatan yang berbeda.",
      "Setiap mahasiswa hanya diperkenankan terdaftar dalam 1 (satu) tim. Pendaftaran lintas tim atau ganda akan mengakibatkan diskualifikasi.",
      "Masing-masing perguruan Tinggi diperbolehkan mengirimkan lebih dari 1 (satu) tim sebagai delegasi resmi.",
      "Setiap tim wajib didampingi oleh 1 (satu) orang Dosen Pembimbing dari instansi yang sama. Dosen Pembimbing diperkenankan membimbing lebih dari 1 (satu) tim dalam kompetisi ini.",
    ],
  },
];

export default function PersyaratanUmum() {
  return (
    <section className="relative overflow-visible pt-10 md:pt-20 [clip-path:inset(-40rem_0_0_0)] isolate">
      {/* Texture overlay */}
      <div
        className="absolute inset-0 bg-cover bg-start z-10 pointer-events-none"
        style={{
          backgroundImage: "url('/images/TextureBg.png')",
          opacity: 0.48,
          mixBlendMode: "soft-light",
          height: "150%",
        }}
      />
      <Image
        src="/home/persyaratan/bintang.webp"
        alt="Bintang"
        width={1237}
        height={1237}
        className="pointer-events-none absolute -left-10 top-0 h-auto w-[48%] object-contain sm:w-[35%] md:w-[20%]"
        style={{ transform: "translate(-30%, -18%)" }}
        loading="lazy"
        data-aos="fade-down-right"
        data-aos-duration="1000"
      />
      <Image
        src="/home/persyaratan/batik-plus.webp"
        alt="Batik"
        width={2766}
        height={2766}
        className="pointer-events-none absolute -right-52 -top-28 h-auto w-[58%] object-contain sm:-right-60 sm:-top-40 sm:w-[50%] md:w-[40%]"
        style={{ transform: "translate(-6%, 45%)" }}
        loading="lazy"
        data-aos="fade-right"
        data-aos-delay="200"
        data-aos-duration="1200"
      />

      <DefaultLayout>
        <div className="relative z-12 mx-auto mt-10 w-[92%] md:mt-0 md:w-[85%] lg:w-[75%]">
          <h2
            className="relative z-12 -mb-4 text-center font-poppins text-2xl font-bold text-[#8D2D2D] drop-shadow-md md:-mb-6 md:text-4xl lg:text-5xl"
            style={{ WebkitTextStroke: "1.5px #F2A23A" }}
            data-aos="fade-up"
          >
            Persyaratan Umum
          </h2>

          <Image
            src="/home/persyaratan/holder-dompet.webp"
            alt="Holder dompet"
            width={177}
            height={1054}
            className="absolute -left-4 top-16 z-[-1] hidden h-[40%] w-auto md:-left-8 md:block"
            data-aos="zoom-in-up"
            data-aos-delay="300"
          />

          <BordirCard
            bg="bg-[#F3E6CF]"
            bordirColor="#F2A23A"
            bordirWidth="thick"
            data-aos="zoom-in-up"
            data-aos-delay="300"
          >
            {content.map((item, index) => (
              <div
                key={index}
                className="mb-4 text-left last:mb-0 md:text-justify"
                data-aos="fade-up"
                data-aos-delay={400 + index * 150}
              >
                <h3 className="mb-1 font-publicas text-lg font-bold leading-snug md:text-2xl ml-2 md:ml-0">
                  {item.title}
                </h3>
                <ul className="list-disc space-y-1 pl-5 text-sm font-normal leading-relaxed marker:text-[#8D2D2D] md:space-y-1.5 md:text-lg md:leading-normal lg:text-xl">
                  {item.points.map((point, pointIndex) => (
                    <li key={`${item.title}-${pointIndex}`}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </BordirCard>
        </div>
      </DefaultLayout>
    </section>
  );
}
