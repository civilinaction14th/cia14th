"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Event", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav
        className={`fixed top-2 w-full flex justify-center items-center z-[999] overflow-hidden ${isOpen ? "" : "drop-shadow-lg"}`}
        style={{ height: "80px", background: "#0a293e" }}
      >
        <div className="h-[75%] w-[100%] relative">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="0" y1="3" x2="100%" y2="3" stroke="#F2A23A" strokeWidth="6" strokeDasharray="24 10" strokeLinecap="round" />
            <line x1="0" y1="96%" x2="100%" y2="96%" stroke="#F2A23A" strokeWidth="6" strokeDasharray="24 10" strokeLinecap="round" />
          </svg>
          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-between px-8 w-full">
            <Image
              src="/images/Logo.webp"
              alt="CIA 14th Logo"
              width={80}
              height={80}
              className="object-contain"
              priority
            />
            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-7">
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
            {/* Hamburger button */}
            <button
              className="md:hidden text-white p-2 z-10 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {/* Texture overlay */}
        <div
          className="absolute inset-0 bg-cover bg-start z-10 pointer-events-none"
          style={{
            backgroundImage: "url('/images/TextureBg.png')",
            opacity: 0.9,
            mixBlendMode: "soft-light",
          }}
        />
      </nav>

      {/* Mobile dropdown menu */}
      <div
        className={`fixed top-[87px] w-full z-[998] md:hidden flex flex-col transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ background: "#0a293e" }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-white text-lg font-normal hover:text-amber-400 transition-colors font-[Causten] px-8 py-3"
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="#"
          className="text-white bg-[#2d4b5e]/60 mx-8 my-3 px-4 py-2 rounded-lg text-lg font-bold hover:text-amber-400 transition-colors font-[Causten] text-center"
          onClick={() => setIsOpen(false)}
        >
          Registration
        </Link>
        <div
          className="absolute inset-0 bg-cover bg-start z-10 pointer-events-none"
          style={{
            backgroundImage: "url('/images/TextureBg.png')",
            opacity: 0.9,
            mixBlendMode: "soft-light",
          }}
        />
      </div>
    </>
  );
}
