import officeImage from "@/assets/images/office-buildings.png";
import sofaImage from "@/assets/images/sofa.png";
import { PrimaryButton } from "@/common/components/Button";
interface IContent {
  coverImage: string;
  title: string;
  description: string;
}
const CONTENT: IContent[] = [
  {
    coverImage: officeImage,
    title: "Installmental Payment",
    description:
      "Not sure what  you should be charging for your property? No need to worry, let us do the numbers for you.",
  },
  {
    coverImage: sofaImage,
    title: "Collaboration Payment",
    description:
      "Not sure what  you should be charging for your property? No need to worry, let us do the numbers for you.",
  },
];

function OwnerShip() {
  return (
    <div className="w-full h-full bg-linear-to-t from-secondary-100/50 to-white text-primary-50 py-2 md:py-4">
      <div className="w-[70%] mx-auto flex flex-col justify-center items-center text-center gap-y-16 md:gap-y-48">
        <div className="space-y-2">
          <h2 className="text-primary-50 text-[1.3rem] leading-[35.48px] font-[700] md:leading-[60.48px] md:text-[2rem]">
            The best property ownership deal
          </h2>
          <p className="text-[0.82rem] max-w-md md:max-w-[720px] text-black leading-[25px] font-[400] md:text-[1.1rem] md:leading-[30px]">
            Founded in 2010, [Company Name] has been a trusted name in the real
            estate industry, helping thousands of clients buy, sell, and rent
            properties across Nigeria. Founded in 2010,
          </p>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:gap-12">
          {CONTENT.map((content: IContent, index: number) => (
            <div key={index} className=" w-[360px] md:w-[400px] h-[723px]">
              <div className="w-full h-[371px]">
                <img
                  src={content.coverImage}
                  alt="Cover image"
                  className="w-full h-full object-cover rounded-tl-md rounded-tr-md"
                />
              </div>
              <div className="bg-white flex flex-col justify-center items-center gap-2 p-8 rounded-bl-md rounded-br-md">
                <h2 className="text-primary-50 text-[1.1rem] md:text-[1.3rem] font-[700] leading-[40px]">
                  {content.title}
                </h2>
                <p className="font-[400] leading-[25.2px] text-black mb-4 text-[0.85rem] md:text-base">
                  {content.description}
                </p>
                <PrimaryButton className="w-[205.58px] h-[46px] md:h-[56px] bg-primary-50 text-[0.88rem] md:text-base">
                  Get Started
                </PrimaryButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OwnerShip;
