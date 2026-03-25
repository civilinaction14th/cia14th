import React from "react";

interface BordirLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  bg?: string;
  bordirColor?: string;
  bordirWidth?: string;
}

export const BordirLabel: React.FC<BordirLabelProps> = ({
  children,
  bg = "bg-white",
  bordirColor = "#ffffff",
  bordirWidth = "2",
  className = "",
  ...props
}) => {
  const widths: Record<string, string> = {
    thin: "1",
    default: "2.5",
    thick: "4",
    extrathick: "6",
  };
  const resolvedWidth = widths[bordirWidth] || bordirWidth;
  const encodedColor = encodeURIComponent(bordirColor);

  const offset = Number(resolvedWidth) + 3; // Sedikit offset untuk label yang kecil
  const doubleOffset = offset * 2;

  // rx diubah ke 12 biar ngikut luar yg rounded-15px
  const svg = `<svg stroke='${encodedColor}' stroke-width='${resolvedWidth}' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><rect x='${offset}px' y='${offset}px' width='calc(100% - ${doubleOffset}px)' height='calc(100% - ${doubleOffset}px)' fill='none' rx='12' ry='12' stroke-dasharray='10,6' stroke-dashoffset='0' stroke-linecap='round'/></svg>`;

  return (
    <div
      className={`relative z-10 rounded-[15px] max-w-max ${bg} ${className}`}
      {...props}
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          borderRadius: "inherit",
          backgroundImage: `url("data:image/svg+xml,${svg}")`,
          backgroundSize: "100% 100%",
        }}
      />
      <div className="relative h-full w-full z-11 px-5 md:px-7 py-2 md:py-2.5 flex items-center justify-center whitespace-nowrap">
        {children}
      </div>
    </div>
  );
};
