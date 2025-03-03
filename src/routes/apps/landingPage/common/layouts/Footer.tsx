import Icon from "@/common/components/Icon";
import Logo from "@/common/components/Logo";

import facebookIcon from "@/assets/icons/facebook-icon.svg";
import instagramIcon from "@/assets/icons/instagram-icon.svg";
import twitterIcon from "@/assets/icons/twitter-icon.svg";
import linkedinIcon from "@/assets/icons/linkedin-icon.svg";
import { Link } from "react-router";

const CONTENT = [
  {
    title: "SELL A HOME",
    links: ["Request an offer", "Pricing", "Reviews", "Stories"],
  },
  {
    title: "BUY, RENT AND SELL",
    links: ["Buy and sell properties", "Rent home", "Builder trade-up"],
  },
  {
    title: "ABOUT",
    links: ["Company", "How it works", "Contact", "Investors"],
  },
  {
    title: "BUY A HOME",
    links: ["Buy", "Finance"],
  },
  {
    title: "TERMS & PRIVACY",
    links: [
      "Trust & Safety",
      "Terms of Service",
      "Privacy Policy",
      "Investors",
    ],
  },
  {
    title: "RESOURCES",
    links: ["Blog", "Guides", "FAQ", "Help Center"],
  },
];

const SOCIAL_ICONS = [
  {
    icon: <Icon src={facebookIcon} alt="facebook icon" />,
    link: "https://www.facebook.com/",
  },

  {
    icon: <Icon src={instagramIcon} alt="instagram icon" />,
    link: "https://www.instagram.com/",
  },
  {
    icon: <Icon src={twitterIcon} alt="twitter icon" />,
    link: "https://twitter.com/",
  },
  {
    icon: <Icon src={linkedinIcon} alt="linkedln icon" />,
    link: "https://www.linkedin.com/",
  },
];

function Footer() {
  return (
    <div className="bg-white text-white">
      <div className=" flex items-start p-8 md:gap-24 md:p-16 md:w-[70%] md:mx-auto">
        <div className="hidden md:block">
          <Logo variant="secondary" />
        </div>
        <div className="grid grid-cols-2 gap-4 md:gap-8 md:grid-cols-3">
          {CONTENT.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <h3 className="text-[#191926] font-[700] text-base md:text-[1.25rem]">
                {item.title}
              </h3>
              <ul className="flex flex-col gap-1">
                {item.links.map((link, index) => (
                  <li
                    key={index}
                    className="text-[#191926] font-[500]  text-[0.8rem] md:text-sm hover:text-primary-50"
                  >
                    <Link to="#">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t-[1px] border-[#F0EFFB]">
        <div className="flex justify-between items-center py-4 px-4 md:w-[70%] md:mx-auto md:py-8 md:px-0">
          <p className="text-[#191926] text-center text-[0.85rem] md:text-base">
            ©{new Date().getFullYear()} Estatery. All rights reserved.
          </p>

          <div className="flex gap-2 md:gap-4">
            {SOCIAL_ICONS.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
