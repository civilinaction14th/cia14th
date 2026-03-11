import { Jeans } from "@/src/element/Jeans";
import DefaultLayout from "@/src/element/DefaultLayout";
import Image from "next/image";
import { BordirCard } from "@/src/element/BordirCard";
import { BordirLabel } from "@/src/element/BordirLabel";

const contacts = [
  {
    cabang: "CIC",
    detail: [
      { name: "Prabowo Subianto", whatsapp: "081346158069", line: "naiwaaa" },
      {
        name: "Gibran Rakabuming Raka",
        whatsapp: "081346158069",
        line: "naiwaaa",
      },
    ],
  },
  {
    cabang: "SBC",
    detail: [
      { name: "Prabowo Subianto", whatsapp: "081346158069", line: "naiwaaa" },
      {
        name: "Gibran Rakabuming Raka",
        whatsapp: "081346158069",
        line: "naiwaaa",
      },
    ],
  },
  {
    cabang: "FCEC",
    detail: [
      { name: "Prabowo Subianto", whatsapp: "081346158069", line: "naiwaaa" },
      {
        name: "Gibran Rakabuming Raka",
        whatsapp: "081346158069",
        line: "naiwaaa",
      },
    ],
  },
  {
    cabang: "ITC",
    detail: [
      { name: "Prabowo Subianto", whatsapp: "081346158069", line: "naiwaaa" },
      {
        name: "Gibran Rakabuming Raka",
        whatsapp: "081346158069",
        line: "naiwaaa",
      },
    ],
  },
];

export default function InformasiLanjut() {
  return (
    <section className="relative overflow-x-clip overflow-y-visible">
      <Jeans />
      <Image
        src="/home/informasi-lanjut/batik-infinite.webp"
        alt="Batik Infinite"
        width={1524}
        height={1670}
        className="absolute bottom-20 -right-12 md:-right-24 w-[35%] md:w-[20%] z-2"
        loading="lazy"
        data-aos="fade-left"
        data-aos-duration="1000"
      />
      <Image
        src="/home/informasi-lanjut/polygon.webp"
        alt="Polygon"
        width={1447}
        height={1352}
        className="absolute top-0 -right-12 md:-right-24 w-[35%] md:w-[20%] z-3"
        loading="lazy"
        data-aos="fade-down-left"
        data-aos-delay="200"
      />
      <div className="absolute -top-40 md:-top-80 left-1/2 -translate-x-1/2 w-[104vw] z-1 pointer-events-none">
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
        <div className="relative w-full md:w-[70%] lg:w-[50%] z-12 mx-auto">
          <h2
            className="text-2xl md:text-4xl lg:text-5xl z-13 font-bold font-poppins drop-shadow-md text-white text-center relative z-10 -mb-6"
            style={{ WebkitTextStroke: "2px #F2A23A" }}
            data-aos="fade-up"
          >
            Informasi Lanjut
          </h2>

          <Image
            src="/home/informasi-lanjut/holder-dompet.webp"
            alt="Holder Dompet"
            width={668}
            height={218}
            className="absolute -bottom-8 md:-bottom-8 left-12 md:left-10 w-[35%] md:w-[20%] h-auto z-[-1]"
            style={{ transform: "translate(-10%, 10%)" }}
            loading="lazy"
            data-aos="zoom-in-up"
            data-aos-delay="300"
          />

          <BordirCard
            bg="bg-linear-to-b from-[#1F4B66] to-[#0E2A3A]"
            bordirColor="#BAA687"
            bordirWidth="thick"
            data-aos="zoom-in-up"
            data-aos-delay="300"
          >
            {contacts.map((item, index) => (
              <div
                key={item.cabang}
                className="w-full flex flex-col items-center gap-4"
                data-aos="fade-up"
                data-aos-delay={400 + index * 150}
              >
                <BordirLabel
                  bg="bg-[#B0704C]"
                  bordirColor="#F3E6CF"
                  bordirWidth="default"
                  className="text-white font-bold font-poppins text-base md:text-lg shadow-md"
                >
                  {item.cabang}
                </BordirLabel>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-8 md:gap-x-12 w-full mt-4">
                  {item.detail.map((person) => (
                    <div key={person.name} className="text-white">
                      <p className="font-bold text-lg md:text-xl">
                        {person.name}
                      </p>
                      <p className="text-base font-normal mt-1">
                        <span className="inline-block w-24">WhatsApp</span>
                        <span className="mx-1">:</span>
                        {person.whatsapp}
                      </p>
                      <p className="text-base font-normal">
                        <span className="inline-block w-24">ID Line</span>
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
      </DefaultLayout>
      <div className="relative -mt-40 md:-mt-80 lg:-mt-160 left-1/2 -translate-x-1/2 w-[104vw] z-0 pointer-events-none">
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
