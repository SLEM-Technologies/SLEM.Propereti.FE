import heroImage from "@/assets/images/homepage-hero-img.png";
import PropertyTab from "./PropertyTab";
import Icon from "@/common/components/Icon";
import calenderIcon from "@/assets/icons/calender-icon.svg";
import { TAB_LIST } from "@/routes/apps/landingPage/common";

const TAB_CONTENT = [
  {
    title: "Location",
    value: "Barcelona, Spain",
  },
  {
    title: "When",
    value: "Select Move-in Date",
    icon: <Icon src={calenderIcon} alt="calander" />,
  },
];

function HeroSection() {
  return (
    <div className="relative pt-24 bg-secondary-100 flex flex-col items-center justify-center w-full h-full">
      <h1 className="max-w-[570px] text-center mb-2.5 text-primary-50 text-[3.6rem] font-[700] leading-[60px] tracking-[-1%]">
        Buy, rent, or sell your property easily
      </h1>
      <p className="max-w-[500px] text-center text-primary-50 text-[1.2rem] font-[400] leading-[28px]">
        A great platform to buy, sell, or even resell your properties without
        any commisions.
      </p>
      <div className="w-full h-full">
        <Icon
          src={heroImage}
          alt="House Image"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="absolute bottom-32 left-0 right-0">
        <PropertyTab tabList={TAB_LIST} tabContent={TAB_CONTENT} />
      </div>
    </div>
  );
}

export default HeroSection;
