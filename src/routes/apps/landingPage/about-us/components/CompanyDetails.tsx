import familyImage from "@/assets/images/fm-colleagues.png";
import { ReactNode } from "react";

interface IContent {
  title: string;
  value: ReactNode;
}

const CONTENTS: IContent[] = [
  {
    title: "Company History",
    value: (
      <div className="space-y-3">
        <p>
          SLEM Technologies was founded with a mission to bridge the gap between
          traditional real estate and modern digital solutions. Initially
          established as a software and fintech solutions company, we have
          successfully partnered with microfinance banks, loan agencies, and
          fintech startups to digitize financial services across Nigeria.
        </p>

        <p>
          Recognizing the challenges in real estate—lack of trust, complex
          transactions, and limited financing options—we expanded our expertise
          into proptech, creating a secure and user-friendly platform that
          allows individuals to own and trade properties effortlessly.
        </p>

        <p>
          Over time, we have built strong relationships with trusted real estate
          developers, financial institutions, and regulatory bodies, ensuring
          that our platform offers only verified properties and seamless
          financial transactions.
        </p>
      </div>
    ),
  },
  {
    title: "Mission",
    value: (
      <p>
        To revolutionize real estate ownership by providing a secure,
        accessible, and technology-driven platform that enables individuals and
        businesses to buy, sell, and invest in properties effortlessly.
      </p>
    ),
  },
  {
    title: "Vision",
    value: (
      <div className="space-y-3">
        <p>
          To become the leading digital real estate ecosystem, transforming how
          people access, own, and trade properties across Africa and beyond
          through innovation, trust, and financial inclusivity.
        </p>

        <p>Would you like to add Core Values next? 🚀</p>
      </div>
    ),
  },
];

function CompanyDetails() {
  return (
    <div className="bg-linear-to-t from-white to-secondary-100/50 p-8 md:px-32 md:py-16">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="hidden md:block">
          <img
            src={familyImage}
            alt="Family image"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col gap-6">
          {CONTENTS.map((content: IContent, index: number) => (
            <div
              key={index}
              className="flex flex-col gap-y-3 justify-center items-center md:justify-start md:items-start"
            >
              <h2 className="text-primary-50 font-[700] text-[1.3rem] md:text-[1.6rem]">
                {content.title}
              </h2>
              <div className="max-w-[75%] text-[0.9rem]font-[400] text-justify md:text-left md:max-w-full md:leading-[30px] md:text-[1.1rem]">
                {content.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CompanyDetails;
