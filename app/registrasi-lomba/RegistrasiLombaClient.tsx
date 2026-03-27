"use client";

import Navbar from "@/src/components/layouts/Navbar";
import Footer from "@/src/components/layouts/Footer";
import { usePathname } from "next/navigation";

export default function RegistrasiLombaClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSuccessPage = pathname.endsWith("/success");

  if (isSuccessPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
