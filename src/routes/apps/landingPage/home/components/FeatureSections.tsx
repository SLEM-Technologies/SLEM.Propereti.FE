import virtualHomeIcon from "@/assets/icons/virtual-home-icon.svg";
import findBestHomeIcon from "@/assets/icons/find-best-home-icon.svg";
import Icon from "@/common/components/Icon";

const FEATURES = [
  {
    icon: <Icon src={virtualHomeIcon} alt="virtual home icon" />,
    title: "Virtual home tours",
    description:
      "You can communicate directly with landlords and we provide you with virtual tour before you buy or rent the property.",
  },
  {
    icon: <Icon src={findBestHomeIcon} alt="virtual home icon" />,
    title: "Find the best deal",
    description:
      "Browse thousands of properties, save your favorites and set up search alerts so you don’t miss the best home deal!",
  },
];

const STATICS = [
  {
    count: "7.4%",
    title: "Property Return Rate",
  },
  {
    count: "3,856",
    title: "Property in Sell & Rent",
  },
  {
    count: "2,540",
    title: "Daily Completed Transactions",
  },
];

function FeatureSection() {
  return (
    <div className="bg-primary-50 flex flex-col gap-10 py-16">
      <div className="w-[60%] mx-auto">
        <div className="flex justify-between">
          <h2 className="w-[406px] text-white text-[2rem] font-[700] leading-[40px]">
            We make it easy for tenants and landlords.
          </h2>
          <p className="w-[406px] text-white/50 text-[1rem] font-[400] leading-[25px]">
            Whether it’s selling your current home, getting financing, or buying
            a new home, we make it easy and efficient. The best part? you’ll
            save a bunch of money and time with our services.
          </p>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-2 gap-8 w-[60%] mx-auto">
          {FEATURES.map((feature, index) => (
            <div key={index} className="flex gap-4 bg-white rounded-md p-8">
              <div className="w-[30%]">{feature.icon}</div>
              <div className="flex flex-col gap-4">
                <h3 className="text-primary-50 text-[1.6rem] font-[700] leading-[32px]">
                  {feature.title}
                </h3>
                <p className="text-[#191926] text-[1rem] font-[400] leading-[24px]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-[1px] bg-black my-4"></div>
      <div className="w-[60%] mx-auto flex justify-between">
        {STATICS.map((stat, index) => (
          <div
            key={index}
            className={`flex flex-col items-center gap-2 ${
              index !== STATICS.length - 1
                ? "border-r-[1px] border-[#F0EFFB] pr-20"
                : ""
            }`}
          >
            <span className="text-white text-[2.5rem] font-[700] leading-[40px]">
              {stat.count}
            </span>
            <span className="text-white/50 text-[1rem] font-[400] leading-[24px]">
              {stat.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default FeatureSection;
