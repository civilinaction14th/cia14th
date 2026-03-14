import { Jeans } from "@/src/components/element/Jeans";
import DefaultLayout from "@/src/components/layouts/DefaultLayout";
import Image from "next/image";

export default function TestimoniPemenang() {
  return (
    <section className="relative overflow-x-clip overflow-y-visible">
      <Jeans />
      <div className="absolute -top-40 md:-top-80 lg:-top-146 left-1/2 -translate-x-1/2 w-[104vw] pointer-events-none">
        <Image
          src="/home/testimoni/garis.webp"
          alt="Garis"
          width={4243}
          height={2275}
          className="w-full h-auto"
          loading="lazy"
        />
      </div>

      <Image
        src="/home/testimoni/fotosaku.webp"
        alt="Foto saku"
        width={4241}
        height={5642}
        className="absolute md:top-40 lg:-top-40 md:right-10 right-0 w-[40%] lg:w-[45%] z-20 h-auto object-contain pointer-events-none"
        style={{ transform: "translate(35%, -5%)" }}
        loading="lazy"
        data-aos="fade-left"
        data-aos-duration="1000"
      />

      <DefaultLayout className="relative items-start py-16 md:py-20">
        <div className="w-full md:w-[75%] lg:w-[70%]">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins mb-6 md:mb-8 text-white"
            style={{ WebkitTextStroke: "2px #F2A23A" }}
            data-aos="fade-up"
          >
            Testimoni
            <br />
            Pemenang
          </h2>

          <div className="flex flex-col items-center md:flex-row md:items-end gap-4">
            <div
              className="relative aspect-1274/1569 w-40 md:w-70 shrink-0"
              data-aos="zoom-in-up"
              data-aos-delay="200"
            >
              <Image
                src="/home/testimoni/orang.webp"
                alt="Gambar Orang"
                fill
                className="object-cover"
              />
            </div>

            <div
              className="flex flex-col"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="relative">
                <span
                  className="text-3xl md:text-5xl font-bold leading-none absolute -top-2 -left-4 md:-left-6"
                  style={{ color: "#F2A23A" }}
                >
                  &ldquo;
                </span>
                <p className="text-white text-base md:text-xl font-publicas text-justify pl-2">
                  menurut gue, CIA kmrn memberikan pengalaman yang berharga dan
                  kesan yang membekas. Jujur, ga ekspek sebenarnya akan banyak
                  banget ilmu yang didapet dari CIC. Dari sisi acaranya pun,
                  keliatan banget kalo CIA sangat well prepared makanya kerasa
                  megah dan panitianya ramah-ramah. Bener-bener sesuatu yang
                  akan gw ulang lagi.
                </p>
                <span
                  className="text-3xl md:text-5xl font-bold leading-none float-right -mt-2"
                  style={{ color: "#F2A23A" }}
                >
                  &rdquo;
                </span>
              </div>

              <div className="mt-4 md:mt-6 text-white text-base md:text-xl font-normal">
                <p>- Abang Adit</p>
                <p className="font-bold mt-1">Institut Teknologi Bandung</p>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </section>
  );
}
