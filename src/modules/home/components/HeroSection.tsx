import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-end h-screen pb-24 text-center px-4">
      {/* Center Emblem */}
      <div className="absolute top-12 ml-12 w-110 h-110 mb-0 z-1">
        <Image
          src="/images/Logo.png"
          alt="Civil In Action Emblem"
          fill
          className="object-contain drop-shadow-2xl"
          priority
        />
      </div>

      {/* Title Image */}
      <div className="relative mb-0">
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
      <p className="text-white text-2xl mb-4 font-bold tracking-wide font-[PublicaSansRound]">
        &quot;Kolaborasi Pembangunan Nusantara, Infrastruktur Tangguh Berdaya&quot;
      </p>

      {/* CTA Buttons */}
      <div className="flex items-center gap-4">
        <Link
          href="#"
          className="px-12 py-2 border-2 border-dashed border-white text-white text-lg font-medium hover:bg-white/10 transition-colors rounded-xl"
        >
          Masuk
        </Link>
        <Link
          href="#"
          className="px-12 py-2 bg-white border-2 border-white text-black text-lg font-bold transition-colors shadow-lg rounded-xl"
        >
          Daftar Sekarang !
        </Link>
      </div>
    </section>
  );
}
