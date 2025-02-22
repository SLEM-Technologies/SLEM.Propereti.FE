import FeatureSection from "./components/FeatureSections";
import HeroSection from "./components/HeroSection";
import MapSection from "./components/MapSection";
import NewesLetterSection from "./components/NewsLetterSection";
import ServicesSection from "./components/ServicesSection";

function Home() {
  return (
    <div className="w-full h-full">
      <HeroSection />
      <ServicesSection />
      <MapSection />
      <FeatureSection />
      <NewesLetterSection />
    </div>
  );
}

export default Home;
