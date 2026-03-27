import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrasi Lomba | CIA 14th | Civil In Action",
};

import RegistrasiLombaClient from "./RegistrasiLombaClient";

export default function RegistrasiLombaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RegistrasiLombaClient>{children}</RegistrasiLombaClient>;
}
