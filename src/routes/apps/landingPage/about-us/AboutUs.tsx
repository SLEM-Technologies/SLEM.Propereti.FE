import PropertiesBasedOnLocation from "@/common/components/PropertiesBasedOnLocation";
import CompanyDetails from "./components/CompanyDetails";
import HeroSection from "./components/HeroSection";

function AboutUs() {
  return (
    <div className="w-full h-full">
      <HeroSection />
      <CompanyDetails />
      <PropertiesBasedOnLocation />
    </div>
  );
}

export default AboutUs;
