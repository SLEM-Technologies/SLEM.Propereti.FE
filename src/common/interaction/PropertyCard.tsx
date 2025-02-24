import { IPropertyCard } from "../contants";
import homeImage1 from "@/assets/images/house-card1.jpg";
import bed from "@/assets/icons/bed.svg";
import bathroom from "@/assets/icons/bath.svg";
import sqMeter from "@/assets/icons/square-meters.svg";
import popularBanner from "@/assets/icons/popular.svg";

import LikeButton from "./LikeButton";
import Icon from "../components/Icon";

interface IPropertyCardProps {
  property?: IPropertyCard;
}

const defaultVal = {
  coverImage: homeImage1,
  name: "Palm Harbor",
  address: "2699 Green Valley, Highland Lake, FL",
  price: "$2,095",
  amenities: {
    beds: 3,
    bathrooms: 3,
    size: "5x7",
  },
};

function PropertyCard({ property = defaultVal }: IPropertyCardProps) {
  return (
    <div className="relative w-[360px] h-[350px] md:h-[400px] rounded-lg bg-white">
      <div className="w-full h-[200px]">
        <img
          src={property.coverImage}
          alt="Cover image"
          className="w-full h-full object-cover block"
        />
      </div>
      <div className="bg-white p-4 text-primary-50">
        <div className="flex gap-4 mt-3">
          <div className="space-y-1">
            <div className="flex items-center">
              <span className="text-[1.3rem] font-[700] leading-[24px] md:text-[1.5rem] md:leading-[34px]">
                {property.price}
              </span>
              <span className="text-base font-[300] leading-[18px] md:leading-[24px]">
                /month
              </span>
            </div>
            <h2 className="text-[1.3rem] font-[700] leading-[24px] md:leading-[34px]">
              {property.name}
            </h2>
            <p className="text-base font-[300] leading-[18px] md:leading-[24px]">
              {property.address}
            </p>
          </div>
          <LikeButton />
        </div>
        <div className="w-full h-[1.5px] bg-[#F0EFFB] my-3"></div>
        <div className="flex items-center justify-between text-[0.8rem] leading-[15px] md:text-[0.88rem] font-[400] md:leading-[19.6px]">
          <div className="flex items-center gap-2">
            <Icon src={bed} alt="Bed Icon" />
            <span>{property.amenities.beds} Beds</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon src={bathroom} alt="Bathroom Icon" />
            <span>{property.amenities.bathrooms} Bathrooms</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon src={sqMeter} alt="Square Meters Icon" />
            <span>{property.amenities.size}</span>
          </div>
        </div>
      </div>
      <div className="absolute top-[184px] -left-2.5">
        <Icon src={popularBanner} alt="Popular banner" />
      </div>
    </div>
  );
}

export default PropertyCard;
