import { useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
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
  NAV_ITEMS,
} from "@/routes/apps/landingPage/common";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isMenuOpen,
    onOpenChange: setIsMenuOpen,
    middleware: [offset({ mainAxis: 28, crossAxis: 80 }), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
  ]);

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
    <header className="sticky top-0 right-0 z-50 flex w-full justify-between items-center py-4 px-16 bg-white/30 backdrop-blur-sm border-b-[1.5px] border-[#F0EFFB]">
      <Logo />
      <nav>
        <div ref={dropdownRef}>
          <ul className="flex space-x-8">
            {NAV_ITEMS.map((item: INavItem, index: number) => (
              <li
                key={index}
                ref={item.hasDropdown ? refs.setReference : null}
                {...(item.hasDropdown ? getReferenceProps() : {})}
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
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
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
      <PrimaryButton className="w-[174px] h-[48px] bg-primary-50 text-sm font-[700] leading-[24px]">
        Contact Us
      </PrimaryButton>
    </header>
  );
}

export default Header;
