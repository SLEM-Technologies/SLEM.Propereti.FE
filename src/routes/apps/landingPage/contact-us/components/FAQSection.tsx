import Accordion from "@/common/interaction/Accordion";
import { IAccordionContent } from "@/common/models";

const ACCORDIONS: IAccordionContent[] = [
  {
    title: "What is the SLEM Technologies Real Estate Platform?",
    description: (
      <span>
        The SLEM Technologies Real Estate Platform is a digital marketplace
        designed for <strong>secure property transactions</strong>. Users can
        buy, sell, and manage real estate assets exclusively from{" "}
        <strong>trusted real estate companies,</strong> not agents.
      </span>
    ),
  },
  {
    title: "Who can use the platform?",
    description: (
      <span>
        The platform is open to{" "}
        <strong>
          individual buyers, investors, and real estate companies.
        </strong>{" "}
        Whether you're looking to purchase land, homes, or commercial
        properties, you can find verified listings here.{" "}
      </span>
    ),
  },
  {
    title: "What types of properties are available on the platform?",
    description: (
      <span>
        Users can browse and purchase{" "}
        <strong>
          lands, residential houses, commercial buildings, and investment
          properties
        </strong>{" "}
        listed by
        <strong>verified real estate companies.</strong>
      </span>
    ),
  },
  {
    title: "Can I use the platform if I’m not in Nigeria?",
    description: (
      <span>
        Yes, the platform is designed for both{" "}
        <strong>local and international investors</strong>. Users outside
        Nigeria can buy properties through the platform, provided they comply
        with local property ownership laws.
      </span>
    ),
  },
  {
    title: "How do I register on the platform?",
    description: (
      <span>
        To sign up, users must provide{" "}
        <strong>
          basic information, verify their identity, and complete account setup
        </strong>
        . Real estate companies go through an additional
        <strong> verification process</strong> before listing properties.
      </span>
    ),
  },
  {
    title: "Does the platform allow corporate buyers?",
    description: (
      <span>
        Yes, businesses, organizations, and{" "}
        <strong>real estate investment groups</strong> can create corporate
        accounts to purchase properties or list their own.
      </span>
    ),
  },
];

function FAQSection() {
  return (
    <div className="w-full h-full bg-linear-to-t from-white to-secondary-100 md:pt-32">
      <div className="w-[70%] mx-auto flex flex-col justify-center items-center gap-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-primary-50 text-[1.3rem] leading-[35.48px] font-[700] md:leading-[60.48px] md:text-[2rem]">
            Frequently Asked Questions (FAQ)
          </h2>
          {/* <p className="text-[0.82rem] max-w-md md:max-w-[720px] text-black leading-[25px] font-[400] md:text-[1.1rem] md:leading-[30px]">
            Founded in 2010, [Company Name] has been a trusted name in the real
            estate industry, helping thousands of clients buy, sell, and rent
            properties across Nigeria. Founded in 2010,
          </p> */}
        </div>
        <div className="flex flex-col gap-6">
          {ACCORDIONS.map((accordion: IAccordionContent, index: number) => (
            <Accordion content={accordion} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQSection;
