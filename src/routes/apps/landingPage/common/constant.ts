export interface INavItem {
  label: string;
  hasDropdown: boolean;
}

export const NAV_ITEMS: INavItem[] = [
  { label: "Property", hasDropdown: true },
  { label: "About Us", hasDropdown: false },
  { label: "Contact Us", hasDropdown: false },
];
export const MENU_ITEMS = ["Buy", "Installamental payment", "Resell"];

export const TAB_LIST = ["Lease", "Buy", "Sell"];
