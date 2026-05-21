import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Perks from "@/components/Perks";
import HowItWorks from "@/components/HowItWorks";
import HCPBenefits from "@/components/HCPBenefits";
import TreatmentFinder from "@/components/TreatmentFinder";
import Footer from "@/components/Footer";
import ExploreRewards from "@/components/ExploreRewards";

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen" id="website-content">
        <Header />
        <main className="flex-1">
          <Hero />
          <Perks />
          <HowItWorks />
          <HCPBenefits />
          <TreatmentFinder />
        </main>
        <Footer />
      </div>
      <ExploreRewards />
    </>
  );
}
