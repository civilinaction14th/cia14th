import Navbar from "@/src/components/layouts/Navbar";
import Footer from "@/src/components/layouts/Footer";

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
