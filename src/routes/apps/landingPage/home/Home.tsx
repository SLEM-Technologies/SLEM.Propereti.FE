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
      <div className="hidden md:block">
        <MapSection />
      </div>
      <FeatureSection />
      <NewesLetterSection />
    </div>
  );
}

export default Home;
