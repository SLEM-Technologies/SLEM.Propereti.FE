import mapImage from "@/assets/images/map.png";
import { TAB_LIST } from "@/routes/apps/landingPage/common";
import PropertyTab from "./PropertyTab";

const TAB_CONTENT = [
  {
    title: "Location",
    value: "Barcelona, Spain",
  },
];

function MapSection() {
  return (
    <div className="h-full w-full flex items-center justify-center relative">
      <img src={mapImage} alt="map" className="h-full w-full object-cover" />
      <div className="absolute bottom-32 left-0 right-0">
        <PropertyTab
          tabList={TAB_LIST}
          tabContent={TAB_CONTENT}
          variant="secondary"
        />
      </div>
    </div>
  );
}

export default MapSection;
