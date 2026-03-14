export const Jeans = () => {
  return (
    <>
      <div
        className="absolute top-0 inset-x-0 h-full bg-cover bg-start z-[-1] pointer-events-none"
        style={{
          backgroundImage: "url('/images/TextureBg.png')",
          opacity: 0.48,
          // mixBlendMode: "soft-light",
        }}
      />
      <div
        className="absolute -top-[100%] scale-y-[-1] inset-x-0 h-full bg-cover bg-start z-[-1] pointer-events-none"
        style={{
          backgroundImage: "url('/images/TextureBg.png')",
          opacity: 0.48,
          // mixBlendMode: "soft-light",
        }}
      />
    </>
  );
};
