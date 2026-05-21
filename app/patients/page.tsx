import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Perks from "@/components/Perks";
import HowItWorks from "@/components/HowItWorks";
import TreatmentFinder from "@/components/TreatmentFinder";
import Footer from "@/components/Footer";
import ExploreRewards from "@/components/ExploreRewards";

export const metadata = {
  title: "ASPIRE Galderma Rewards – Earn, redeem, save & repeat",
  description: "ASPIRE Galderma Rewards is designed to support and reward you at every stage of your aesthetic journey.",
};

export default function PatientsPage() {
  return (
    <>
      <div className="flex flex-col min-h-screen" id="website-content">
        <Header />
        <main className="flex-1">
          <Hero />
          <Perks />
          <HowItWorks />
          <TreatmentFinder />
        </main>
        <Footer />
      </div>
      <ExploreRewards />
    </>
  );
}
