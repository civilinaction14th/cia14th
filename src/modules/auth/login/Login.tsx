"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DefaultAuthLayout from "../layout/DefaultAuthLayout";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useLogin } from "@/src/utils/hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginWithEmail, loginWithGoogle, isLoading, error } = useLogin();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginWithEmail(email, password);
  };

  return (
    <DefaultAuthLayout>
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between min-h-screen px-4 w-full gap-0 md:gap-18">
        {/* --- KOLOM KIRI (LOGO) --- */}
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2">
          <Image
            src="/images/Logo.webp"
            alt="Logo"
            width={400}
            height={400}
            className="object-contain scale-70 md:scale-80 lg:scale-80"
          />
          <Image
            src="/auth/Sublogo.webp"
            alt="Sublogo"
            width={500}
            height={300}
            className="hidden md:block md:scale-70 lg:scale-80 object-contain mt-4 drop-shadow-2xl"
          />
        </div>

        {/* --- KOLOM KANAN (FORM LOGIN) --- */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md bg-transparent p-6 md:p-0 ">
            <div className="flex flex-col items-center md:items-start gap-2">
              <h1 className="text-5xl md:text-4xl font-bold text-white font-publicas mb-2 text-center md:text-left">
                Masuk
              </h1>
              <p className="text-sm md:text-base text-gray-300 font-poppins mb-8 text-center md:text-left">
                Jika kamu belum memiliki akun, <br /> kamu dapat{" "}
                <Link
                  href="/auth/register"
                  className="text-white font-bold underline hover:text-amber-400 transition-colors"
                >
                  Daftar disini!
                </Link>
              </p>
            </div>

            <form onSubmit={handleEmailAuth} className="space-y-6">
              <InputField
                title="Username/Email"
                type="email"
                placeholder="Masukkan alamat emailmu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                }
              />

              <InputField
                title="Password"
                type="password"
                placeholder="Masukkan passwordmu disini"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                }
              />

              {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded-xl text-sm font-poppins">
                  {error}
                </div>
              )}

              <div className="pt-4">
                <Button type="submit" isLoading={isLoading}>
                  Login
                </Button>
              </div>
            </form>

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-white/20" />
              <span className="text-sm text-gray-400 font-poppins">atau</span>
              <div className="flex-1 h-px bg-white/20" />
            </div>

            <Button
              type="button"
              onClick={loginWithGoogle}
              disabled={isLoading}
              icon={
                <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M47.532 24.552c0-1.636-.132-3.2-.396-4.704H24v9.288h13.196c-.576 3.024-2.268 5.58-4.812 7.296v6.072h7.788c4.56-4.2 7.36-10.392 7.36-17.952z"
                    fill="#4285F4"
                  />
                  <path
                    d="M24 48c6.588 0 12.12-2.172 16.164-5.892l-7.788-6.072c-2.172 1.464-4.956 2.328-8.376 2.328-6.444 0-11.904-4.344-13.86-10.188H2.1v6.264C6.132 42.636 14.484 48 24 48z"
                    fill="#34A853"
                  />
                  <path
                    d="M10.14 28.176A14.898 14.898 0 0 1 9.348 24c0-1.452.252-2.868.792-4.176v-6.264H2.1A23.97 23.97 0 0 0 0 24c0 3.864.924 7.524 2.1 10.44l8.04-6.264z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M24 9.636c3.624 0 6.876 1.248 9.432 3.696l7.02-7.02C36.108 2.388 30.588 0 24 0 14.484 0 6.132 5.364 2.1 13.56l8.04 6.264C12.096 13.98 17.556 9.636 24 9.636z"
                    fill="#EA4335"
                  />
                </svg>
              }
            >
              Lanjutkan dengan Google
            </Button>
          </div>
        </div>
      </div>
    </DefaultAuthLayout>
  );
};

export default Login;
