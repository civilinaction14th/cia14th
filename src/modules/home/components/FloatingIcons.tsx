import Image from "next/image";

const icons = [
  {
    src: "/images/FCEC.png",
    alt: "FCEC Icon",
    width: 115,
    height: 115,
    style: { top: "27%", left: "6%" },
  },
  {
    src: "/images/Star.svg",
    alt: "Star Decoration",
    width: 125,
    height: 125,
    style: { top: "3%", right: "7%" },
  },
  {
    src: "/images/ITC.png",
    alt: "ITC Icon",
    width: 105,
    height: 105,
    style: { top: "38%", right: "8%" },
  },
  {
    src: "/images/SBC.png",
    alt: "SBC Icon",
    width: 95,
    height: 95,
    style: { bottom: "14%", left: "17%" },
  },
  {
    src: "/images/fan.svg",
    alt: "Fan Decoration",
    width: 145,
    height: 145,
    style: { bottom: "2%", right: "12%" },
  },
];

export default function FloatingIcons() {
  return (
    <>
      {icons.map((icon) => (
        <div
          key={icon.alt}
          className="absolute pointer-events-none select-none"
          style={icon.style}
        >
          <Image
            src={icon.src}
            alt={icon.alt}
            width={icon.width}
            height={icon.height}
            className="object-contain drop-shadow-lg"
          />
        </div>
      ))}
    </>
  );
}
