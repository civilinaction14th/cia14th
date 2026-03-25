import React from "react";
import { BordirCard } from "@/src/components/element/BordirCard";
import Text from "../elements/Text";

// Konfigurasi warna per lomba
const LOMBA_STYLES: Record<
  string,
  { title: string; bgTop: string; bgBottom: string }
> = {
  cic: {
    title: "Civil Innovation Challenge",
    bgTop: "#EFB040",
    bgBottom: "#9D732A",
  },
  sbc: {
    title: "Sustainable Bridge Competition",
    bgTop: "#FF6C3B",
    bgBottom: "#A74626",
  },
  fcec: {
    title: "Future Civil Engineer Challenge",
    bgTop: "#4FA6E6",
    bgBottom: "#346C96",
  },
  itc: {
    title: "Innovation Technology Competition",
    bgTop: "#26B480",
    bgBottom: "#1A7754",
  },
};

interface PageTitleProps {
  lomba: string;
}

export default function PageTitle({ lomba }: PageTitleProps) {
  const style = LOMBA_STYLES[lomba.toLowerCase()] || LOMBA_STYLES.cic;

  return (
    <BordirCard
      bg=""
      bordirColor="#F2A23A"
      bordirWidth="default"
      className="w-full"
      style={{
        background: `linear-gradient(to bottom, ${style.bgTop}, ${style.bgBottom})`,
      }}
    >
      <div className="flex items-center justify-center">
        <Text
          as="h1"
          size="3xl"
          strokeWidth="0.5px"
          className="text-center text-[#F3E6CF]"
          style={{
            WebkitTextStroke: `1.5px ${style.bgBottom}`,
          }}
        >
          {style.title}
        </Text>
      </div>
    </BordirCard>
  );
}
