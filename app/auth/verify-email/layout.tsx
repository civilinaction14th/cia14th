import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verifikasi Email | CIA 14th | Civil In Action",
};

export default function VerifyEmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
