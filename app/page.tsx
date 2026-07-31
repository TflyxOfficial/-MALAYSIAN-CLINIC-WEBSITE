import Hero from "@/components/home/Hero";
import Philosophy from "@/components/home/Philosophy";
import ServicesShowcase from "@/components/home/ServicesShowcase";
import DoctorsMarquee from "@/components/home/DoctorsMarquee";
import FacilitiesTeaser from "@/components/home/FacilitiesTeaser";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <ServicesShowcase />
      <DoctorsMarquee />
      <FacilitiesTeaser />
    </>
  );
}
