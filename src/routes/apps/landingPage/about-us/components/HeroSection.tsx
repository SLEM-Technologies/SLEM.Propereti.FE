import heroImage from "@/assets/images/bg-mountains.png";

function HeroSection() {
  return (
    <div className="relative flex -mt-20 pt-20 pb-10 md:pb-0 bg-white w-full h-full">
      <div className="pt-8 px-8 md:pt-0 md:w-[60%] md:flex md:flex-col md:justify-center md:items-center">
        <div className="max-w-[623px] space-y-4">
          <h2 className="text-primary-50 text-[2.3rem] leading-[50.48px] font-[700] md:leading-[60.48px] md:text-[3rem]">
            Our purpose is to turn anyone and everyone into a property owner
          </h2>
          <p className="text-base leading-[25px] font-[400] md:text-[1.2rem] md:leading-[30px]">
            Lorem ipsum dolor sit amet consectetur. Commodo mauris erat ipsum
            habitasse. Consectetur fringilla sed elementum at ac pharetra est
            pellentesque. Lectus neque id quis viverra interdum. Pretium eu
            fames mauris id at platea. Suspendisse amet sed arcu diam arcu diam
            vitae faucibus. Odio donec scelerisque fusce lorem pulvinar amet. Ac
            massa vehicula venenatis eget eget pretium quis. Lectus morbi nunc
            tellus volutpat purus et. Ut sed id risus a sed enim.
          </p>
        </div>
      </div>
      <div className="w-[40%] hidden md:block">
        <img
          src={heroImage}
          alt="Hero image"
          className="w-[600px] -translate-y-20 object-cover"
        />
      </div>
    </div>
  );
}

export default HeroSection;
