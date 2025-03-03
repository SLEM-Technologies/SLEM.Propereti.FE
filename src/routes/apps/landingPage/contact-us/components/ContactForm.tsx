import { PrimaryButton } from "@/common/components/Button";
import InputField from "./InputField";
import TextArea from "@/common/forms/TextArea";
import Icon from "@/common/components/Icon";

import locationIcon from "@/assets/icons/location-icon.svg";
import phoneIcon from "@/assets/icons/phone.svg";
import emailIcon from "@/assets/icons/email.svg";

interface IContactInfo {
  icon: React.ReactNode;
  content: string;
}

const CONTACT_INFO: IContactInfo[] = [
  {
    icon: <Icon src={locationIcon} alt="Location Icon" className="" />,
    content: `1055 Arthur ave Elk Groot, 67.
New Palmas South Carolina.`,
  },
  {
    icon: <Icon src={phoneIcon} alt="Location Icon" />,
    content: `+1 234 678 9108 99`,
  },
  {
    icon: <Icon src={emailIcon} alt="Location Icon" />,
    content: "Contact@moralizer.com",
  },
];

function ContactForm() {
  return (
    <div className="mt-24 pb-24 bg-linear-to-t from-secondary-100 to-white">
      <div className="w-[70%] mx-auto flex flex-col md:flex-row gap-8 justify-center items-start">
        <div className="flex flex-col gap-2 md:gap-4">
          <h2 className="font-[700] text-[1.4rem] md:text-[2rem] leading-[46px] text-[#011334]">
            Let's talk with us
          </h2>
          <p className="text-[0.85rem] md:text-base font-[400] leading-[26px] max-w-sm">
            Questions, comments, or suggestions? Simply fill in the form and
            we’ll be in touch shortly.
          </p>

          <div className="space-y-3">
            {CONTACT_INFO.map((info: IContactInfo, index: number) => (
              <div className="flex items-center gap-2" key={index}>
                <span>{info.icon}</span>
                <span className="font-[700] text-[0.85rem] md:text-base leading-[26px] max-w-[300px]">
                  {info.content}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[400px] md:w-[565px] md:h-[546px] space-y-8 p-8 bg-white shadow-lg rounded-md">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <InputField placeholder="First Name*" name="firstName" />
              <InputField placeholder="Last Name*" name="lastName" />
            </div>
            <div>
              <InputField placeholder="Email*" name="email" />
            </div>
            <div>
              <InputField placeholder="Phone Number*" name="phoneNumber" />
            </div>
            <div>
              <TextArea
                name="message"
                className="w-full p-2 rounded-md block bg-[#F9F9F9] border border-[#828282] focus-within:outline-none focus-within:border-[#B356C1]"
                placeholder="Your Message"
                rows={7}
              ></TextArea>
            </div>
          </div>
          <div>
            <PrimaryButton className="w-full h-[50px] bg-primary-50 text-white">
              Send
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
