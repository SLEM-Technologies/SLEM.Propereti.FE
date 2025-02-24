import familyImage from "@/assets/images/fm-colleagues.png";

interface IContent {
  title: string;
  value: string;
}

const CONTENTS: IContent[] = [
  {
    title: "Company History",
    value: `Founded in 2010, [Company Name] has been a trusted name in the
              real estate industry, helping thousands of clients buy, sell, and
              rent properties across Nigeria. Founded in 2010, [Company Name]
              has been a trusted name in the real estate industry, helping
              thousands of clients buy, sell, and rent properties across
              Nigeria.`,
  },
  {
    title: "Mission",
    value: `Our mission is to make property ownership accessible and affordable for everyone through innovative solutions like installment payment plans and resale options.`,
  },
  {
    title: "Vision",
    value: `To be the leading real estate platform in Africa, transforming the way people buy, sell, and rent properties.`,
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
              <h2 className="text-primary-50 font-[700] text-[1.3rem] md:text-[2rem]">
                {content.title}
              </h2>
              <p className="max-w-[75%] text-[0.9rem]font-[400] text-justify md:text-left md:max-w-full md:leading-[30px] md:text-[1.3rem]">
                {content.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CompanyDetails;
