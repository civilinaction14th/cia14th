import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Event", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Login", href: "#" },
];

export default function Navbar() {
  return (
    <nav
      className="fixed top-2 w-full z-[999] overflow-hidden"
      style={{ height: "80px" }}
    >
      {/* Background SVG — fill by height, sides get clipped */}
      <Image
        src="/svg/Navbar.svg"
        alt=""
        fill
        className="object-cover object-center"
        priority
      />

      {/* Content on top */}
      <div className="absolute inset-0 flex items-center justify-between px-8 w-full">
        <Image
          src="/images/Logo.webp"
          alt="CIA 14th Logo"
          width={80}
          height={80}
          className="object-contain"
          priority
        />
        <div className="flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-white text-lg font-normal hover:text-amber-400 transition-colors font-[Causten]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#"
            className="text-white bg-[#2d4b5e]/60 px-4 py-1 rounded-lg text-lg font-bold hover:text-amber-400 transition-colors font-[Causten]"
          >
            Registration
          </Link>
        </div>
      </div>
    </nav>
  );
}
