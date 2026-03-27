import DefaultLayout from "@/src/components/layouts/DefaultLayout";
import Image from "next/image";
import { BordirCard } from "@/src/components/element/BordirCard";
import { BordirLabel } from "@/src/components/element/BordirLabel";

const contacts = [
  {
    cabang: "CIC",
    detail: [
      {
        name: "Kautsaura Raisa Mulia",
        whatsapp: "085727119216",
        line: "kautsaura",
      },
      {
        name: "Anisa Salsabila",
        whatsapp: "081918786065",
        line: "ann.archieve",
      },
    ],
  },
  {
    cabang: "SBC",
    detail: [
      {
        name: "M. Chairul Nusantara",
        whatsapp: "081311783896",
        line: "@24042006_",
      },
      {
        name: "Zafira Wanashita",
        whatsapp: "082324568500",
        line: "zafiraa28",
      },
    ],
  },
  {
    cabang: "FCEC",
    detail: [
      { name: "Denting", whatsapp: "08813997545", line: "dentingpc" },
      {
        name: "Ardina",
        whatsapp: "087753687396",
        line: "ardinacahaya",
      },
    ],
  },
  {
    cabang: "ITC",
    detail: [
      {
        name: "Nabila Octavia Savitri",
        whatsapp: "0895392347946",
        line: "scbyllz",
      },
      {
        name: "Tiwi Destarani Putri",
        whatsapp: "081528224183",
        line: "tiiwayy",
      },
    ],
  },
];

const labelBgByCabang: Record<string, string> = {
  CIC: "bg-[#F0B040]",
  SBC: "bg-[#E05020]",
  FCEC: "bg-[#0070B0]",
  ITC: "bg-[#00A86B]",
};

export default function InformasiLanjut() {
  return (
    <section
      id="informasi-lanjut"
      className="relative overflow-hidden [clip-path:inset(-40rem_0_0_0)] isolate"
    >
      {/* Texture overlay */}
      <div
        className="absolute inset-0 bg-cover bg-start z-10 pointer-events-none"
        style={{
          backgroundImage: "url('/images/TextureBg.webp')",
          opacity: 0.48,
          mixBlendMode: "soft-light",
          height: "110%",
        }}
      />

      <Image
        src="/home/informasi-lanjut/batik-infinite.webp"
        alt="Batik Infinite"
        width={1524}
        height={1670}
        className="absolute bottom-16 -right-10 z-2 w-[45%] md:bottom-20 md:-right-24 md:w-[20%]"
        loading="lazy"
        data-aos="fade-left"
        data-aos-duration="1000"
      />
      <Image
        src="/home/informasi-lanjut/polygon.webp"
        alt="Polygon"
        width={1447}
        height={1352}
        className="absolute top-0 -right-10 z-3 w-[45%] md:-right-24 md:w-[20%]"
        loading="lazy"
        data-aos="fade-down-left"
        data-aos-delay="200"
      />
      <div className="absolute top-0 md:-top-80 left-1/2 -translate-x-1/2 w-[104vw] z-1 pointer-events-none">
        <Image
          src="/home/informasi-lanjut/garis.webp"
          alt="Garis"
          width={6690}
          height={5104}
          className="w-full h-auto"
          loading="lazy"
        />
      </div>

      <DefaultLayout>
        <div className="relative z-12 mx-auto w-[94%] md:w-[70%] lg:w-[50%]">
          <h2
            className="relative z-12 -mb-4 text-center font-poppins text-2xl font-bold text-white drop-shadow-md md:-mb-6 md:text-4xl lg:text-5xl"
            style={{ WebkitTextStroke: "1.5px #F2A23A" }}
            data-aos="fade-up"
          >
            Informasi Lanjut
          </h2>

          <div data-aos="fade-up" data-aos-duration="1000">
            <Image
              src="/home/informasi-lanjut/holder-dompet.webp"
              alt="Holder Dompet"
              width={668}
              height={218}
              className="absolute -bottom-8 left-10 z-[-1] hidden h-auto w-[20%] md:block"
              style={{ transform: "translate(-10%, 10%)" }}
              loading="lazy"
            />

            <BordirCard
              bg="bg-linear-to-b from-[#1F4B66] to-[#0E2A3A]"
              bordirColor="#BAA687"
              bordirWidth="thick"
              className="mx-auto w-full"
            >
              {contacts.map((item, index) => (
                <div
                  key={item.cabang}
                  className="mb-8 flex w-full flex-col items-center gap-4 px-1 last:mb-0 sm:px-2 md:px-0"
                  data-aos="fade-up"
                  data-aos-delay={ index * 100 }
                >
                  <BordirLabel
                    bg={labelBgByCabang[item.cabang] ?? "bg-[#B0704C]"}
                    bordirColor="#F3E6CF"
                    bordirWidth="default"
                    className="text-white font-bold font-poppins text-base md:text-lg shadow-md"
                  >
                    {item.cabang}
                  </BordirLabel>

                  <div className="mt-0 grid w-full grid-cols-1 gap-y-6 px-2 sm:gap-x-8 sm:px-3 md:grid-cols-2 md:gap-x-12 md:gap-y-8 md:px-0">
                    {item.detail.map((person) => (
                      <div
                        key={`${item.cabang}-${person.name}`}
                        className="pl-1 text-white md:pl-0 text-center md:text-left"
                      >
                        <p className="text-base font-bold leading-snug md:text-xl">
                          {person.name}
                        </p>
                        <p className="mt-1 text-sm font-normal md:text-base">
                          <span className="inline-block w-20 md:w-24">
                            WhatsApp
                          </span>
                          <span className="mx-1">:</span>
                          {person.whatsapp}
                        </p>
                        <p className="text-sm font-normal md:text-base">
                          <span className="inline-block w-20 md:w-24">
                            ID Line
                          </span>
                          <span className="mx-1">:</span>
                          {person.line}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </BordirCard>
          </div>
        </div>
      </DefaultLayout>
      <div className="relative left-1/2 z-0 -mt-24 w-[104vw] -translate-x-1/2 pointer-events-none md:-mt-80 lg:-mt-160">
        <Image
          src="/home/informasi-lanjut/kota.webp"
          alt="Kota"
          width={5685}
          height={3165}
          className="w-full h-auto"
          loading="lazy"
        />
      </div>
    </section>
  );
}
