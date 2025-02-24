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
export const MENU_ITEMS = ["Buy", "Installamental payment", "Resell"];
export const MOBILE_MENU_ITEMS = [
  "Home",
  ...MENU_ITEMS,
  "About Us",
  "Contact Us",
];

export const TAB_LIST = ["Lease", "Buy", "Sell"];
