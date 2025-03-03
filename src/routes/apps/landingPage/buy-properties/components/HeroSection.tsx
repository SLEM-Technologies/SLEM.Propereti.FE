import heroImage from "@/assets/images/hands-luxurious-house.png";

function HeroSection() {
  return (
    <div className="-mt-20 pb-20 bg-secondary-100 w-full h-full">
      <div className="w-full h-full relative translate-y-20">
        <div className="absolute top-10 left-8 md:top-52 md:left-12 max-w-[690px] space-y-3 md:space-y-6">
          <h2 className="max-w-sm md:max-w-full text-primary-50 text-[1.5rem] leading-[30.48px] font-[700] md:leading-[60.48px] md:text-[3rem]">
            Do you want to outrightly buy your own property?
          </h2>
          <p className="text-[0.86rem] max-w-sm md:max-w-full leading-[25px] font-[400] md:text-[1.2rem] md:leading-[30px]">
            Secure your dream home with ease! Buying property outright means
            full ownership from day one. No delays, no installments—just instant
            access to your investment. Our platform ensures safe, verified
            transactions with trusted real estate companies, giving you complete
            peace of mind.
          </p>
        </div>
        <img
          src={heroImage}
          alt="Proerties hero image"
          className="w-full h-full block object-cover"
        />
      </div>
    </div>
  );
}

export default HeroSection;
