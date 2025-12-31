import HeroSection from "@/components/landing/HeroSection";
import RolesSection from "@/components/landing/RolesSection";
import LifecycleSection from "@/components/landing/LifecycleSection";
import SolutionSection from "@/components/landing/SolutionSection";
import FeatureHighlightsSection from "@/components/landing/FeatureHighlightsSection";
import VisionSection from "@/components/landing/VisionSection";
import ArchitectureSection from "@/components/landing/ArchitectureSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import FooterSection from "@/components/landing/FooterSection";

export default function Home() {
  return (
    <div className="font-sans flex flex-col w-full bg-white">
      <HeroSection />
      <RolesSection />
      <LifecycleSection />
      <SolutionSection />
      <FeatureHighlightsSection />
      <VisionSection />
      <ArchitectureSection />
      <BenefitsSection />
      <FooterSection />
    </div>
  );
}
