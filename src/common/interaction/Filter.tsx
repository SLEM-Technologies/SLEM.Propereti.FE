import { twMerge } from "tailwind-merge";
import { ReactSVG } from "react-svg";
import { useState } from "react";

interface IFilterProps {
  filterItems: IFilter[];
}

interface IFilter {
  label: string;
  icon: string;
}

function Filter({ filterItems }: IFilterProps) {
  const [activeFilter, setActiveFilter] = useState(filterItems[0].label);

  const handleOnChangeActiveFilter = (filterItem: string) => {
    if (activeFilter === filterItem) return;
    setActiveFilter(filterItem);
  };

  return (
    <div
      role="filter"
      className="w-full flex justify-between items-center h-[44px] md:h-[64px] p-2 bg-[#F0EFFB] border-[1.5px] border-[#E0DEF7] rounded-md"
    >
      {filterItems.map((filter: IFilter, index: number) => {
        const isActive = activeFilter === filter.label;

        return (
          <div
            role="filterRow"
            key={index}
            onClick={() => handleOnChangeActiveFilter(filter.label)}
            className={twMerge(
              "w-full h-[38px] md:h-[48px] flex justify-center rounded-md cursor-pointer items-center gap-2 font-[700] text-[0.88rem] md:text-[1.1rem] leading-[24.5px]",
              isActive
                ? "bg-white border-[2px] border-[#E0DEF7] text-[#7065F0]"
                : "text-primary-50"
            )}
          >
            <span>
              <ReactSVG
                src={filter.icon}
                beforeInjection={(svg) => {
                  const paths = svg.querySelectorAll("path");
                  paths.forEach((path) => {
                    path.setAttribute(
                      "stroke",
                      isActive ? "#7065F0" : "#3A4999"
                    );
                  });
                }}
              />
            </span>
            <span>{filter.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Filter;
