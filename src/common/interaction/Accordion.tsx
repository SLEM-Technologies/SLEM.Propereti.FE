import { IAccordionContent } from "../models";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { HiChevronRight, HiChevronDown } from "react-icons/hi2";

interface IAccordionProps {
  content: IAccordionContent;
}
function Accordion({ content }: IAccordionProps) {
  const [isOpenAccordion, setIsOpenAccordion] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleToggleAccordion = () => {
    setIsOpenAccordion((prev) => !prev);
  };

  useEffect(() => {
    const resizeHandler = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 700) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return (
    <div
      className={twMerge(
        "w-[350px] md:w-[896px] flex justify-between bg-white p-4 md:p-7 shadow-lg rounded-lg",
        isOpenAccordion
          ? "border-primary-200 border-[3px] items-start md:h-[230px]"
          : "border-0 items-center md:h-[132px]"
      )}
    >
      <div className="space-y-3">
        <h2 className="text-[#170F49] font-[500] text-[0.9rem] md:text-[1.3rem]">
          {content.title}
        </h2>
        {isOpenAccordion && (
          <p className="font-[400] leading-[30px] text-[0.85rem] md:text-[1.1rem] md:w-[715.3px]">
            {content.description}
          </p>
        )}
      </div>
      <div
        onClick={handleToggleAccordion}
        className={twMerge(
          "p-1 md:w-[50.6px] md:h-[50.6px] rounded-full flex justify-center items-center cursor-pointer",
          isOpenAccordion
            ? "bg-primary-200 text-white"
            : " bg-white shadow-md text-primary-200"
        )}
      >
        {isOpenAccordion ? (
          <HiChevronRight size={isMobile ? 18 : 24} />
        ) : (
          <HiChevronDown size={isMobile ? 18 : 24} />
        )}
      </div>
    </div>
  );
}

export default Accordion;
