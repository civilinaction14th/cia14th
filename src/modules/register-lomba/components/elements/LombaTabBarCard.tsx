import React from "react";
import Link from "next/link";
import { BordirCard } from "@/src/components/element/BordirCard";
import Text from "./Text";

const LombaTabBarCard = ({
  href,
  children,
  isSelected,
}: {
  href: string;
  children: React.ReactNode;
  isSelected: boolean;
}) => {
  return (
    <Link href={href} className="w-full block">
      <BordirCard
        bordirWidth="thin"
        bg={
          isSelected
            ? "bg-linear-to-b from-[#FFECCA] to-[#A59983]"
            : "bg-linear-to-b from-[#4B3122] to-[#956042]"
        }
        bordirColor={isSelected ? "#8D2D2D" : "#F3E6CF"}
        className="w-full flex items-center justify-center text-center cursor-pointer hover:brightness-110 active:scale-[0.98] transition-all"
      >
        <Text as="h3" size="2xl" strokeWidth="1px">
          {children}
        </Text>
      </BordirCard>
    </Link>
  );
};

export default LombaTabBarCard;
