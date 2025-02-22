import { PrimaryButton } from "@/common/components/Button";
import TextInput from "@/common/forms/TextInput";

function NewesLetterSection() {
  return (
    <div className="bg-[#F7F7FD80] flex flex-col gap-1.5 md:gap-3 justify-center items-center py-4 md:py-10">
      <small className="text-[1.1rem] text-primary-50 font-[700] leading-[24px] md:text-[1.3rem] md:leading-[34px]">
        No Spam Promise
      </small>
      <h2 className="text-[1.8rem] text-[#191926] font-[700] leading-[40px] md:text-[2.5rem] md:leading-[54px]">
        Are you a landowner?
      </h2>
      <p className="max-w-[300px] text-[0.89rem] text-[#191926] font-[500] leading-[18px] text-center md:max-w-full md:text-[1rem] md:leading-[24px]">
        Discover ways to increase your home's value and get listed. No Spam.
      </p>
      <div className="bg-white my-3 w-[400px] flex items-center justify-between px-4 py-2 rounded-md md:px-6 md:py-3 md:w-[543px] md:my-0">
        <TextInput
          placeholder="Enter your email address"
          className="focus:outline-none block w-full"
        />
        <PrimaryButton className="w-[100px] h-[40px] bg-primary-50 text-white text-sm md:text-base md:w-[137px]">
          Submit
        </PrimaryButton>
      </div>
      <p className="text-[0.88rem] text-[#191926] font-[500] leading-[19px] text-center">
        Join <span className="text-primary-50">10,000+</span> other landlords in
        our estatery community.
      </p>
    </div>
  );
}

export default NewesLetterSection;
