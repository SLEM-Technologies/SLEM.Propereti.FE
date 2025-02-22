import { PrimaryButton } from "@/common/components/Button";
import TextInput from "@/common/forms/TextInput";

function NewesLetterSection() {
  return (
    <div className="bg-[#F7F7FD80] flex flex-col gap-3 justify-center items-center py-10">
      <small className="text-[1.3rem] text-primary-50 font-[700] leading-[34px]">
        No Spam Promise
      </small>
      <h2 className="text-[2.5rem] text-[#191926] font-[700] leading-[54px]">
        Are you a landowner?
      </h2>
      <p className="text-[1rem] text-[#191926] font-[500] leading-[24px] text-center">
        Discover ways to increase your home's value and get listed. No Spam.
      </p>
      <div className="bg-white w-[543px] flex items-center justify-between px-6 py-3 rounded-md">
        <TextInput
          placeholder="Enter your email address"
          className="focus:outline-none block w-full"
        />
        <PrimaryButton className="w-[137px] h-[40px] bg-primary-50 text-white">
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
