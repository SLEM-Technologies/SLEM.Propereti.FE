import Icon from "@/common/components/Icon";
import propertyIcon from "@/assets/icons/property-icon.svg";
import resaleIcon from "@/assets/icons/resale-icon.svg";
import commissionIcon from "@/assets/icons/commission-icon.svg";
import installmentIcon from "@/assets/icons/installmental-pay-icon.svg";
import findHomeIcon from "@/assets/icons/browser-home-icon.svg";

import { PrimaryButton } from "@/common/components/Button";

const SERVICES = [
  {
    icon: <Icon src={propertyIcon} alt="property icon" />,
    title: "Property Insurance",
    description:
      "We offer our customer property protection of liability coverage and insurance for their better life.",
  },
  {
    icon: <Icon src={resaleIcon} alt="resale icon" />,
    title: "Resale Assistance",
    description:
      "Not sure what  you should be charging for your property? No need to worry, let us do the numbers for you.",
  },
  {
    icon: <Icon src={commissionIcon} alt="low commission icon" />,
    title: "Lowest Commission",
    description:
      "You no longer have to negotiate commissions and haggle with other agents it only cost 2%!",
  },
  {
    icon: <Icon src={installmentIcon} alt="installment payment icon" />,
    title: "Installmental Payment",
    description:
      "Get a virtual tour, and schedule visits before you rent or buy any properties. You get overall control.",
  },
];

function ServicesSection() {
  return (
    <div className="w-full h-full bg-white flex gap-16 p-10">
      <div className="flex flex-col gap-3 w-[459px] bg-[#F7F7FD] border border-primary-100 rounded-md ">
        <div className="flex flex-col gap-5 max-w-[300px] mx-auto mt-6">
          <h2 className="text-primary-50 text-[2rem] font-[700] leading-[40px] mb-2">
            The new way to find your new home
          </h2>
          <p className="font-[400] leading-[25px]">
            Find your dream place to live in with more than 10k+ properties
            listed.
          </p>
          <PrimaryButton className="w-[159px] h-[40px] bg-primary-50">
            Browser Properties
          </PrimaryButton>
        </div>

        <div className="flex justify-end">
          <div className="w-[80%] h-full">
            <Icon
              src={findHomeIcon}
              alt="House Image"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      <div className="w-[732px] mt-6">
        <div className="grid grid-cols-2 gap-x-4 gap-y-10">
          {SERVICES.map((service, index) => (
            <div key={index} className="flex flex-col gap-4">
              <span>{service.icon}</span>
              <h3 className="text-primary-50 text-[1.6rem] font-[700] leading-[32px]">
                {service.title}
              </h3>
              <p className="text-[1rem] font-[400] leading-[24px]">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServicesSection;
