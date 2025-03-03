import TextInput from "@/common/forms/TextInput";

interface InputFieldProps {
  name: string;
  placeholder?: string;
}

function InputField({ placeholder, name }: InputFieldProps) {
  return (
    <TextInput
      name={name}
      placeholder={placeholder}
      className="h-[45px] w-full p-2 rounded-md block bg-[#F9F9F9] border border-[#828282] focus-within:outline-none focus-within:border-[#B356C1]"
    />
  );
}

export default InputField;
