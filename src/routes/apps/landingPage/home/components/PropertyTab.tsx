import { PrimaryButton } from "@/common/components/Button";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

interface TabContent {
  title: string;
  value: string;
  icon?: React.ReactNode;
}

interface PropertyTabProps {
  tabList: string[];
  tabContent: TabContent[];
  variant?: "primary" | "secondary";
}

const styles = {
  primary: {
    tab: "bg-[#E6F2FF99]/60 text-primary-50",
    btn: "text-white bg-primary-50",
    isActive: "border-b-2 border-primary-50",
  },
  secondary: {
    tab: "bg-primary-100 text-white",
    btn: "bg-secondary-100 text-primary-100",
    isActive: "border-b-2 border-white",
  },
};

function PropertyTab({
  tabList,
  tabContent,
  variant = "primary",
}: PropertyTabProps) {
  const [activeTab, setActiveTab] = useState(0);
  const style = styles[variant];

  return (
    <div className="w-[80%] mx-auto">
      <div
        className={twMerge(
          `w-[449.36px] h-[50px] flex justify-between items-center rounded-tr-md rounded-tl-md`,
          style.tab
        )}
      >
        {tabList.map((tab, index) => (
          <button
            key={index}
            className={`${
              activeTab === index ? style.isActive : "border-none"
            } border-b-[3px] h-full px-6 text-[1.1rem] font-[700] leading-[24px]`}
          >
            <span
              onClick={() => setActiveTab(index)}
              className="cursor-pointer"
            >
              {tab}
            </span>
          </button>
        ))}
      </div>
      <div
        className={twMerge(
          "w-full h-ful flex justify-between items-center px-10 py-4 rounded-tr-md rounded-br-md rounded-bl-md",
          style.tab
        )}
      >
        {tabContent.map((content, index) => (
          <div
            key={index}
            className={`w-full px-8 border-r-[3px] border-[#E0DEF7]/60`}
          >
            <h2
              className={`font-[400] leading-[24px] ${
                variant === "primary" ? "text-black" : "text-white"
              }`}
            >
              {content.title}
            </h2>
            <p
              className={`flex items-center gap-3 text-[1.1rem] font-[700] leading-[24px]`}
            >
              <span>{content.value}</span>
              <span>{content.icon}</span>
            </p>
          </div>
        ))}
        <PrimaryButton className={`w-[405px] h-[56px] ml-8 ${style.btn}`}>
          Browse Properties
        </PrimaryButton>
      </div>
    </div>
  );
}

export default PropertyTab;
