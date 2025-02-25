import PropertiesBasedOnLocation from "@/common/components/PropertiesBasedOnLocation";
import HeroSection from "./components/HeroSection";
import OwnYourPlace from "./components/OwnYourPlace";

function Properties() {
  return (
    <div className="w-full h-full">
      <HeroSection />
      <OwnYourPlace />
      <PropertiesBasedOnLocation />
    </div>
  );
}

export default Properties;
