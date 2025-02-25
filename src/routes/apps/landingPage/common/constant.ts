export interface INavItem {
  label: string;
  hasDropdown: boolean;
  link: string;
}

export const NAV_ITEMS: INavItem[] = [
  { label: "Property", hasDropdown: true, link: "/home" },
  { label: "About Us", hasDropdown: false, link: "/about-us" },
  { label: "Contact Us", hasDropdown: false, link: "/contact-us" },
];
export const MENU_ITEMS: INavItem[] = [
  { label: "Buy", hasDropdown: true, link: "/buy" },
  {
    label: "Installmental payment",
    hasDropdown: false,
    link: "/installmental-payment",
  },
  { label: "Resell", hasDropdown: false, link: "/resell" },
];
export const MOBILE_MENU_ITEMS: INavItem[] = [...MENU_ITEMS, ...NAV_ITEMS];

export const TAB_LIST = ["Lease", "Buy", "Sell"];
