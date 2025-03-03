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
      <div className="w-full h-[787px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.8501345617256!2d3.3660518754396636!3d6.540601822963433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8dbca863364d%3A0xb9e04946c3e01d07!2sSLEM%20Technologies!5e0!3m2!1sen!2sng!4v1740647232651!5m2!1sen!2sng"
          className="w-full h-full"
          loading="lazy"
        ></iframe>
      </div>
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
