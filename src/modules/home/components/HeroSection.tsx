import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center md:justify-end h-screen pb-24 text-center px-4">
      {/* Center Emblem */}
      <div className="absolute top-38 md:left-1/2 md:-translate-x-1/2 md:top-12 ml-12 w-72 h-72 md:w-110 md:h-110 mb-0 z-1">
        <Image
          src="/images/Logo.webp"
          alt="Civil In Action Emblem"
          fill
          className="object-contain drop-shadow-2xl"
          priority
        />
      </div>

      {/* Title Image */}
      <div className="relative mb-0 mt-64 md:mt-0">
        <Image
          src="/images/CIA-title.png"
          alt="14th Civil In Action"
          width={1100}
          height={300}
          className="object-contain"
          priority
        />
      </div>

      {/* Subtitle */}
      <p className="text-white text-sm sm:text-lg md:text-2xl mb-4 font-bold tracking-wide font-[PublicaSansRound]">
        &quot;Kolaborasi Pembangunan Nusantara, Infrastruktur Tangguh
        Berdaya&quot;
      </p>

      {/* CTA Buttons */}
      <div className="flex items-center gap-4">
        <Link
          href="#"
          className="px-8 md:px-12 py-2 border-2 border-dashed border-white text-white text-[10px] sm:text-md md:text-lg font-medium hover:bg-white/10 transition-colors rounded-xl"
        >
          Masuk
        </Link>
        <Link
          href="#"
          className="px-8 md:px-12 py-2 bg-white border-2 border-white text-black text-[10px] sm:text-md md:text-lg font-bold transition-colors shadow-lg rounded-xl"
        >
          Daftar Sekarang !
        </Link>
      </div>
    </section>
  );
}
