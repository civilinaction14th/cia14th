import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FloatingIcons from "./components/FloatingIcons";

export default function HomeModule() {
  return (
    <main className="relative min-h-screen flex flex-col isolate">
      {/* Floating decorative icons */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <FloatingIcons />
      </div>

      {/* Navbar */}
      <div className="relative z-[9]">
        <Navbar />
      </div>

      {/* Hero content */}
      <div className="relative z-[2] flex-1 flex items-center justify-center pb-16 pt-8">
        <HeroSection />
      </div>

      {/* Texture overlay */}
      <div
        className="absolute inset-0 bg-cover bg-start z-10 pointer-events-none"
        style={{
          backgroundImage: "url('/images/TextureBg.png')",
          opacity: 0.48,
          mixBlendMode: 'soft-light',
        }}
      />
    </main>
  );
}
