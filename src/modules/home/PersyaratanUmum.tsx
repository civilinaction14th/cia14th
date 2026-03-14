import { Jeans } from "@/src/components/element/Jeans";
import Image from "next/image";
import DefaultLayout from "@/src/components/layouts/DefaultLayout";
import { BordirCard } from "@/src/components/element/BordirCard";

const content = [
  {
    title: "Civil Innovation Challenge",
    description:
      "Peserta merupakan mahasiswa aktif jenjang S1/D4/D3 yang berasal dari seluruh perguruan tinggi yang ada di Indonesia. Tim beranggotakan 3-4 orang dari perguruan tinggi yang sama dan diperbolehkan berasal dari program studi dan angkatan yang berbeda dengan minimal 1 anggota yang berasal dari program studi Teknik Sipil.",
  },
  {
    title: "Sustainable Bridge Competition",
    description:
      "Kompetisi ini terbuka bagi mahasiswa aktif jenjang D3/D4/S1 dari Perguruan Tinggi Negeri atau Swasta di Indonesia, dengan setiap tim minimal beranggotakan satu mahasiswa Program Studi Teknik Sipil dan/atau peserta lain berasal dari program studi yang berkaitan dengan perancangan jembatan.",
  },
  {
    title: "Future Civil Engineer Challenge",
    description:
      "Setiap tim beranggotakan 2-3 peserta didik aktif SMA/SMK/MA dan/atau sederajat dan berasal dari sekolah yang sama.",
  },
  {
    title: "Innovation Tender Competition",
    description: "Lorem Ipsum",
  },
];

export default function PersyaratanUmum() {
  return (
    <section className="relative pt-10 md:pt-20 overflow-x-clip overflow-y-visible">
      <Jeans />
      <Image
        src="/home/persyaratan/bintang.webp"
        alt="Bintang"
        width={1237}
        height={1237}
        className="absolute top-0 -left-10 w-[35%] md:w-[20%] h-auto object-contain pointer-events-none"
        style={{ transform: "translate(-25%, -20%)" }}
        loading="lazy"
        data-aos="fade-down-right"
        data-aos-duration="1000"
      />

      <Image
        src="/home/persyaratan/batik-plus.webp"
        alt="Batik"
        width={2766}
        height={2766}
        className="absolute top-20 -left-20 w-[50%] md:w-[40%] h-auto object-contain pointer-events-none"
        style={{ transform: "translate(-10%, 45%)" }}
        loading="lazy"
        data-aos="fade-right"
        data-aos-delay="200"
        data-aos-duration="1200"
      />

      <DefaultLayout>
        <div className="relative w-[90%] md:w-[85%] lg:w-[75%] z-12 mx-auto mt-10 md:mt-0">
          <h2
            className="text-2xl md:text-4xl z-13 lg:text-5xl font-bold font-poppins drop-shadow-md text-[#8D2D2D] text-center relative z-10 -mb-6"
            style={{ WebkitTextStroke: "2px #F2A23A" }}
            data-aos="fade-up"
          >
            Persyaratan Umum
          </h2>

          <Image
            src="/home/persyaratan/holder-dompet.webp"
            alt="Holder dompet"
            width={177}
            height={1054}
            className="absolute -left-4 md:-left-8 top-16 h-[60%] md:h-[40%] w-auto z-[-1]"
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
                className="text-justify mb-4 last:mb-0"
                data-aos="fade-up"
                data-aos-delay={400 + index * 150}
              >
                <h3 className="font-bold text-lg md:text-2xl font-publicas whitespace-nowrap mb-1">
                  {item.title}
                </h3>
                <p className="text-sm md:text-lg lg:text-xl line-clamp-3 md:line-clamp-none font-normal leading-relaxed md:leading-normal">
                  {item.description}
                </p>
              </div>
            ))}
          </BordirCard>
        </div>
      </DefaultLayout>
    </section>
  );
}
