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
    <nav className="relative z-20 flex items-center justify-between px-8 py-3 bg-[#091724]/75 backdrop-blur-sm">
      <Image
        src="/images/Logo.png"
        alt="CIA 14th Logo"
        width={44}
        height={44}
        className="object-contain"
        priority
      />
      <div className="flex items-center gap-7">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-white text-sm font-normal hover:text-amber-400 transition-colors"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="#"
          className="text-white text-sm font-bold hover:text-amber-400 transition-colors"
        >
          Registration
        </Link>
      </div>
    </nav>
  );
}
