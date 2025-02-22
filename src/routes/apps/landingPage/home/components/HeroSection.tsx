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
    <div className="-mt-20 pt-24 bg-secondary-100 w-full h-full">
      <div className="relative flex flex-col items-center justify-center">
        <h1 className="text-[2rem] leading-[40px] max-w-[400px] md:max-w-[570px] md:text-[3.6rem] md:leading-[60px] text-center mb-2.5 text-primary-50  font-[700]  tracking-[-1%]">
          Buy, rent, or sell your property easily
        </h1>
        <p className="text-center text-primary-50 font-[400] max-w-[350px] md:max-w-[500px] md:text-[1.2rem] md:leading-[28px]">
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

        <div className="hidden md:block absolute bottom-32 left-0 right-0">
          <PropertyTab tabList={TAB_LIST} tabContent={TAB_CONTENT} />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
