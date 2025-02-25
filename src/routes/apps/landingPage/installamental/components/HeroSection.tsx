import heroImage from "@/assets/images/installament-cover.png";
import { PrimaryButton } from "@/common/components/Button";

function HeroSection() {
  return (
    <div className="flex -mt-20 pt-20 pb-10 md:pb-0 bg-white w-full h-full md:justify-between md:px-8 ">
      <div className="pt-8 px-8 md:pt-0 md:flex md:flex-col md:justify-center md:items-center">
        <div className="max-w-[700px] space-y-4  flex flex-col justify-center text-center md:text-left  items-center md:justify-start md:items-start">
          <h2 className="text-primary-50 text-[2rem] leading-[40.48px] font-[700] md:leading-[60.48px] md:text-[3rem]">
            Buy a home and pay at your convenience
          </h2>
          <p className="text-base leading-[25px] font-[400] max-w-sm md:max-w-full md:text-[1.2rem] md:leading-[30px]">
            Lorem ipsum dolor sit amet consectetur. Commodo mauris erat ipsum
            habitasse. Consectetur fringilla sed elementum at ac pharetra est
            pellentesque.
          </p>
          <PrimaryButton className="w-[205.58px] h-[46px] md:h-[56px] bg-primary-50 text-[0.88rem] md:text-base">
            Get Started
          </PrimaryButton>
        </div>
      </div>
      <div className="hidden md:block">
        <img
          src={heroImage}
          alt="Hero image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default HeroSection;
