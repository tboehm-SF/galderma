import Header from "@/components/Header";
import HCPHero from "@/components/HCPHero";
import PracticeTools from "@/components/PracticeTools";
import HowItAddsUp from "@/components/HowItAddsUp";
import MembershipCTA from "@/components/MembershipCTA";
import Footer from "@/components/Footer";
import ExploreHCP from "@/components/ExploreHCP";

export const metadata = {
  title: "ASPIRE Galderma Practice Rewards – Build Your Business",
  description: "ASPIRE Galderma Practice Rewards is a loyalty program unlike any other. Get valuable, business-building tools designed to position your practice for long-term success.",
};

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen" id="website-content">
        <Header />
        <main className="flex-1">
          <HCPHero />
          <PracticeTools />
          <HowItAddsUp />
          <MembershipCTA />
        </main>
        <Footer />
      </div>
      <ExploreHCP />
    </>
  );
}
