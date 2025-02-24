import homeImage1 from "@/assets/images/house-card1.jpg";
import homeImage2 from "@/assets/images/house-card2.jpg";
import homeImage3 from "@/assets/images/house-card3.png";
import homeImage4 from "@/assets/images/house-card4.png";
import homeImage5 from "@/assets/images/house-card5.png";
import homeImage6 from "@/assets/images/house-card6.png";

export interface IPropertyCard {
  coverImage: string;
  name: string;
  address: string;
  price: string;
  amenities: Amenities;
}

export interface Amenities {
  beds: number;
  bathrooms: number;
  size: string;
}

export const PROPERTY_CARD_CONTENT: IPropertyCard[] = [
  {
    coverImage: homeImage1,
    name: "Palm Harbor",
    address: "2699 Green Valley, Highland Lake, FL",
    price: "$2,095",
    amenities: {
      beds: 3,
      bathrooms: 3,
      size: "5x7",
    },
  },
  {
    coverImage: homeImage2,
    name: "Beverly Springfield",
    address: "2821 Lake Sevilla, Palm Harbor, TX",
    price: "$2,700",
    amenities: {
      beds: 3,
      bathrooms: 3,
      size: "5x7",
    },
  },
  {
    coverImage: homeImage3,
    name: "Faulkner Ave",
    address: "909 Woodland St, Michigan, IN",
    price: "$4,550",
    amenities: {
      beds: 4,
      bathrooms: 3,
      size: "8x10m²",
    },
  },
  {
    coverImage: homeImage4,
    name: "St. Crystal",
    address: "210 US Highway, Highland Lake, FL",
    price: "$2,400",
    amenities: {
      beds: 2,
      bathrooms: 3,
      size: "6x8m²",
    },
  },
  {
    coverImage: homeImage5,
    name: "Cove Red",
    address: "243 Curlew Road, Palm Harbor, TX",
    price: "$1,500",
    amenities: {
      beds: 2,
      bathrooms: 1,
      size: "5x7.5m²",
    },
  },
  {
    coverImage: homeImage6,
    name: "Tarpon Bay",
    address: "103 Lake Shores, Michigan, IN",
    price: "$1,600",
    amenities: {
      beds: 3,
      bathrooms: 1,
      size: "5x7.5m²",
    },
  },
];
