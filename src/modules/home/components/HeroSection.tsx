import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-4">
      {/* Center Emblem */}
      <div className="relative w-80 h-80 mb-0 z-1">
        <Image
          src="/images/Logo.png"
          alt="Civil In Action Emblem"
          fill
          className="object-contain drop-shadow-2xl"
          priority
        />
      </div>

      {/* Title Image */}
      <div className="relative w-2xl max-w-[90vw] h-28 mb-3">
        <Image
          src="/images/CIA-title.png"
          alt="14th Civil In Action"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Subtitle */}
      <p className="text-white/85 italic text-sm mb-8 max-w-md tracking-wide">
        &quot;Kolaborasi Pembangunan Nusantara, Infrastruktur Tangguh Berdaya&quot;
      </p>

      {/* CTA Buttons */}
      <div className="flex items-center gap-4">
        <Link
          href="#"
          className="px-9 py-2 border border-dashed border-white/70 text-white text-sm font-medium hover:bg-white/10 transition-colors"
        >
          Masuk
        </Link>
        <Link
          href="#"
          className="px-7 py-2 bg-amber-500 text-white text-sm font-bold hover:bg-amber-600 transition-colors shadow-lg"
        >
          Daftar Sekarang !
        </Link>
      </div>
    </section>
  );
}
