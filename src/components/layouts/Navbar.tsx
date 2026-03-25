"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useAuth } from "@/lib/auth-context";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import Modal from "@/src/components/element/Modal";
import { toast } from "sonner";

const navLinks = [{ label: "Events", href: "/events" }];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { currentUser, loading } = useAuth();

  const handleLogout = async () => {
    try {
      if (auth) await signOut(auth);
      setIsLogoutModalOpen(false);
      toast.success("Anda berhasil logout!");
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

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
            <line
              x1="0"
              y1="3"
              x2="100%"
              y2="3"
              stroke="#F2A23A"
              strokeWidth="6"
              strokeDasharray="24 10"
              strokeLinecap="round"
            />
            <line
              x1="0"
              y1="96%"
              x2="100%"
              y2="96%"
              stroke="#F2A23A"
              strokeWidth="6"
              strokeDasharray="24 10"
              strokeLinecap="round"
            />
          </svg>
          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-between px-8 w-full">
            {/* Logo -> Link ke Home */}
            <Link href="/" className="z-20">
              <Image
                src="/images/Logo.webp"
                alt="CIA 14th Logo"
                width={80}
                height={80}
                className="object-contain"
                priority
              />
            </Link>
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
              {loading ? (
                <div className="text-white/50 text-sm animate-pulse font-poppins">
                  Loading...
                </div>
              ) : currentUser ? (
                <>
                  <button
                    onClick={() => setIsLogoutModalOpen(true)}
                    className="text-red-400 hover:underline font-semibold transition-colors font-[Causten] text-lg cursor-pointer"
                  >
                    Logout
                  </button>
                  <Link
                    href="/events"
                    className="text-white bg-[#2d4b5e]/60 px-5 py-2 rounded-lg text-base font-bold hover:bg-[#2d4b5e] hover:text-amber-400 transition-colors font-poppins shadow-md border border-[#2d4b5e]"
                  >
                    Akses Pendaftaran
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="text-white/90 hover:text-amber-400 transition-colors font-[Causten] text-lg"
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/auth/register"
                    className="text-white bg-[#8D2D2D] px-5 py-2 rounded-lg font-bold hover:bg-[#722020] transition-colors font-poppins shadow-md"
                  >
                    Daftar Sekarang
                  </Link>
                </>
              )}
            </div>
            {/* Hamburger button */}
            <button
              className="md:hidden text-white p-2 z-10 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
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
        className="fixed top-[87px] w-full z-[998] md:hidden grid transition-all duration-300 ease-in-out"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
        }}
      >
        <div
          className="overflow-hidden flex flex-col relative"
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
        {loading ? (
          <div className="text-white/50 text-sm animate-pulse font-poppins px-8 py-3 text-center">
            Loading...
          </div>
        ) : currentUser ? (
          <>
            <Link
              href="/events"
              className="text-white bg-[#2d4b5e]/60 mx-8 my-2 px-4 py-2 rounded-lg text-lg font-bold hover:text-amber-400 transition-colors font-poppins text-center border border-[#2d4b5e]"
              onClick={() => setIsOpen(false)}
            >
              Akses Pendaftaran
            </Link>
            <button
              onClick={() => {
                setIsOpen(false);
                setIsLogoutModalOpen(true);
              }}
              className="text-red-400/90 mx-8 my-2 px-4 py-2 rounded-lg text-lg font-bold hover:bg-white/10 transition-colors font-poppins text-center cursor-pointer"
            >
              Keluar
            </button>
          </>
        ) : (
          <>
            <Link
              href="/auth/register"
              className="text-white bg-[#8D2D2D] mx-8 my-2 px-4 py-2 rounded-lg text-lg font-bold hover:bg-[#722020] transition-colors font-poppins text-center shadow-md"
              onClick={() => setIsOpen(false)}
            >
              Daftar Sekarang
            </Link>
            <Link
              href="/auth/login"
              className="text-white/90 mx-8 my-2 px-4 py-2 rounded-lg text-lg font-normal hover:bg-white/5 transition-colors font-poppins text-center"
              onClick={() => setIsOpen(false)}
            >
              Masuk
            </Link>
          </>
        )}
          <div
            className="absolute inset-0 bg-cover bg-start z-10 pointer-events-none"
            style={{
              backgroundImage: "url('/images/TextureBg.png')",
              opacity: 0.9,
              mixBlendMode: "soft-light",
            }}
          />
        </div>
      </div>

      {/* Modal Logout Confirmation */}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Logout"
        description={`Anda sekarang login menggunakan email ${currentUser?.email}. Apakah Anda yakin ingin keluar dari akun ini?`}
        confirmText="Keluar"
        cancelText="Batal"
        onConfirm={handleLogout}
      />
    </>
  );
}
