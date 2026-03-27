import localFont from "next/font/local";

export const PublicaRegular = localFont({
  src: "../../../public/font/PublicaSansRound-Rg.otf",
  variable: "--font-publicas-regular",
  display: "swap",
});

export const PublicaMedium = localFont({
  src: "../../../public/font/PublicaSansRound-Md.otf",
  variable: "--font-publicas-medium",
  display: "swap",
});

export const PublicaBold = localFont({
  src: "../../../public/font/PublicaSansRound-Bd.otf",
  variable: "--font-publicas-bold",
  display: "swap",
});
