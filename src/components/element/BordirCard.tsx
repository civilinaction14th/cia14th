import React from "react";

interface BordirCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  bg?: string;
  bordirColor?: string;
  bordirWidth?: string;
}

export const BordirCard: React.FC<BordirCardProps> = ({
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

  // Besarkan offset margin agar terhindar batas border-radius box luarnya yang nge-klip (overflow: hidden)
  const offset = Number(resolvedWidth) + 8; // Tambah safe margin 8px dari luar box
  const doubleOffset = offset * 2;

  // Set stroke-dasharray proporsional (rx 22 ry 22 agar lengkung bordir dalam paralel dengan rounded-30px luar)
  const svg = `<svg stroke='${encodedColor}' stroke-width='${resolvedWidth}' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><rect x='${offset}px' y='${offset}px' width='calc(100% - ${doubleOffset}px)' height='calc(100% - ${doubleOffset}px)' fill='none' rx='22' ry='22' stroke-dasharray='12,8' stroke-dashoffset='0' stroke-linecap='round'/></svg>`;

  return (
    <div
      className={`relative z-10 rounded-[20px] md:rounded-[30px] shadow-lg flex flex-col items-center gap-6 md:gap-8 font-publicas ${bg} ${className}`}
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
      <div className="relative h-full w-full z-11 px-4 py-8 md:p-6 lg:p-8">
        {children}
      </div>
    </div>
  );
};
