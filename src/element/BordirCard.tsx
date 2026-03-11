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
    default: "2",
    thick: "4",
    extrathick: "6",
  };
  const resolvedWidth = widths[bordirWidth] || bordirWidth;
  const encodedColor = encodeURIComponent(bordirColor);
  const svg = `<svg stroke='${encodedColor}' stroke-width='${resolvedWidth}' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' fill='none' rx='10' ry='10' stroke-dasharray='24,14,12,14' stroke-dashoffset='0' stroke-linecap='square'/></svg>`;

  return (
    <div
      className={`relative z-10 rounded-[20px] md:rounded-[30px] p-2 shadow-lg flex flex-col items-center gap-6 md:gap-8 font-publicas ${bg} ${className} overflow-hidden`}
      {...props}
    >
      <div
        className="relative h-full w-full z-11 px-4 py-8 gap-4 lg:p-6"
        style={{
          borderRadius: "inherit",
          backgroundImage: `url("data:image/svg+xml,${svg}")`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
