import { useEffect, useRef, useState } from "react";
import { HiChevronDown, HiMenu } from "react-icons/hi";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useInteractions,
  useClick,
} from "@floating-ui/react";

import { PrimaryButton } from "@/common/components/Button";
import Logo from "@/common/components/Logo";
import {
  INavItem,
  MENU_ITEMS,
  MOBILE_MENU_ITEMS,
  NAV_ITEMS,
} from "@/routes/apps/landingPage/common";
import { HiX } from "react-icons/hi";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Floating UI for desktop dropdown menu
  const {
    refs: desktopRefs,
    floatingStyles: desktopFloatingStyles,
    context: desktopContext,
  } = useFloating({
    open: isMenuOpen,
    onOpenChange: setIsMenuOpen,
    middleware: [offset({ mainAxis: 28, crossAxis: 80 }), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const {
    getReferenceProps: getDesktopReferenceProps,
    getFloatingProps: getDesktopFloatingProps,
  } = useInteractions([useClick(desktopContext)]);

  // Floating UI for mobile menu
  const {
    refs: mobileRefs,
    floatingStyles: mobileFloatingStyles,
    context: mobileContext,
  } = useFloating({
    open: isMobileMenuOpen,
    onOpenChange: setIsMobileMenuOpen,
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const {
    getReferenceProps: getMobileReferenceProps,
    getFloatingProps: getMobileFloatingProps,
  } = useInteractions([useClick(mobileContext)]);

  const handleMenuToggle = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (NAV_ITEMS[index].hasDropdown) {
      setIsMenuOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="sticky top-0 right-0 z-50 flex w-full justify-between items-center bg-white/30 backdrop-blur-sm border-b-[1.5px] border-[#F0EFFB] px-8 py-2 md:py-4 md:px-16">
        <Logo ref={mobileRefs.setReference} {...getMobileReferenceProps()} />
        <nav className="hidden md:block">
          <div ref={dropdownRef}>
            <ul className="flex space-x-8">
              {NAV_ITEMS.map((item: INavItem, index: number) => (
                <li
                  key={index}
                  ref={item.hasDropdown ? desktopRefs.setReference : null}
                  {...(item.hasDropdown ? getDesktopReferenceProps() : {})}
                  onClick={(e) => handleMenuToggle(index, e)}
                  className="text-primary-50 cursor-pointer font-[500] leading-[24px] flex items-center gap-2 hover:text-primary-100 transition-colors ease-in-out"
                  aria-haspopup="true"
                  aria-expanded={isMenuOpen && item.hasDropdown}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && <HiChevronDown />}
                </li>
              ))}
            </ul>

            {isMenuOpen && (
              <div
                ref={desktopRefs.setFloating}
                style={desktopFloatingStyles}
                {...getDesktopFloatingProps()}
                className="w-[220px] bg-white shadow-md py-4 px-3 z-50"
              >
                <ul role="menu" className="space-y-3">
                  {MENU_ITEMS.map((item: string, index: number) => (
                    <li
                      key={index}
                      className="text-primary-50 text-[1.1rem] font-[500] cursor-pointer leading-[24px] hover:text-primary-100 transition-colors ease-in-out"
                      role="menuitem"
                    >
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </nav>
        <PrimaryButton className="hidden md:block w-[174px] h-[48px] bg-primary-50 text-sm font-[700] leading-[24px]">
          Contact Us
        </PrimaryButton>
        <HiMenu
          size={24}
          className="md:hidden text-primary-50 cursor-pointer"
          onClick={() => setIsMobileMenuOpen((state) => !state)}
        />

        {isMobileMenuOpen && (
          <div
            ref={mobileRefs.setFloating}
            style={mobileFloatingStyles}
            {...getMobileFloatingProps()}
            className="bg-white text-primary-50 w-full p-4 md:hidden relative shadow-md"
          >
            <HiX
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-primary-50 absolute top-2 right-2 cursor-pointer hover:text-primary-100 "
              size={24}
            />
            <ul role="mobileMenu" className="space-y-3">
              {MOBILE_MENU_ITEMS.map((item: string, index: number) => (
                <li
                  key={index}
                  className="text-primary-50 text-[1.1rem] font-[500] cursor-pointer leading-[24px] hover:text-primary-100 transition-colors ease-in-out"
                  role="mobileMenuItem"
                >
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
