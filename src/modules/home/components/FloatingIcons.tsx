import Image from "next/image";

const icons = [
  {
    src: "/svg/FCEC.svg",
    alt: "FCEC Icon",
    width: 220,
    height: 220,
    style: { top: "20%", left: "10%" },
  },
  {
    src: "/images/Star.svg",
    alt: "Star Decoration",
    width: 285,
    height: 285,
    style: { top: "-4%", right: "-4%" },
  },
  {
    src: "/svg/ITC.svg",
    alt: "ITC Icon",
    width: 200,
    height: 200,
    style: { bottom: "-6%", left: "17%" },
  },
  {
    src: "/svg/SBC.svg",
    alt: "SBC Icon",
    width: 220,
    height: 220,
    style: { top: "38%", right: "8%" },
  },
  {
    src: "/svg/CIC.svg",
    alt: "CIC Icon",
    width: 220,
    height: 220,
    style: { bottom: "2%", right: "12%" },
  },
  {
    src: "/images/fan.svg",
    alt: "Fan Decoration",
    width: 385,
    height: 385,
    style: { bottom: "-20%", left: "-10%" },
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
