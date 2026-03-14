import HomeModule from "@/src/modules/home";
import Events from "@/src/modules/home/Events";
import InformasiLanjut from "@/src/modules/home/InformasiLanjut";
import PersyaratanUmum from "@/src/modules/home/PersyaratanUmum";
import TestimoniPemenang from "@/src/modules/home/TestimoniPemenang";

export default function Home() {
  return (
    <main className="background-landing isolate">
      <HomeModule />
      <Events />
      <TestimoniPemenang />
      <PersyaratanUmum />
      <InformasiLanjut />
      
    </main>
  );
}
