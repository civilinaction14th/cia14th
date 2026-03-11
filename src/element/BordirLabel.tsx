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
    default: "2",
    thick: "4",
    extrathick: "6",
  };
  const resolvedWidth = widths[bordirWidth] || bordirWidth;
  const encodedColor = encodeURIComponent(bordirColor);

  // Use rx='15' ry='15' for a card shape instead of pill '999'
  const svg = `<svg stroke='${encodedColor}' stroke-width='${resolvedWidth}' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' fill='none' rx='15' ry='15' stroke-dasharray='12,8' stroke-dashoffset='0' stroke-linecap='square'/></svg>`;

  return (
    <div
      className={`relative z-10 rounded-[15px] p-1 max-w-max ${bg} ${className} overflow-hidden`}
      {...props}
    >
      <div
        className="relative h-full w-full z-11 px-5 md:px-7 py-1.5 flex items-center justify-center whitespace-nowrap"
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
