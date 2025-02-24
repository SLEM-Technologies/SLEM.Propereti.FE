import Filter from "../interaction/Filter";
import keyIcon from "@/assets/icons/key-icon.svg";
import homeIcon from "@/assets/icons/home-icon.svg";
import SearchInput from "../interaction/SearchInput";
import { PrimaryButton } from "./Button";
import { IPropertyCard, PROPERTY_CARD_CONTENT } from "../contants";
import PropertyCard from "../interaction/PropertyCard";

const filter = [
  {
    label: "Buy",
    icon: keyIcon,
  },
  {
    label: "Sell",
    icon: homeIcon,
  },
  {
    label: "Lease",
    icon: homeIcon,
  },
];

function PropertiesBasedOnLocation() {
  return (
    <div className="w-full h-full bg-linear-to-t from-secondary-100/50 to-white text-primary-50 py-7 md:py-14">
      <div className="w-full md:w-[80%] md:mx-auto flex flex-col justify-center items-center gap-12 md:gap-16">
        <div className="flex flex-col justify-center items-center space-y-1">
          <h2 className="text-[1.8rem] font-[700] leading-[40px] md:leading-[56px] md:text-[2.5rem]">
            Based on your location
          </h2>
          <p className="text-[0.88rem] leading-[18px] font-[400] md:leading-[25px] md:text-base">
            Some of our picked properties near you location.
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col-reverse items-center gap-5 md:gap-0 md:flex-row md:justify-between">
            <div className="w-[352px] md:w-[408px]">
              <Filter filterItems={filter} />
            </div>
            <div className="w-[352px]">
              <SearchInput placeholder="Search..." />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PROPERTY_CARD_CONTENT.map(
              (property: IPropertyCard, index: number) => (
                <PropertyCard property={property} key={index} />
              )
            )}
          </div>
          <div className="w-[253px] mx-auto">
            <PrimaryButton>Browser Properties</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertiesBasedOnLocation;
