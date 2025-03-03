import heroImage from "@/assets/images/bg-mountains.png";

function HeroSection() {
  return (
    <div className="relative flex -mt-20 pt-20 pb-10 md:pb-0 bg-white w-full h-full">
      <div className="pt-8 px-8 md:pt-0 md:w-[60%] md:flex md:flex-col md:justify-center md:items-center">
        <div className="max-w-[623px] space-y-4">
          <h2 className="text-primary-50 text-[2.3rem] leading-[50.48px] font-[700] md:leading-[60.48px] md:text-[3rem]">
            Our purpose is to turn anyone and everyone into a property owner
          </h2>
          <p className="text-base leading-[25px] font-[400] md:text-[1.1rem] md:leading-[30px]">
            At SLEM Technologies, we believe that owning property should not be
            a privilege reserved for a few but an opportunity available to
            everyone. Our goal is to simplify, digitize, and democratize real
            estate investment, making it more accessible, transparent, and
            secure for individuals, families, and businesses.
          </p>

          <p className="text-base leading-[25px] font-[400] md:text-[1.1rem] md:leading-[30px]">
            Through our trusted real estate platform, we enable users to buy,
            sell, and invest in properties with confidence—whether through
            outright purchases, flexible installment plans, or resale options.
            By leveraging cutting-edge technology, strategic partnerships, and
            market insights, we empower people to own a piece of the future.
          </p>
        </div>
      </div>
      <div className="w-[50%] hidden md:block">
        <img
          src={heroImage}
          alt="Hero image"
          className="w-[800px] -translate-y-20 object-cover"
        />
      </div>
    </div>
  );
}

export default HeroSection;
