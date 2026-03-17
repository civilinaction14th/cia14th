import { cn } from "@/src/utils/helpers/cn";

export const Jeans = () => {
  return (
    <div className="absolute top-0 left-0 w-full z-[-1] flex flex-col pointer-events-none overflow-hidden">
      {/* 
        Using a loop to generate 20 layers.
        Mobile layouts are much taller, so 3 layers aren't enough to cover the whole section.
      */}
      {[...Array(20)].map((_, i) => (
        <img
          key={i}
          src="/images/TextureBg.png"
          alt=""
          className={cn(
            "w-full h-auto opacity-[0.48] flex-shrink-0 -mt-[1px]",
            // i=0 is original, subsequent odd layers mirror both X and Y for a seamless joint and variety
            i % 2 !== 0 ? "scale-[-1]" : ""
          )}
        />
      ))}
    </div>
  );
};
