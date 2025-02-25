import PropertiesBasedOnLocation from "@/common/components/PropertiesBasedOnLocation";
import HeroSection from "./components/HeroSection";
import OwnerShip from "./components/OwnerShip";

function Resell() {
  return (
    <div className="w-full h-full">
      <HeroSection />
      <OwnerShip />
      <PropertiesBasedOnLocation variant="secondary" />
    </div>
  );
}

export default Resell;
