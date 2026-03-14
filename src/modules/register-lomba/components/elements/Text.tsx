import React from "react";
import { cn } from "@/src/utils/helpers/cn"; // Gunakan utility cn-mu kalau ada (atau bisa dihapus dan pakai template literal/clsx)

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  children: React.ReactNode;
  size?: "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  strokeWidth?: string;
  textShadow?: string;
}

const Text = ({
  as: Component = "h1",
  children,
  size = "4xl",
  className,
  strokeWidth = "2px",
  textShadow = "2px 6px 10px rgba(0,0,0,0.4)",
  ...props
}: TextProps) => {
  const sizeClasses = {
    sm: "text-sm md:text-base",
    base: "text-base md:text-lg",
    lg: "text-lg md:text-xl",
    xl: "text-xl md:text-2xl",
    "2xl": "text-2xl md:text-3xl",
    "3xl": "text-3xl md:text-4xl",
    "4xl": "text-4xl md:text-5xl",
    "5xl": "text-5xl md:text-6xl",
  };

  return (
    <Component
      className={cn(
        "font-poppins font-extrabold text-[#8D2D2D]",
        sizeClasses[size],
        className,
      )}
      style={{
        WebkitTextStroke: `${strokeWidth} #F2A23A`,
        textShadow: textShadow,
        ...props.style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Text;
