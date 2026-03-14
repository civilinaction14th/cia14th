import Image from "next/image";
import Link from "next/link";

const formulirLinks = [
  { label: "Registrasi peserta CIC", href: "/registrasi-lomba?comp=cic" },
  { label: "Registrasi peserta FCEC", href: "/registrasi-lomba?comp=fcec" },
  { label: "Registrasi peserta SBC", href: "/registrasi-lomba?comp=sbc" },
  { label: "Registrasi peserta ITC", href: "/registrasi-lomba?comp=itc" },
];

const socials = [
  { icon: "/footer/youtube.svg", alt: "YouTube", href: "#" },
  { icon: "/footer/instagram.svg", alt: "Instagram", href: "#" },
  { icon: "/footer/tiktok.svg", alt: "TikTok", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#0B2A40] text-white font-publicas">
      <div className="max-w-360 mx-auto px-6 pt-10 pb-6 lg:px-16 lg:pt-16 lg:pb-8">
        <div className="flex flex-col relative gap-8 lg:flex-row lg:gap-8 lg:justify-between lg:items-center">
          {/* Left: Formulir */}
          <div className="shrink-0 min-w-max">
            <h3 className="font-bold text-lg md:text-xl italic mb-4 md:mb-6">
              Formulir
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 md:gap-y-4">
              {formulirLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-base hover:underline md:whitespace-nowrap"
                >
                  {link.label} &gt;
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Logos */}
          <div className="flex flex-row items-center gap-4 sm:gap-6 md:gap-8 flex-nowrap justify-center shrink-0">
            <div className="relative h-10 w-20 sm:h-12 sm:w-24 md:h-14 md:w-28 lg:h-20 lg:w-40">
              <Image
                src="/footer/logo-cia.webp"
                alt="Logo CIA"
                fill
                className="object-contain"
                loading="lazy"
              />
            </div>
            <div className="relative h-8 w-20 sm:h-10 sm:w-24 md:h-12 md:w-32 lg:h-16 lg:w-48">
              <Image
                src="/footer/logo-ugm.webp"
                alt="Logo UGM"
                fill
                className="object-contain"
                loading="lazy"
              />
            </div>
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-20 lg:w-20">
              <Image
                src="/footer/logo-kmtsl.webp"
                alt="Logo KMTSL"
                fill
                className="object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t border-gray-400 my-8" />

        {/* Bottom row */}
        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between items-center">
          {/* Social icons */}
          <div className="flex gap-4">
            {socials.map((s) => (
              <Link
                key={s.alt}
                href={s.href}
                aria-label={s.alt}
                className="w-12 h-12 rounded-full border border-white flex items-center justify-center hover:bg-white/10 transition"
              >
                <Image src={s.icon} alt={s.alt} width={24} height={24} />
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="font-bold text-base">Copyright KMTSL 2026</p>
        </div>
      </div>
    </footer>
  );
}
